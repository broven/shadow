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
import {formatDate} from './util'
import {debug} from "./log"
import * as pojo from "./pojo/dataStruct"
let data = chrome.storage.local

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
      let time:pojo.timeTrack = {
      duration:duration,
      startTime:startTime,
      endTime:endTime,
      path:path,
      title:title
    }
      if(val[today] === undefined) {
        debug(`${today} is empty, set new`)
        val[today] = new Object()
      }
      let originData = val[today][origin]
      // 如果没有数据
      if(originData === undefined) {
        let website:pojo.website = {
          info:{
            title:'',
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
 * 
 * @export
 * @param {any} key 要读的内容
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
