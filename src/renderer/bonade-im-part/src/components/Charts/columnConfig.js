import defaultsDeep from 'lodash/defaultsDeep';
import cloneDeep from 'lodash/cloneDeep';

import echarts from 'echarts/lib/echarts';

const columnBaseConfig = {
  'title': {
    'text': '柱状图展示',
    'subtext': '柱状图展示',
    'left': 'center'
  },

  'xAxis': {
    'type': 'category',
    'data': [],
    'axisLabel': {
      'inside': false,
      'textStyle': {
        'color': '#999'
      },
      'rotate': -30,
      'fontSize': 10
    },
    'axisTick': {
      // show : false
    },
    'axisLine': {
      'show': true,
      'lineStyle': {
        'color': '#B0BDC9'
      }
    },
    'z': 10
  },
  'yAxis': {
    'type': 'value',
    'splitLine': {
      'show': false
    },
    'axisLine': {
      'show': true,
      'lineStyle': {
        'color': '#B0BDC9'
      }
    },
    'axisTick': {
      // show : false
    },
    'axisLabel': {
      'textStyle': {
        'color': '#999',
        'fontSize': '12px'
      }
    }
  },
  'toolbox': {
    'feature': {

    }
  },
  'tooltip': {
    'trigger': 'item',
    'textStyle': {
      'fontSize': 12
    }
  },
  'legend': {
    'data': ['签单量', '完成量'],
    'bottom': 10
  },
  'series': [
    {
      'barWidth': 14,
      'barMaxWidth': 14,
      'markLine': {

      }
    }
  ],
  'grid': {
    'bottom': 80
  }
};

const color = [
  '#ff69b4',
  '#ba55d3',
  '#cd5c5c',
  '#ffa500',
  '#40e0d0',

  '#1e90ff',
  '#ff6347',
  '#7b68ee',
  '#00fa9a',
  '#ffd700',

  '#6699FF',
  '#ff6666',
  '#3cb371',
  '#b8860b',
  '#30e0e0'
];

export default function(xAxisData, seriesData, legend, title, canSave) {
  let seriesOption = [];
  const option = {
    'type': 'bar',
    'barWidth': '20%',
    'itemStyle': {
      'normal': {
        'barBorderRadius': [4, 4, 0, 0],
        'color': new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { 'offset': 0, 'color': '#0055B8' },
          { 'offset': 1, 'color': '#00B8C2' }
        ])
      },
      'emphasis': {
        'color': new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { 'offset': 0, 'color': '#2378f7' },
          { 'offset': 1, 'color': '#83bff6' }
        ])
      }
    },
    'data': []
  };

  if (seriesData && seriesData.length > 0) {
    for (let i = 0, len = seriesData.length; i < len; i++) {
      const optiontemp = cloneDeep(option);

      optiontemp.data = seriesData[i].data;
      optiontemp.name = seriesData[i].name;
      // 添加一个颜色

      optiontemp.itemStyle.normal.color = color[i];
      optiontemp.itemStyle.emphasis.color = color[i + len];
      // optiontemp.itemStyle.normal.color = color[Math.floor(Math.random() * 15)];
      // optiontemp.itemStyle.emphasis.color = color[Math.floor(Math.random() * 15)];

      seriesOption.push(optiontemp);
    }
  } else {
    seriesOption = [option];
  }

  if (canSave) {
    columnBaseConfig.toolbox.feature.saveAsImage = {};
  }
  return defaultsDeep(
    {
      'xAxis': {
        'data': xAxisData
      },
      'series': seriesOption,
      title,
      'legend': {
        'data': legend
      }
    },
    columnBaseConfig
  );
}
