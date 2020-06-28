<template>
  <div class="ttable-section tableCommon">
    <div class="fd-button-nav fd-button-bottom">
      <el-button size="mini" @click="TEMPLATE_FROM_OR_TABLE_ADD()">新增</el-button>
      <el-button size="mini" @click="TEMPLATE_FROM_VIEW()">查看</el-button>
    </div>
    <div>
      <el-table :data="tableData" border :span-method="objectSpanMethod">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="publicNo" label="公安编号" width="80" />
        <el-table-column prop="buildNo" label="建筑编号" width="80" />
        <el-table-column prop="fatherType" :render-header="renderHeader" width="128" />
        <el-table-column prop="floor" label="楼层" width="60" />
        <el-table-column prop="type" label="类别" width="50" />
        <el-table-column prop="unitNo" label="单元编号" width="78" />
        <el-table-column prop="unitNo" label="单元平面图" width="98" />
        <el-table-column label="单元面积" width="240">
          <template slot-scope="scope">
            <upload v-model="scope.row.attachment" :hidden-upload="true" />
          </template>
        </el-table-column>
        <el-table-column prop="reamrk" label="备注" />
        <el-table-column label="操作" width="65" align="center">
          <template slot-scope="scope">
            <div class="fd-buttons-icon">
              <i class="el-icon-edit" @click="TEMPLATE_FROM_OR_TABLE_EDIT(scope.row.pkId)" />
              <img src="@/assets/layout/dottot.png" alt="" class="img-dottot">
              <i class="el-icon-delete" />
            </div>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        :total="total"
        :page.sync="pages.page"
        :limit.sync="pages.limit"
        @pagination="paginationsChange"
      />
    </div>
  </div>
</template>

<script>
import pagination from '@/components/pagination/pagination.vue'
import upload from '@/components/upload/upload.vue'
import axios from 'axios'
import { layerOpenWindow } from '@/common/utils/common.js'

