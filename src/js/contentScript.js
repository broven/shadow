import {Shadow} from "./shadow"
import * as api from "./data"
import {debug} from "./log"
let endTime, duration = 0
let record = {}
let sh = new Shadow()
const STEP = 1000

document.addEventListener("visibilitychange", visibiltyChange)
window.addEventListener('load', init)
window.addEventListener("beforeunload",stop)
// setInterval(saveRecord, STEP)

function init() {
  console.log('init')

 debugInfo()
 const url = window.location
 record = {
  title: window.document.title,
  origin : url.hostname,
  path : url.pathname,
  startTime: new Date()
}
}
function stop() {
 duration = sh.stop()
 endTime = new Date()
 api.saveRecord(record.title, record.origin, record.path, record.startTime, endTime, duration)
}
function getPageInfo() {
  title = window.document.title
  url = window.location
  origin = url.hostname
  path = url.pathname
}

function visibiltyChange() {
   if(document.hidden){
  sh.pause()
 } else {
  sh.start()
 }
}
// debug
// window.addEventListener("mousemove", stop)
function debugInfo() {
  api.getData(null).then(val => {
    debug(val)
  })
  // api.getRecords('2017-03-13', new Date().getTime()).then(recordes => {
  //   debug(recordes)
  // })
}


