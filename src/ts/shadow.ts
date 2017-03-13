import {debug} from "./log"
import * as date from './date'
/**
 * 跟踪时间使用
 *
 * @class shadow
 */
export class Shadow {
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
  private subtract(pre:Date, cur:Date):number {
    return date.subtract(pre, cur)
  }
}
