import {setRecord} from './data'
import Logger from './logger'
const STEP = 1 //(N)s

let logger = new Logger()
//TODO 可以做一下分离, 这个计时的逻辑是一个职责, 存储数据又是一个职责, 当数据格式修改, 但是计时逻辑没有修改时,这个类也要被修改
/**
 * @param {Window} window
 */
export function Shadow(window) {
  let location = window.location
  this.date = new Date()
  this.websiteName = location.host
  this.path = location.pathname
  this.duration = 0
  this.timerID = 0
  this.title = window.document.title
  this._isStarted = false
}
Shadow.prototype.start = function() {
  logger.debug('shadow start')
  if (this._isStarted) return
  this.timerID = window.setInterval(() => {
    this.duration += STEP
    logger.debug('[shadow] - [set record] duration:' + this.duration)
    setRecord(this.date, this.websiteName, this.path, this.title, this.duration)
  },STEP * 1000)
}
Shadow.prototype.pause = function() {
  logger.debug('shadow pause')
  window.clearInterval(this.timerID)
}