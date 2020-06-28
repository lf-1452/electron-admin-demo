<template>
  <div ref="group" class="fd-checkbox-group">
    <slot>
      <el-checkbox-group v-model="checkList" @change="changeHandler">
        <el-checkbox
          v-for="(option) in optionsList"
          :key="option.value+option.label"
          :label="option.value"
        >
          {{ option.label }}
        </el-checkbox>
      </el-checkbox-group>
    </slot>
  </div>
</template>
<script type="text/ecmascript-6">
import axios from 'axios'

const COMPONENT_NAME = 'fd-checkbox-group'
const EVENT_INPUT = 'input'
const EVENT_CHANGE = 'change'
export default {
  name: COMPONENT_NAME,
  props: {
    value: {
      type: Array,
      default() {
        return []
      }
    },
    position: {
      type: String,
      default: 'left'
    },
    hollowStyle: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array,
      default() {
        return []
      }
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
      checkList: this.value,
      optionsList: this.options
    }
  },
  watch: {
    value(val) {
      this.checkList = this.value
    }
  },
  created() {
    this._getDataSources()
  },
  methods: {
    changeHandler(val) {
      this.checkList = JSON.parse(JSON.stringify(val))
      this.$emit(EVENT_INPUT, val)
      this.$emit(EVENT_CHANGE, val)
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
