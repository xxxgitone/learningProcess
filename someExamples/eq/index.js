// 我们一般认为只要`===`的结果为`true`，两者就相等
// 在JavaScript中有很多特殊情况，我们重新定义相等
// 如下：
// NaN和NaN是相等
// [1]和[1]是相等
// {value:1}和{value:1}是相等
// 1 和 new Number(1) 是相等
// 'Curly' 和 new String('Curly') 是相等
// true 和 new Boolean(true) 是相等

// 1. `+0`与`-0`
// `+0 === -0` // true

// 两者不同之处
// `1 / +0` //Infinity
// `1 / -0` // -Infinity
// `1 / +0 === 1 / -0` // false

function eqZero (a, b) {
  if (a === b) return a !== 0 || 1 / a === 1 / b
  return false
}

console.log(eqZero(0,0)) // true
console.log(eqZero(0, -0)) // false

// 2. NaN
// 在JavaScript中`NaN === NaN`和`NaN == NaN`都为false
// 本篇中认为相等
function eqNaN (a, b) {
  if ( a !== a) return b !== b
}

console.log(eqNaN(NaN, NaN)) // true

// 用来过滤简单的类型比较, 复杂的对象使用 deepEq 函数进行处理
function eq (a, b) {

  // === 结果为 true 的，区别出 +0 和 -0
  if (a === b) return a !== 0 || 1 / a === 1 / b

  // typeof null 的结果为 object， 这里做判断，为了让有null的情况尽早退出函数
  if (a == null || b == null) return false

  // 判断 NaN
  if (a !== a) return b !== b

  // 判断参数 a 类型，如果是基本类型，在这里可以直接返回 false
  // 后面没有判断`typeof b !== function`
  // 如果我们添加上了这句，当 a 是基本类型，而 b 是函数的时候，就会进入 deepEq 函数，而去掉这一句，就会进入直接进入 false，
  //实际上 基本类型和函数肯定是不会相等的，所以这样做代码又少，又可以让一种情况更早退出。
  var type = typeof a
  if (type !== 'function' && type !== 'object' && typeof b != 'object') return false

  return deepEq(a, b)
}
