<!-- 
 * @Descripttion: 
 * @version: 
 * @Author: YanQi
 * @Date: 2020-06-28 10:38:39
 * @LastEditors: YanQi
 * @LastEditTime: 2020-07-07 11:49:03
--> 


<template>
  <div class="app-wrapper">
    <!-- 左侧路由菜单 -->
    <div class="app-sidbar sidebar-container">
      <Sidebar :list="routerMenus"></Sidebar>
    </div>
    <!-- 右侧内容区 -->
    <div class="main-container">
        <!-- 右侧顶部菜单 -->
        
        <!-- 右侧页面内容显示区 -->
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Sidebar } from "./components";
import { commonModule } from "../store/modules/common";

@Component({
  name: "Layout",
  components: {
    Sidebar
  }
})
export default class extends Vue {
  // 路由菜单
  get routerMenus() {
    return commonModule.createRouteMenus;
  }
}
</script>


<style lang="scss" scoped>
.sidebar-container {
  transition: width 0.28s;
  width: $sideBarWidth !important;
  height: 100%;
  position: fixed;
  font-size: 0px;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
  &.app-sidbar{
      background: $menuBg;
  }
}
</style>
