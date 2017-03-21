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
