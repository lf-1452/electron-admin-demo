<template>
  <div class="fd-form" :class="formClass">
    <el-form
      :ref="refForm"
      :model="modelValue"
      :label-width="labelWidth"
      class="fd-ruleForm"
    >
      <slot>
        <fd-form-group
          v-for="(group, index) in groups"
          :key="group.key || index"
          :fields="group.fields"
          :model="modelValue"
          :value="value"
          :options="options"
          :edit-text="editText"
          :edit="edit"
          @changeEdit="triggerEdit"
          @change="changeValue"
        />
      </slot>
    </el-form>
    <div v-if="edit && isBtn" class="fd-form-button-group">
      <el-button size="mini" type="primary" @click="submitForm('form')">提交</el-button>
      <el-button size="mini" @click="resetForm('form')">取消</el-button>
    </div>
  </div>
</template>

<script>
import FdFormGroup from './form-group.vue'
const COMPONENT_NAME = 'fd-form-create'
const EVENT_SUBMIT = 'submit'
const EVENT_RESET = 'reset'
const EVENT_CHANGE = 'change'
const EVENT_INPUT = 'input'
const EVENT_CHANGE_VALUE = 'changeValue'
export default {
  name: COMPONENT_NAME,
  components: {
    FdFormGroup
  },
  props: {
    model: {
      type: Object,
      default() {
        /* istanbul ignore next */
        return {}
      }
    },
    schema: {
      type: Object,
      default() {
        /* istanbul ignore next */
        return {}
      }
    },
    labelWidth: {
      type: String,
      default: '154px'
    },
    direction: { // horizontal-vertical
      type: String,
      default: 'vertical'
    },
    value: {
      type: String,
      default: ''
    },
    options: {
      type: Object,
      default() {
        return {}
      }
    },
    edit: {
      type: Boolean,
      default: true
    },
    isBtn: {
      type: Boolean,
      default: true
    },
    refForm: {
      type: String,
      default: 'form'
    }
  },
  data() {
    return {
      editText: this.value,
      modelValue: this.model
    }
  },
  computed: {
    groups() {
      const schema = this.schema
      const groups = schema.groups || []
      if (schema.fields) {
        groups.unshift({
          fields: schema.fields
        })
      }
      return groups
    },
    formClass() {
      const direction = this.direction
      const edit = this.edit
      return {
        'fd-form_standard': true,
        'fd-form_edit': !edit,
        'fd-form_horizontal': direction === 'horizontal',
        'fd-form_vertical': direction === 'vertical'
      }
    }
  },
  watch: {
    value(val) {
      this.editText = val
    },
    model: {
      handler(newValue, oldValue) {
        this.modelValue = newValue
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit(EVENT_SUBMIT)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.$emit(EVENT_RESET)
    },
    triggerEdit(val, model) {
      this.$emit(EVENT_INPUT, val)
      this.$emit(EVENT_CHANGE, model, val)
    },
    changeValue(item, fieldValue) {
      this.$emit(EVENT_CHANGE_VALUE, item, fieldValue)
    }
  }
}
</script>

<style lang="scss">
.fd-form_standard{
  background-color: #fff;
  position: relative;
  .fd-form-button-group{
    position: absolute;
    right: 0;
    bottom: -49px;
  }
  .fd-form-group{
    .fd-form-group-content{
      .fd-form-item{
        display: flex;
        align-items: center;
        .fd-form-item-row{
          width: 100%;
          height: 100%;
          .el-form-item{
            margin-bottom:0px;
            height: 100%;
          }
          .el-form-item__content{
            position: relative;
            height: 100%;
            .fd-form-field{
              padding: 7px 9px 0 16px;
            }
            .fd-form-field-error{
              position: absolute;
              right: 75px;
              top: 2px;
              height: 10px;
              line-height: 10px;
              background-color: #fff;
              color: #b40005;
              padding: 0 5px;
              font-size: 12px;
            }
          }
          .el-form-item__label {
            height: 52px;
            line-height: 52px;
            padding: 0;
            padding-right: 15px;
            color: rgb(102, 102, 102);
            font-size: 14px;
            font-family: '微软雅黑';
            font-weight: normal;
          }
          .el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before, .el-form-item.is-required:not(.is-no-asterisk) .el-form-item__label-wrap>.el-form-item__label:before {
            content: '';
            color: #ff4949;
            margin-right: 4px;
          }
          .el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:after, .el-form-item.is-required:not(.is-no-asterisk) .el-form-item__label-wrap>.el-form-item__label:after {
            content: '*';
            color: #ff4949;
            margin-left: 4px;
          }
        }
      }
      .fd-form-item_textarea,.fd-form-item_upload{
        .el-form-item__label {
          min-height: 52px !important;
          height: 100% !important;
          line-height: inherit!important;
          display: flex;
          justify-content: flex-end;
          align-items: center;
        }
        .fd-form-field {
          padding: 7px 9px 7px 16px!important;
          word-break: break-all;
          white-space: pre-line;
        }
      }

    }
  }
}

.fd-form_vertical{
  border: 1px solid #d8d8d8;
  .fd-form-group{
    &+.fd-form-group{
       border-top: 1px solid #d8d8d8;
    }
    .fd-form-group-content{
      display: flex;
      .fd-form-item{
        flex: 1;
        &:nth-child(2){
          .el-form-item__label {
            border-right: 1px solid #d8d8d8;
            border-left: 1px solid #d8d8d8;
          }
        }
        .el-form-item__label {
          border-right: 1px solid #d8d8d8;
          background-color: #f8f8f9;
        }
      }
    }
  }
}

.fd-form_edit{
  .fd-form-group{
    .fd-form-group-content{
      .fd-form-item{
        .fd-form-item-row{
          .fd-form-field-error{
            z-index:9999;
          }
          .fd-form-item-field-edit{
            height: 100%;
            display: flex;
            align-items: center;
            padding: 0 14px;
            color:rgb(102, 102, 102);
            font-size:14px;
            font-weight:400;
          }
        }
      }
    }
  }
}
.fd-form-item-field-edit-value{
  min-width: 60px;
  min-height: 36px;
  &:hover {
    .icon-button-group{
      display: inline-block;
    }
  }
  .icon-button-group{
    display: none;
    i{
      cursor: pointer;
      color:rgb(180, 0, 5);
    }
  }
}
.a-QuickEdit-popover {
  min-width: 20rem;
  width: 100%;
}
.a-PopOver {
  position: absolute;
  background: #fff;
  top: 0;
  left: 0;
  z-index: 1400;
  padding: 0;
  margin: 0;
  font-weight: 400;
  letter-spacing: normal;
  line-height: 1.5;
  text-align: left;
  text-align: start;
  text-decoration: none;
  text-shadow: none;
  text-transform: none;
  white-space: normal;
  word-break: normal;
  word-spacing: normal;
  word-wrap: normal;
  font-size: .875rem;
  box-shadow: 0 0.5rem 1rem rgba(28,43,54,.15);
  border-radius: .142rem;
  box-sizing: border-box;
  .content{
    padding: 20px 10px;
  }
  .footer{
    padding: 10px;
    border-top: 1px solid #e9e9e9;
    display: flex;
    justify-content: flex-end;
  }
}
</style>

