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
export default class extends Vue {
  mounted() {
    // const remote = require("electron").remote;
    // let win = remote.getCurrentWindow();

    // window.addEventListener("mousemove", event => {
    //   let flag = event.target === document.documentElement;

    //   if (flag){
    //     win.setIgnoreMouseEvents(true, { forward: true });
    //   } else {
    //     win.setIgnoreMouseEvents(false);
    //   }
    // });
    // win.setIgnoreMouseEvents(true, { forward: true });
  }
}
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
