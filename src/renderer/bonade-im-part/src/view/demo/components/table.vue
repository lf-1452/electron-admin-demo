<template>
  <div class="tables">
    <el-table
      :data="tableDatas"
      row-key="id"
      style="width: 100%"
      @cell-mouse-enter="cellMouseEnterHandler"
      @cell-mouse-leave="cellMouseLeaveHandler"
    >
      <el-table-column
        v-for="(item, index) in col"
        :key="`col_${index}`"
        :label="item.label"
      >
        <template slot-scope="scope">
          <div
            v-if="dropCol[index].prop!=='isFormView'
              && dropCol[index].prop!=='isRequired'
              && dropCol[index].prop!=='isLine'"
            class="drag-row"
          >
            <img
              v-if="scope.row.isDraggable && dropCol[index].prop === 'fieldName'"
              class="draggable-handler"
              src="../images/drag.png"
              alt=""
              srcset=""
            >
            <span>{{ scope.row[dropCol[index].prop]?scope.row[dropCol[index].prop]:'-' }}</span>
          </div>
          <div v-if="dropCol[index].prop==='isFormView'">
            <el-switch
              v-model="scope.row[dropCol[index].prop]"
            />
          </div>
          <div v-if="dropCol[index].prop==='isRequired'">
            <el-switch
              v-model="scope.row[dropCol[index].prop]"
            />
          </div>
          <div v-if="dropCol[index].prop==='isLine'">
            <el-switch
              v-model="scope.row[dropCol[index].prop]"
              @change="changeSwitchHandler"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column
        class-name="table-column-row"
        width="65"
        label="操作"
        align="center"
      >
        <template slot-scope="scope">
          <div class="operation-cell">
            <i class="el-icon-more" @mouseover="mouseoverHandler(scope.row)" />
            <div class="operation-o">
              <transition
                name="custom-classes-transition"
                enter-active-class="animated slideInRight"
                leave-active-class="animated slideOutRight"
              >
                <div v-if="isShow === scope.row.id" class="operation-buttons">
                  <div class="il-bk table-button">
                    <span @click="editHandler(scope.row)">编辑</span>
                  </div>
                  <div class="il-bk table-button delete">
                    <span>删除</span>
                  </div>
                </div>
              </transition>
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
const COMPONENT_NAME = 'fd-table'
const EVENT_DIALOG = 'dialog'
import Sortable from 'sortablejs'
export default {
  name: COMPONENT_NAME,
  props: {
    // eslint-disable-next-line vue/require-default-prop
    value: {
      type: Array
    },
    dialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialogVisible: false,
      col: [
        {
          label: '字段名称',
          prop: 'fieldName'
        },
        {
          label: '字段类型',
          prop: 'fieldType'
        },
        {
          label: '字段描述',
          prop: 'fieldDesc'
        },
        {
          label: '帮助文本',
          prop: 'helpText'
        },
        {
          label: '是否显示',
          prop: 'isFormView'
        },
        {
          label: '是否必填',
          prop: 'isRequired'
        },
        {
          label: '是否单行',
          prop: 'isLine'
        }
      ],
      dropCol: [
        {
          label: '字段名称',
          prop: 'fieldName'
        },
        {
          label: '字段类型',
          prop: 'fieldType'
        },
        {
          label: '字段描述',
          prop: 'fieldDesc'
        },
        {
          label: '帮助文本',
          prop: 'helpText'
        },
        {
          label: '是否显示',
          prop: 'isFormView'
        },
        {
          label: '是否必填',
          prop: 'isRequired'
        },
        {
          label: '是否单行',
          prop: 'isLine'
        }
      ],
      isShow: '',
      tableDatas: []
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(newValue, oldValue) {
        this.tableDatas = this.value.concat()
      }
    },
    dialog(newVal) {
      this.dialogVisible = newVal
    }
  },
  mounted() {
    this.rowDrop()
    // this.columnDrop()
  },
  methods: {
    cellMouseEnterHandler(row, column, cell, event) {
      let index = null
      this.tableDatas.forEach((item, i) => {
        if (row.id === item.id) {
          index = i
        }
      })
      this.$set(this.tableDatas[index], 'isDraggable', true)
    },
    cellMouseLeaveHandler(row, column, cell, event) {
      let index = null
      this.tableDatas.forEach((item, i) => {
        if (row.id === item.id) {
          index = i
        }
      })
      this.$set(this.tableDatas[index], 'isDraggable', false)
      this.isShow = ''
    },
    // 行拖拽
    rowDrop() {
      const tbody = document.querySelector('.el-table__body-wrapper tbody')
      const _this = this
      Sortable.create(tbody, {
        handle: '.draggable-handler', // 格式为简单css选择器的字符串，使列表单元中符合选择器的元素成为拖动的手柄，只有按住拖动手柄才能使列表单元进行拖动
        onEnd({ newIndex, oldIndex }) {
          const currRow = _this.tableDatas.splice(oldIndex, 1)[0]
          _this.tableDatas.splice(newIndex, 0, currRow)
        }
      })
    },
    // 列拖拽
    columnDrop() {
      const wrapperTr = document.querySelector('.el-table__header-wrapper tr')
      this.sortable = Sortable.create(wrapperTr, {
        animation: 180,
        delay: 0,
        onEnd: evt => {
          const oldItem = this.dropCol[evt.oldIndex]
          this.dropCol.splice(evt.oldIndex, 1)
          this.dropCol.splice(evt.newIndex, 0, oldItem)
        }
      })
    },
    mouseoverHandler(row) {
      this.isShow = row.id
    },
    mouseoutHandler(row) {
      this.isShow = ''
    },
    changeSwitchHandler(v) {
      const dataList = this.tableDatas
      var resultList = dataList.reduce((resultList, current) => {
        const isLine = current['isLine']
        let lastList = resultList[resultList.length - 1]
        const lastListHasIsLine = (lastList || []).find((item) => item['isLine'])
        if (!lastList || lastList.length >= 2 || isLine || lastListHasIsLine) {
          lastList = [current]
          resultList.push(lastList)
        } else {
          lastList.push(current)
        }
        return resultList
      }, [])

      console.log('resultList:', resultList)
    },
    editHandler(data) {
      this.dialogVisible = true
      this.$emit(EVENT_DIALOG, this.dialogVisible, data)
    }
  }
}
</script>

