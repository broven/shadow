/**
 * 在页面中注入的脚本
 */
import * as DATA from './data'
import Shadow from './shadow'
document.addEventListener("visibilitychange", visibiltyChange)
window.addEventListener('load', init)
window.addEventListener("beforeunload",stop)
let shadow = ''
function init() {
  development()
  shadow = new Shadow(window)
  shadow.start()
}
function stop() {
  shadow.pause()
}

function visibiltyChange() {
  let state = window.document.visibilityState
  state === 'visible'? shadow.start() : shadow.pause()
}
function development() {
   DATA.getData(null).then(data => {
    console.log(data)
  })
  DATA.getTreeMapData(new Date(), new Date()).then(data => {
    console.log(data)
  })
}


