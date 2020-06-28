<template>
  <div>
    1234
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({
  name: 'Test',
})
export default class extends Vue {
  public max() {
    console.log('最大')
    // ipcRenderer && ipcRenderer.send('maximization')
  }
}
</script>
