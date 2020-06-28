<template>
  <div class="fd-template-form">
    <div v-for="(item,index) in renderData" :key="index" class="template-form-section">
      <Title :value-title="item.moduleField.groupName" c-height="20" />
      <div class="form-create-section">
        <fd-form-create
          ref="formCreate"
          :model="modelDatas[index]"
          :schema="item.schema"
          :is-btn="false"
          :ref-form="'form'+index"
        />
      </div>
    </div>
    <div class="fd-form-button-group">
      <el-button size="mini" @click="submitForm">提交</el-button>
      <el-button size="mini" @click="resetForm">取消</el-button>
    </div>
  </div>
</template>

<script>
import { modelData } from '../mock/modelData.js'
import { transformData, reduceFormData, paramsFormData } from '../utils'
const COMPONENT_NAME = 'FdTemplateFormEdit'
import axios from 'axios'
export default {
  name: COMPONENT_NAME,
  components: {
    // eslint-disable-next-line vue/no-unused-components
    Title: () => import('@/components/Title/title'),
    fdFormCreate: () => import('@/components/form/form')
  },
  data() {
    return {
      modelDatas: [],
      renderData: []
    }
  },
  async created() {
    const data = modelData.dataContent
    const renderResult = []
    const modelDatas = []
    for (let i = 0; i < data.length; i++) {
      const result = reduceFormData(transformData(data[i].children), 'EDIT')
      modelDatas.push(await this._getModelData(data[i].moduleField.id))
      result.moduleField = data[i].moduleField
      renderResult.push(result)
    }
    this.modelDatas = modelDatas
    this.renderData = renderResult
  },
  methods: {
    _getModelData(id) {
      const URL = `http://58.211.245.60:9080/eipserver/sysFormAction/module.do?formGroupId=${id}&primaryId=7`
      return new Promise((resolve, reject) => {
        axios({
          url: URL,
          method: 'get'
        }).then(response => {
          resolve(response.data.dataContent)
        })
      })
    },
    _saveModelData(params) {
      const URL = `http://58.211.245.60:9080/eipserver/sysFormGroupAction/groupSave.do`
      return new Promise((resolve, reject) => {
        axios
          .post(URL, params)
          .then((response) => {
            console.log('response:', response)
          })
          .catch((error) => {
            console.log(error)
          })
      })
    },
    submitForm() {
      const data = this.modelDatas
      const params = paramsFormData(modelData.dataContent, data)
      this.$refs.formCreate.forEach((item, index) => {
        const form = `form${index}`
        item.$refs[form].validate((valid) => {
          if (valid) {
            this._saveModelData(params)
          } else {
            console.log('error submit!!')
            return false
          }
        })
      })
    },
    resetForm() {
      this.$refs.formCreate.forEach((item, index) => {
        const form = `form${index}`
        item.$refs[form].resetFields()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.fd-template-form{
  .form-create-section{
    padding: 20px;
    background-color: #fff;
  }
  .fd-form-button-group{
    display: flex;
    justify-content: flex-end;
    padding: 20px 0;
  }
}
</style>