export default {
  components: {
    pagination,
    upload
  },
  data() {
    return {
      tableData1: [
        {
          No: 'A1',
          Public_Security_No: '1栋',
          Building_Number: 'C04',
          Ground_Construction_Area: '26266.15',
          Floor: 'A1-1',
          Floor_Plan: '上传',
          Category: '可租',
          Unit_Number: 'E:102',
          Plan: '下载',
          Unit_Area: '2666.12',
          remarks: '备注'
        }, {
          No: 'A7',
          Public_Security_No: '7栋',
          Building_Number: 'B05',
          Ground_Construction_Area: '2666.15',
          Floor: 'A7-1',
          Floor_Plan: '上传',
          Category: '可租',
          Unit_Number: 'E:102',
          Plan: '下载',
          Unit_Area: '2666.12',
          remarks: '备注'
        }, {
          No: 'A7',
          Public_Security_No: '7栋',
          Building_Number: 'B05',
          Ground_Construction_Area: '2666.15',
          Floor: 'A7-2',
          Floor_Plan: '上传',
          Category: '可租',
          Unit_Number: 'E:102',
          Plan: '下载',
          Unit_Area: '2666.12',
          remarks: '备注'
        }, {
          No: 'A7',
          Public_Security_No: '7栋',
          Building_Number: 'B05',
          Ground_Construction_Area: '2666.15',
          Floor: 'A7-3',
          Floor_Plan: '上传',
          Category: '可租',
          Unit_Number: 'E:102',
          Plan: '下载',
          Unit_Area: '2666.12',
          remarks: '备注'
        }, {
          No: 'A7',
          Public_Security_No: '7栋',
          Building_Number: 'B05',
          Ground_Construction_Area: '2666.15',
          Floor: 'A7-3',
          Floor_Plan: '上传',
          Category: '可租',
          Unit_Number: 'E:102',
          Plan: '下载',
          Unit_Area: '2666.12',
          remarks: '备注'
        }, {
          No: 'A7',
          Public_Security_No: '7栋',
          Building_Number: 'B05',
          Ground_Construction_Area: '2666.15',
          Floor: 'A7-3',
          Floor_Plan: '上传',
          Category: '可租',
          Unit_Number: 'E:102',
          Plan: '下载',
          Unit_Area: '2666.12',
          remarks: '备注'
        }, {
          No: 'A7',
          Public_Security_No: '7栋',
          Building_Number: 'B05',
          Ground_Construction_Area: '2666.15',
          Floor: 'A7-4',
          Floor_Plan: '上传',
          Category: '可租',
          Unit_Number: 'E:102',
          Plan: '下载',
          Unit_Area: '2666.12',
          remarks: '备注'
        }, {
          No: 'A10',
          Public_Security_No: '10栋',
          Building_Number: 'B01',
          Ground_Construction_Area: '2866.15',
          Floor: 'A10-1',
          Floor_Plan: '上传',
          Category: '可租',
          Unit_Number: 'E:102',
          Plan: '下载',
          Unit_Area: '2666.12',
          remarks: '备注'
        }
      ],
      tableData: [],
      pages: {
        page: 1,
        limit: 10
      },
      total: 20,
      rowIndex: '-1',
      OrderIndexArr: [],
      floorArr: []
    }
  },
  created() {
    const { page, limit } = this.pages
    this.getTableData(limit, page)
  },
  mounted() {},
  methods: {
    merge() {
      const OrderObj = {}
      const floorObj = {}
      this.tableData.forEach((element, index) => {
        element.rowIndex = index
        // pkId
        if (OrderObj[element.pkId]) {
          const nextItem = this.tableData[index + 1]
            ? this.tableData[index + 1].pkId
            : undefined
          const prevItem = this.tableData[index - 1].pkId
            ? this.tableData[index - 1].pkId
            : undefined
          if (element.pkId === nextItem) {
            OrderObj[element.pkId].push(index)
          } else if (element.pkId === prevItem) {
            OrderObj[element.pkId].push(index)
          }
        } else {
          OrderObj[element.pkId] = []
          OrderObj[element.pkId].push(index)
        }

        // Floor
        if (floorObj[element.floorNo]) {
          const nextPro = this.tableData[index + 1]
            ? this.tableData[index + 1].floorNo
            : undefined
          const prevPro = this.tableData[index - 1].floorNo
            ? this.tableData[index - 1].floorNo
            : undefined
          if (element.floorNo === nextPro) {
            floorObj[element.floorNo].push(index)
          } else if (element.floorNo === prevPro) {
            floorObj[element.floorNo].push(index)
          }
        } else {
          floorObj[element.floorNo] = []
          floorObj[element.floorNo].push(index)
        }
      })

      // 将数组长度大于1的值 存储到this.OrderIndexArr（也就是需要合并的项）
      for (const k in OrderObj) {
        if (OrderObj[k].length > 1) {
          this.OrderIndexArr.push(OrderObj[k])
        }
      }

      for (const i in floorObj) {
        if (floorObj[i].length > 1) {
          this.handleData(floorObj[i])
        }
      }
    },
    handleData(data) {
      const temp = data
      let itemArr = []
      let itemArrNew = []

      if (data.length > 2) {
        for (let i = 0; i < data.length; i++) {
          if (data[i + 1]) {
            if (data[i + 1] - data[i] > 1) {
              itemArr = data.slice(0, i + 1)
              itemArrNew = temp.slice(i + 1, temp.length)
              break
            }
          }
        }
        if (itemArr.length > 0 || itemArrNew.length > 0) {
          this.floorArr.push(itemArr)
          this.floorArr.push(itemArrNew)
        } else {
          this.floorArr.push(data)
        }
      } else {
        this.floorArr.push(data)
      }
    },
    TEMPLATE_FROM_EDIT() {
      const URL = `#/templateFormTableAddPopup?primaryCode=269`
      layerOpenWindow('编辑', URL, '1000px', '600px', function() {})
    },
    paginationsChange(obj) {
      this.pages.page = obj.page
      this.pages.limit = obj.limit
      const { page, limit } = this.pages
      this.getTableData(limit, page)
    },
    getTableData(pageSize = 10, curPage = 1) {
      const URL = `http://58.211.245.60:9080/eipserver/investmentAssetAction/search.do?pageSize=${pageSize}&curPage=${curPage}`
      return new Promise((resolve, reject) => {
        axios({
          url: URL,
          method: 'get'
        }).then(response => {
          const data = response.data
          this.tableData = data.dataContent
          this.total = data.totalCount

          this.$nextTick(() => {
            this.merge()
          })
          resolve(response.data)
        })
      })
    },
    renderHeader(h, { column, $index }) {
      return h('div', {
        attrs: {
          class: 'cell'
        },
        domProps: {
          innerHTML: '地上建筑面积' + '<br/>' + '(产权面积)'
        }
      })
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 1 || columnIndex === 2 || columnIndex === 3 || columnIndex === 11) {
        for (let i = 0; i < this.OrderIndexArr.length; i++) {
          const element = this.OrderIndexArr[i]
          for (let j = 0; j < element.length; j++) {
            const item = element[j]
            if (rowIndex === item) {
              if (j === 0) {
                return {
                  rowspan: element.length,
                  colspan: 1
                }
              } else if (j !== 0) {
                return {
                  rowspan: 0,
                  colspan: 0
                }
              }
            }
          }
        }
      }

      if (columnIndex === 4) {
        for (let j = 0; j < this.floorArr.length; j++) {
          const element = this.floorArr[j]
          for (let k = 0; k < element.length; k++) {
            const item = element[k]
            if (rowIndex === item) {
              if (k === 0) {
                return {
                  rowspan: element.length,
                  colspan: 1
                }
              } else if (k !== 0) {
                return {
                  rowspan: 0,
                  colspan: 0
                }
              }
            }
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.ttable-section{
  background-color: #fff;
  padding: 20px;
  margin-top: 20px;
}
</style>
