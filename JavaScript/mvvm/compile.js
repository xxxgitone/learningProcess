function Compile (el, vm) {
  this.$vm = vm
  this.$el = this.isElementNode(el) ? el : document.querySelector(el)

  if (this.$el) {
    this.$fragment = this.node2Fragment(this.$el)
    this.init()
    this.$el.appendChild(this.$fragment)
  }
}

Compile.prototype = {
  init: function () {
    this.compileElement(this.$fragment)
  },
  node2Fragment: function (el) {
    // 文档片段，方面批量处理dom
    var fragment = document.createDocumentFragment(), child
    // 将原生节点内容放入fragment
    while (child = el.firstChild) {
      fragment.appendChild(child)
    }
    return fragment
  },
  compileElement: function (el) {
    var childNodes = el.childNodes, me = this
    ;[].slice.call(childNodes).forEach(function(node) {
      var text = node.textContent
      var reg = /\{\{(.*)\}\}/

      // 按元素节点类型遍历
      if (me.isElementNode(node)) {
        me.compile(node)
      } else if (me.isTextNode(node) && reg.test(text)) {
        // RegExp.$1表示匹配到的第一个分组
        me.compileText(node, RegExp.$1)
      }
      // 遍历
      if (node.childNodes && node.childNodes.length) {
        me.compileElement(node)
      }
    })
  },

  compile: function (node) {
    var nodeAttrs = node.attributes, me = this
    ;[].slice.call(nodeAttrs).forEach(function(attr) {
      //  <span v-text="content"></span> 中指令为 v-text
      var attrName = attr.name // v-text
      if (me.isDirective(attrName)) {
        var exp = attr.value // content
        var dir = attrName.substring(2) // text

        if (me.isEventDirective(dir)) {
          // 事件指令
          compileUtil.eventHandler(node, me.$vm, exp, dir)
        } else {
          // 普通指令
          compileUtil[dir] && compileUtil[dir](node, me.$vm, exp)
        }

        node.removeAttribute(attrName)
      }
    })
  },

  compileText: function (node, exp) {
    compileUtil.text(node, this.$vm, exp)
  },

  isDirective: function (attr) {
    return attr.indexOf('v-') === 0
  },

  isEventDirective: function (dir) {
    return dir.indexOf('on') === 0
  },

  isElementNode: function (node) {
    return node.nodeType === 1
  },

  isTextNode: function (node) {
    return node.nodeType === 3
  }
}

// 指令处理集合
var compileUtil = {
  text: function (node, vm, exp) {
    this.bind(node, vm, exp, 'text')
  },
  bind: function (node, vm, exp, dir) {
    var updaterFn = updater[dir + 'Updater']
    // 第一次初始化试图
    updaterFn && updaterFn(node, vm[exp])
    // 实例化订阅者，此操作会在对应的属性消息订阅器中添加了该订阅者watcher
    new Watcher(vm, exp, function (value, oldValue) {
      // 一旦属性值有变化，会收到通知执行此更新函数，更新视图
      updaterFn && updaterFn(node, value, oldValue)
    })
  },

  model: function (node, vm, exp) {
    this.bind(node, vm, exp, 'model')

    var me = this,
      val = this._getVMVal(vm, exp)
    node.addEventListener('input', function (e) {
      var newValue = e.target.value
      if (val === newValue) return

      me._setVMVal(vm, exp, newValue)
      val = newValue
    })
  },

  // 事件处理
  eventHandler: function (node, vm, exp, dir) {
    var eventType = dir.split(':')[1],
      fn = vm.$options.methods && vm.$options.methods[exp]

    if (eventType && fn) {
      node.addEventListener(eventType, fn.bind(vm), false)
    }
  },

  // 每个子属性的watcher在添加到子属性的dep的同时，也会添加到父属性的dep
  // 监听子属性的同时监听父属性的变更，这样，父属性改变时，子属性的watcher也能收到通知进行update
  // 这一步是在 this.get() --> this.getVMVal() 里面完成，forEach时会从父级开始取值，间接调用了它的getter
  // 触发了addDep(), 在整个forEach过程，当前wacher都会加入到每个父级过程属性的dep
  // 例如：当前watcher的是'child.child.name', 那么child, child.child, child.child.name这三个属性的dep都会加入当前watcher
  _getVMVal: function (vm, exp) {
    // eg: exp--> a.b.c
    var val = vm
    exp = exp.split('.')
    exp.forEach(function (k) {
      val = val[k]
    })
    return val
  },

  _setVMVal: function (vm, exp, value) {
    var val = vm
    exp = exp.split('.')
    exp.forEach(function (k, i) {
      // 非最后一个key,　更新val的值
      if (i < exp.length - 1) {
        val = val[k]
      } else {
        val[k] = value
      }
    })
  }
}

// 更新函数
var updater = {
  textUpdater: function (node, value, oldValue) {
    node.textContent = typeof value === 'undefined' ? '' : value
  },

  modelUpdater: function (node, value, oldValue) {
    node.value = typeof value === 'undefined' ? '' : value
  }
}

