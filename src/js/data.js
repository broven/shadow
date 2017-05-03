import dateUtil from './date'
/**
 * @param {Date} date
 */
async function getDataByDate(date) {
  return await getData(null)
}
/**
 * 设置新的记录, 累加duration
 * @param {Date} date 
 * @param {String} websiteName 
 * @param {String} path 
 * @param {Int} duration 
 */
function setRecord(date, websiteName, path, duration) {
  
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
function getData(key) {
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

