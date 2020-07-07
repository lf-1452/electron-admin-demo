<!--
 * @Descripttion:
 * @version:
 * @Author: YanQi
 * @Date: 2020-06-24 18:05:08
 * @LastEditors: YanQi
 * @LastEditTime: 2020-07-06 11:13:18
-->
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component({
    name: 'App'
})
export default class extends Vue {}
</script>

<style lang="scss" scoped>
html,body {
  margin: 0px;
  padding: 0px;
  pointer-events: none;
}
#app {
  box-sizing: border-box;
  width: 380px;
  height: 380px;
  border-radius: 190px;
  border: 1px solid green;
}
</style>
