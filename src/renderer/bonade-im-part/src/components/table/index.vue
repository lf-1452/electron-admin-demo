<template>
  <div class="fd-tables-contanier">
    <div class="button-nav-group">
      <div>
        <el-button class="bgBtn" size="mini" icon="el-icon-plus" @click="addHandler">新增</el-button>
      </div>
    </div>
    <el-table
      :data="tableData"
      :header-cell-style="headerCellStyleChange"
      style="width: 100%"
    >
      <!--selection选择框-->
      <el-table-column
        v-if="_options.mutiSelect"
        type="selection"
        class-name="classNameSelection"
        align="center"
      />
      <!--序号-->
      <el-table-column v-if="_options.index" label="序号" type="index" width="50" align="center" />
      <template v-for="(column, index) in columns">
        <el-table-column
          :key="index"
          :prop="column.propertyCode"
          :label="column.propertyName"
          align="left"
        >
          <template slot-scope="scope">
            {{ scope.row[column.propertyCode] }}
          </template>
        </el-table-column>
      </template>
      <template v-if="_operateAuth">
        <el-table-column
          label="操作"
          align="center"
          width="85"
        >
          <template slot-scope="scope">
            <div class="buttons-icon">
              <!-- <i v-if="_operateAuth.indexOf('edit')>-1" class="el-icon-edit" @click="editHandler(scope.row)" />
              <img v-if="_operateAuth.indexOf('del')>-1" src="@/assets/layout/dottot.png" alt="" class="img-dottot">
              <i v-if="_operateAuth.indexOf('del')>-1" class="el-icon-delete" @click="deleteHandler(scope.row)" /> -->
            </div>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script>
const EVENT_ADD = 'add'
const EVENT_EDIT = 'edit'
const EVENT_DELETE = 'delete'
export default {
  props: {
    options: {
      type: Object,
      default: () => {
        return {
          mutiSelect: true,
          index: false // 显示序号， 多选则 mutiSelect
        }
      }
    },
    dataSource: {
      type: Array,
      default: () => {
        return []
      }
    },
    columns: {
      type: Array,
      default: () => {
        return []
      }
    },
    operateAuth: {
      type: String,
      default: ''
    },
    moduleField: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    const dataSource = JSON.parse(JSON.stringify(this.dataSource))
    return {
      tableData: dataSource
    }
  },
  computed: {
    _options() {
      return this.options
    },
    _operateAuth() {
      return this.operateAuth
    }
  },
  watch: {
    dataSource: {
      handler(newValue, oldValue) {
        const arr = JSON.parse(JSON.stringify(newValue))
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].dealmark === 'del') {
            arr.splice(i, 1)
          }
        }
        this.tableData = arr
      },
      deep: true
    }
  },
  methods: {
    // 更改表头样式
    headerCellStyleChange() {
      return 'background-color: #f8f8f9'
    },
    addHandler() {
      this.$emit(EVENT_ADD)
    },
    editHandler(row) {
      this.$emit(EVENT_EDIT, row, this.moduleField)
    },
    deleteHandler(row) {
      this.$emit(EVENT_DELETE, row, this.moduleField)
    }
  }
}
</script>

<style lang="scss">
.fd-tables-contanier{
  .button-nav-group{
    padding-bottom: 10px;
  }
  .el-table {
    border: 1px solid #E1E6EA;
    .classNameSelection{
      border-right: 1px solid #E1E6EA;
    }
    .buttons-icon{
      cursor: pointer;
    }
  }
}
</style>

