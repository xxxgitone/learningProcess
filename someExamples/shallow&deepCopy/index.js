// 深浅拷贝

// 对于数组可以使用`slice`和`concat`尽心浅拷贝

// 数组深拷贝,对象也适用

var arr = ['old', 1, true, ['old1', 'old2'], {old: 1}]
// var new_arr = JSON.parse(JSON.stringify(arr))

// 但是该方法不能拷贝函数
// var arr = [function(){
//   console.log(a)
// }, {
//   b: function(){
//       console.log(b)
//   }
// }]

// 浅拷贝实现
function shallowCopy (obj) {
  if (typeof obj !== 'object') return
  // 根据obj的类型判断是新建一个数组还是对象
  var newObj = obj instanceof Array ? [] : {}
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = obj[key]
    }
  }
  return newObj
}

// 深拷贝的实现
// 在拷贝的时候判断一下属性值的类型，如果是对象，就调用深拷贝函数
function deepCopy (obj) {
  if (typeof obj !== 'object') return
  var newObj = obj instanceof Array ? [] : {}
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key]
    }
  }
  return newObj
}
