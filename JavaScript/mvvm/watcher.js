function Watcher (vm, expOrFn, cb) {
  this.cb = cb
  this.vm = vm
  this.expOrFn = expOrFn
  this.depIds = {}

  if (typeof expOrFn === 'function') {
    this.getter = expOrFn
  } else {
    this.getter = this.parseGetter(expOrFn)
  }

  // 此处为了触发属性的getter，从而在dep添加自己
  this.value = this.get()
}

Watcher.prototype = {
  update: function () {
    this.run()
  },

  run: function () {
    var value = this.get() // 取到新值
    var oldVal = this.value
    if (value !== oldVal) {
      this.value = value
      // 执行Ｃｏｍｐｉｌｅ中绑定的回调，更新视图
      this.cb.call(this.vm, value, oldVal)
    }
  },

  addDep: function (dep) {
    // 1. 每次调用run()的时候会触发相应属性的getter
    // getter里面会触发dep.depend()，继而触发这里的addDep
    // 2. 假如相应属性的dep.id已经在当前watcher的depIds里，说明不是一个新的属性，仅仅是改变了其值而已
    // 则不需要将当前watcher添加到该属性的dep里
    // 3. 假如相应属性是新的属性，则将当前watcher添加到新属性的dep里
    // 如通过 vm.child = {name: 'a'} 改变了 child.name 的值，child.name 就是个新属性
    // 则需要将当前watcher(child.name)加入到新的 child.name 的dep里
    // 因为此时 child.name 是个新值，之前的 setter、dep 都已经失效，如果不把 watcher 加入到新的 child.name 的dep中
    // 通过 child.name = xxx 赋值的时候，对应的 watcher 就收不到通知，等于失效了
    if (!this.depIds.hasOwnProperty(dep.id)) {
      dep.addSub(this)
      this.depIds[dep.id] = dep
    }
  },

  get: function () {
    Dep.target = this
    // 触发getter，添加自己到属性订阅器中
    // var value = this.vm[this.exp]
    var value = this.getter.call(this.vm, this.vm)
    Dep.target = null
    return value
  },

  parseGetter: function (exp) {
    if (/[^\w.$]/.test(exp)) return

    var exps = exp.split('.')

    return function (obj) {
      for (var i = 0, len = exps.length; i < len; i++) {
        if (!obj) return
        obj = obj[exps[i]]
      }
      return obj
    }
  }
}
