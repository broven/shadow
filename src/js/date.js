/**
 * 返回经过的秒数
 *
 * @export
 * @param {Date} prev
 * @param {Date} current
 * @returns {String}
 */
export function subtract (prev, current) {
  return Math.round(Math.abs((prev.getTime() - current.getTime()) / 1000))
}
export function getMinutes (seconds) {
  return Math.abs(Math.round( seconds / 60 ))
}
export function getHours (seconds) {
  return  Math.abs(Number((seconds / 60 / 60).toFixed(1)))
}
export function getDays (seconds) {
  return Math.abs(Number((seconds / 3600 / 24)))
}

/**
 * 对日期进行格式化 2017-02-01
 * @param {Date} date 
 */
export function formatDate(date) {
  let month = date.getMonth() + 1 + ''
  let day = date.getDate() + ''
  return `${date.getFullYear()}-${month.length == 1 ? '0' + month : month}-${day.length == 1 ? '0' + day : day}`
}

/**
 * 判断日期是否第一个是早的
 * @param {Date} early 
 * @param {Date} later 
 */
export function dateCheck(early, later) {
  return later - early >= 0
}

/**
 * @param {Date} startDate 
 * @param {Date} endDate
 * @return {Array} dates 一个日期的数组 ['2017-06-25', '2017-06-26']
 */
export function dateGap(startDate, endDate) {
  if (!dateCheck(startDate, endDate)) throw 'startDate should early then endDate'
  let dates = []
  endDate.setDate(endDate.getDate() + 1)
  while (startDate.getTime() < endDate.getTime()) {
    dates.push(formatDate(startDate))
    startDate.setDate(startDate.getDate() + 1)
  }
  return dates
}