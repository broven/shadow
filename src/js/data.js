import * as dateUtil from './date'
import Logger from './logger'
import * as utils from './utils'
let logger = new Logger('Data')
const data = chrome.storage.local


/**
 * 
 * @param {Date} startDate 
 * @param {Date} endDate 
 */
export function getTreeMapData(startDate, endDate) {

}


/**
 * 
 * @param {Date} startDate 
 * @param {Date} endDate 
 */
export function getDataByDateGap(startDate, endDate) {
  return new Promise((resolve, reject) => {
    const dateGap = dateUtil.dateGap(startDate, endDate)
    getData(dateGap).then(records => {
      resolve(deepMerge(records))
    })
  })
}

/**
 * merge the multiple date data
 * @param {Object} obj 
 */
function deepMerge(obj) {
  let sumObj = {}
  for (let date in obj) {
    let oneDayData = obj[date]
    for (let websiteName in oneDayData) {
      utils.objHas(sumObj, websiteName) ? mergeWebsite(sumObj[websiteName], oneDayData[websiteName]) : sumObj[websiteName] = oneDayData[websiteName]
    }
  }
  return sumObj
  /**
   * merge WebsiteData
   * @param {Object} obj
   * @param {Object} mergeIntoObj 
   */
  function mergeWebsite(obj, mergeIntoObj) {
    for (let records in mergeIntoObj) {
      utils.objHas(obj, records) ? mergeRecords(obj[records], mergeIntoObj[records]) : obj[records] = mergeIntoObj[records]
    }
  }
  /**
   * 合并网站记录
   * @param {Object} obj 
   * @param {Object} mergeIntoObj 
   */
  function mergeRecords(obj, mergeIntoObj) {
    if (!utils.objHas(obj, 'duration')) return
    obj.duration += mergeIntoObj.duration
  }
}

/**
 * 设置新的记录, 累加duration
 * @param {Date} date 
 * @param {String} websiteName 
 * @param {String} path 
 * @param {Int} duration 
 */
export function setRecord(date, websiteName, path, title, duration) {
  date = dateUtil.formatDate(date)
  getData(date).then(records => {
    if (records[date] === undefined) records[date] = {}
    if (records[date][websiteName] === undefined) records[date][websiteName] = {}
    if (records[date][websiteName][path] === undefined) records[date][websiteName][path] = {
      title: title,
      duration: 0
    }
    let website = records[date][websiteName]

    if (path === '/' && website['_info'] === undefined) website['_info'] = { title: title }
    website[path]['duration'] += duration
    data.set(records)
  })
}

/**
 * 清除数据
 * @param {Date} startDate 
 * @param {Date} endDate 
 */
export function clearData(startDate, endDate) {

}

/**
 * 清除所有数据
 */
export function clearAll() {
  logger.info('clear All data')
  data.clear()
}

function getUsage() {
  // data.getBytesInUse  // A single key or list of keys to get the total usage for. An empty list will return 0. Pass in null to get the total usage of all of storage.
}
/**
 * 获取数据
 * @param {String} {Array} key 要读的内容,null为所有
 * @returns {key: value}
 */
export function getData(key) {
  return new Promise(function (resolve, reject) {
    data.get(key, function (item) {
      resolve(item)
    })
  })
}

