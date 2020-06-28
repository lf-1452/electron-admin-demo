<template>
  <div>
    <div class="header-breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>模块设置</el-breadcrumb-item>
        <el-breadcrumb-item>项目信息</el-breadcrumb-item>
      </el-breadcrumb>
      <el-button type="primary" icon="el-icon-plus" @click="addNewHandler">新建区域</el-button>
    </div>
    <v-form-dialog-new v-model="dialogVisibleNew" />
  </div>
</template>

<script>
import vFormDialogNew from '../formDialogNew'
export default {
  components: { vFormDialogNew },
  data() {
    return {
      dialogVisibleNew: false
    }
  },
  methods: {
    addNewHandler() {
      this.dialogVisibleNew = true
    }
  }
}
</script>

<style lang="scss">
.header-breadcrumb{
  padding: 14px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>

