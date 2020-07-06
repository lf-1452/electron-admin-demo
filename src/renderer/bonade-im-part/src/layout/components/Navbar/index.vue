<!--
 * @Descripttion:
 * @version:
 * @Author: YanQi
 * @Date: 2020-07-03 14:35:33
 * @LastEditors: YanQi
 * @LastEditTime: 2020-07-06 10:07:18
-->
<template>
    <div class="navbar">
        <div
        :class="[{'is-active': true}]"

        >
            <!-- <svg-icon
            name="hamburger"
            width="20"
            height="20"
            /> -->
        </div>
        <breadcrumb
        id="breadcrumb-container"
        class="breadcrumb-container"
        />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
// import { AppModule } from '@/store/modules/app';
import Breadcrumb from './Breadcrumb.vue';

@Component({
  name: 'Navbar',
  components: {
    Breadcrumb
  }
})

export default class extends Vue{
//   @Prop({ default: false }) private isActive!: boolean;
  //aa: string = '22';
  get sidebar() {
    // return AppModule.sidebar;
    return true;
  }

//   private toggleSideBar() {
//     AppModule.ToggleSideBar(false);
//   }
}
</script>

<style lang="scss" scoped>
.navbar {
    .svg-icon {
       vertical-align: middle;
    }

    .is-active {
       transform: rotate(180deg);
    }
}
</style>