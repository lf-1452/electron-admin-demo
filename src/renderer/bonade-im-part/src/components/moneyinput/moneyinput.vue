
<template>
  <div class="fd-input">
    <el-input
      v-model.trim="inputValue"
      :type="_type"
      :placeholder="placeholder"
      :readonly="readonly"
      :disabled="disabled"
      :autosize="autosize"
      @focus="handleFocus"
      @blur="handleBlur"
      @input="changeHander"
    >
      <template v-if="showCategary" slot="append">{{ categoryChinese }}</template>
    </el-input>
    <span v-if="showChinese" class="chinese" :class="{'noAppend':!showCategary}">{{ inputValue | convertCurrency }}</span>
  </div>
</template>

<script type="text/ecmascript-6">
/* eslint-disable */
// import inputMixin from '@/common/mixins/input'
import convertCurrency from './convertCurrency'
const COMPONENT_NAME = 'fd-money-input'
const EVENT_INPUT = 'input'
const EVENT_BLUR = 'blur'
const EVENT_FOCUS = 'focus'

export default {
  name: COMPONENT_NAME,
  props: {
    value: [String, Number],
    type: {
      type: String,
      default: 'text'
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
    autosize: {
      type: [Boolean, Object],
      default: false
    },
    rows:String,
    showCategary:{
        type:Boolean,
        default:false
    },
    showChinese:{
        type:Boolean,
        default:false
    },
    dot:{
         type:Number,
        default:2
    }
  },
  data() {
      //判断是否为数字
      if(isNaN(this.value)){
          this.value = 0;
      }
    return {
      inputValue: parseFloat( this.value).toFixed(this.dot),
      isFocus: false
    }
  },
  computed: {
    _type() {
      const type = this.type
      return type
    },
    categoryChinese(){
        switch (this.$attrs.categary) {
            case 0:
                return '不显示'
                break;
            case 1:
                return '人民币'
                break;
            case 2:
                return '美元'
                break;
            case 3:
                return '日元'
                break;
            case 4:
                return '英镑'
                break;
            default:
                break;
        }
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
        if(isNaN(this.inputValue) || this.inputValue === ''){
          this.inputValue = 0;
      }
      this.inputValue = parseFloat( this.inputValue).toFixed(this.dot)

      this.$emit(EVENT_BLUR, e)

      this.isFocus = false
    },
    changeHander(value){


    }
  },
  filters:{
      convertCurrency(val){
          return convertCurrency(val)
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
