<template>
  <div class="card-label-box">
    <el-row v-for="(item, itemIndex) in data" :key="item.id" type="flex" align="center" class="card-label-item">
      <el-col :span="7">
        <el-row type="flex" align="center">
          <el-col :span="4">
            <el-image
              class="head-img"
              :src="item.img"
              fit="fit"
            />
          </el-col>
          <el-col class="head-info" :span="20">
            <el-row type="flex" align="center">
              <div class="head-name">{{ item.title }}</div>
              <div class="head-area">{{ `${item.address.province}·${item.address.city}·${item.address.area}` }}</div>
            </el-row>
            <el-col class="head-info-text">{{ item.info }}</el-col>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="14">
        <div class="card-item-box">
          <div v-for="label of item.label" :key="label.name" class="label-item">
            <div class="label-name">{{ label.name }}</div>
            <el-row align="center">
              <el-tag v-for="value of label.value" :key="value" type="info" size="small" class="label-tag">{{ value }} {{ item.showLeft? 123123: 321312 }}</el-tag>
            </el-row>
          </div>
        </div>

      </el-col>
      <el-col :span="3" class="button-box">
        <div @mouseenter="enterButton(itemIndex)">
          <transition name="el-fade-in-linear">
            <el-button
              v-if="!item.showLeft"
              icon="el-icon-d-arrow-left"
              type="danger"
              circle
              class="button-box-right"
            />
          </transition>
        </div>
        <div @mouseleave="enterButton(itemIndex)">
          <transition name="el-fade-in-linear">
            <div v-if="item.showButton" class="button-item-box">
              <el-button size="small" type="primary">编辑</el-button>
              <el-button size="small" type="primary">删除</el-button>
            </div>
          </transition>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Index',
  props: {
    data: {
      type: Array,
      default() {
        return [
          {
            id: '1',
            img: 'https://cn.vuejs.org/images/logo.png',
            title: '张丽丽里惺惺相惜下嘻嘻嘻嘻',
            address: {
              province: '江苏',
              city: '苏州',
              area: '吴中区'
            },
            info: '投资机构机构机构机构及给投资机构机构机构机构及给投资机构机构机构机构及给投资机构机构机构机构及给投资机构机构机构机构及给投资机构机构机构机构及给投资机构机构机构机构及给',
            label: [
              {
                name: '偏好轮次',
                value: ['种子轮', '天使轮1', '天使轮2', '天使轮3', '天使轮4', '天使轮5', '天使轮6', '种子轮7', '天使轮8', '天使轮9', '天使轮10', '天使轮11', '天使轮12', '天使轮13', '种子轮14', '天使轮15']
              },
              {
                name: '投资偏好',
                value: ['互联网', '电信业务', '电影', '广播电视业务', '电子和光盘1', '电子和光盘3', '电子和光盘4']
              }
            ]
          },
          {
            id: '2',
            img: 'https://cn.vuejs.org/images/logo.png',
            title: '张丽丽里惺惺相惜下嘻嘻嘻嘻',
            address: {
              province: '江苏',
              city: '苏州',
              area: '吴中区'
            },
            info: '投资机构机构机构机构及给投资机构机构机构机构及给投资机构机构机构机构及给投资机构机构机构机构及给投资机构机构机构机构及给投资机构机构机构机构及给投资机构机构机构机构及给',
            label: [
              {
                name: '偏好轮次',
                value: ['种子轮']
              },
              {
                name: '投资偏好',
                value: ['互联网', '电信业务', '电影', '广播电视业务']
              }
            ]
          }
        ]
      }
    }
  },
  data() {
    return {
      showButton: false,
      showLeft: true
    }
  },
  methods: {
    enterButton(e) {
      if (this.data[e].showLeft) {
        this.$set(this.data[e], 'showButton', false)
        setTimeout(() => {
          this.$set(this.data[e], 'showLeft', false)
        }, 300)
      } else {
        this.$set(this.data[e], 'showLeft', true)
        setTimeout(() => {
          this.$set(this.data[e], 'showButton', true)
        }, 300)
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .card-label-box{
    background: #ffffff;
    padding: 10px 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    width: 100%;
    .card-label-item{
      border-bottom: 1px solid #dcdfe6;
      margin-top: 10px;
    }
    .card-label-item:last-child{
      border-bottom: none;
    }
    .head-img{
      border-radius: 50%;
      width: 60px;
      height: 60px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    }
    .head-info{
      display: flex;
      flex-direction: column;
      padding: 10px;
      .head-name{
        color: #333333;
        font-weight: bold;
        border-right: 2px solid #333;
        padding-right: 10px;
        margin-right: 10px;
        max-width: 100px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .head-area{
        color: #666;
        font-size: 15px;
      }
      .head-info-text{
        color: #666;
        font-size: 15px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-top: 10px;
      }
    }
    .card-item-box{
      padding: 6px 0px;
      .label-item{
        display: flex;
        align-items: flex-start;
        .label-name{
          font-size: 15px;
          color: #999;
          margin-right: 10px;
          white-space: nowrap;
        }
        .label-tag{
          margin-right: 10px;
          margin-bottom: 10px;
        }
      }
      .label-item:first-child{
        margin-top: 0px;
      }
    }
    .button-box{
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .button-box-right{
        margin-right: 20px;
      }
      .button-item-box{
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .el-button+.el-button{
        margin-left: 0px;
        margin-top: 10px;
      }
    }
  }
</style>
