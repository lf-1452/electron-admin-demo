<template>
  <div class="fd-input-number">
    <p class="tip">小数点位数</p>
    <el-input-number v-model="num" :min="1" :max="10" @change="handleChange" />
  </div>

</template>
<script>
const EVENT_INPUT = 'input'
export default {
  props: {
    value: {
      type: Number,
      default: 2
    }
  },
  data() {
    return {
      num: this.value
    }
  },
  methods: {
    handleChange(value) {
      this.$emit(EVENT_INPUT, value)
    }
  }
}
</script>

<style lang="scss">
.fd-input-number{
  .tip{
    color: #525975;
    font-weight: 700;
    font-size: 13px;
    line-height: 1;
    padding-bottom: 14px;
  }
  .el-input-number{
    width: 100%;
  }
}
</style>
