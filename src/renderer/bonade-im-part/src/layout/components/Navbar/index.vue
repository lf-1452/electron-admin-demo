<template>
  <!-- 右侧顶部菜单 -->
  <div class="Navbar">
    <hamburger
      id="hamburger-container"
      :is-active="false"
      class="hamburger-container"
      @toggleClick="toggleClick"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Hamburger from "../../../components/Hamburger/index.vue";
@Component({
  name: "Navbar",
  components: {
    Hamburger
  }
})
export default class extends Vue {
    // 图标点击
    private toggleClick(){

    }
}
</script>

<style lang="scss" scoped>
.Navbar {
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    padding: 0 15px;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }
}
</style>