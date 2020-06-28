<template>
  <div class="fd-project-view">
    <div class="section-content">
      <div
        v-for="(item,index) in menuList"
        :key="index"
        class="common-modules-detail notes_text"
        :data-id="item.id"
      >
        <Title :value-title="item.name" c-height="20" />
        <div class="inner">
          <div v-if="item.type==='custom'">
            <slot :name="'custom'+item.id" />
          </div>
          <div v-else>
            <div v-if="item.type==='form'">form</div>
            <div v-if="item.type==='table'">table</div>
          </div>
        </div>
      </div>
    </div>
    <div ref="lys" class="left fixed-asider-menu">
      <div>
        <div id="chap_nav" class="side_nav">
          <ul v-for="NItem1 in menuList" :key="NItem1.id" class="side_nav_level1">
            <li :id="'lNav'+ NItem1.id" class="first_li">
              <span v-if="NItem1.childList.length>0" class="first_li_title" :style="styleObject">{{ NItem1.name }}</span>
              <span
                v-else
                class="first_li_title first_li_title_cur"
                :style="styleObject"
                :class="{'li_a_red':isshow==NItem1.id}"
                @click="jump(NItem1.id)"
              >{{ NItem1.name }}</span>
              <ul class="side_nav_level2">
                <li v-for="NItem2 in NItem1.childList" :id="'lNav'+ NItem2.id" :key="NItem2.id">
                  <a :class="{'a_red':isshow==NItem2.id}" @click="jump(NItem2.id)">{{ NItem2.name }}</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Title from '@/components/Title/title'
import { menu } from '../mock/rightMenu.js'
import { modelData } from '../mock/modelData.js'
export default {
  components: { Title },
  data() {
    return {
      menuList: [],
      styleObject: {
        height: '26px',
        lineHeight: '26px',
        fontSize: '12px'
      },
      scrollTop: '',
      UnderTitle: '', // 左边导航栏的状态判断，其中isshow为true且id相符时，显示
      scroll: '', // 存储滚动条的高度
      isshow: 500401 // 默认导航栏小图标不显示，点击之后显示
    }
  },
  watch: {
    scroll(val) {
      this.loadSroll()
    }
  },
  created() {},
  mounted() {
    const data = modelData.dataContent
    this.menuList = menu.data
    for (let i = 0; i < this.menuList.length; i++) {
      this.menuList[i].Lists = data[i].children
    }
    const arr = menu.data
    const clientHeight = document.body.clientHeight - 120
    const h = clientHeight / (arr.length + 1)
    if (arr.length > 5) {
      this.$nextTick(() => {
        this.styleObject = {
          height: `${h}px`,
          lineHeight: `${h}px`,
          fontSize: '12px'
        }
      })
    }
    window.addEventListener('scroll', this.menu, false) // 在mounted钩子中给window添加一个滚动监听事件
  },
  methods: {
    menu() {
      this.scroll = document.documentElement.scrollTop
    },
    jump(index) {
      // 平滑滚动的方法
      this.isshow = index // 使左边导航出现相应的样式
      const divArr = document.querySelectorAll('.notes_text') // 获取右边的div数组
      let index1 = null
      for (let i = 0; i < divArr.length; i++) {
        const OrderId = divArr[i].getAttribute('data-id')
        if (OrderId === String(index)) {
          index1 = i
        }
      }
      const total = divArr[index1].offsetTop // 获取第index个div到窗口顶部的距离
      let distance = document.documentElement.scrollTop
      // 平滑滚动的效果，把总距离分成50个小段，每10ms执行一次
      let step = total / 50
      if (total > distance) {
        // 当divArr.[index]offsetTop的距离>滚动条的距离，向下滑动，此时滑动的距离是total
        smoothDown() // 向下滑动
      } else {
        const newTotal = distance - total // 当div到窗口的距离<滚动条的距离，向上滑动，此时滑动的距离是distance - total
        step = newTotal / 50
        smoothUp()
      }

      // 向下滑动
      function smoothDown() {
        if (distance < total) {
          distance = distance + step
          document.documentElement.scrollTop = distance
          setTimeout(smoothDown, 10)
        } else {
          document.documentElement.scrollTop = total
        }
      }

      // 向上滑动
      function smoothUp() {
        if (distance > total) {
          distance -= step
          document.documentElement.scrollTop = distance
          setTimeout(smoothUp, 10)
        } else {
          document.documentElement.scrollTop = total
        }
      }
    },
    loadSroll() {
      const divArr = document.querySelectorAll('.notes_text') // 获取右边div的数组
      for (let i = 0; i < divArr.length; i++) {
        if (this.scroll >= divArr[i].offsetTop - 10) {
          // 这里其实可以减去一个数值，使其左边的导航栏的样式提前出现，我这里是减去了top栏的高度。
          const OrderId = divArr[i].getAttribute('data-id')
          this.UnderTitle = { id: OrderId, isshow: true }
          this.isshow = OrderId
          const lOffsetTop =
            document.getElementById('lNav' + OrderId).offsetTop + 70 // 获取li到窗口的距离
          if (lOffsetTop > 414) {
            // 当li的offsetTop大于300时，滚动条需要下滑，因为整个div的高度为350px,所以我这里设置了300
            this.$refs.lys.scrollTop = lOffsetTop // 使子滚动条的滚动高度，等于lOffsetTop
          } else {
            this.$refs.lys.scrollTop = 0 // 在不大于300的情况下，子滚动条的高度为0.
          }
        }
      }
    }
  }
}
</script>

<style lang="scss">
.fd-project-view{
  margin-top: -2px;
  margin-right: 160px;
  height: 100%;
  position: relative;
  .common-modules-detail{
    margin-top: 16px;
    background-color: #fff;
    .inner {
      padding: 0px 21px 20px 21px;
      height: 250px;
    }
  }
  // 滚动监听 end
  .a_red {
    color: #b40005 !important;
  }
  .fixed-asider-menu {
    position: fixed;
    right: 16px;
    top: 113px;
    background-color: #fff;
    width: 144px;
    box-sizing: border-box;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 0 10px;
    .side_nav {
      .side_nav_level1 {
        margin: 0;
        .first_li {
          display: flex;
          flex-direction: column;
          &:last-child .side_nav_level2 {
            border-bottom: none;
          }
          .side_nav_level2 {
            border-bottom: 2px dotted #f2f2f2;
            li {
              padding-left: 37px;
              height: 36px;
              line-height: 36px;
              position: relative;
              &+li {
                border-top: 2px dotted #f2f2f2;
              }
              a {
                display: inline-block;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                width: 90px;
                font-size: 14px;
                &::after {
                  content: ".";
                  color: #333;
                  position: absolute;
                  left: 23px;
                  top: -6px;
                  font-size: 24px;
                }
              }
              .a_red {
                &::after {
                  color: #b40005 !important;
                }
              }
            }
          }
          .first_li_title_cur {
            cursor: pointer;
          }
          .li_a_red {
            color: #b40005 !important;
            &::after {
              color: #b40005 !important;
            }
          }
          .first_li_title {
            height: 36px;
            line-height:36px;
            padding: 0 0 0 19px;
            border-bottom: 2px dotted #f2f2f2;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            position: relative;
            font-size: 14px;
            &::after {
              content: ".";
              color: #333;
              position: absolute;
              left: 5px;
              top: -6px;
              font-size: 24px;
            }
          }
        }
      }
    }
  }
}
</style>
