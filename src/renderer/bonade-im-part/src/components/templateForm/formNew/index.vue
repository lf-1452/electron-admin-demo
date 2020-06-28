<template>
  <div class="fd-template-form">
    <div v-for="(item,index) in renderData" :key="item.moduleField.id" class="template-form-section">
      <Title v-if="item.schema.groups.length>0" :value-title="item.moduleField.groupName" c-height="20" />
      <div v-if="item.schema.groups.length" class="form-create-section">
        <fd-form-create
          ref="formCreate"
          :model="modelDatas[index]"
          :schema="item.schema"
          :is-btn="false"
          :ref-form="'form'+item.moduleField.id"
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
import { getUrlKey } from '@/common/utils/common.js'
const COMPONENT_NAME = 'FdTemplateFormAdd'
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
      renderData: [],
      isProcess: false
    }
  },
  async created() {
    let TYPE = ''
    TYPE = getUrlKey('type')
    TYPE = this.$route.params.type
    console.log('TYPE:', TYPE)
    if (TYPE === '2') this.isProcess = true

    const data = modelData.dataContent
    const renderResult = []
    const modelDatas = []
    for (let i = 0; i < data.length; i++) {
      const result = reduceFormData(transformData(data[i].children, 'ADD'))
      modelDatas.push(await this._getModelData(data[i].moduleField.id))
      result.moduleField = data[i].moduleField
      renderResult.push(result)
    }
    this.modelDatas = modelDatas
    this.renderData = renderResult
  },
  methods: {
    _getModelData(id) {
      const URL = `http://58.211.245.60:9080/eipserver/sysFormAction/module.do?formGroupId=${id}&primaryId=`
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
    _saveModelDataProcess(params) {
      const URL = `http://58.211.245.60:9080/eipserver/sysFormGroupAction/groupSubmit.do`
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
      const dataContent = modelData.dataContent
      let params = null
      const paramsData = paramsFormData(dataContent, data)

      // this.renderData.forEach((item, index) => {
      //   const id = item.moduleField.id
      //   const len = item.schema.groups.length
      //   if (len > 0) {
      //     this.$refs.formCreate.forEach((items, index) => {
      //       const form = `form${id}`
      //       if (items.$refs[form]) {
      //         items.$refs[form].validate((valid) => {
      //           if (valid) {
      //             this._saveModelData(params)
      //           } else {
      //             console.log('error submit!!')
      //             return false
      //           }
      //         })
      //       }
      //     })
      //   }
      // })

      params = paramsData

      if (this.isProcess) {
        params = {
          formData: paramsData,
          processDefId: 'DynamicForm'
        }
        // params = {
        //   'formData': '[{"formgroupId":1,"moduleData":[{"field1":{"text":"22"},"field2":{"text":"44"},"field7":{"text":""}}]}]',
        //   'processDefId': 'DynamicForm'
        // }

        // const paramsStr = JSON.stringify(params)
        // params = paramsStr
        // params = {
        //   formData: '1',
        //   'processDefId': 'DynamicForm'
        // }
      }
      let flag = false
      this.$refs.formCreate.forEach((item, index) => {
        item.$refs[item.refForm].validate((valid) => {
          if (valid) {
            flag = true
          } else {
            console.log('error submit!!')
            return false
          }
        })
      })

      if (flag) {
        if (this.isProcess) {
          this._saveModelDataProcess(params)
        } else {
          this._saveModelData(params)
        }
      }
    },
    resetForm() {
      this.$refs.formCreate.forEach((item, index) => {
        item.$refs[item.refForm].resetFields()
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
