import { debug } from "./log"
import * as date from './date'


export function Shadow() {
  this.startTime = new Date()
  this.duration = 0
}
Shadow.prototype.start = function () {
    this.startTime = new Date()
  }
  Shadow.prototype.pause = function () {
    if (this.startTime === undefined) {
      throw new Error('please new a Shadow instance first')
    }
    let currentDate = new Date();
    this.duration += this.subtract(this.startTime, currentDate)
    // 防止多次记时
    this.startTime = currentDate;
    debug(`shadow pause duration:${this.duration}`)
  }
  Shadow.prototype.stop = function () {
    this.pause()
    return this.duration
  }
  Shadow.prototype.subtract = function (pre, cur) {
    return date.subtract(pre, cur)
  }
