var count = 1
var container = document.getElementById('container')

function getUserAction (e) {
  console.log(e)
  console.log(this)
  container.innerHTML = count++
}

container.onmousemove = throttle1(getUserAction, 3000)

// 节流的防抖的目的一致，都是为了限制事件的频繁触发

// 节流的原理
// 如果持续触发事件，每隔一段时间，只执行一次事件

// 两种主流实现方式，一种是使用时间戳，一种是设置定时器

// 使用时间戳
// 当触发事件的时候，我们取出当前的时间戳，然后减去之前的时间戳（最一开始至设为）
//如果大于设置的时间周期，就执行函数，然后更新时间戳为当前的时间戳
// 如果小于就不执行
function throttle (func, wait) {
  var context, args
  var previous = 0

  return function () {
    var now = +new Date()
    context = this
    args = arguments
    if (now - previous > wait) {
      func.apply(context, args)
      previous = now
    }
  }
}


//使用定时器
// 当触发事件的时候，我们设置一个定时器，再出发事件的时候，如果定时器存在，就不执行，知道定时器执行
// 然后执行函数，清空定时器，这样就可以设置下一个定时器
function throttle1 (func, wait) {
  var timeout, context, agrs
  var previous = 0

  return function () {
    context = this
    agrs = arguments
    if (!timeout) {
      timeout = setTimeout(function () {
        timeout = null
        func.apply(context, agrs)
      }, wait)
    }
  }
}

// 两种方法比较
// 1.第一种事件会立刻执行，第二种事件会在 n 秒后第一次执行
// 第一种事件停止触发后没有办法再执行事件，第二种事件停止触发后依然会再执行一次事件 