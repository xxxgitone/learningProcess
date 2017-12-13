// 柯里化是一种将使用多个参数的一个函数转换成一系列使用一个参数的函数的技术

// 例子
// function add (a, b) {
//   return a + b
// }

// add(1, 2) // 3

// // 比如存在一个函数curry可以做到柯里化
// var addCurry = curry(add)
// addCurry(1)(3) // 3

// TODO
var curry = function (fn) {
  var ags = [].slice.call(arguments, 1)
  return function() {
    var newArgs = args.concat([].slice.call(arguments))
    return fn.apply(this, newArgs)
  }
}

// function add(a, b) {
//   return a + b;
// }

// var addCurry = curry(add, 1, 2);
// addCurry() // 3
// //或者
// var addCurry = curry(add, 1);
// addCurry(2) // 3
// //或者
// var addCurry = curry(add);
// addCurry(1, 2) // 3