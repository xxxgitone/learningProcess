// 数组去重
var array = [1, 1, '1', '1']
console.log(unique1(array))

// 1.双层循环(兼容性好)
// 我们使用循环嵌套，最外层循环 array，里面循环 res，如果 array[i] 的值跟 res[j] 的值相等，就跳出循环，
// 如果都不等于，说明元素是唯一的，这时候 j 的值就会等于 res 的长度，根据这个特点进行判断，将值添加进 res
function unique (array) {
  var res = []
  for (var i = 0, arrayLen = array.length; i < arrayLen; i++) {
    for (var j = 0, resLen = res.length; j < resLen; j++) {
      if (array[i] === res[j]) {
        break
      }
    }
    // 如果array[i]是唯一的，那么执行完循环，j等于resLen
    if (j === resLen) {
      res.push(array[i])
    }
  }
  return res
}

// indexOf
function unique1 (array) {
  var res = []
  for (var i = 0, len = array.length; i < len; i++) {
    var current = array[i]
    if (res.indexOf(current) === -1) {
      res.push(current)
    }
  }
  return res
}
