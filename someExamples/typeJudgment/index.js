// 类型判断
// ES6之前，JavaScript共六种数据类型(ES6 Symbol)
// Undefined、Null、Boolean、String、Number、Object
// 但是typeof检测Null和Object都返回`object`

// typeof能检测出undefined、boolean、string、number、function、object
// 但是Object下还有很多细分的类型
// 如：Array、Function、Date、RegExp、Error

// Object.prototype.toString.call(1)  //[object Number]

var class2type = {}
'Boolean Number String Function Array Date RegExp Object Error Null Undefined'.split(' ').map(function (item, index) {
  class2type['[object ' + item + ']'] = item.toLowerCase()
}) 

/**
 * 类型检测函数
 * @param {} obj 
 */
function type (obj) {
  // 在 IE6 中，null 和 undefined 会被 Object.prototype.toString 识别成 [object Object]

  // 相当于obj === null和obj === undefined
  if (obj == null) {
    return obj + ''
  }
  return typeof obj === 'object' || typeof obj === 'function' ?
    class2type[Object.prototype.toString.call(obj)] || 'object' :
    typeof obj
}

function isFunction (obj) {
  return type(obj) === 'function'
}

var isArray = Array.isArray || function (obj) {
  return type(obj) === 'array'
}

//plainObject 纯粹的对象，就是通过`{}`或`new Object`创建的，jQuery认为一个没有原型的对象也是一个纯粹的对象

// function Person(name) {
//   this.name = name;
// }

// console.log($.isPlainObject({})) // true

// console.log($.isPlainObject(new Object)) // true

// console.log($.isPlainObject(Object.create(null))); // true

// console.log($.isPlainObject(Object.assign({a: 1}, {b: 2}))); // true

// console.log($.isPlainObject(new Person('yayu'))); // false

// console.log($.isPlainObject(Object.create({}))); // false

// 之所以判断是不是plainObject是为了跟其他JavaScript对象如null、数组、宿主对象(document)等作区分

// 上面有声明class2type
// 相当于 Object.prototype.toString
var toString = class2type.toString;

// 相当于 Object.prototype.hasOwnProperty
var hasOwn = class2type.hasOwnProperty;

/**
 * 
 * @param {Object} obj 
 */
function isPlainObject (obj) {
  var proto, Ctor

  // 排除掉明显不是obj的以及一些宿主对象window
  if (!obj || toString.call(obj) !== '[object Object]') {
    return false
  }

  /**
   * getPrototypeOf es5方法，获取obj的原型
   * 以new Object创建的对象为例的话
   * obj.__proto__ === Object.prototype
   */
  proto = Object.getPrototypeOf(obj)

  // 没有原型的对象是纯粹的，Object.create(null) 就在这里返回 true
  if (!proto) {
    return true
  }

  /**
   * 以下判断通过 new Object 方式创建的对象
   * 判断 proto 是否有 constructor 属性，如果有就让 Ctor 的值为 proto.constructor
   * 如果是 Object 函数创建的对象，Ctor 在这里就等于 Object 构造函数
   */
  Ctor = hasOwn.call(proto, 'constructor') && proto.constructor

  // 在这里判断 Ctor 构造函数是不是 Object 构造函数，用于区分自定义构造函数和 Object 构造函数
  // hasOwn.toString 调用的其实是 Function.prototype.toString，毕竟 hasOwnProperty 可是一个函数
  //console.log(hasOwn.toString.call(function o (){})); // function o () { [native code] }
  return typeof Ctor === 'function' && hasOwn.toString.call(Ctor) === hasOwn.toString.call(Object)
}

/**
 * 判断是否是空对象
 * @param {Object} obj 
 */
function isEmptyObject (obj) {
  var name
  // for in会遍历原型上的属性
  for (name in obj) {
    // for一旦执行说明不是空对象，但其实[],null, undefined,1,'',true都会返回true
    // jQuery 是这样写，可能是因为考虑到实际开发中 isEmptyObject 用来判断 {} 和 {a: 1} 是足够的吧。如果真的是只判断 {}，完全可以结合上篇写的 type 函数筛选掉不适合的情况
    return false
  }
  return true
}

/**
 * 判断是否为window对象
 * @param {Object} obj 
 */
function isWindow (obj) {
  // Window 对象作为客户端 JavaScript 的全局对象，它有一个 window 属性指向自身
  return obj != null && obj === obj.window
}

/**
 * 检测是否为数组或者类数组
 * @param {Array, Array like} obj 
 */
function isArrayLike (obj) {
  // obj必须有length属性
  var length = !!obj && 'length' in obj && obj.length
  var typeRes = type(obj)

  if (typeRes === 'function' || isWindow(obj)) {
    return false
  }

  // 至少满足三个条件之一
  // 1. 是数组
  // 2. 长度为0
  // length属性是大于0的数字类型，并且obj[length-1]必须存在

  // 满足第二个条件的理由是
  // function a(){
  //   console.log(isArrayLike(arguments))
  // }
  // a();
  // arguments是类数组，但是这里length为0

  // 满足第三个条件的理由
  // length是数字，并且最后一个元素存在
  // 当我们在数组中用逗号直接跳过的时候，我们认为该元素是不存在的，类数组对象中也就不用写这个元素，但是最后一个元素是一定要写的，要不然 length 的长度就不会是最后一个元素的 key 值加 1
  // var arr = [1,,];
  // console.log(arr.length) // 2
  // var arr = [,,3]
  // console.log(arr.length) // 3

  // var arrLike = {
  //   0: 1,
  //   length: 1
  // }

  // 符合条件的类数组对象是一定存在最后一个元素的！
  return typeRes === 'array' || length === 0 ||
    typeof length === 'number' && length > 0 && (length - 1) in obj
}

// underscore的实现
// var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1

// var isArrayLike = function(collection) {
//     var length = collection.length
//     return typeof length == 'number' && length >= 0 
//          && length <= MAX_ARRAY_INDEX
// }

/**
 * 判断是不是DOM元素
 * @param {} obj 
 */
function isElement (obj) {
  return !!(obj && obj.nodeType === 1)
}
