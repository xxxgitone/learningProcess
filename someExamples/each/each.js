// 实现类似jQuery的each方法，可遍历对象和数组
// jQuery.each(object, [callback])

// ES5的forEach没有办法终止或者跳出forEach循环，而jQuery的可以跳出
// $.each( [0, 1, 2, 3, 4, 5], function(i, n){
//   if (i > 2) return false
//   console.log( "Item #" + i + ": " + n )
// })
// Item #0: 0
// Item #1: 1
// Item #2: 2

var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1
var isArrayLike = function (collection) {
  var length = collection.length
  return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX
}


/**
 * 遍历对象或数组,类数组也可以
 * 回调函数的参数为第一个为对象的成员或数组的索引，第二个为对应的变量或内容
 * @param {Array, Object} obj 
 * @param {Function(i, n)} callback 
 */
function each (obj, callback) {
  var length, i = 0

  if (isArrayLike(obj)) {
    length = obj.length
    for (; i < length; i++) {
      // 当回调函数返回false的时候终止循环
      if (callback.call(obj[i], i, obj[i]) === false) {
        break
      }
    }
  } else {
    for (i in obj) {
      if (callback.call(obj[i], i, obj[i]) === false) {
        break
      }
    }
  }
  return obj
}

var arr = Array.from({length: 100}, (v, i) => i)
each(arr, function (index, item) {
  console.log({index, item})
})
