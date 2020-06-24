/**
 * @Description: 全局滚动条插件配置
 * @author lidonghui
 * @date 2019/9/18
*/
const ops = {
  bar: {
    keepShow: false,    //滚动条是否保持显示
    onlyShowBarOnScroll: false,   //是否只在滚动时显示 bar
    showDelay: 0,   //在鼠标离开容器后多长时间隐藏滚动条
    background: '#d8d8d8',
    opacity: 1,
    hoverStyle: false,
    specifyBorderRadius: false,
    minSize: 0.2,   //为 bar 设置一个最小尺寸, 从0到1
    size: '6px',    // bar 的尺寸
    disable: false,
  }
};

export default {
  ops
}