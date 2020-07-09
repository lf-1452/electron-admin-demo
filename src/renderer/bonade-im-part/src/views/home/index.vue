<!--
 * @Descripttion:
 * @version:
 * @Author: YanQi
 * @Date: 2020-07-06 10:56:34
 * @LastEditors: YanQi
 * @LastEditTime: 2020-07-06 11:11:46
-->
<template>
  <div class="home">
    123
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import variables from '@/styles/_variables.scss'
@Component({
    name: 'Home'
})
export default class extends Vue {

}
</script>

<style lang="scss" scoped>
.maxClass{
  background-color: red;
}
.minClass{
  background-color: blue;
}
</style>
