// 手动触发绑定实现数据对象的变更检测，数据双向绑定
// 手动触发是当用户输入内容变化时，通过监听change、select、keyup等方法来触发操作ViewModel的数据
let elems = [document.getElementById('el'), document.getElementById('input')]
let data = {
  value: 'Hello'
}

// 定义指令 Directive
let directive = {
  text: function (text) {
    this.innerHTML = text
  },
  value: function (value) {
    this.setAttribute('value', value)
  }
}

// 数据绑定监听
if (document.addEventListener) {
  elems[1].addEventListener('keyup', function (e) {
    ViewModelSet('value', e.target.value)
  }, false)
} else {
  elems[1].attachEvent('onkeyup', function (e) {
    ViewModelSet('value', e.target.value)
  }, false)
}

// 开始扫面节点
scan()

// 设置页面2秒后自动改变数据更新视图
setTimeout(function () {
  ViewModelSet('value', 'Hello world')
}, 1000)

function scan () {
  // 扫描带指令的节点属性
  for (let elem of elems) {
    elem.directive = []
    // attributes 属性返回指定节点的属性集合
    for (let attr of elem.attributes) {
      if (attr.nodeName.indexOf('x-') >= 0) {
        // 调用属性指令
        directive[attr.nodeName.slice(2)].call(elem, data[attr.nodeValue])
        elem.directive.push(attr.nodeName.slice(2))
      }
    }
  }
}

// 设置数据改变后扫描节点
function ViewModelSet(key, value) {
  data[key] = value
  scan ();
}