//传统更新UI的方式
// function tick() {
//   const element = (
//     <div>
//       <h1>Hello, world!</h1>
//       <h2>It is {new Date().toLocaleTimeString()}.</h2>
//     </div>
//   );
//   ReactDOM.render(
//     element,
//     document.getElementById('root')
//   );
// }

// setInterval(tick, 1000);

//下面实现方法有所改善，但仍然不是Clock自己实现更新
// function Clock(props) {
//     return(
//       <div>
//         <h1>Hello, world!</h1>
//         <h2>It is {props.date.toLocaleTimeString()}.</h2>
//       </div>
//       );
// }

// function tick() {
//   ReactDOM.render(
//     <Clock date={new Date()} />,
//     document.getElementById('root')
//   );
// }

// setInterval(tick, 1000);


// 将函数转换为类
// 继承React.Component
// props改为this.props
// 这个类里面必须含有render方法
// class Clock extends React.Component{
//   render(){
//     return(
//         <div>
//           <h1>Hello, world!</h1>
//           <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
//         </div>
//       );
//   };
// }

// function tick() {
//   ReactDOM.render(
//     <Clock date={new Date()} />,
//     document.getElementById('root')
//   );
// }

// setInterval(tick, 1000);

// 将this.props改为this.state，两者类似，后者一般定义需要改变的属性
// 添加constructor构造函数初始化this.state
// 组件会读取构造器里面的属性
// class Clock extends React.Component{
//   constructor(props){
//       super(props);
//       this.state={date:new Date()};
//   };

//   render(){
//     return(
//         <div>
//           <h1>Hello, world!</h1>
//           <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
//         </div>
//       );
//   };
// }

// ReactDOM.render(
//   <Clock />,
//   document.getElementById('root')
// );

// 添加生命周期函数进入类中，以达到自我更新的效果
// class Clock extends React.Component{
//   constructor(props){
//       super(props);
//       this.state={date:new Date()};
//   };

//   // 插入真实DOM之后
//   componentDidMount() {
//     this.timerID = setInterval(
//       () => this.tick(),//ES6中的胖头函数
//       1000
//     );
//   };

//   // 移除DOM之前
//   componentWillUnmount() {
//     clearInterval(this.timerID);
//   };

//   // 改变属性
//   tick() {
//     this.setState({
//       date: new Date()
//     });
//   }

//   render(){
//     return(
//         <div>
//           <h1>Hello, world!</h1>
//           <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
//         </div>
//       );
//   };
// }

// ReactDOM.render(
//   <Clock />,
//   document.getElementById('root')
// );


// setState的正确使用
// setState是异步加载的

//this.setState的正确使用方法，要传入一个对象
// this.state.comment='hello';//这是错误的，不能直接赋值
// //正确
// this.setState({
//   comment:'hello'
// });

// 传入多个状态属性

// // Wrong
// this.setState({
//   counter: this.state.counter + this.props.increment,
// });

// // Correct
// this.setState((prevState, props) => ({
//   counter: prevState.counter + props.increment
// }));

// // 状态的更新和合并
// // 定义多个可变因素
//   constructor(props) {
//     super(props);
//     this.state = {
//       posts: [],
//       comments: []
//     };
//   }

//  componentDidMount() {
//     fetchPosts().then(response => {
//       this.setState({
//         posts: response.posts
//       });
//     });

//     fetchComments().then(response => {
//       this.setState({
//         comments: response.comments
//       });
//     });
//   }

// 也可以使用用户组定义的组件
// function FormattedDate(props) {
//   return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
// }

// class Clock extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {date: new Date()};
//   }

//   componentDidMount() {
//     this.timerID = setInterval(
//       () => this.tick(),
//       1000
//     );
//   }

//   componentWillUnmount() {
//     clearInterval(this.timerID);
//   }

//   tick() {
//     this.setState({
//       date: new Date()
//     });
//   }

//   render() {
//     return (
//       <div>
//         <h1>Hello, world!</h1>
//         <FormattedDate date={this.state.date} />
//       </div>
//     );
//   }
// }

// ReactDOM.render(
//   <Clock />,
//   document.getElementById('root')
// );


function FormattedDate(props) {
  return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
}

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <FormattedDate date={this.state.date} />
      </div>
    );
  }
}

// 调用多个
function App() {
  return (
    <div>
      <Clock />
      <Clock />
      <Clock />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));




















