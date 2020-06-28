<template>
  <div>
    <div :id="id" :style="{height:height,width:width}" />

  </div>

</template>

<script>
import echarts from 'echarts'
import columnConfig from './columnConfig'
export default {
  name: 'FdColumn',
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '50px'
    },
    height: {
      type: String,
      default: '50px'
    },
    value: {
      type: Object,
      default() {
        return {}
      }
    },
    canSave: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    // 柱图配置
    columnOptions() {
      return columnConfig(this.value.xAxis, this.value.series, this.value.legend, this.value.title, this.canSave)
    }
  },
  mounted() {
    // 调用绘制图表的方法
    this.draw()
  },
  methods: {
    draw() {
      // 实例化echarts对象
      const myChartDrawer = echarts.init(document.getElementById(this.id))
      // 绘制条形图
      myChartDrawer.setOption(this.columnOptions)
    }
  }
}
</script>

<style scoped>

</style>
