/**
 * 返回经过的秒数
 * 
 * @export
 * @param {Date} prev
 * @param {Date} current
 * @returns {String}
 */
export function subtract (prev:Date, current:Date):number {
  return Math.round(Math.abs((prev.getTime() - current.getTime()) / 1000))
}
export function getMinutes (seconds: number): number {
  return Math.abs(Math.round( seconds / 60 ))
}
export function getHours (seconds: number): number {
  return  Math.abs(Number((seconds / 60 / 60).toFixed(1)))
}