function Observer (data) {
  this.data = data
  this.walk(data)
}

Observer.prototype = {
  walk: function (data) {
    var me = this
    // 对所有属性进行遍历，添加getter和setter
    Object.keys(data).forEach(function (key) {
      me.convert(key, data[key])
    })
  },

  convert: function (key, val) {
    this.defineReactive(this.data, key, val)
  },

  defineReactive: function  (data, key, val) {
    var dep = new Dep()
    var childObj = observe(val) // 监听子属性

    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: false,
      get: function () {
        // 由于需要在闭包内添加watcher，所以通过Dep定义一个全局target属性，暂存watcher, 添加完移除
        if (Dep.target) {
          dep.depend()
        }
        return val
      },
      set: function (newVal) {
        if (val === newVal) return
        val = newVal
        // 新的值是object的话，进行监听
        childObj = observe(newVal)
        dep.notify()
      }
    })
  }
}

function observe (value, vm) {
  // 为空或者不是对象，返回，即终止递归的条件
  if (!value || typeof value !== 'object') {
    return
  }
  
  return new Observer(value)
}

var uid = 0

function Dep () {
  this.id = uid++
  this.subs = []
}

Dep.prototype = {
  addSub: function (sub) {
    this.subs.push(sub)
  },

  depend: function () {
    Dep.target.addDep(this)
  },

  removeSub: function () {
    var index = this.subs.indexOf(sub)
    if (index !== -1) {
      this.subs.splice(index, 1)
    }
  },

  notify: function () {
    this.subs.forEach(function (sub) {
      // 每个订阅者都有一个update方法
      sub.update()
    })
  }
}

Dep.target = null

