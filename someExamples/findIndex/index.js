// 在数组查找指定元素
// findIndex
// ES6的findIndex方法，返回数组中满足提供函数的第一个索引，否则返回-1
function isBigEnough (element) {
  return element >= 15
}

var index = [12, 5, 88, 9, 6].findIndex(isBigEnough)
console.log(index) // 2

// 自己实现findIndex
function findIndex (array, predicate, context) {
  for (var i = 0; i < array.length; i++) {
    if (predicate.call(context, array[i], i, array)) return i
  }
  return -1
}

console.log(findIndex([1,2,3,4], function(item, i, array) {
  if (item === 3) return true
})) // 2

// findLastIndex
function findLastIndex (array, predicate, context) {
  var length = array.length
  for (var i = length; i >= 0; i--) {
    if (predicate.call(context, array[i], i, array)) return i
  }
  return -1
}

console.log(findLastIndex([1,2,1,4], function(item, i, array) {
  if (item === 1) return true
})) // 2


// createIndexFinder
// findIndex和findLastIndex很多重复的部分，精简复用
function createIndexFinder (dir) {
  return function (array, predicate, context) {

    var length = array.length
    var index = dir > 0 ? 0 : length - 1
    for (; index >= 0 && index < length; index += dir) {
      if (predicate.call(context, array[i], index, array)) return index
    }

    return -1
  }
}

var findIndex = createIndexFinder(1)
var findLastIndex = createIndexFinder(-1)
