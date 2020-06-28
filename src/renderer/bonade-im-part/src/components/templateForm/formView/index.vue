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
          :edit="false"
          :ref-form="'form'+index"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { modelData } from '../mock/modelData.js'
import { transformData, reduceFormData } from '../utils'
const COMPONENT_NAME = 'FdTemplateFormView'
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
      const result = reduceFormData(transformData(data[i].children, 'VIEW'))
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
