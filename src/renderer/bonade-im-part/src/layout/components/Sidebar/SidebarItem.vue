<!--
 * @Descripttion: 
 * @version: 
 * @Author: killi
 * @Date: 2020-07-08 14:23:51
 * @LastEditors: killi
 * @LastEditTime: 2020-07-08 19:49:05
--> 


<template>
  <!-- 左侧菜单内容 -->
  <div class="SidebarItem">
    <!-- 有子级 -->
    <el-submenu :index="item.name" v-if="hasChild">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>{{item.meta.title}}</span>
      </template>
      <sidebar-item v-for="(son,sonIndex) in item.children" :key="sonIndex" :item="son"></sidebar-item>
    </el-submenu>

    <!-- 没有子级 -->
    <el-menu-item :index="item.name" v-else>
      <i class="el-icon-menu"></i>
      <span slot="title">{{item.meta.title}}</span>
    </el-menu-item>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { RouteConfig } from "vue-router";
import { hasChild } from "../../../utils";
@Component({
  name: "SidebarItem"
})
export default class extends Vue {
  @Prop({ default: () => [] }) private item!: RouteConfig;

  // 当前是否有子级菜单
  get hasChild() {
    return hasChild(this.item);
  }
}
</script>
