import {Shadow} from "./shadow"
import * as api from "./data"
import {debug} from "./log"
let title, url, path, origin, startTime = new Date(), endTime, duration = 0
let sh = new Shadow()
startTime = new Date()
window.addEventListener('load', function () {
  console.log('document ready');

  api.getData(null).then(val => {
    debug(val)
  })
  api.getRecords('2017-03-13', new Date().getTime()).then(recordes => {
    debug(recordes)
  })
})
/**
 * 当页面可视性发生改变时会触发的事件
 */
document.addEventListener("visibilitychange", () => {
 if(document.hidden){
  sh.pause()
 } else {
  sh.start()
 }
});

window.addEventListener("beforeunload",stop)

function stop() {
  getPageInfo()
 duration = sh.stop()
 endTime = new Date()
 api.saveRecord(title, origin, path, startTime, endTime, duration)
}
function getPageInfo() {
  title = window.document.title
  url = window.location
  origin = url.hostname
  path = url.pathname
}
// debug
// window.addEventListener("mousemove", stop)







