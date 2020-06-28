<template>
  <div ref="formItem" class="fd-form-item" :class="formItemClass">
    <template v-if="!isBtnField">
      <div class="fd-form-item-row">
        <el-form-item
          :rules="allEdit?fieldValue.rules:[]"
          :prop="fieldValue.modelKey"
        >
          <span v-show="fieldValue.label" slot="label" class="fd-form-label">{{ fieldValue.label }}</span>
          <div v-if="allEdit" class="fd-form-field">
            <slot>
              <component :is="componentName" v-model="model[field.modelKey]" v-bind="fieldValue.props" v-on="fieldValue.events" @change="changeHandler" />
            </slot>
          </div>
          <div v-else class="fd-form-field fd-form-item-field-edit">
            <div class="fd-form-item-field-edit-value">
              <span>{{ findValue(field) }}</span>
              <span class="icon-button-group">
                <a v-for="(item,index) in editRole" :key="index" href="javascript:;">
                  <i v-if="item==='edit'" class="el-icon-edit" @click="changeEdit(field.modelKey)" />
                  <i v-if="item==='view'" class="el-icon-view" @click="seeingView(field.modelKey)" />
                </a>
              </span>
            </div>
          </div>

          <div v-if="isShow" class="a-PopOver a-QuickEdit-popover a-PopOver-in">
            <div class="content">
              <slot>
                <component :is="componentName" v-model="model[field.modelKey]" v-bind="fieldValue.props" v-on="fieldValue.events" />
              </slot>
            </div>
            <div class="footer">
              <el-button size="mini" @click="cacel">取消</el-button>
              <el-button size="mini" @click="save">保存</el-button>
            </div>
          </div>
          <span slot="error" slot-scope="{error}" class="fd-form-field-error">
            {{ error }}
          </span>
        </el-form-item>
      </div>
    </template>
  </div>
</template>

