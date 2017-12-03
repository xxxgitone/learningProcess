// 数组去重
var array = [1, 1, '1', '1', 'a', 'A']
console.log(unique2(array))

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

// 排序后去重,（性能高，但是有些类型不能简单的使用sort排序）
// 排序后，相同的至会在一起，然后就可以只判断当前元素与上一个元素是否相同
// 相同说明重复，不同就添加进res
function unique2 (array) {
  var res = []
  var sortedArray = array.concat().sort()
  var seen
  for (var i = 0, len = sortedArray.length; i < len; i++) {
    // 如果是第一个元素或者相邻的元素不相同
    if (!i || seen !== sortedArray[i]) {
      res.push(sortedArray[i])
    }
    seen = sortedArray[i]
  }
  return res
}

// 进行封装
// 根据一个参数`isSorted`判断传入的参数是否是已排序的，如果为true
// 我们就判断相邻元素是否相同。如果为false，就使用indexOf
function unique3 (array, isSorted) {
  var res = []
  var seen = []

  for (var i = 0, len = array.length; i < len; i++) {
    var value = array[i]
    if (isSorted) {
      if (!i || seen !== value) {
        res.push(value)
      }
      seen = value
    } else if (res.indexOf(value) === -1) {
      res.push(value)
    }
  }
  return res
}

// 增加需求，字母大小写视为一致
// 虽然我们可以先处理数组中的所有数据，比如将所有字母转换成小写，然后再传入unique函数汇总
// 但是有没有方法可以省掉处理数组这一环节，直接在去重的循环中做
// iteratee : 迭代、重复
function unique4 (array, isSorted, iteratee) {
  var res = []
  var seen = []

  for (var i = 0, len = array.length; i < len; i++) {
    var value = array[i]
    var computed = iteratee ? iteratee(value, i, array) : value
    if (isSorted) {
      if (!i || seen !== computed) {
        res.push(value)
      }
      seen = computed
    } else if (iteratee) {
      if (seen.indexOf(computed) === -1) {
        seen.push(computed)
        res.push(value)
      }
    } else if (res.indexOf(value) === -1) {
      res.push(value)
    }
  }
  return res
}

unique4(array, false, function(item){
  return typeof item == 'string' ? item.toLowerCase() : item
})

// ES5 filter方法，简化外层循环
function unique5 (array) {
  var res = array.filter(function(item, index, array) {
    // array.indexOf会返回第一个找到的索引
    return array.indexOf(item) === index
  })
  return res
}

// 排序去重
function unique6 (array) {
  return array.concat().sort().filter(function(item, index, array) {
    return !index || item !== array[index - 1]
  })
}

// ES6
function unique7 (array) {
  return Array.from(new Set(array))
}

// 简化
function unique8 (array) {
  return [...new Set(array)]
}

var unique9 = (a) => [...new Set(a)]