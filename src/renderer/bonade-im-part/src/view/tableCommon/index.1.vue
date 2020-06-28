<template>
  <div class="ttable-section tableCommon">
    <div class="fd-button-nav fd-button-bottom">
      <el-button size="mini" @click="TEMPLATE_FROM_ADD('1',true)">新增</el-button>
      <el-button size="mini" @click="TEMPLATE_FROM_EDIT()">编辑</el-button>
      <el-button size="mini" @click="TEMPLATE_FROM_VIEW()">查看</el-button>
    </div>
    <div>
      <el-table
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column
          prop="Public_Security_No"
          label="公安编号"
          width="76"
        />
        <el-table-column
          prop="Building_Number"
          label="建筑编号"
          width="76"
        />

        <el-table-column
          prop="Ground_Construction_Area"
          :render-header="renderHeader"
          width="128"
        />
        <el-table-column
          prop="Floor"
          label="楼层"
          width="48"
        />
        <el-table-column
          prop="Floor_Plan"
          label="楼层平面图"
          width="96"
        />
        <el-table-column
          prop="Category"
          label="类别"
          width="48"
        />
        <el-table-column
          prop="Unit_Number"
          label="单元编号"
          width="78"
        />
        <el-table-column
          prop="Plan"
          label="单元平面图"
          width="98"
        />
        <el-table-column
          prop="Unit_Area"
          label="单元面积"
          width="98"
        />
        <el-table-column
          prop="remarks"
          label="备注"
        />
        <el-table-column
          label="操作"
          width="85"
        >
          <!-- slot-scope="scope" -->
          <template>
            <div class="fd-buttons-icon">
              <!-- <i class="el-icon-edit" :class="{'is-disabled':true}" />
              <img src="@/assets/layout/dottot.png" alt="" class="img-dottot">
              <i class="el-icon-delete" /> -->
            </div>
          </template>
        </el-table-column>
      </el-table>

      <pagination
        :total="total"
        :page.sync="pages.page"
        :limit.sync="pages.limit"
      />
    </div>
  </div>

</template>

<script>
import pagination from '@/components/pagination/pagination.vue'
import axios from 'axios'
export default {
  components: {
    pagination
  },
  data() {
    return {
      tableData: [{
        Public_Security_No: '7栋',
        Building_Number: 'C01',
        Ground_Construction_Area: '2666.15',
        Floor: '1',
        Floor_Plan: '上传',
        Category: '可租',
        Unit_Number: 'E:102',
        Plan: '下载',
        Unit_Area: '2666.12',
        remarks: '备注'
      }, {
        Public_Security_No: '7栋',
        Building_Number: 'C01',
        Ground_Construction_Area: '2666.15',
        Floor: '1',
        Floor_Plan: '上传',
        Category: '可租',
        Unit_Number: 'E:102',
        Plan: '下载',
        Unit_Area: '2666.12',
        remarks: '备注'
      }, {
        Public_Security_No: '7栋',
        Building_Number: 'C01',
        Ground_Construction_Area: '2666.15',
        Floor: '1',
        Floor_Plan: '上传',
        Category: '可租',
        Unit_Number: 'E:102',
        Plan: '下载',
        Unit_Area: '2666.12',
        remarks: '备注'
      }],
      pages: {
        page: 1,
        limit: 10
      },
      total: 20
    }
  },
  created() {
    this.getTableData()
  },
  methods: {
    getTableData() {
      const URL = `http://58.211.245.60:9080/eipserver/investmentAssetAction/search.do`
      return new Promise((resolve, reject) => {
        axios({
          url: URL,
          method: 'get'
        }).then(response => {
          resolve(response.data.dataContent)
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
