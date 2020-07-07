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
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            :unique-opened="false"
            :collapse-transition="false"
            mode="vertical"
            >
               <sidebar-item></sidebar-item>
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import SidebarItem from './SidebarItem.vue'

@Component({
    name: 'Sidebar',
    components: {
       SidebarItem
    }
})

export default class extends Vue {
    
}
</script>

<style lang="scss" scoped>

</style>