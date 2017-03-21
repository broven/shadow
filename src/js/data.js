/**
 * www.baidu.com:{
 *  info: {
 *    title: '百度一下,你就知道'
 *  },
 *  timeTrack: [
 *    {path:'/path', title: 'contentTitle', startTime: 2017/2/1 19:55, endTime: 2017/2/1 18:00}
 *  ]
 * }
 */
import { formatDate, sort } from './util'
import { subtract, getDays } from './date'
import { debug } from "./log"
let data = chrome.storage.local
/**
 * 获取数据,存储数据
 *  设置日期,
 *  获取当天数据
 *  设置当天数据
 *  设置当天某一网站的数据
 *  保存数据
 * @param {any} date
 */
export function DayData(date) {
  this.date = formatDate(date)
  this.todayData
}
DayData.prototype.getDataByDay = function getDataByDay() {
  return new Promise((resolve, reject) => {
    getData(this.date).then(val => {
       let todayData = val[this.date]
       todayData = todayData ? new Object() : todayData
        this.todayData = todayData
        resolve(todayData)
    })
  })
}
DayData.prototype.getDataByOrigin = function getDataByOrigin(origin) {
  return new Promise( (resolve, reject) => {
    this.getDataByDay().then(todayData => {
  let originData = this.todayData[origin]?
                    this.todayData[origin] :
                    {
                      info: {
                        title: '',
                        duration: 0
                      },
                      timeTrack: []
                    }
        // website.info.title = path === '/' ?  title : origin
        resolve(originData)
    })
  })
}


DayData.prototype.saveDuration = function (origin, duration) {
  this.getDataByOrigin(origin).then(val => {
    val.info.duration += duration
    this.saveOriginData(origin, val)
  })
}
/**
 *
 */
DayData.prototype.saveDayData = function(dataOfTheDay) {
  let temp = {}
  temp[this.today] = dataOfTheDay
  data.set(temp)
}
DayData.prototype.saveOriginData = function(origin, dataOfTheOrigin) {
  this.getDataByDay().then(dataOfTheDay => {
  dataOfTheDay[origin] = dataOfTheOrigin
    this.saveDayData(dataOfTheDay)
  })
}
DayData.prototype.setDataByRecords = function (origin, record) {
  this.getDataByOrigin(origin).then( val => {
    val.timeTrack.push(record)
    this.saveOriginData(origin ,val)
  })
}
/**
 *
 * 根据传递进来的日期返回顺序的时间使用数组
 * @export
 * @param {any} startDate
 * @param {any} endDate
 * @returns {Array<pojo.rankRecord>}
 */
export function getRecords(startDate, endDate) {
  startDate = new Date(startDate)
  endDate = new Date(endDate)
  if ((endDate - startDate) < 0) throw "endDate should bigger then startDate"
  let days = Math.round(getDays(subtract(endDate, startDate)))
  return new Promise((resolve, rejcet) => {
    getData(null).then(val => {
      let recordarr = []
      let records = {}
      for (let index = 0; index <= days; index++) {
        let currentDate = formatDate(new Date(startDate.getTime() + index * 24 * 3600 * 1000)) // 存储的天的名字 2016-02-14
        let currentDayRecord = val[currentDate]
        if (currentDayRecord !== undefined) {
          for (let currentProp in currentDayRecord) {
            let currentPropValue = currentDayRecord[currentProp]
            if (records[currentProp] === undefined) {
              records[currentProp] = { duration: 0, title: '' }
            }
            records[currentProp]['duration'] += currentPropValue['info']['duration']
            records[currentProp]['title'] = currentPropValue['info']['title']
          }
        }
      }
      resolve(sort(records, 'duration'))
    })
  })
}
/**
 *
 * 存储数据
 * @export
 * @param {any} title
 * @param {any} origin
 * @param {any} path
 * @param {Date} startTime
 * @param {Date} endTime
 * @param {any} duration
 */
export function saveRecord(title, origin, path, startTime, endTime, duration) {
const toadyData = new DayData(startTime)
let time = {
        duration: duration,
        startTime: startTime,
        endTime: endTime,
        path: path,
        title: title
      }
  toadyData.setDataByRecords(origin, time)
}

/**
 * 获取数据
 * @export
 * @param {any} key 要读的内容,null为所有
 * @returns
 */
export function getData(key) {
  return new Promise(function (resolve, reject) {
    data.get(key, function (item) {
      var length = Object.getOwnPropertyNames(item).length
      if (length === 0) {
        resolve({})
      } else {
        resolve(item)
      }
    })
  })
}

export function clear() {
  data.clear()
  debug(`all data clear`)
}

export function remove(origin) {
  data.remove(origin)
}
