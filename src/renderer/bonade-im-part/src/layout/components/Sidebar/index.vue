<template>
    <div>
        <el-scrollbar wrap-class="scrollbar-wrapper">
            <el-menu
            :default-active="$route.path"

            class="el-menu-vertical-demo"
            :background-color="styles.menuBg"
            :text-color="styles.menuText"
            :active-text-color="styles.menuActiveText"
            :unique-opened="false"
            :collapse-transition="false"
            >
              <sidebar-item
              v-for="route in routes"
              :key="route.path"
              :item="route"
              :base-path="route.path"
              :is-collapse="isCollapse"
              ></sidebar-item>
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { PermissionModule } from '@/store/modules/permission';
import { AppModule } from '@/store/modules/app';
import SidebarItem from './SidebarItem.vue';
import styles from '@/styles/style.scss';

@Component({
  name: 'SideBar',
  components: {
    SidebarItem
  }
})

export default class extends Vue {
  get sidebar() {
    return AppModule.sidebar;
  }

  get routes() {
    return PermissionModule.routes;
  }

  get styles() {
    return styles;
  }

  get isCollapse() {
    return !this.sidebar.opened;
  }
}
</script>

<style lang="scss">
.sidebar-container {
  // reset element-ui css
  .horizontal-collapse-transition {
    transition: 0s width ease-in-out, 0s padding-left ease-in-out,
      0s padding-right ease-in-out;
  }
  .scrollbar-wrapper {
    overflow-x: hidden !important;
  }
  .el-scrollbar__view {
    height: 100%;
  }
  .el-scrollbar__bar {
    &.is-vertical {
      right: 0px;
    }
    &.is-horizontal {
      display: none;
    }
  }
}
</style>

<style lang="scss" scoped>
.el-scrollbar {
  height: 100%;
}
.el-menu {
  border: none;
  height: 100%;
  width: 100% !important;
}
</style>