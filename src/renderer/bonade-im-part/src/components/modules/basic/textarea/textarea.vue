
<template>
  <div class="fd-input">
    <el-input
      v-model="inputValue"
      :type="_type"
      :placeholder="placeholder"
      :maxlength="maxlength"
      :readonly="readonly"
      :disabled="disabled"
      :autosize="autosize"
      @focus="handleFocus"
      @blur="handleBlur"
      @input="changeHander"
    />
  </div>
</template>

<script type="text/ecmascript-6">
/* eslint-disable */
import inputMixin from '@/common/mixins/input'
const COMPONENT_NAME = 'fd-textarea'
const EVENT_INPUT = 'input'
const EVENT_BLUR = 'blur'
const EVENT_FOCUS = 'focus'

export default {
  name: COMPONENT_NAME,
  mixins: [inputMixin],
  props: {
    value: [String, Number],
    type: {
      type: String,
      default: 'textarea'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: String,
    readonly: {
      type: Boolean,
      default: false
    },
    maxlength: Number,
    autosize: {
      type: [Boolean, Object],
      default: false
    },
    rows:String
  },
  data() {
    return {
      inputValue: this.value,
      isFocus: false,
    }
  },
  computed: {
    _type() {
      const type = this.type
      return type
    }
  },
  watch: {
    value(newValue) {
      this.inputValue = newValue
    },
    inputValue(newValue) {
      this.$emit(EVENT_INPUT, newValue)
    }
  },
  mounted() {

  },
  methods: {
    handleFocus(e) {
      this.$emit(EVENT_FOCUS, e)
      this.isFocus = true
    },
    handleBlur(e) {
      this.$emit(EVENT_BLUR, e)
      this.isFocus = false
    }
  }
}
</script>
