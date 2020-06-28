<template>
  <div class="fd-select">
    <el-select
      v-model="svalue"
      :disabled="disabled"
      :clearable="clearable"
      :placeholder="_placeholder"
      @change="selectChangeHandler"
    >
      <el-option
        v-for="item in _options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </div>
</template>

<script>
const COMPONENT_NAME = 'fd-select'
const EVENT_CHANGE = 'change'
const EVENT_INPUT = 'input' // only used for v-model

export default {
  name: COMPONENT_NAME,
  props: {
    options: {
      type: Array,
      default() {
        /* istanbul ignore next */
        return []
      }
    },
    // eslint-disable-next-line vue/require-default-prop
    value: null, // 接受外部v-model传入的值
    placeholder: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    // eslint-disable-next-line vue/require-default-prop
    fileType: { // 定义请求回来的json数据格式
      type: Object
    }
  },
  data() {
    return {
      svalue: this.value
    }
  },
  computed: {
    _options() {
      const options = this._dataTransform(this.options)
      return options
    },
    _placeholder() {
      return this.placeholder || '请选择'
    }
  },
  watch: {
    svalue(val, oldVal) {
      if (val !== oldVal) {
        this.$emit(EVENT_INPUT, this.svalue)
      }
    },
    value(newV) {
      this.svalue = newV
    }
  },
  methods: {
    // 转换下拉框下的字段
    _dataTransform(data) {
      const _data = []
      const _fileType = this.fileType
      for (let i = 0; i < data.length; i++) {
        _data[i] = {}
        _data[i].label = data[i][_fileType.label]
        _data[i].value = data[i][_fileType.value]
      }
      return _data
    },
    _findIndex(arr, value) {
      let index = -1
      arr.forEach((item, i) => {
        if (value && item.value === value) index = i
      })
      return index
    },
    selectChangeHandler(val) {
      const arr = this._options
      const index = this._findIndex(arr, val)
      this.$emit(EVENT_CHANGE, arr[index])
    }
  }
}
</script>

<style lang="scss">
.fd-select{
  .el-select{
    width: 100%;
  }
}
</style>
