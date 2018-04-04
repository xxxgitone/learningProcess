function MVVM (options) {
  this.$options = options
  var data = this._data = this.$options.data,
    me = this
  // 属性代理，实现vm.xxx -> vm._data.xxx
  Object.keys(data).forEach(function (key) {
    me._proxy(key)
  })

  this._initComputed()

  observe(data)

  this.$compile = new Compile(options.el || document.body, this)
}

MVVM.prototype = {
  _proxy: function (key) {
    var me = this
    Object.defineProperty(me, key, {
      configurable: false,
      enumerable: true,
      get: function proxyGetter () {
        return me._data[key]
      },
      set: function proxySetter (newVal) { 
        me._data[key] = newVal
      }
    })
  },

  _initComputed: function () {
    var me = this
    var computed = this.$options.computed
    if (typeof computed === 'object') {
      Object.keys(computed).forEach(function (key) {
        Object.defineProperty(me, key, {
          get: typeof computed[key] === 'function'
            ? computed[key]
            : computed[key].get,
          set: function () {}
        })
      })
    }
  }
}

