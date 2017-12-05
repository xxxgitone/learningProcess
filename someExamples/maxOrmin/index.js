// 取出数组中的最大值或者最小值

var arr = [6,8,9,5,1,2,3,5,4,7]

// 1.Math.max,返回一组数组中的最大值
// Math.max([value1[,value2, ...]])
// 如果有任一参数不能被转换为数值，则结果为 NaN。
// max 是 Math 的静态方法，所以应该像这样使用：Math.max()，而不是作为 Math 实例的方法 (简单的来说，就是不使用 new )
// 如果没有参数，则结果为 -Infinity (注意是负无穷大)

// 原始方法
// 循环遍历
var result = arr[0]
for (var i = 1; i < arr.length; i++) {
  result = Math.max(result, arr[i])
}

// reduce 
// 既然是通过遍历数组求出一个最终值，那么我们就可以使用 reduce 方法
function max(prev, next) {
  return Math.max(prev, next)
}
console.log(arr.reduce(max))

// 排序
// 如果我们先对数组进行一次排序，那么最大值就是最后一个值：
arr.sort(function(a,b){
  return a - b
})
console.log(arr[arr.length - 1])

// apply
console.log(Math.max.apply(null, arr))

// ES6
console.log(Math.max(...arr))