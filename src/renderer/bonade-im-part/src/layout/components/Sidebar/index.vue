<!--
 * @Descripttion:
 * @version:
 * @Author: YanQi
 * @Date: 2020-07-07 11:23:23
 * @LastEditors: YanQi
 * @LastEditTime: 2020-07-07 11:35:43
-->
<template>
  <!-- 左侧菜单 -->
  <div class="nav-sideber">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        default-active="2"
        background-color="#000"
        text-color="#fff"
        active-text-color="#ffd04b"
        :unique-opened="false"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="(item,index) in list" :key="index" :item="item"></sidebar-item>
      </el-menu>{{variables}}
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
    console.log(variables)
    return variables;
  }
}
</script>

<style lang="scss" scoped>
</style>

