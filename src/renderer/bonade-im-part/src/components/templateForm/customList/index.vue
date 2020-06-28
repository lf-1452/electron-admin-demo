<template>
  <div v-if="renderFormData" class="fd-from-template-contanier">
    <div v-for="(item,index) in renderFormData.data" :key="index" class="template-inner">
      <div v-if="item.formGroup.groupType==='1'" class="fd-from-template">
        <Title :value-title="item.formGroup.groupName" c-height="20" />
        {{ item.groupMoudle[0] }}
        <fd-form-create
          ref="formCreate"
          :model="item.groupMoudle[0]"
          :schema="renderFormData['module'+item.formGroup.id].schema"
          :is-btn="false"
          :ref-form="'form'+item.formGroup.id"
        />
      </div>
      <div v-if="item.formProperties.length && item.formGroup.groupType==='2'" class="fd-table-template">
        <Title :value-title="item.formGroup.groupName" c-height="20" />
        <fd-table-create
          :module-field="item"
          :columns="item.formProperties"
          :data-source="item.groupMoudle"
          :operate-auth="item.formGroup.operateAuth"
          @add="add_change(item,renderFormData['module'+item.formGroup.id].schema)"
          @edit="edit_change"
          @delete="delete_change"
        />
      </div>
    </div>
    <div class="button-row">
      <el-button size="mini" @click="allSubmitForm">提交</el-button>
      <el-button size="mini" @click="allResetForm">取消</el-button>
    </div>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="80%"
    >
      <fd-form-create
        v-if="dialogVisible"
        ref="formCreateDialog"
        :model="model"
        :schema="schema"
        :direction="direction"
        :is-btn="false"
      />
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="submitForm">提交</el-button>
        <el-button size="mini" @click="resetForm">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Title from '@/components/Title/title'
