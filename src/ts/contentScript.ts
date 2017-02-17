
import {shadow} from "./shadow"
import * as api from "./data"
import {debug} from "./log"
let title, url, path, origin, startTime, endTime, duration = 0
let sh:shadow
window.addEventListener('load', function () {
  api.getData(null).then(val => {
    debug(val)
  })
  getPageInfo()
  sh = new shadow()
})

/**
 * 当页面可视性发生改变时会触发的事件
 */
document.addEventListener("visibilitychange", function () {
 if(document.hidden){
  sh.pause()
 } else {
  sh.start()
 }
});

window.addEventListener("beforeunload",stop)

function stop() {
 duration = sh.stop()
 endTime = new Date()
 api.saveRecord(title, origin, path, startTime, endTime, duration)
}
function getPageInfo() {
  title = window.document.title
  url = window.location
  origin = url.hostname
  path = url.pathname
  startTime = new Date()
}
// debug
// window.addEventListener("mousemove", stop)







