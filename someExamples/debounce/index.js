var count = 1
var container = document.getElementById('container')

function getUserAction (e) {
  console.log(e)
  console.log(this)
  container.innerHTML = count++
}

container.onmousemove = debounce(getUserAction, 1000, true)

// 防抖原理：
// 虽然频繁的触发事件，但是一定在事件触发后n秒后才执行
// 如果在一个事件触发的n秒内又触发了这个事件，那么以新的事件的时间为准，n秒后执行
// 就是要等你触发完事件 n 秒内不再触发事件，事件执行

/**
 * 
 * @param {Function} func 
 * @param {Number} wait 
 * @param {Boolean} immediate 
 * immediate参数判断是否立刻执行
 * 如果为true的时候，表示不用等到事件停止出发后才执行，而是立即执行，然后等到停止触发n秒后，才可以重新触发执行
 */
function debounce (func, wait, immediate) {
  var timeout, result

  return function () {
    var context = this
    // 处理参数，如event
    var args = arguments

    if (timeout) {
      clearTimeout(timeout)
    }

    if (immediate) {
      // 如果已经执行过，不再执行
      var callNow = !timeout
      timeout = setTimeout(function() {
        timeout = null
      }, wait)
      if (callNow) result = func.apply(context, args)
    } else {
      timeout = setTimeout(function(){
        func.apply(context, args)
      }, wait)
    }

    return result
  }
}

// function debounce (func, wait) {
//   var timeout

//   return function () {
//     var context = this
//     // 处理参数，如event
//     var args = arguments

//     if (timeout) {
//       clearTimeout(timeout)
//     }
//     timeout = setTimeout(function(){
//       func.apply(context, args)
//     }, wait)
//   }
// }

// ES6版
// const debounce = (func, wait) => {
//   let timer
  
//   return (...args) => {
//     if (timer) {
//       clearTimeout(timer)
//     }

//     timer = setTimeout(() => {
//       func.apply(this, args)
//     }, wait)
//   }
// }
