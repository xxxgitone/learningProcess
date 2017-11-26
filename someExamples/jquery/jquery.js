// 简单实现jQuery链式调用
function JQuery (selector) {
  this.elements = []
  var nodeList = document.getElementsByTagName(selector)
  for (var i = 0; i < nodeList.length; i++) {
    this.elements.push(nodeList[i])
  }
  return this
}

JQuery.prototype = {
  eq: function (num) {
    this.elements = [this.elements[num]]
    return this
  },
  css: function (prop, val) {
    this.elements.forEach(function(el) {
      el.style[prop] = val
    })
    return this
  },
  show: function () {
    this.css('display', 'block')
    return this
  }
}

window.$ = function (selector) {
  return new JQuery(selector)
}

$('div').eq(0).css('width', '200px').show()