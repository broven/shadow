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
function render(arr: Array<object>) {
// 清除之前的数据
let $list = $('#records')
let $listViewContent = ''
arr.forEach(item => {
  $listViewContent += `<li>${item.name} ${item.value}</li>`
})
console.log($listViewContent)
$list.html($listViewContent)


// 渲染新的数据
  option.series[0].data = arr
  let myChart = echarts.init(document.getElementById('chart'))
  myChart.setOption(option)
}

function init () {
  let today = new Date()
  getRecorders(today, today, Time.second)
    .then(render)
}
init()

var option = {
    tooltip : {
        trigger: 'item',
        position: 'right',
        confine: true,
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },

    visualMap: {
        show: false,
        min: 80,
        max: 600
    },
    series : [
        {
            name:'访问来源',
            type:'pie',
            radius : '90%',
            center: ['50%', '50%'],
            data:[
                {value:335, name:'直接访问'},
                {value:310, name:'邮件营销'},
                {value:274, name:'联盟广告'},
                {value:235, name:'视频广告'},
                {value:400, name:'搜索引擎'}
            ].sort(function (a, b) { return a.value - b.value}),
            label: {
                normal: {
                    show: false
                }
            },
            labelLine: {
                normal: {
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 0.3)'
                    },
                    smooth: 0.2,
                    length: 10,
                    length2: 20
                }
            },
            itemStyle: {
                normal: {
                    color: '#c23531',
                    shadowBlur: 30,
                    shadowColor: 'rgba(0, 0, 0, 0.3)'
                }
            },

            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
                return Math.random() * 200;
            }
        }
    ]
}

