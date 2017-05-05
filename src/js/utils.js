
 /**
 * @param {object} obj 需要排序的obj
 * @param {string} sortKey 根据这个key来进行排序
 * @return {array} 返回经过排序的数组,降序排列
 */
export function sortByKey(obj, sortKey){
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

/**
 * 判断一个obj是否有一个属性
 * @param {Object} obj 
 * @param {String} property
 * @return {Boolean} 
 */
export function objHas(obj, property) {
  return obj.hasOwnProperty(property)
}