// 数组扁平化，就是将一个嵌套多层的数组转换成为只有一层的数组
var arr = [1,[2,[3,4]]]
console.log(flatten4(arr))

// 递归
// 循环数组，如果海曙数组，就递归调用函数
function flatten1 (arr) {
  var result = []
  for (var i = 0, len = arr.length; i < len; i++) {
    if (Array.isArray(arr[i])) {
      result = result.concat(flatten1(arr[i]))
    } else {
      result.push(arr[i])
    }
  }
  return result
}

// toString
// 如果数组元素都是数字，可以考虑toString方法
function flatten2 (arr) {
  return arr.toString().split(',').map(function(item) {
    return +item
  })
}

// reduce
// 对数组进行处理，最终返回一个值
function flatten3 (arr) {
  return arr.reduce(function(prev, next) {
    return prev.concat(Array.isArray(next) ? flatten3(next) : next)
  }, [])
}


// `...`ES6扩展运算符
function flatten4 (arr) {

  while (arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr)
  }

  return arr
}