import fdTableCreate from '@/components/table/index'
import fdFormCreate from '@/components/form/form'
import { getCommonFormData, getModelTable } from '../utils'
import { getUrlKey } from '@/common/utils/common.js'
import axios from 'axios'
const id = 100
export default {
  components: {
    fdTableCreate,
    fdFormCreate,
    Title
  },
  data() {
    return {
      id,
      dialogTitle: '',
      dialogVisible: false,
      dialogType: 'add',
      dialogItem: null,
      formCode: 'assetForm',
      dealmark: 'add',
      bizkey: '',
      type: 'add',
      dialog: '2', // 1:弹出 2:页面
      commonPath: 'http://58.211.245.60:9080/eipserver',
      dataContent: null,
      renderFormData: null,
      moduleDataList: [],
      model: null,
      schema: null,
      direction: 'horizontal'
    }
  },
  async created() {
    this.dealmark = getUrlKey('dealmark')
    this.bizkey = getUrlKey('bizkey')
    this.dialog = getUrlKey('dialog')

    const { dataContent } = await this._getRenderFormData()
    this.dataContent = JSON.parse(JSON.stringify(dataContent))
    this.renderFormData = getCommonFormData(dataContent.formGroupList, this.dealmark)
    console.log('renderFormData', this.renderFormData)
    this.moduleDataList = JSON.parse(JSON.stringify(this.renderFormData.moduleDataList))
  },
  methods: {
    _getRenderFormData() {
      const formCode = this.formCode
      const dealmark = this.dealmark
      const bizkey = this.bizkey
      const URL = `${this.commonPath}/dynamicFormAction/renderForm.do?formCode=${formCode}&dealmark=${dealmark}&bizkey=${bizkey}`
      return new Promise((resolve, reject) => {
        axios({
          url: URL,
          method: 'get'
        }).then(response => {
          resolve(response.data)
        })
      })
    },
    add_change(item, schema) {
      this.id++
      this.direction = item.formGroup.propertyType === '1' ? 'horizontal' : ''
      this.schema = schema
      this.model = getModelTable(item, this.dataContent.formGroupList)
      this.dialogType = 'add'
      this.dialogVisible = true
      this.dialogItem = item
      this.model.id = this.id
    },
    edit_change(row, item) {
      this.dialogType = 'update'
      this.direction = item.formGroup.propertyType === '1' ? 'horizontal' : ''
      const id = item.formGroup.id
      this.model = JSON.parse(JSON.stringify(row))
      this.dialogItem = item
      this.$nextTick(() => {
        this.schema = this.renderFormData['module' + id].schema
        this.dialogVisible = true
      })
    },
    delete_change(row, item) {
      this.dialogType = 'del'
      this.direction = item.formGroup.propertyType === '1' ? 'horizontal' : ''
      const id = item.formGroup.id
      this.model = row
      this.dialogItem = item
      const idx = this.findIndex()

      this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let sindex = ''
        this.model.dealmark = 'del'
        this.moduleDataList.forEach((items, index) => {
          if (items.formGroupId === id) {
            items.moduleData.forEach((a, i) => {
              if (a.id === row.id) {
                a.dealmark = 'del'
                sindex = i
              }
            })
          }
        })
        this.$set(this.renderFormData.moduleDataList[idx].moduleData, sindex, this.model)
      }).catch(() => {})
    },
    _saveModelData(params) {
      const URL = `${this.commonPath}/dynamicFormAction/save.do`
      return new Promise((resolve, reject) => {
        axios
          .post(URL, params)
          .then((response) => {
            resolve(response.data)
          })
      })
    },
    findIndex() {
      let i = 0
      this.moduleDataList.forEach((item, index) => {
        if (Number(item.formGroupId) === this.dialogItem.formGroup.id) {
          i = index
        }
      })
      return i
    },
    async submitForm() {
      const idx = this.findIndex()
      // "dealmark": "add/update/del"
      const Type = this.dialogType
      this.model.dealmark = Type
      if (Type === 'add') {
        this.moduleDataList[idx].moduleData.push(this.model)
      }
      if (Type === 'update') {
        this.moduleDataList[idx].moduleData.forEach((item, index) => {
          if (item.id === this.model.id) {
            item = this.model
          }
        })
      }
      const refForm = this.$refs.formCreateDialog.refForm
      this.$refs.formCreateDialog.$refs[refForm].validate(async(valid) => {
        if (valid) {
          if (Type === 'add') {
            this.renderFormData.moduleDataList[idx].moduleData.push(this.model)
          }

          if (Type === 'update') {
            let i = ''
            this.renderFormData.moduleDataList[idx].moduleData.forEach((item, index) => {
              if (item.id === this.model.id) {
                i = index
              }
            })
            this.$set(this.renderFormData.moduleDataList[idx].moduleData, i, this.model)
          }
          this.dialogVisible = false
        } else {
          return false
        }
      })
    },
    resetForm() {
      this.dialogVisible = false
    },
    allSubmitForm() {
      const dealmark = this.dealmark
      const bizkey = this.bizkey || ''
      let flag = false
      this.$refs.formCreate.forEach((item, index) => {
        item.$refs[item.refForm].validate((valid) => {
          if (valid) {
            flag = true
          } else {
            return false
          }
        })
      })
      if (flag) {
        const moduleDataList = this.moduleDataList

        const obj = {
          dealmark: dealmark
        }
        moduleDataList.forEach((item, index) => {
          if (item.groupType === '1') {
            item.moduleData = this.renderFormData.moduleDataList[index].moduleData
            item.moduleData[0] = Object.assign(obj, item.moduleData[0])
            this.$delete(item, 'id')
          }
          if (item.groupType === '2') {
            item.moduleData = this.renderFormData.moduleDataList[index].moduleData
            item.moduleData.forEach((sitem, sindex) => {
              if (!sitem.dealmark) {
                sitem.dealmark = dealmark
              }
              this.$delete(sitem, 'id')
            })
          }
          this.$delete(item, 'groupType')
        })
        const params = {
          groupArry: moduleDataList,
          dealmark: dealmark,
          bizkey: bizkey
        }

        this._saveModelData(params)
        if (this.dialog === '1') this.closeLayuiOpen()
      }
    },
    allResetForm() {
      if (this.dialog === '1') {
        this.closeLayuiOpen()
        return
      }
      this.$refs.formCreate.forEach((item, index) => {
        item.$refs[item.refForm].resetFields()
      })
    },
    closeLayuiOpen() {
      parent.layer.close(parent.layer.getFrameIndex(window.name))
    }
  }
}
</script>

<style lang="scss">
.fd-from-template-contanier{
  background-color: #fff;
  .fd-table-template{
    padding: 10px 0px;
    background-color: #fff;
    .el-dialog__body {
      padding: 30px 20px 0;
    }
  }
  .button-row{
    display: flex;
    justify-content: center;
    padding: 20px 0;
  }
}
</style>
