<template>
  <div
    ref="group"
    class="fd-radio-group"
  >
    <slot>
      <el-radio-group v-model="radioValue" :disabled="disabled" @change="changeHandler">
        <el-radio
          v-for="(option, index) in optionsList"
          :key="index"
          :label="option.value"
        >{{ option.label }}</el-radio>
      </el-radio-group>
    </slot>
  </div>
</template>
<script type="text/ecmascript-6">
import axios from 'axios'
const COMPONENT_NAME = 'fd-radio-group'
const EVENT_INPUT = 'input'
const EVENT_CHANGE = 'change'

export default {
  name: COMPONENT_NAME,
  provide() {
    return {
      radioGroup: this
    }
  },
  props: {
    // eslint-disable-next-line vue/require-default-prop
    value: [String, Number],
    options: {
      type: Array,
      default() {
        return []
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    position: {
      type: String,
      default: 'left'
    },
    horizontal: {
      type: Boolean,
      default: false
    },
    hollowStyle: {
      type: Boolean,
      default: false
    },
    parentId: {
      type: String,
      default: ''
    },
    dataSourcesType: { // 0: options 1: code 2: custom
      type: String,
      default: '0'
    },
    contextPath: {
      type: String,
      default: 'ei-web'
    }
  },
  data() {
    return {
      radioValue: this.value,
      optionsList: this.options
    }
  },
  watch: {
    value(newV) {
      this.radioValue = newV
    },
    radioValue(newV) {
      this.$emit(EVENT_INPUT, newV)
    }
  },
  created() {
    this._getDataSources()
  },
  methods: {
    _findIndex(arr, value) {
      let index = -1
      arr.forEach((item, i) => {
        // eslint-disable-next-line eqeqeq
        if (value && item.value == value) {
          index = i
        }
      })
      return index
    },
    changeHandler(val) {
      const arr = this.optionsList
      const index = this._findIndex(arr, val)
      this.$emit(EVENT_CHANGE, arr[index])
    },
    async _getDataSources() {
      const dataSourcesType = this.dataSourcesType
      const _this = this
      switch (dataSourcesType) {
        case '0':
          // 默认使用options中的数据
          break
        case '1':
          _this._getCodeData()
          break
        case '2':

          break
      }
    },
    _getCodeData() {
      const _this = this
      _this.optionsList = []
      const URL = `/${this.contextPath}/commonTCode/getCodeByParentId?parentId=${this.parentId}`
      return new Promise((resolve, reject) => {
        axios({
          url: URL,
          method: 'get'
        }).then(response => {
          _this.optionsList = response.data.data.options
        })
      })
    }
  }
}
</script>
