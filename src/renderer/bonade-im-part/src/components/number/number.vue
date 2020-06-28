
<template>
  <div class="fd-input">
    <el-input
      v-show="status !== 3"
      v-model.trim="inputValue"
      :type="_type"
      :placeholder="placeholder"
      :readonly="status == 2"
      :disabled="disabled"
      :autosize="autosize"
      @focus="handleFocus"
      @blur="handleBlur"
      @input="changeHander"
    >
      <!-- category === 1表示是数值 而且 展示单位 -->
      <template v-if="$attrs.categary === 1 && $attrs.hasUnit" slot="append">{{ uniChinese }}</template>
      <!-- 如果 category === 2 表示百分百 -->
      <template v-else-if="$attrs.categary === 2 && !$attrs.hasUnit" slot="append">%</template>
      <!-- 如果其他就什么都不显示 -->

    </el-input>

  </div>
</template>

<script type="text/ecmascript-6">

const COMPONENT_NAME = 'fd-money-input'
const EVENT_INPUT = 'input'
const EVENT_BLUR = 'blur'
const EVENT_FOCUS = 'focus'

export default {
  name: COMPONENT_NAME,
  filters: {

  },
  props: {
    value: {
      type: [String, Number],
      default: 0
    },
    type: {
      type: String,
      default: 'text'
    },
    // eslint-disable-next-line vue/require-default-prop
    placeholder: {
      type: String,
      defalut: ''
    },
    readonly: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    autosize: {
      type: [Boolean, Object],
      default: false
    },
    dot: {
      type: Number,
      default: 2
    },
    status: {
      type: Number,
      default: 1
    }
  },
  data() {
    // 判断是否为数字
    if (isNaN(this.value)) {
      this.value = 0
    }
    return {
      inputValue: parseFloat(this.value).toFixed(this.dot),
      isFocus: false
    }
  },
  computed: {
    _type() {
      const type = this.type
      return type
    },
    uniChinese() {
      let unit = ''
      switch (this.$attrs.unit) { // 把单位变为中文
        case 1:
          unit = '张'
          break
        case 2:
          unit = '只'
          break
        case 3:
          unit = '双'
          break
        case 4:
          unit = '个'
          break
        default:
          unit = '其他'
          break
      }
      return unit
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
      if (isNaN(this.inputValue) || this.inputValue === '') {
        this.inputValue = 0
      }
      this.inputValue = parseFloat(this.inputValue).toFixed(this.dot)

      this.$emit(EVENT_BLUR, e)

      this.isFocus = false
    },
    changeHander(value) {

    }
  }
}
</script>
<style lang="scss" scoped>
.fd-input{
    position: relative;
    .chinese{
        position: absolute;
        right: 94px;
        bottom: -4px;
        background: #fff;
        line-height: 1.1;
        height:14px;
        max-width: 98%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .chinese.noAppend{
        right: 4px;
    }
}

</style>
