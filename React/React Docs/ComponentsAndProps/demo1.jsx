
//可以想编写函数一样创建组件
// function Welcome(props) {
// 	return <h1>Hello,{this.props.name}</h1>;
// }

//使用ES6创建组件
// class Welcome extends React.Component{
// 	render(){
// 		return <h1>Hello,{this.props.name}</h1>;
// 	}
// }

//渲染组件
// function Welcome(props) {
// 	return <h1>Hello,{props.name}</h1>; //这里不使用this，React将{name="Sara"}作为属性即props
// }

// const element = <Welcome name="Sara" />;

// ReactDOM.render(
// 	element,
// 	document.getElementById('root')
// 	)

// 组合组件
// function Welcome(props) {
// 	return <h1>Hello,{props.name}</h1>;
// }
//组件必须要返回单一的根元素，这就是为什么要用div了，其他元素也可以
// function App() {
// 	return (
// 		<div>
// 			<Welcome name="Sara" />
// 			<Welcome name="Cahal" />
//       		<Welcome name="Edite" />
// 		</div>
// 		);
// }

// ReactDOM.render(
// 	<App />,
// 	document.getElementById('root')//这里不能使用分号，相当于函数的参数
// 	)

// 提取组件，以达到复用
function formatDate(date) {
  return date.toLocaleDateString();
}

// 这里包含了很多小的组件，可以把它提取出来，比如头像avatar，用户信息UserInfo
function Comment(props) {
  return (
    <div className="Comment">
      <UserInfo user={props.author} />
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
// 头像组件
function Avatar(props) {
  return (
    <img className="Avatar"
      src={props.user.avatarUrl}
      alt={props.user.name}
    />
  );
}
//用户信息组件
function UserInfo(props) {
  return (
    <div className="UserInfo">
      <Avatar user={props.user} />
      <div className="UserInfo-name">
        {props.user.name}
      </div>
    </div>
  );
}

//定义Comment组件的属性
const comment = {
  date: new Date(),
  text: 'I hope you enjoy learning React!',
  author: {
    name: 'Hello Kitty',
    avatarUrl: 'http://placekitten.com/g/64/64'
  }
};
ReactDOM.render(
  <Comment
    date={comment.date}
    text={comment.text}
    author={comment.author} />,
  document.getElementById('root')
);



