<style lang="scss">
.tables{
  margin-bottom: 20px;
  border: 1px solid #E1E6EA;
  .drag-row{
    position: relative;
    img{
      width: 20px;
      height: 27px;
      cursor: pointer;
    }
    .draggable-handler{
      position: absolute;
      left: -15px;
      top: -3px;
    }
  }
  .operation-cell{
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .operation-buttons{
      width: auto;
      height: 100%;
      padding: 0px 7px;
      background: #FFF;
      border-left: 1px solid #E1E6EA;
      box-shadow: rgba(0, 0, 0, 0.08) -1px 0 8px;
      white-space: nowrap;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      .table-button {
        cursor: pointer;
        font-size: 12px;
        padding: 0px 8px;
        color: #9094A3;
        height: 100%;
        display: flex;
        align-items: center;
        &:hover{
          color: #4578F0;
        }
        &.delete:hover {
          color: #FF6750;
        }
      }
    }
    .operation-o{
      position: absolute;
      top: 0;
      right: 0;
      background: #fff;
      height: 100%;
      display: flex;
      align-items: center;
    }
  }
  .table-column-row{
    .cell{
      height: 46px;
      line-height: 46px;
      padding: 0px;
      overflow: inherit;
    }
  }
  .el-table th,
  .el-table td {
    height: 46px;
    padding: 0;
  }
  .el-table th {
    background: #f8f8f9 !important;
    color: #333;
    &>.cell {
      font-size: 14px;
    }
  }
}
</style>
