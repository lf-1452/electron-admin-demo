<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({
  name: 'App',
})
export default class extends Vue {}
</script>

<style lang="scss" scoped>
#app {
  height: 100%;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  overflow: hidden;
  border-radius: 4px;
  background: #ffffff;
}
</style>
