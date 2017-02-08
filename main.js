/**
 * www.baidu.com:{
 *  info: {
 *    title: '百度一下,你就知道'
 *  },
 *  timeTrack: [
 *    {path:'/path', title: 'contentTitle', startTime: 2017/2/1 19:55, endTime: 2017/2/1 18:00}
 *  ]
 * }
 */

const DEBUG = true
let title,url,path,origin,startTime,endTime
let data = chrome.storage.sync
window.addEventListener('load', function ( event ) {
  debug('success inject')
  if (DEBUG) {
    chrome.storage.sync.get(null, function (item) {
    console.log(item)
    })
  }
  getPageInfo()
})
   window.addEventListener("beforeunload", function( event ) {
     endTime = new Date()
     saveRecord(title, origin, path, startTime,endTime)
});
function getPageInfo() {
  title = window.document.title
  url = window.location
  origin = url.hostname
  path = url.pathname
  startTime = new Date()
}
function saveRecord(title, origin, path, startTime, endTime) {
  // debugger;
  isEmpty(origin).then(
    function(val) {
      if (val === 0) {
        debug(`${origin} is empty, set new`)
        val = {
          info: {
            title: title
          },
          timeTrack: []
        }
      }
      val.timeTrack.push({
          path: path,
          title: title,
          startTime: startTime,
          endTime: endTime
        })
      let dataObject = {}
      dataObject[origin] = JSON.stringify(val)
      data.set(dataObject, function(){});
    }
  )
}



function isEmpty(key) {
  return new Promise(function(resolve, reject) {
    data.get(key, function (item){
      var length = Object.getOwnPropertyNames(item).length
      if (length === 0) {
        debug(`${key} is empty resolve 0`)
        resolve(0)
      } else {
        resolve(JSON.parse(item[origin]))
      }
    })
  })
}
function debug(val) {
  if (DEBUG) console.log(val)
}