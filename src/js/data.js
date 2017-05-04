import * as dateUtil from './date'


const data = chrome.storage.local
/**
 * @param {Date} date
 */
 function getDataByDate(date) {
  return  getData(null)
}
/**
 * 设置新的记录, 累加duration
 * @param {Date} date 
 * @param {String} websiteName 
 * @param {String} path 
 * @param {Int} duration 
 */
export function setRecord(date, websiteName, path, title,duration) {
  date = dateUtil.formatDate(date)
  getData(date).then(records => {
    if (records[date] === undefined) records[date] = {}
    if (records[date][websiteName] === undefined) records[date][websiteName] = {}
    if (records[date][websiteName][path] === undefined) records[date][websiteName][path] = {
              title:title ,
              duration: 0
            }
    let website = records[date][websiteName]

    if (path === '/' && website['_info'] === undefined) website['_info'] = {title: title}
    website[path]['duration'] += duration
    data.set(records)
  })
}

/**
 * 清除数据
 * @param {Date} startDate 
 * @param {Date} endDate 
 */
function clearData(startDate, endDate) {

}
/**
 * 清除所有数据
 */
function clearAll() {
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

