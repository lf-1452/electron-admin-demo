<template>
  <el-table
    ref="table"
    :data="tableData"
    :header-cell-style="headerStyleChange"
    border
    fit
    tooltip-effect="dark"
    style="width:100%"
    @selection-change="handleSelectionChange"
  >
    <!--选择框-->
    <el-table-column type="selection" style="width: 55px;" />
    <el-table-column
      v-for="(item,index) in tableLabel"
      :key="index"
      :width="item.width ? item.width : ''"
      :align="item.align"
      :label="item.label"
      :prop="item.param"
      :sortable="item.sortable"
      :show-overflow-tooltip="item.tooltip"
    >
      <template slot-scope="scope">
        <span v-if="item.render">
          {{ item.render(scope.row) }}
        </span>
        <span v-else>{{ scope.row[item.param] }}</span>
      </template>
    </el-table-column>
    <el-table-column v-if="tableOption.label" :width="tableOption.width" :label="tableOption.label" align="center" class-name="small-padding fixed-width">
      <template slot-scope="scope">
        <el-button v-for="(item,index) in tableOption.options" :key="index" :type="item.type" :icon="item.icon" size="mini" @click="item.method(index,scope.row)">
          {{ item.label }}
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  components: {},
  props: {
    tableData: {
      type: Array,
      default: () => {
        return []
      }
    },
    tableLabel: {
      type: Array,
      default: () => {
        return []
      }
    },
    tableOption: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      multipleSelection: [] // 多行选中
    }
  },
  methods: {
    // 多行选中
    handleSelectionChange(val) {
      this.multipleSelection = val
      this.$emit('handleSelectionChange', val)
    },
    // 更改表头样式
    headerStyleChange() {
      return 'background-color: #f2f2f2;'
    }
  }
}
</script>
