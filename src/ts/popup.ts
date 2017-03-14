import * as api from './data'
import * as echarts from 'echarts'
import * as $ from 'jquery'
const today = new Date()
enum Time {
  second,
  hour,
  day
}
/**
 * 获取数据,对数据进行预处理, 决定显示时间的单位
 *
 * @param {any} startDate
 * @param {Date} endDate
 * @param {Time} timeFormat
 * @returns
 */
function getRecorders(startDate, endDate: Date, timeFormat: Time) {
  return new Promise((resolve, reject) => {
    api.getRecords(startDate, endDate).then(data => {
      data.forEach(item => {
        item.value = item.duration
        item.name = item.title
      })
      resolve(data)
    })
  })
}


function init () {
  let today = new Date()
  getRecorders(today, today, Time.second)
    .then(render)
}
init()



function render(arr: Array<object>) {

  arr.forEach(item => {
  option.series[0].data.unshift(item.value)
  option.yAxis.data.unshift(item.name)
  })
  let myChart = echarts.init(document.getElementById('chart'))
  myChart.setOption(option)
}


var option = {
    tooltip: {},
    grid: {
      show: false,
      left: '100px'
    },
    legend: {
        data:['柱状图', '矩形树图']
    },
    xAxis: {
        splitLine: {show: false},
        position: 'top'
    },
    yAxis:{
        data:[],
       splitLine: {show: false}
    },
    series: [{
        name: '柱状图',
        type: 'bar',
        data: []
    }]
}

