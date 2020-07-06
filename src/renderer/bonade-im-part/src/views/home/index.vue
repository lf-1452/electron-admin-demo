
<template>
  <div>
    <p style="color:red">{{  aa }}</p>
    <div @click="max" class="maxClass">
      max1223
    </div>
    <div @click="min" class="minClass">
      min1
    </div>
  </div>
</template>;

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component({
  name: 'Home'
})
export default class extends Vue {
  aa: string = '22';
  max(){
    // console.log('最大');
    // ipcRenderer && ipcRenderer.send('maximization');
    // const { dialog,app } = require("electron").remote;
    // let filePath = await dialog.showOpenDialog({
    //   title: "我需要打开一个文件",
    //   buttonLabel: "按此打开文件",
    //   defaultPath: app.getPath('pictures'),
    //   properties:"multiSelections",
    //   filters: [
    //     { name: "图片", extensions: ["jpg", "png", "gif"] },
    //     { name: "视频", extensions: ["mkv", "avi", "mp4"] }
    //   ]
    // });
  }

  min(){
    // ipcRenderer && ipcRenderer.send('minimize');
  }
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