<script>
import components from './components'
import rules from './fields/validate.js'
import { prepend } from './fields/index.js'
export default {
  components,
  inheritAttrs: false,
  props: {
    field: {
      type: Object,
      default() {
        /* istanbul ignore next */
        return {}
      }
    },
    editText: {
      type: String,
      default: ''
    }
  },
  data() {
    const edit = this.$attrs.edit
    const models = edit ? this.$attrs.model : JSON.parse(JSON.stringify(this.$attrs.model))
    return {
      model: models,
      allEdit: edit,
      parentOption: this.$attrs.options
    }
  },
  computed: {
    editRole() {
      return this.parentOption.editButtonRole
    },
    isShow() {
      return this.editText === this.field.modelKey
    },
    fieldValue() {
      const field = this.field
      const { type } = field.template
      const { isRequired } = field

      const PHONE = { required: true, message: '请输入手机号码', trigger: 'blur' }
      const EMAIL = { required: true, message: '请输入邮箱地址', trigger: 'blur' }
      const OFFICE_TEL = { required: true, message: '请输入座机号码', trigger: 'blur' }

      const CHECK_BOX = { required: true, message: '请勾选对应项目', trigger: 'change' }
      const RADIO_BOX = { required: true, message: '请勾选对应项目', trigger: 'change' }
      const MONEY_INPUT = { required: true, message: '请输入金额', trigger: 'blur' }
      const NUMBER = { required: true, message: '请输入数值', trigger: 'blur' }

      if (type === 'tel') {
        field.rules = rules.phone
        if (isRequired) {
          field.rules = prepend(rules.phone, PHONE)
        }
      }
      if (type === 'email') {
        field.rules = rules.email
        if (isRequired) {
          field.rules = prepend(rules.email, EMAIL)
        }
      }
      if (type === 'landLine') {
        field.rules = rules.landLine
        if (isRequired) {
          field.rules = prepend(rules.landLine, OFFICE_TEL)
        }
      }
      if (type === 'checkbox') {
        if (isRequired) { // 因为是复选框，所以这里只有是Required
          field.rules = [CHECK_BOX]
        }
      }
      if (type === 'radiobox') {
        if (isRequired) { // 因为是复选框，所以这里只有是Required
          field.rules = [RADIO_BOX]
        }
      }
      // 验证金额的范围和小数点
      const moneyInputRange = (rule, value, callback) => {
        if (isNaN(value)) {
          callback(new Error(`金额需要是数字型`))
        }
        const max = field.props.max
        const min = field.props.min
        if (value < min || value > max) {
          callback(new Error(`金额需要在${min}到${max}之间`))
        } else {
          callback()
        }
      }
      if (type === 'moneyInput') {
        const limit = [
          { validator: moneyInputRange, trigger: 'blur' }]
        if (isRequired) {
          limit.unshift(MONEY_INPUT)
        }
        field.rules = limit
      }
      // 验证数值的范围和小数点
      const numberRange = (rule, value, callback) => {
        if (isNaN(value)) {
          callback(new Error(`数值需要是数字型`))
        }
        const max = field.props.max
        const min = field.props.min
        if (value < min || value > max) {
          callback(new Error(`数值需要在${min}到${max}之间`))
        } else {
          callback()
        }
      }
      if (type === 'number') {
        const limit = [
          { validator: numberRange, trigger: 'blur' }]
        if (isRequired) {
          limit.unshift(NUMBER)
        }
        field.rules = limit
      }

      return field
    },
    hasRules() {
      return Object.keys(this.fieldValue.rules || {}).length > 0
    },
    isBtnField() {
      return this.fieldValue.type === 'button'
    },
    componentName() {
      const fieldValue = this.fieldValue
      const component = fieldValue.component
      if (component) {
        return component
      }
      const type = fieldValue.type
      const fdType = `fd-${type}`
      if (components[fdType]) {
        return fdType
      }
      return type
    },
    formItemClass() {
      const fieldValue = this.fieldValue
      return {
        'fd-form-item_textarea': fieldValue.type === 'textarea',
        'fd-form-item_upload': fieldValue.type === 'upload'
      }
    }
  },
  methods: {
    findValue(field) {
      let val = ''
      const TYPE = this.field.type
      const modelVal = this.model[field.modelKey]
      if (TYPE === 'input' || TYPE === 'textarea' || TYPE === 'time-picker') {
        val = modelVal
      }
      if (TYPE === 'select' || TYPE === 'radio-group') {
        // 判断是否有options属性
        if (Object.keys(field.props).join(',').indexOf('options') > -1) {
          const options = field.props.options
          options.forEach(item => {
            if (item.value === String(modelVal)) {
              val = item.label
            }
          })
        }
      }
      if (TYPE === 'checkbox-group') {
        const valArr = []
        if (Object.keys(field.props).join(',').indexOf('options') > -1) {
          const options = field.props.options
          options.forEach(item => {
            if (modelVal.length > 0) {
              modelVal.forEach(VAL => {
                if (item.value === String(VAL)) {
                  valArr.push(item.label)
                }
              })
            }
          })
          val = valArr.join(',')
        }
      }
      return val
    },
    changeEdit(val) {
      this._listeners(val)
    },
    seeingView(val) {
      this._listeners(val)
    },
    cacel() {
      const val = ''
      this._listeners(val, this.model)
    },
    save() {
      const modelValue = this.model[this.field.modelKey]
      const isEmpty = this._required(modelValue)
      const RULES = this.fieldValue.rules
      const TYPE = this.field.type
      // eslint-disable-next-line no-unused-vars
      let required = {}
      let limit = {}
      if (RULES.length > 0) {
        RULES.forEach(item => {
          if (item.required) {
            required = item
          }
          if (item.max) {
            limit = item
          }
        })
      }
      const noLimit = Object.keys(limit).length > 0
      if (!isEmpty) {
        if (TYPE === 'input' || TYPE === 'textarea') {
          layer.msg('请输入', { icon: 6 })
          return
        }
        if (TYPE === 'select' || TYPE === 'radio-group' || TYPE === 'checkbox-group' || TYPE === 'time-picker') {
          layer.msg('请选择', { icon: 6 })
          return
        }
      } else if (noLimit) {
        const len = limit.max
        const message = limit.message
        if (TYPE === 'input' || TYPE === 'textarea') {
          if (modelValue.length > len) {
            layer.msg(message, { icon: 6 })
            return
          }
        }
        const val = ''
        this._listeners(val, this.model)
      } else {
        const val = ''
        this._listeners(val, this.model)
      }
    },
    _listeners(val, model) {
      this.$listeners.changeEdit(val, model)
    },
    _required(val) {
      return val !== '' && val !== undefined && val !== null
    },
    changeHandler(item) {
      this.$listeners.change(item, this.fieldValue)
    }
  }
}
</script>
