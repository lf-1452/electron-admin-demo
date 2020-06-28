import defaultsDeep from 'lodash/defaultsDeep'

const pieBaseConfig = {
  title: {
    text: '饼图统计',
    subtext: '饼图统计',
    left: 'center'
  },
  toolbox: {
    feature: {

    }
  },
  tooltip: {
    trigger: 'item',
    formatter: '{b} ({d}%)',
    extraCssText:
			'background : #ffffff;border: 1px solid #DFE3E9; box-shadow: 0 2px 6px 0 rgba(0,0,0,0.10);color:rgb(51, 51, 51);'
  },
  legend: {
    type: 'scroll',
    bottom: 10,
    left: 'center',
    data: []
  },
  series: [
    {
      type: 'pie',
      radius: '73',
      center: ['50%', '50%'],
      selectedMode: 'single',
      color: [
        '#8B8DFD',
        '#F0E21A',
        '#64BFFA',
        '#0071BC',
        '#55C6C5',
        '#F8AAC4',
        '#FDB252',
        '#F6857E',
        '#6FD6E3',
        '#71CF7F',
        '#5B9DF3',
        '#D990E3'
      ],
      hoverAnimation: false,
      data: [],
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
}

export default function(legendData, seriesData, title, canSave) {
  let seriesOption = []
  const option = {
    value: 0,
    name: '',
    label: {
      normal: {
        formatter: '{c}-{b|{b}}{per|{d}%}  ',
        rich: {
          b: {
            color: '#666666',
            fontSize: 12,
            lineHeight: 20,
            padding: [2, 4]
          },
          per: {
            color: '#666666',
            fontSize: 12
          }
        }
      }
    }
  }
  if (seriesData && seriesData.length > 0) {
    for (let i = 0, j = seriesData.length; i < j; i++) {
      const _option = defaultsDeep({}, option)
      _option.value = seriesData[i].value
      _option.name = seriesData[i].name
      seriesOption.push(_option)
    }
  } else {
    seriesOption = [option]
  }
  if (canSave) {
    pieBaseConfig.toolbox.feature.saveAsImage = {}
  }
  return defaultsDeep(
    {
      legend: {
        data: legendData
      },
      series: [
        {
          data: [...seriesOption]
        }
      ],
      title
    },
    pieBaseConfig
  )
}
