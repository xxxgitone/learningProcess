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
function eq1 (a, b) {

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

// String对象
// 'Curly' 和 new String('Curly') 如何判断成相等
// 使用toString方法结果一致
// var toString = Object.prototype.toString;
// toString.call('Curly'); // "[object String]"
// toString.call(new String('Curly')); // "[object String]"

// 知道上面特性，我们再可以使用隐式转换
// console.log('Curly' + '' === new String('Curly') + ''); // true

var toString = Object.prototype.toString

function deepEqString (a, b) {
  var className = toString.call(a)
  if (className !== toString.call(b)) return false

  switch (className) {
    case '[object RegExp]':
    case '[object String]':
      return '' + a === '' + b
    case '[object Number]':
      // 判断 Number(NaN) Object(NaN) 等情况
      if (+a !== +a) return +b !== +b
      return +a === 0 ? 1 / +a === 1 / +b : +a === +b
    case '[object Date]':
    case '[object Boolean]':
      return +a === +b
  }
}

// 构造函数实例
/*
function Person() {
  this.name = name;
}

function Animal() {
  this.name = name
}

var person = new Person('Kevin');
var animal = new Animal('Kevin');
*/
// 虽然 person 和 animal 都是 {name: 'Kevin'}，但是 person 和 animal 属于不同构造函数的实例，为了做出区分，我们认为是不同的对象。

// 如果两个对象所属的构造函数对象不同，两个对象就一定不相等吗？
/*
var attrs = Object.create(null);
attrs.name = "Bob";
eq(attrs, {name: "Bob"}); // ???
*/
// 尽管 attrs 没有原型，{name: "Bob"} 的构造函数是 Object，但是在实际应用中，只要他们有着相同的键值对，我们依然认为是相等。

function isFunction (obj) {
  return toString.call(obj) === '[object Function]'
}

function deepEqConstructor (a, b) {
  var className = toString.call(a)
  if (className !== toString.call(b)) return false
  var areArrays = className === '[object Array]'
  // 不是数组
  if (!areArrays) {
    // 过滤掉两个函数的情况
    if (typeof a != 'object' || typeof b != 'object') return false

    var aCtor = a.constructor, bCtor = b.constructor
     // aCtor 和 bCtor 必须都存在并且都不是 Object 构造函数的情况下，aCtor 不等于 bCtor,那这两个对象就真的不相等啦
    if (aCtor !== bCtor && !(isFunction(aCtor) && aCtor instanceof aCtor && isFunction(bCtor) && bCtor instanceof bCtor) && ('constructor' in a && 'constructor' in b)) {
      return false
    }
  }
}

// 数组和对象
function deepEqArrAndObj (a, b) {
  var className = toString.call(a)
  if (className !== toString.call(b)) return false
  var areArrays = className === '[object Array]'

  if (areArrays) {

    length = a.length
    if (length !== b.length) return false

    while (length--) {
      if (!eq(a[length], b[length])) return false
    }
  } else {

    var keys = Object.keys(a), key
    length = keys.length

    if (Object.keys(b).length !== length) return false

    while (length--) {
      key = keys[length]
      if (!(b.hasOwnProperty(key) && eq(a[key], b[key]))) return false
    }
  }
}

// 最终整合
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

function deepEq (a, b) {
  var className = toString.call(a)
  if (className !== toString.call(b)) return false

  switch (className) {
    case '[object RegExp]':
    case '[object String]':
      return '' + a === '' + b
    case '[object Number]':
      // 判断 Number(NaN) Object(NaN) 等情况
      if (+a !== +a) return +b !== +b
      return +a === 0 ? 1 / +a === 1 / +b : +a === +b
    case '[object Date]':
    case '[object Boolean]':
      return +a === +b
  }

  var areArrays = className === '[object Array]'
  // 不是数组
  if (!areArrays) {
    // 过滤掉两个函数的情况
    if (typeof a != 'object' || typeof b != 'object') return false

    var aCtor = a.constructor, bCtor = b.constructor
    // aCtor 和 bCtor 必须都存在并且都不是 Object 构造函数的情况下，aCtor 不等于 bCtor,那这两个对象就真的不相等啦
    // 之所以aCtor instanceof aCtor 是用来判断 Object 构造函数的，因为Object instanceof Object // true
    // 所以如果 aCtor 是函数，并且 aCtor instanceof aCtor 就说明 aCtor 是 Object 函数
    if (aCtor !== bCtor && !(isFunction(aCtor) && aCtor instanceof aCtor && isFunction(bCtor) && bCtor instanceof bCtor) && ('constructor' in a && 'constructor' in b)) {
      return false
    }
  }

  if (areArrays) {
    
    length = a.length
    if (length !== b.length) return false

    while (length--) {
      if (!eq(a[length], b[length])) return false
    }
  } else {

    var keys = Object.keys(a), key
    length = keys.length

    if (Object.keys(b).length !== length) return false

    while (length--) {
      key = keys[length]
      if (!(b.hasOwnProperty(key) && eq(a[key], b[key]))) return false
    }
  }
  return true
}

console.log(eq(0, 0)) // true
console.log(eq(0, -0)) // false

console.log(eq(NaN, NaN)); // true
console.log(eq(Number(NaN), Number(NaN))); // true

console.log(eq('Curly', new String('Curly'))); // true

console.log(eq([1], [1])); // true
console.log(eq({ value: 1 }, { value: 1 })); // true