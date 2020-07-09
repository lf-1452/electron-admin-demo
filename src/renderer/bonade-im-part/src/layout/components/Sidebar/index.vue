<!--
 * @Descripttion:
 * @version:
 * @Author: YanQi
 * @Date: 2020-07-07 11:23:23
 * @LastEditors: qili
 * @LastEditTime: 2020-07-08 19:43:43
-->

<template>
  <!-- 左侧菜单 -->
  <div class="nav-sideber">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        default-active="2"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :active-text-color="variables.menuActiveText"
        :unique-opened="false"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="(item,index) in list" :key="index" :item="item"></sidebar-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { RouteConfig } from "vue-router";
import SidebarItem from "./SidebarItem.vue";
import variables from "../../../styles/style.scss";
@Component({
  name: "Sidebar",
  components: {
    SidebarItem
  }
})
export default class extends Vue {
  @Prop({ default: () => [] }) private list!: RouteConfig;

  get variables() {
    return variables;
  }
}
</script>

<style lang="scss" scoped>
</style>

