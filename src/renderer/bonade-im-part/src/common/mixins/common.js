/*
 * @Author: YanQi
 * @Date: 2020-06-24 11:38:49
 * @Last Modified by: YanQi
 * @Last Modified time: 2020-06-24 14:00:35
 */
export const common = {
  data() {
    return {

    };
  },
  methods: {
    // 提示框
    toast(msg, type) {
      this.$message({
        message: msg,
        type: type === 1 ? 'success' : 'error',
        duration: 2500
      });
    },
    // 数组去重
    unique5(arr) {
      var x = new Set(arr);
      return [...x];
    },
    /**
    * 清除字符串中的空字符
    * @param {*} val
    */
    clearEmpty(val) {
      val = val.replace(/\s*/g, ''); // s*空格
      return val;
    }
  }
};
