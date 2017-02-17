import * as api from './data'
let $clear = document.querySelector('#clear')
let clear = () => {
  console.log('test')
  api.clear()
}
let log = () => {
  api.getData(null).then(val=> {
    console.log(val)
  })
}

$clear.addEventListener('click', clear)
function bind (operation) {
  let $operation = document.querySelector(`#${operation}`)
  $operation.addEventListener('click', operation)
}

function sendMessage (msg: {msg:String}) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var port = chrome.tabs.connect(tabs[0].id)
    port.postMessage(msg)
  })
}
bind('clear')
bind('log')