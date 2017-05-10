import * as DATA from './data'
import echarts from 'echarts'


let $clear = document.getElementById('clear')
$clear.addEventListener('click', () => {
    DATA.clearAll()
})

let endDate = new Date()
let startDate = new Date()
startDate.setDate(-2)

let chart = echarts.init(document.getElementById('chart'))
chart.showLoading()
DATA.getTreeMapData(startDate, endDate).then(treeMapData => {
    // treeMapData.forEach(item => {
    //     delete item['duration']
    // })    
    chart.hideLoading()
    chart.setOption({
        title: {
            text: 'Day',
            left: 'center'
        },
        tooltip: {
            formatter: function({data}) {
                console.log(data)
                return `<div>name: ${data.name}</div>
                          <div>path: ${data.path}</div>
                          <div>duration: ${data.value}</div>
                        `
            }
        },
        series: [
            {
                name: 'Disk Usage',
                type: 'treemap',
                visibleMin: 300,
                leafDepth: 1,
                label: {
                    show: true,
                    formatter: '{b}'
                },
                itemStyle: {
                    normal: {
                        borderColor: '#fff'
                    }
                },
                data: treeMapData
            }
        ]
    })
})