<template>
  <div class="form-container">
    <table-cmp
      :table-data="tableData"
      :table-label="tableLabel"
      :table-option="tableOption"
      @handleButton="handleButton"
      @handleSelectionChange="handleSelectionChange"
    />
    <page-nation :total="page_total" :page.sync="page_index" :limit.sync="page_size" @pageChange="pageChange" />
  </div>
</template>

<script>
export default {
  components: {
    tableCmp: () => import('@/components/tables/table'),
    pageNation: () => import('@/components/pagination/pagination')
  },
  data() {
    return {
      page_index: 1,
      page_total: 25,
      page_size: 10,
      tableData: [
        {
          userName: '张三',
          company: '苏州随便起名字公司',
          email: 'suibianqidemingzi@163.com',
          registTime: '1586844409000',
          remark: '这是一段简介，这是一段简介，这是一段简介，这是一段简介，这是一段简介，这是一段简介，这是一段简介，这是一段简介，这是一段简介，这是一段简介。',
          status: 0
        },
        {
          userName: '张三',
          company: '苏州随便起名字公司',
          email: 'suibianqidemingzi@163.com',
          registTime: '1586844111000',
          remark: '这是一段简介，这是一段简介，这是一段简介，这是一段简介，这是一段简介，这是一段简介，这是一段简介，这是一段简介，这是一段简介，这是一段简介。',
          status: 1
        },
        {
          userName: '张三',
          company: '苏州随便起名字公司',
          email: 'suibianqidemingzi@163.com',
          registTime: '1586843111000',
          remark: '这是一段简介，这是一段简介，这是一段简介，这是一段简介，这是一段简介，这是一段简介，这是一段简介，这是一段简介，这是一段简介，这是一段简介。',
          status: 2
        }
      ],
      tableLabel: [
        { label: '姓名', param: 'userName', align: 'center' },
        { label: '公司名称', param: 'company', align: 'center' },
        { label: '办公邮箱', param: 'email', align: 'center', width: '200' },
        { label: '注册时间', param: 'registTime', align: 'center', width: '200', sortable: true, render: (row) => {
          const time = parseInt(row.registTime)
          const date = new Date(time)
          const Y = date.getFullYear()
          let m = date.getMonth() + 1
          let d = date.getDate()
          let H = date.getHours()
          let i = date.getMinutes()
          let s = date.getSeconds()
          if (m < 10) {
            m = '0' + m
          }
          if (d < 10) {
            d = '0' + d
          }
          if (H < 10) {
            H = '0' + H
          }
          if (i < 10) {
            i = '0' + i
          }
          if (s < 10) {
            s = '0' + s
          }
          const t = Y + '-' + m + '-' + d + ' ' + H + ':' + i + ':' + s
          return t
        } },
        { label: '审核状态', param: 'status', align: 'center', sortable: true, render: (row) => {
          if (row.status === 0) {
            return '未审核'
          } else if (row.status === 1) {
            return '审核通过'
          } else if (row.status === 2) {
            return '审核不通过'
          } else {
            return '禁用'
          }
        } },
        { label: '备注', param: 'remark', align: 'center', tooltip: true }
      ],
      tableOption: {
        label: '操作',
        width: '200',
        options: [
          {
            id: '1',
            label: '编辑',
            type: 'info',
            icon: 'el-icon-edit',
            method: (index, row) => {
              this.handleEdit(index, row)
            }
          },
          {
            id: '2',
            label: '删除',
            type: 'danger',
            icon: 'el-icon-delete',
            method: (index, row) => {
              this.handleDel(index, row)
            }
          }
        ]
      }
    }
  },
  mounted() {
  },
  methods: {
    // 选中行
    handleSelectionChange(val) {
      console.log('val:', val)
    },
    // 编辑
    handleEdit(index, row) {
      console.log(' index:', index)
      console.log(' row:', row)
    },
    // 删除
    handleDel(index, row) {
      console.log(' index:', index)
      console.log(' row:', row)
    },
    pageChange(item) {
      console.log(item)
      this.page_index = item.page
      this.page_size = item.limit
    },
    handleButton(val) {
      console.log(val)
    }
  }
}

</script>

<style lang="scss" scoped>
  .form-container{
    padding: 40px;
    background-color: #fff;
  }

</style>

