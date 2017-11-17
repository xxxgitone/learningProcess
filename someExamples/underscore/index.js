(function () {
  // 分别检测浏览器环境，node环境下的全局对象，然后绑定
  // node vm 模块不存在window和global，所以绑定this
  // 微信小程序中window和global都是undefined，加上为严格模式，this也为undefined,挂在上去会出错，所以初始化一个空对象
  var root = (typeof self == 'object' && self.self == self && self) ||
            (typeof global == 'object' && global.global == global && global) ||
            this || {}

  var ArrayPrototype = Array.prototype

  var push = ArrayPrototype.push

  // 函数对象，
  // _.reverse('hello')和_('hello').reverse()两种方式调用
  // _.each([1,2,3], function(item){})和_([1,2,3]).each(function(item){})
  // 说明`_`不是一个字面量对象，而是一个函数，但是函数也是一个对象
  // `_([1, 2, 3]).each(...)`即`_`函数返回一个对象,这个对象如何挂载在`_`函数桑
  var _ = function (obj) {
    if (obj instanceof _) return obj
    if (!(this instanceof _)) return new _(obj)
    this._wrapped = obj
  }
  // `_([1, 2, 3])`执行过程
  // 1.执行 this instanceof _，this 指向 window ，window instanceof _ 为 false，!操作符取反，所以执行 new _(obj)
  // 2.new _(obj) 中，this 指向实例对象，this instanceof _ 为 true，取反后，代码接着执行
  // 3.执行 this._wrapped = obj， 函数执行结束
  // 4._([1, 2, 3]) 返回一个对象，为 {_wrapped: [1, 2, 3]}

  _.VERSION = '0.1'

  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1

  var isArrayLike = function (collection) {
    var length = collection.length
    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX
  }

  _.each = function (obj, callback) {
    var length, i = 0

    if (isArrayLike(obj)) {
      length = obj.length
      for (; i < length; i++) {
        if (callback.call(obj[i], obj[i], i) === false) {
          break
        }
      }
    } else {
      for (i in obj) {
        if (callback.call(obj[i], obj[i], i) === false) {
          break
        }
      }
    }

    return obj
  }

  _.isFunction = function (obj) {
    return typeof obj == 'function' || false
  }

  // 将`_`上的方法挂载到`_.prototype`上
  // 先获取`_`上的方法
  _.functions = function (obj) {
    var names = []
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key)
    }
    return names.sort()
  }

  // 编写mixin函数将`_`上的方法挂载到`_.prototype`上

  _.mixin = function(obj) {
    _.each(_.functions(obj), function(name) {
        var func = _[name] = obj[name]
        _.prototype[name] = function() {
            var args = [this._wrapped]
            push.apply(args, arguments)
            return func.apply(_, args)
        }
    })
    return _
  }

  // 因为 `_[name] = obj[name]` 的缘故，我们可以给 underscore 拓展自定义的方法:
  // _.mixin({
  //   addOne: function(num) {
  //     return num + 1;
  //   }
  // });
  
  // _(2).addOne(); // 3

  _.mixin(_)

  // 导出
  // 判断`exports.nodeType`，这是因为如果你在 HTML 页面中加入一个 id 为 exports 的元素
  //  window.exports 全局变量，你可以直接在浏览器命令行中打印该变量
  // 此时在浏览器中，typeof exports != 'undefined' 的判断就会生效
  if (typeof exports != 'undefined' && !exports.nodeType) {
    if (typeof module != 'undefined' && !module.nodeType && module.exports) {
      exports = module.exports = _
    }
    exports._ = _
  } else {
    root._ = _
  }

})()
