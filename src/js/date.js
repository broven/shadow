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
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

/**
 * 判断日期是否第一个是早的
 * @param {Date} early 
 * @param {Date} later 
 */
export function dateCheck(early, later) {
  return later - early >= 0
}