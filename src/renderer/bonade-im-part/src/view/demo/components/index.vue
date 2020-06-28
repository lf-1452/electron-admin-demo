<template>
  <div class="table-section">
    <v-headers />
    <div class="inner">
      <div v-for="(item,index) in fieldList" :key="index" class="table-row">
        <div class="header-row">
          <div class="section-right">
            <span>{{ item.moduleField.groupName }} <i class="icon el-icon-edit-outline" @click="editHandler(item.moduleField)" /></span>
            <span class="section-right-type">区域类型：{{ item.moduleField.groupType }}</span>
          </div>
          <div class="button-left">
            <div class="button-group">
              <el-button type="primary" size="mini" @click="addHandler">添加字段</el-button>
              <el-button type="primary" size="mini">删除区域</el-button>
            </div>
            <div class="arrow-button">
              <span v-if="(fieldList.length-1) !== index" class="icon-arrow arrow-bottom"><i class="el-icon-bottom" />下移</span>
              <span v-if="index!==0" class="icon-arrow arrow-top"><i class="el-icon-top" />上移</span>
            </div>
            <span class="icon" @click="putChangeHandler(index,item.moduleField.isOpen)">
              <i v-if="item.moduleField.isOpen==='1'" class="el-icon-arrow-up">收起</i>
              <i v-else class="el-icon-arrow-down">展开</i>
            </span>
          </div>
        </div>
        <div v-if="item.moduleField.isOpen==='1'">
          <v-table :value="item.children" @dialog="dialogChange" />
        </div>
      </div>
    </div>
    <v-form-dialog v-model="dialogVisible" :model="itemData" :is-edit="isEdit" />
    <v-formDialog-new1 v-model="dialogVisible1" :model="moduleField" />
    <br>
    <br>
    <br>

  </div>
</template>

<script>
import vFormDialog from './formDialog'
import vFormDialogNew1 from './formDialogNew1'
import vHeaders from './header/index'
import vTable from './table'
import mixins from './mixins/index'
import { transformData } from '../utils'
import { field } from '../mock/field.js'

export default {
  components: {
    vFormDialog,
    vFormDialogNew1,
    vHeaders,
    vTable
  },
  mixins: [mixins],
  data() {
    return {
      isEdit: true,
      fieldList: []
    }
  },
  created() {
    this.fieldList = field.dataContent
    const result = transformData(this.test)
    console.log('result11:', result)
  },
  methods: {
    dialogChange(val, data) {
      this.dialogVisible = val
      this.itemData = data
    },
    addHandler() {
      this.dialogVisible = true
      this.isEdit = false
      this.itemData = this.default_model
    },
    putChangeHandler(index, isOpen) {
      const isOpenFlag = isOpen === '1' ? '0' : '1'
      this.$set(this.fieldList[index].moduleField, 'isOpen', isOpenFlag)
    },
    editHandler(moduleField) {
      this.dialogVisible1 = true
      this.moduleField = moduleField
    }
  }
}
</script>

<style lang="scss" scoped>
.table-section{
  margin: 0 20px 20px;
  .icon{
    cursor: pointer;
  }
  .table-row{
    background-color: #FFF;
    border: 1px solid #E1E6EA;
    padding: 0 20px;
    &+.table-row{
      margin-top: 20px;
    }
  }
  .header-row{
    height: 60px;
    line-height: 60px;
    position: relative;
    display: flex;
    justify-content: space-between;
    width: 100%;
    .section-right{
      .section-right-type{
        padding-left: 16px;
      }
    }
    .button-left{
      display: flex;
      align-items: center;
      .arrow-button{
        padding-left: 14px;
      }
      .icon-arrow{
        cursor: pointer;
        i{
          border: 1px solid #b40005;
          margin-right: 4px;
        }
      }
      .icon{
        padding-left: 10px;
        cursor: pointer;
      }
    }
  }
}
</style>

