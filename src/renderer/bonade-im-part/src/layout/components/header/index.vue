<template>
  <div class="header-contanier" :style="{backgroundColor:globelBgColor}">
    <div class="img-left">
      <!-- <img v-if="!sidebar.opened" src="@/assets/layout/logo-shrink.png" alt="">
      <img v-else src="@/assets/layout/logo-open.png" alt=""> -->
    </div>
    <div class="user-right">
      <theme-picker style="float: right;height: 26px;margin: -3px 8px 0 0;" @change="themeChange" />
      <span class="project-name">{{ projectName }}</span>
    </div>
  </div>
</template>

<script>
import ThemePicker from '@/components/ThemePicker'
import { mapGetters } from 'vuex'
export default {
  components: {
    ThemePicker
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    projectName: {
      get() {
        return this.$store.state.settings.projectName
      }
    },
    globelBgColor() {
      return this.$store.state.settings.theme
    }
  },
  methods: {
    themeChange(val) {
      this.$store.dispatch('settings/changeSetting', {
        key: 'theme',
        value: val
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.header-contanier{
  width: 100%;
  height: 49px;
  padding: 0 25px 0 12px;
  display: flex;
  justify-content: space-between;
  .project-name{
    color: #fff;
    font-size: 16px;
    font-weight: bolder;
  }
  .img-left,.user-right{
    display: flex;
    align-items: center;
  }
}
</style>
