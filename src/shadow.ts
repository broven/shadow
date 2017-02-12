import {debug} from "./log"
/**
 * 跟踪时间使用
 * 
 * @class shadow
 */
export class shadow {
  startTime: Date
  private duration: number = 0
  private haveStop: boolean = true

  constructor() {
    this.start()
  }
  /**
   * 开始计时器,
   * 如果调用start后再次直接调用,不要重设计时器
   * @memberOf shadow
   */
  public start() {
    debug("shadow start")
    if (this.haveStop) {
      this.startTime = new Date()
      this.haveStop = false
    }
    
  }
  public pause() {
    if (this.startTime === undefined) {
      throw new Error('please call start first')
    }
    this.haveStop = true

    let currentDate = new Date();
    this.duration = this.duration + this.subtract(this.startTime, currentDate)
    // 防止多次记时
    this.startTime = currentDate;
    debug(`shadow pause duration:${this.duration}`)
  }
  public stop():number {
    this.pause()
    return this.duration
  }
  /**
   * 返回经过的分钟
   * @private
   * @param {Date} pre
   * @param {Date} cur
   * @returns {number} minutes
   * 
   * @memberOf shadow
   */
  private subtract(pre:Date, cur:Date):number {
  // TODO: month would be 30 31 28 or 29
  let months: Array<number> = [31,28,31,30,31,30,31,31,30,31,30,31]
  let monthDay
  let month = pre.getMonth()
  if (month - 1 === 2 && this.isLeapYear(pre)) {
    monthDay = 29
  } else {
    monthDay = months[month]
  }
  return (((cur.getFullYear() - pre.getFullYear()) * 12 +
    (cur.getMonth() - pre.getMonth())) * monthDay +
    (cur.getHours() - pre.getHours())) * 60 +
    (cur.getMinutes() - pre.getMinutes())
  }
  private isLeapYear(val:Date):boolean {
    let year = val.getFullYear()
    if (year % 400 === 0 || (year % 4 === 0&& year % 100 != 0)) {
      return true
    } else {
      return false
    }
  }

}