<!--
 * @Descripttion:
 * @version:
 * @Author: YanQi
 * @Date: 2020-07-02 16:46:55
 * @LastEditors: YanQi
 * @LastEditTime: 2020-07-02 18:24:48
-->
<template>
  <div class="app-container">
    <switch-roles @change="handleRolesChange" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SwitchRoles from './components/SwitchRoles.vue';

@Component({
  name: 'PagePermission',
  components: {
    SwitchRoles
  }
})
export default class extends Vue {
  // private handleRolesChange() {
  //   this.$router.push({ path: '/permission/index?' + +new Date() })
  // }
}
</script>
