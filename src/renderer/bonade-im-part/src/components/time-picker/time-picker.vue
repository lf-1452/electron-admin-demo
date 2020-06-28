<template>
  <div class="fd-date-picker">
    <el-date-picker
      v-model="valueTime"
      :type="_type"
      :placeholder="_placeholder"
      :value-format="valueFormat"
    />
  </div>

</template>

<script>
const COMPONENT_NAME = 'fd-time-picker'
const EVENT_INPUT = 'input'
export default {
  name: COMPONENT_NAME,
  props: {
    type: {
      type: String,
      default: 'date'
    },
    placeholder: {
      type: String,
      default: ''
    },
    valueFormat: {
      type: String,
      default: 'yyyy-MM-dd'
    },
    // eslint-disable-next-line vue/require-default-prop
    value: [String, Object]
  },
  data() {
    return {
      valueTime: this.value
    }
  },
  computed: {
    _type() {
      return this.type
    },
    _placeholder() {
      return this.placeholder || '请选择时间'
    }
  },
  watch: {
    value(newValue) {
      this.valueTime = newValue
    },
    valueTime(newValue) {
      this.$emit(EVENT_INPUT, newValue)
    }
  }
}
</script>

<style lang="scss">
.fd-date-picker{
  .el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 100%;
  }
}
</style>
