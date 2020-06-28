<template>
  <div class="fd-select">
    <el-select
      v-model="svalue"
      :disabled="disabled"
      :clearable="clearable"
      :placeholder="_placeholder"
      :filterable="filterable"
      @change="selectChangeHandler"
    >
      <el-option
        v-for="item in dataSources"
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
const EVENT_INPUT = 'input'
import axios from 'axios'
export default {
  name: COMPONENT_NAME,
  props: {
    options: {
      type: Array,
      default() {
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
      type: Object,
      default: () => {
        return {
          label: 'label',
          value: 'value'
        }
      }
    },
    contextPath: {
      type: String,
      default: 'ei-web'
    },
    parentId: {
      type: String,
      default: ''
    },
    dataSourcesType: { // 0: options 1: code 2: custom
      type: String,
      default: '0'
    },
    customPath: {
      type: String,
      default: 'ei-web'
    },
    filterable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      svalue: this.value,
      dataSources: []

    }
  },
  computed: {
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
    value(newValue) {
      this.svalue = newValue
    },
    options(arr) {

    }
  },
  created() {
    this._getDataSources()
  },
  methods: {
    async _getDataSources() {
      const dataSourcesType = this.dataSourcesType
      switch (dataSourcesType) {
        case '1':
          this.dataSources = await this._getCodeData()
          break
        case '2':
          '代码块2'
          break
        default:
          this.dataSources = this._dataTransform(this.options)
      }
    },
    _getCodeData() {
      const URL = `/${this.contextPath}/commonTCode/getCodeByParentId?parentId=${this.parentId}`
      return new Promise((resolve, reject) => {
        axios({
          url: URL,
          method: 'get'
        }).then(response => {
          resolve(response.data.data.options)
        })
      })
    },
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
        // eslint-disable-next-line eqeqeq
        if (value && item.value == value) {
          index = i
        }
      })
      console.log('index:', index)
      return index
    },
    selectChangeHandler(val) {
      const arr = this.dataSources
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
