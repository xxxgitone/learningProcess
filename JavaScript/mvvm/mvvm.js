function MVVM(options = {}) {
  this.$options = options
  let data = this._data = this.$options.data
  console.log(data)

  // 数据劫持
  observer(data)
  // 数据代理, this._data --> this
  // eq: vm._data.a --> vm.a
  for (let key in data) {
    Object.defineProperty(this, key, {
      configurable: true,
      get () {
        return this._data[key]
      },
      set () {
        this._data[key] = newVal
      }
    })
  }

  new Compile(options.el, this)
}

function Observer (data) {
  const dep = new Dep()

  for (let key in data) {
    let val = data[key]
    observer(val) // 深度劫持
    Object.defineProperty(data, key, {
      configurable: true,
      get () {
        Dep.target && dep.addSub(Dep.target) // 将watcher添加到订阅实事件中
        return val
      },
      set (newVal) {
        if (val === newVal) {
          return
        }
        val = newVal
        obsrver(newVal) // 设置新值后，将新值定义成属性
        dep.notify()
      }
    })
  }
}

function observer (data) {
  // 在进行属性劫持的时候，会进行递归操作
  // 递归终止条件，没有值或不是对象
  if (!data || typeof data !== 'object') {
    return
  }
  return new Observer(data)
}

function Compile (el, vm) {
  // 将el挂载到实例上
  vm.$el = document.querySelector(el)

  // 文档片段，方面批量处理dom
  let fragment = document.createDocumentFragment()

  // 将el里的内容放入fragment
  while (child = vm.$el.firstChild) {
    fragment.appendChild(child)
  }

  // 替换el里面的内容
  function replace (frag) {
    [].slice.call(frag.childNodes).forEach(function(node) {
      const txt = node.textContent
      const reg = /\{\{(.*)\}\}/

      // 3为文本节点
      if (node.nodeType === 3 && reg.test(txt)) {
        // console.log(RegExp.$1) // 匹配到的第一个分组
        // const arr = RegExp.$1.split('.')
        // let val = vm
        // arr.forEach(function (key) {
        //   val = val[key.trim()]
        // })

        // node.textContent = txt.replace(reg, val).trim()

        const $1 = RegExp.$1
        new Watcher(vm, $1, function(newVal) {
          console.log(newVal)
          node.textContent = txt.replace(reg, newVal).trim()
        })
      }

      // 如果还有节点，继续递归
      if (node.childNodes && node.childNodes.length) {
        replace(node)
      }
    })
  }

  replace(fragment)

  vm.$el.appendChild(fragment)
}


function Dep () {
  this.subs = []
}

Dep.prototype = {
  addSub (sub) {
    this.subs.push(sub)
  },
  notify () {
    this.subs.forEach(function(sub) {
      console.log(sub)
      // 绑定的方法都有一个update方法
      sub.update()
    })
  }
}

function Watcher (vm, exp, fn) {
  this.fn = fn
  this.vm = vm
  this.exp = exp

  Dep.target = this
  const arr = exp.split('.')
  let val = vm
  arr.forEach(function (key) {
    val = val[key.trim()] // 获取值的时候，默认就会调用get方法
  })
  Dep.target = null
}

Watcher.prototype.update = function () {
  const arr = this.exp.split('.')
  let val = this.vm
  arr.forEach(function (key) {
    val = val[key.trim()] // 获取值的时候，默认就会调用get方法
  })
  this.fn(val)
}

// const watcher = new Watcher(() => console.log('watcher'))
// const dep = new Dep()
// dep.addSub(watcher)
// dep.notify()
