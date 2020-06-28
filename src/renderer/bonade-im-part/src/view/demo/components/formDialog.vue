<template>
  <el-dialog
    custom-class="fixed-dialog"
    title="编辑字段"
    top="6vh"
    :visible.sync="dialogVisible"
    width="440px"
  >
    <div class="el-form-section">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="100px"
        label-position="top"
        class="demo-ruleForm"
      >
        <div>
          <el-form-item label="字段名称" prop="fieldName">
            <el-input v-model="ruleForm.fieldName" />
          </el-form-item>
        </div>
        <div>
          <el-form-item label="字段类型" prop="componentValueType">
            <el-select v-model="ruleForm.componentValueType" :disabled="isEdit" @change="selectChangeHandler">
              <el-option
                v-for="(item,index) in componentTypeList"
                :key="item+index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </div>
        <div v-if="ruleForm.componentValueType==='TEXT' || ruleForm.componentValueType==='TEXTAREA'" class="el-form-item second-form-item">
          <el-form-item label="字数限制">
            <el-input v-model="extra.validateCommand.LENGTH" />
          </el-form-item>
          <el-form-item label="输入框状态">
            <el-radio-group v-model="extra.template.status">
              <el-radio :label="0">普通</el-radio>
              <el-radio :label="1">只读</el-radio>
              <el-radio :label="2">隐藏</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
        <div v-if="ruleForm.componentValueType==='RADIO'" class="el-form-item second-form-item">
          <fdRadioGroup v-model="extra.template.items" />
        </div>
        <div v-if="ruleForm.componentValueType==='CHECK_BOX'" class="el-form-item second-form-item">
          <fdCheckBoxGroup v-model="extra.template.items" />
        </div>
        <div v-if="ruleForm.componentValueType==='DATE'" class="el-form-item second-form-item">
          <fdDateGroup v-model="extra.template.type" />
        </div>
        <div v-if="ruleForm.componentValueType==='NUMBER' || ruleForm.componentValueType==='CURRENCY'" class="el-form-item second-form-item">
          <fdInputNumber v-model="extra.template.decimals" />
        </div>
        <div>
          <el-form-item label="帮助文本" prop="helpText">
            <el-input v-model="ruleForm.helpText" />
          </el-form-item>
        </div>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <div class="buttons">
        <el-button @click="resetForm('ruleForm')">取 消</el-button>
        <el-button @click="submitForm('ruleForm')">确 定</el-button>
      </div>
    </span>
  </el-dialog>
</template>

<script>
const COMPONENT_NAME = 'fd-dialog'
const EVENT_INPUT = 'input'
import { fieldTypes } from '../mock/fieldType.js'
import fdRadioGroup from './radioGroup'
import fdCheckBoxGroup from './checkBoxGroup'
import fdDateGroup from './dateGroup'
import fdInputNumber from './inputNumber'
export default {
  name: COMPONENT_NAME,
  components: {
    fdRadioGroup,
    fdCheckBoxGroup,
    fdDateGroup,
    fdInputNumber
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    model: {
      type: Object,
      default: () => {
        return {}
      }
    },
    isEdit: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      dialogVisible: this.value,
      ruleForm: {
        fieldName: ''
      },
      rules: {
        fieldName: [
          { required: true, message: '该字段不能为空', trigger: 'blur' }
        ]
      },
      componentTypeList: [],
      extra: {
        template: {},
        validateCommand: {}
      },
      radio: true
    }
  },
  watch: {
    value(newValue) {
      this.dialogVisible = newValue
    },
    dialogVisible(newValue) {
      this.$emit(EVENT_INPUT, newValue)
    },
    model: {
      immediate: true,
      handler(newValue, oldValue) {
        if (!newValue) return
        this.ruleForm = JSON.parse(JSON.stringify(this.model))
        // eslint-disable-next-line no-eval
        const fieldExtra = eval('(' + this.model.fieldExtra + ')')
        const { template, validateCommand } = fieldExtra
        const isValidate = Object.keys(validateCommand).length
        const isTemplate = Object.keys(template).length

        if (isValidate) this.$set(this.extra, 'validateCommand', validateCommand)
        if (isTemplate) this.$set(this.extra, 'template', template)

        const { data } = fieldTypes
        this.componentTypeList = data
        const { componentValueType } = this.model || data[0].value
        this.$set(this.ruleForm, 'componentValueType', componentValueType)
      }
    }
  },
  methods: {
    selectChangeHandler(val) {
      let template = null
      let validateCommand = null
      if (val === 'RADIO' || val === 'CHECK_BOX') template = { 'items': [{ 'choose': false, 'content': '' }] }
      if (val === 'NUMBER') template = { type: 'number', 'decimals': 9 }
      if (val === 'CURRENCY') template = { type: 'number', 'unit': '元', 'decimals': 6, 'ccy': null }
      if (val === 'TEL') template = { type: 'tel' }
      if (val === 'EMAIL') template = { type: 'email' }
      if (val === 'TEXTAREA' || val === 'TEXT') {
        template = { type: 'text', 'status': 0 }
        validateCommand = { 'LENGTH': 60 }
      }
      if (val === 'DATE') {
        switch (this.extra.template.type || 'date') {
          case 'month':
            template = { 'type': 'month' }
            validateCommand = { 'DATE_FORMAT': 'yyyy-MM' }
            break
          case 'date':
            template = { 'type': 'date' }
            validateCommand = { 'DATE_FORMAT': 'yyyy-MM-dd' }
            break
          case 'datetime':
            template = { 'type': 'datetime' }
            validateCommand = { 'DATE_FORMAT': 'yyyy-MM-dd HH:mm:ss' }
            break
        }
      }
      if (val === 'DATE_SECTION') template = { type: 'date-time-picker' }
      this.$set(this.extra, 'template', template)
      this.$set(this.extra, 'validateCommand', validateCommand)
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const { componentValueType } = this.ruleForm
          let flag = true
          if (componentValueType === 'RADIO' || componentValueType === 'CHECK_BOX') {
            const items = this.extra.template.items
            items.map(item => {
              if (!item.content) {
                flag = false
              }
            })
          }
          if (!flag) return
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="scss">
.fixed-dialog {
  height: auto;
  top: 10%;
  width: 440px;
  padding: 20px 30px 30px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  .el-form-section{
    .el-form-item {
      margin-bottom: 20px;
      .el-select {
        width: 100%;
      }
    }
    .second-form-item {
      margin: 0 0 20px 20px;
      font-size: 14px;
    }
    .el-form--label-top{
      .el-form-item__label {
        float: none;
        display: inline-block;
        text-align: left;
        padding: 0 0 10px;
        color: #525975;
        font-weight: 700;
      }
    }
  }
  .el-dialog__header {
    padding: 0 0 15px;
    border-bottom: 2px solid #ECF0F4;
  }
  .el-dialog__body {
    padding: 25px 0 0;
    color: inherit;
  }
  .el-dialog__footer {
    padding: 0;
    .buttons{
      margin: 40px 0 0;
    }
  }
}
</style>
