// ES6 Proxy实现数据双向绑定
let elems = [document.getElementById('el'), document.getElementById('input')]

// 定义指令 Directive
let directive = {
  text: function (text) {
    this.innerHTML = text
  },
  value: function (value) {
    this.setAttribute('value', value)
  }
}

// 设置data的访问proxy
let data = new Proxy({}, {
  get: function (target, key, receiver) {
    return target.value
  },
  set: function (target, key, value, receiver) {
    target.value = value
    scan()
    return target.value
  }
})

data['value'] = 'hello'
scan()

// 数据绑定监听
if (document.addEventListener) {
  elems[1].addEventListener('keyup', function (e) {
    data.value = e.target.value
  }, false)
} else {
  elems[1].attachEvent('onkeyup', function (e) {
    data.value = e.target.value
  }, false)
}

// 设置页面2秒后自动改变数据更新视图
setTimeout(function () {
  data.value = "Hello world"
}, 1000)

function scan () {
  // 扫描带指令的节点属性
  for (let elem of elems) {
    elem.directive = []
    // attributes 属性返回指定节点的属性集合
    for (let attr of elem.attributes) {
      if (attr.nodeName.indexOf('q-') >= 0) {
        // 调用属性指令
        directive[attr.nodeName.slice(2)].call(elem, data[attr.nodeValue])
        elem.directive.push(attr.nodeName.slice(2))
      }
    }
  }
}
