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
import { formatDate } from './util'
import { subtract, getDays } from './date'
import { debug } from "./log"
import * as pojo from './pojo/dataStruct'
let data = chrome.storage.local


/**
 *
 *
 * @param {object} obj 需要排序的obj
 * @param {string} sortKey 根据这个key来进行排序
 * @return {array} 返回经过排序的数组,降序排列
 */
function sort(obj: Object, sortKey: string): Array<Object> {
  let sortArr: Array<Object> = []
  let firstCheck = true
  for (let key in obj) {
    if (firstCheck && !obj[key].hasOwnProperty(sortKey)) throw "sub Object don't have this prop"
    firstCheck = false
    sortArr.push(obj[key])
  }
  sortArr.sort((a, b) => {
    function key(obj) {
      return obj[sortKey]
    }
    return key(a) > key(b) ? -1 : 1
  })
  return sortArr
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
      let recordarr: Array<pojo.rankRecord>
      let records: object = {}
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
export function saveRecord(title, origin, path, startTime: Date, endTime: Date, duration) {
  let today = formatDate(startTime)
  getData(today).then(
    function (val) {
      let time: pojo.timeTrack = {
        duration: duration,
        startTime: startTime,
        endTime: endTime,
        path: path,
        title: title
      }
      if (val[today] === undefined) {
        debug(`${today} is empty, set new`)
        val[today] = new Object()
      }
      let originData = val[today][origin]
      // 如果没有数据
      if (originData === undefined) {
        let website: pojo.website = {
          info: {
            title: '',
            duration: 0
          },
          timeTrack: []
        }
        path === '/' ? website.info.title = title : website.info.title = origin
        originData = website
      } else {
        //如果有,解析下
        // originData = JSON.parse(originData)
      }
      originData.info.duration += duration
      originData.timeTrack.push(time)
      val[today][origin] = originData
      data.set(val)
    })
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
