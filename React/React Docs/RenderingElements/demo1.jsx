// const element = <h1>Hello, world</h1>;//将要渲染的元素

// // 接受三个参数，一个组件对象或者直接定义的包含单一根元素的对象，第三个为可选参数，函数回滚callback
// ReactDOM.render(//渲染函数
//   element,
//   document.getElementById('root')
// );

// 更新元素
// 一般来说render只渲染一次，并且在需要的时候才渲染
// 这是一种传统的更新UI的方式
function tick() {

  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(
    element,
    document.getElementById('root')
  );

}

setInterval(tick, 1000);//每一秒钟调用一次



