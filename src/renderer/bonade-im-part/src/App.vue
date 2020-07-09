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
    {{ variables }}
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import variables from '@/styles/_variables.scss'
@Component({
    name: 'App'
})
export default class extends Vue {
  get variables() {
    console.log(variables)
    return variables
  }
}
</script>


<style lang="scss">
// @import "~@/styles/_variables.scss";

html,body {
  margin: 0px;
  padding: 0px;
  pointer-events: none;
}
</style>
