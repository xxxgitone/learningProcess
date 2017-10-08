// Promise/A+规范
// 1、promise有三种状态， 等待（pending）、已完成（fulfilled）、已拒绝（rejected）
// 2、 promise的状态只能从“等待”转到“完成”或者“拒绝”，不能逆向转换，同时“完成”和“拒绝”也不能相互转换
// 3、promise必须有一个then方法，而且要返回一个promise，供then的链式调用，也就是可thenable的
// 4、then接受俩个回调(成功与拒绝),在相应的状态转变时触发，回调可返回promise，等待此promise被resolved后，继续触发then链

function Promiser (fn) {
  var promise = this
    promise._value
    promise._reason
    promise._resolves = []
    promise._rejects = []
    promise._status = 'PENDING'

  // 注册异步事件
  this.then = function (onFulfilled, onRejected) {
    return new Promiser(function(resolve, reject) {
      function handle (value) {
        var ret = typeof onFulfilled === 'function' && onFulfilled(value) || value
        if (ret && typeof ret['then'] === 'function') {
          ret.then(function(value) {
            resolve(value)
          }, function(reason) {
            reject(reason)
          })
        } else {
          resolve(ret)
        }
      }
      function errback (reason) {
        reason = typeof onRejected === 'function' && onRejected(reason) || reason
        reject(reason)
      }
      if (promise._status === 'PENDING') {
        promise._resolves.push(handle)
        promise._rejects.push(errback)
      } else if (promise._status === 'FULFILLED') {
        handle(promise._value)
      } else if (promise._status === 'REJECTED') {
        errback(promise._reason)
      }
    })
  }

  function resolve (value) {
    setTimeout(function () {
      promise._status === 'FULFILLED'
      promise._resolves.forEach(function (callback) {
        promise._value = callback(value)
      })
    }, 0)
  }

  function reject(value) {
    setTimeout(function(){
      promise._status = "REJECTED";
      promise._rejects.forEach(function (callback) {
          promise._reason = callback(value)
      })
    },0)
  }

  fn(resolve, reject)
}

var getData100 = function(){
  return new Promiser(function(resolve,reject){
      setTimeout(function(){
          resolve('100ms')
      },1000)
  })
}

var getData200 = function(){
  return new Promiser(function(resolve,reject){
      setTimeout(function(){
          resolve('200ms')
      },2000)
  })
}
var getData300 = function(){
  return new Promiser(function(resolve,reject){
      setTimeout(function(){
          reject('reject')
      },3000)
  });
}

getData100().then(function(data){
  console.log(data)      // 100ms
  return getData200()
}).then(function(data){
  console.log(data)      // 200ms
  return getData300()
}).then(function(data){
  console.log(data)      
}, function(data){
  console.log(data)      // 'reject'
})
