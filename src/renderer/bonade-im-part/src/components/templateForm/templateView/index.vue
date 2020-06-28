<template>
  <div v-if="renderFormData" class="fd-from-template-contanier">
    <div v-for="(item,index) in renderFormData.data" :key="index" class="template-inner">
      <div v-if="item.formGroup.groupType==='1'" class="fd-from-template">
        <Title :value-title="item.formGroup.groupName" c-height="20" />
        <fd-form-create
          ref="formCreate"
          :model="item.groupMoudle[0]"
          :schema="renderFormData['module'+item.formGroup.id].schema"
          :is-btn="false"
          :ref-form="'form'+item.formGroup.id"
          :direction="item.formGroup.propertyType ==='1'?'horizontal':'vertical'"
          @changeValue="changeHandler"
        />
      </div>
    </div>
    <div class="button-row">
      <el-button size="mini" @click="confirmImageSetting">提交</el-button>
      <el-button size="mini" @click="allResetForm">取消</el-button>
    </div>
  </div>
</template>

<script>
import { fromData } from '../mock/formData.js'
import { getCommonFormData } from '../utils'
import Title from '@/components/Title/title'
import fdFormCreate from '@/components/form/form'
export default {
  components: {
    fdFormCreate,
    Title
  },
  data() {
    return {
      renderFormData: null,
      dataContent: null,
      dealmark: 'add',
      formArr: [], // 存放表单ref数组
      resultArr: [], // 接受验证返回结果数组
      relationData: [] // 得到已经改变的值
    }
  },
  created() {
    const { dataContent } = fromData
    this.dataContent = JSON.parse(JSON.stringify(dataContent))
    this.renderFormData = getCommonFormData(dataContent.formGroupList, this.dealmark)
    this.formArr = this.renderFormData.formArr
    console.log('dataContent:', dataContent)
    console.log('this.renderFormData:', this.renderFormData)
  },
  methods: {
    changeHandler(item, fieldValue) {
      // select item 为键值对 input item 为具体的值
      // fieldValue 为渲染对象的结构
      const dataContent = JSON.parse(JSON.stringify(this.dataContent))
      const dealmark = this.dealmark
      const { value } = item
      // 这是渲染对象的结构，relationList为约束条件
      const { relationList } = fieldValue
      const { data } = this.renderFormData
      const id = fieldValue.id
      const relationObj = {}
      relationObj.id = id
      relationObj.item = item
      relationObj.fieldValue = fieldValue
      // 判断该对象是否在this.relationData中
      const existFlag = this.relationData.some(item => {
        return item.id === id
      })
      if (existFlag) {
        this.relationData.forEach((rel, index) => {
          if (rel.id === id) { // 存在该对象则覆盖
            this.$set(this.relationData, index, relationObj)
          }
        })
      } else {
        this.relationData.push(relationObj)
      }
      // 利用reduce方法遍历数组,reduce第一个参数是遍历需要执行的函数，第二个参数是item的初始值
      //   var obj = {}
      //   this.relationData = this.relationData.reduce((item, next) => {
      //     obj[next.id] ? '' : obj[next.id] = true && item.push(next)
      //     return item
      //   }, [])

      // 如果没有约束则结束
      if (!relationList) {
        return
      }

      // 改变条件的约束
      relationList.forEach(sitem => {
        // eslint-disable-next-line eqeqeq
        if (sitem.value == value) {
          if (sitem.relationValueShow.length > 0 || sitem.relationValueNoShow.length > 0) {
            this.$nextTick(() => {
              this.renderFormData = getCommonFormData(dataContent.formGroupList, dealmark, data, this.relationData)
            })
          } else {
            this.$nextTick(() => {
              this.renderFormData = getCommonFormData(dataContent.formGroupList, dealmark, data, this.relationData)
            })
          }
        }
      })
    },
    // formName 需要验证的表单
    refForm(formName, index) {
      const _this = this
      const result = new Promise(function(resolve, reject) {
        _this.$refs.formCreate[index].$refs[formName].validate((valid) => {
          if (valid) {
            resolve()
          } else { reject() }
        })
      })
      this.resultArr.push(result) // push 得到promise的结果
    },
    // 提交
    confirmImageSetting() {
      console.log('提交的结果', this.relationData)
      // 每次提交前重置验证返回结果的数组
      this.resultArr = []
      this.formArr.forEach((item, index) => {
        // 根据表单的ref校验
        this.refForm(item, index)
      })
      Promise.all(this.resultArr).then(() => {
        // 验证全部通过
        alert('submit')
      }).catch(function(data) {
        // 验证失败 提示reject失败状态的值
        console.log('err')
      })
    },
    allResetForm() {
      this.$refs.formCreate.forEach((item, index) => {
        // 获取对应的form表单
        item.$refs[item.refForm].resetFields()
      })
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
