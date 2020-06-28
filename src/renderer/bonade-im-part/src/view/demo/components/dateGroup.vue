<template>
  <div class="fd-radio-group">
    <div v-for="(item,index) in items" :key="index" class="radio-item">
      <div class="radio-item__inner" @click="changeHanlder(index)">
        <div class="radio-box-label">
          <div class="radio-box" :class="{ 'is-checked':item.choose }">
            <span class="radio__inner" />
          </div>
        </div>
        <div class="radio-edit-content">
          <span>{{ item.label }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const EVENT_INPUT = 'input'
export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop
    value: [String]
  },
  data() {
    return {
      items: [
        {
          value: 'month',
          label: '月份（如: 2016年12月）',
          choose: false
        },
        {
          value: 'date',
          label: '日期（如: 2016年12月20日）',
          choose: false
        },
        {
          value: 'datetime',
          label: '时间＋日期（如: 2016年12月20日 15:57）',
          choose: false
        }
      ],
      valueDate: this.value || 'date'
    }
  },
  created() {
    this.items.map(item => {
      if (item.value === this.value) {
        item.choose = true
      }
    })
  },
  methods: {
    changeHanlder(index) {
      this.items.map(item => { item.choose = false })
      this.$set(this.items[index], 'choose', true)
      const value = this.items[index].value
      this.$emit(EVENT_INPUT, value)
    }
  }
}
</script>

<style lang="scss" scoped>
.fd-radio-group{
  .radio-item{
    margin-bottom: 10px;
    .radio-item__inner{
      display: flex;
      cursor: pointer;
      .radio-box-label{
        display: flex;
        align-items: center;
        cursor: pointer;
        .label{
          padding-left: 14px;
        }
      }
      .radio-edit-content{
        padding-left: 12px;
        display: flex;
        align-items: center;
      }
      .radio-box{
        border: 1px solid #E1E6EA;
        border-radius: 100%;
        width: 14px;
        height: 14px;
        background-color: #fff;
        cursor: pointer;
        box-sizing: border-box;
      }
      .is-checked{
        background: #694EC4;
        border-color: #694EC4;
        display: flex;
        align-items: center;
        justify-content: center;
        .radio__inner{
          background-color: #fff;
          border: 1px solid #fff;
          border-radius: 100%;
          width: 6px;
          height: 6px;
          cursor: pointer;
          box-sizing: border-box;
        }
      }
    }
  }
}
</style>
