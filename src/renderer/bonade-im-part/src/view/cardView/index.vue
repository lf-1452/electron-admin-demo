<template>
  <div>
    <el-link type="primary">卡片布局</el-link>
    <cardLabel>标签卡片</cardLabel>
  </div>
</template>

<script>
export default {
  name: 'Index',
  components: {
    cardLabel: () => import('@/components/cardLabel/index')
  }
}
</script>

<style scoped>

</style>
