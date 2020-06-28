<template>
  <div class="fd-radio-group">
    <div v-for="(item,index) in items" :key="index" class="radio-item">
      <div class="radio-item__inner">
        <div class="radio-box-label" @click="changeHanlder(index)">
          <div class="radio-box" :class="{ 'is-checked':item.choose }">
            <span class="radio__inner" />
          </div>
          <span class="label">默认选项</span>
        </div>
        <div class="radio-edit-content">
          <el-input v-model="items[index].content" />
          <i v-if="(items.length-1)!== 0" class="el-icon-delete" @click="deleteHandler(index)" />
          <i v-if="items.length-1 === index" class="el-icon-plus" @click="addHandler" />
        </div>
      </div>
      <p v-if="!item.content" class="radio-item__error">
        选项名不能为空
      </p>
    </div>
  </div>
</template>

<script>
const EVENT_INPUT = 'input'
export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop
    value: {
      type: Array
    }
  },
  data() {
    return {
      items: []
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(newValue, oldValue) {
        this.items = this.value.concat()
      }
    }
  },
  methods: {
    changeHanlder(index) {
      this.items.map(item => { item.choose = false })
      this.$set(this.items[index], 'choose', true)
      this.$emit(EVENT_INPUT, this.items)
    },
    deleteHandler(index) {
      this.items.splice(index, 1)
      this.$emit(EVENT_INPUT, this.items)
    },
    addHandler() {
      this.items.push({ 'content': '', 'choose': false })
      this.$emit(EVENT_INPUT, this.items)
    }
  }
}
</script>

<style lang="scss" scoped>
.fd-radio-group{
  .radio-item{
    margin-bottom: 10px;
    .radio-item__error{
      color: #FF6750;
      word-break: break-all;
      font-size: 12px;
      line-height: 1;
      padding-top: 4px;
    }
    .radio-item__inner{
      display: flex;
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
        i{
          padding-left: 10px;
          cursor: pointer;
        }
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
