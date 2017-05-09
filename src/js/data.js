import * as dateUtil from './date'
import Logger from './logger'
import * as utils from './utils'
let logger = new Logger('Data')
const data = chrome.storage.local


/**
 * 生成层级统计数据
 * 格式:
 * [{
 * value: 2333,   //duration
 * name: 'github' //website title
 * children:[
 *      {
 *    value:123
 *    name: 'subdirname'
 *    path: '路径'
 *      }]
 * }]
 * @param {Date} startDate 
 * @param {Date} endDate 
 */
export function getTreeMapData(startDate, endDate) {
  return new Promise((resolve, reject) => {
    getDataByDateGap(startDate, endDate).then(records => {
      let tempArr = []
      for (let websiteUrl in records) {
        let websiteObj = records[websiteUrl]
        tempArr.push(transformWebsiteData2TreeMapData(websiteUrl, websiteObj))
      }
      let treeMapArr = sortTreeMapArr(tempArr)
      resolve(treeMapArr)
    })
  })
  function treeMapNode(value, name, path) {
    this.value = value
    this.name = name
    this.path = path
  }
  /**
   * 把存储的website数据转换为treeMap所需要的数据
   * IN: {"github.com": {_info: {duration: 5000, title: github}},
   *                     /node/issue: {duration: 4500, title: node issue
   *                    }
   *     }
   *            ||
   *            ||
   *            \/
   * OUT: {"value": 5000, name: github, path: github.com
   *    children: [
   *      {value: 4500, name: node issue, path: /node/issue}
   *    ]
   * }
   * @param {String} websiteUrl 
   * @param {Object} websiteObj 
   */
  function transformWebsiteData2TreeMapData(websiteUrl, websiteObj) {
    let info = websiteObj['_info']
    let tempObj = new treeMapNode(info['duration'], info['title'], websiteUrl)
    delete websiteObj['_info']
    let temArr = []
    for (let websiteRecordPath in websiteObj) {
      let record = websiteObj[websiteRecordPath]
      temArr.push(new treeMapNode(record['duration'], record['title'], websiteRecordPath))
    }
    tempObj['children'] = sortTreeMapArr(temArr)
    return tempObj
  }
  /**
   * 排序treemap的数组 根据其中的value进行排序 **降序排列**
   * @param {Array} unsortArr
   */
  
  function sortTreeMapArr(unsortArr) {
    unsortArr.sort((a, b) => {
      return b['value'] - a['value']
    })
    let sortedArr = unsortArr
    return sortedArr
  }
}


/**
 *  根据日期区间获取含有日期区间的所有网站记录的object
 * @param {Date} startDate 
 * @param {Date} endDate 
 * @return {Object}
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
   * merge 网站记录
   * @param {Object} obj
   * @param {Object} mergeIntoObj 
   */
  function mergeWebsite(obj, mergeIntoObj) {
    for (let records in mergeIntoObj) {
      utils.objHas(obj, records) ? mergeRecords(obj[records], mergeIntoObj[records]) : obj[records] = mergeIntoObj[records]
    }
  }
  /**
   * 合并网站子路径记录
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
    if (website['_info'] === undefined) website['_info'] = {title:title, duration: 0}
    if (path === '/') website['_info']['title'] = title
    website['_info']['duration'] += duration
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

