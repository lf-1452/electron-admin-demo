<template>
  <div class="dashboard-container">
    admin
    <el-button type="primary" @click="getBtn">确定</el-button>
  </div>
</template>

<script>
import { common } from '@/common/mixins/common.js'

export default {
  mixins: [common],
  data() {
    return {

    }
  },
  methods: {
    getBtn() {
      this.toast('哈哈哈', 1)
      // const arrs = this.unique5([1, 2, 4, 1, 2, 5, 6, 3, 5])
      const str = this.clearEmpty('   555   ')
      console.log(str)
    }
  }
}
</script>

<style scoped>

</style>
