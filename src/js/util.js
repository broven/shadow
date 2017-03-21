export function formatDate(date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

 /**
 *
 *
 * @param {object} obj 需要排序的obj
 * @param {string} sortKey 根据这个key来进行排序
 * @return {array} 返回经过排序的数组,降序排列
 */
export function sort(obj, sortKey){
  let sortArr = []
  let firstCheck = true
  for (let key in obj) {
    if (firstCheck && !obj[key].hasOwnProperty(sortKey)) throw "sub Object don't have this prop"
    firstCheck = false
    sortArr.push(obj[key])
  }
  sortArr.sort((a, b) => {
    function key(obj) {
      return obj[sortKey]
    }
    return key(a) > key(b) ? -1 : 1
  })
  return sortArr
}
