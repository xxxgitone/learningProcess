// 模拟jQuery的extend函数
// extend函数功能是合并两个或者更多的对象的内容到第一个对象中
// [deep]表示是否要深浅拷贝
// jQuery.extend( [deep], target [, object1 ] [, objectN ] )

var obj1 = {
  a: 1,
  b: { b1: 1, b2: 2 }
};

var obj2 = {
  b: { b1: 3, b3: 4 },
  c: 3
};

var obj3 = {
  d: 4
}
console.log(extend(true, obj1, obj2, obj3))

// function extend () {
//   var name, options, copy
//   var length = arguments.length
//   var i = 1
//   var target = arguments[0]

//   for (; i < length; i++) {
//     options = arguments[i]
//     if (options != null) {
//       for (name in options) {
//         copy = options[name]
//         if (copy !== undefined) {
//           target[name] = copy
//         }
//       }
//     }
//   }

//   return target
// }


function extend () {
  // 默认不进行深拷贝
  var deep = false
  var name, options, src, copy
  var length = arguments.length
  // 记录要复制的下标值
  var i = 1
  // 第一个参数不传布尔值的情况下，target默认是第一个参数
  var target = arguments[0] || {}
  // 如果第一个参数是布尔值， 第二个参数才是target
  if (typeof target == 'boolean') {
    deep = target
    target = arguments[i] || {}
    i++
  }
  // 如果target不是对象，无法进行复制，设为{}
  if (typeof target !== 'object') {
    target = {}
  }

  for (; i < length; i++) {
    options = arguments[i]
    // 要求不能为空 避免extend(a,,b)这种情况
    if (options != null) {
      for (name in options) {
        // 目标属性值
        src = target[name]
        // 要复制的对象的属性值
        copy = options[name]

        if (deep && copy && typeof copy == 'object') {
          target[name] = extend(deep, src, copy)
        } else if (copy !== undefined) {
          target[name] = copy
        }
      }
    }
  }

  return target
} 