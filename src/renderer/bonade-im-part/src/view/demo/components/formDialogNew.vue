<template>
  <el-dialog
    custom-class="fixed-dialog"
    title="添加区域"
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
          <el-form-item label="字段名称" prop="groupName">
            <el-input v-model="ruleForm.groupName" />
          </el-form-item>
        </div>
        <div>
          <el-form-item label="设置为导航" prop="isNav">
            <el-radio-group v-model="ruleForm.isNav">
              <el-radio label="0">否</el-radio>
              <el-radio label="1">是</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="展示形式" prop="groupType">
            <el-select v-model="ruleForm.groupType" placeholder="请选择展示形式">
              <el-option label="字段区域" value="1" />
              <el-option label="表格" value="2" />
            </el-select>
          </el-form-item>
        </div>
        <div v-if="ruleForm.groupType==='1'">
          <el-form-item label="字段展示形式" prop="propertyType">
            <el-select v-model="ruleForm.propertyType" placeholder="请选择展示形式">
              <el-option label="行内表单" value="2" />
              <el-option label="竖直表单" value="1" />
            </el-select>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <div class="buttons">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </span>
  </el-dialog>
</template>

<script>
const COMPONENT_NAME = 'fd-dialog'
const EVENT_INPUT = 'input'
export default {
  name: COMPONENT_NAME,
  components: {},
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialogVisible: this.value,
      ruleForm: {
        groupName: '',
        groupType: '1',
        propertyType: '2',
        isNav: '1'
      },
      rules: {
        groupName: [
          { required: true, message: '该字段不能为空', trigger: 'blur' }
        ]
      },
      fieldTypeList: [],
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
    }
  },
  methods: {
    submit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
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
