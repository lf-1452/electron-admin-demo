export default {
  xAxis: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  series: [
    {
      name: '签单量',
      type: 'line',
      data: [20, 12, 30, 23, 31, 13, 1, 2, 7, 8, 7, 5],
      smooth: true,
      areaStyle: {}
    },
    {
      name: '完成量',
      type: 'line',
      data: [5, 18, 4, 223, 3, 13, 19, 29, 97, 87, 71, 5],
      smooth: true,
      areaStyle: {}
    },
    {
      name: '实际量',
      type: 'line',
      data: [5, 18, 4, 223, 3, 13, 19, 29, 97, 87, 71, 5],
      smooth: true,
      areaStyle: {}
    }
  ],
  title: {
    text: '数据展示123',
    subtext: '',
    left: 'center'
  },
  legend: ['签单量', '完成量', '实际量']
}
