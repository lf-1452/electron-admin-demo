<template>
  <div class="headerTitleContainer" :style="{ paddingTop: cHeight + 'px' }">
    <el-row>
      <el-col :span="24"><div class="grid-content bg-purple-dark headerTitle">
        <div class="classify">{{ valueTitle }}</div>
        <slot />
      </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    valueTitle: {
      type: String,
      default: 'valueTitle'
    },
    cHeight: {
      type: [Number, String],
      default: null
    }
  }
}
</script>

<style scoped lang="scss">
.headerTitleContainer{
  position: relative;
  padding-bottom: 13px;
  .headerTitle{
    display: flex;
    display: -webkit-flex ;
    align-items: center;
    .classify{
      background: url(./images/diandian.png) no-repeat scroll left center;
      color: #333 !important;
      font-size: 16px;
      padding-left: 11px;
    }
  }
}
</style>

