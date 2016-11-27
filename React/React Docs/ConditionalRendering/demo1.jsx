//按条件渲染

// function UserGreeting(props) {
//   return <h1>Welcome back!</h1>;
// }
// function GuestGreeting(props) {
//   return <h1>Please sign up.</h1>;
// }
// //判断是否登录成功
// function Greeting(props) {
//   const isLoggedIn = props.isLoggedIn;
//   if (isLoggedIn) {
//     return <UserGreeting />;
//   }
//   return <GuestGreeting />;
// }

// ReactDOM.render(
//   // Try changing to isLoggedIn={true}:
//   <Greeting isLoggedIn={false} />,
//   document.getElementById('root')
// );


// function UserGreeting(props) {
//   return <h1>Welcome back!</h1>;
// }

// function GuestGreeting(props) {
//   return <h1>Please sign up.</h1>;
// }

// function Greeting(props) {
//   const isLoggedIn = props.isLoggedIn;
//   if (isLoggedIn) {
//     return <UserGreeting />;
//   }
//   return <GuestGreeting />;
// }

// function LoginButton(props) {
//   return (
//     <button onClick={props.onClick}>
//       Login
//     </button>
//   );
// }

// function LogoutButton(props) {
//   return (
//     <button onClick={props.onClick}>
//       Logout
//     </button>
//   );
// }
// //创建一个按钮控制组件，根据状态来控制登入注销
// class LoginControl extends React.Component{
// 	constructor(props){
// 		super(props);
// 		this.state={isLoggedIn:false};
// 		this.handleLoginClick = this.handleLoginClick.bind(this);
//     	this.handleLogoutClick = this.handleLogoutClick.bind(this);
// 	};

// 	handleLoginClick(){
// 		this.setState({
// 			isLoggedIn:true
// 		});
// 	};

// 	handleLogoutClick(){
// 		this.setState({
// 			isLoggedIn:false
// 		});
// 	};

// 	render(){
// 		const isLoggedIn=this.state.isLoggedIn;

// 		let button=null;
// 		if(isLoggedIn){
// 			button = <LogoutButton onClick={this.handleLogoutClick} />;
// 		}else{
// 			button = <LoginButton onClick={this.handleLoginClick} />;
// 		}

// 		return(
// 			<div>
//         		<Greeting isLoggedIn={isLoggedIn} />
//         		{button}
//       		</div>
// 			);
// 	};
// }

// ReactDOM.render(
//   <LoginControl />,
//   document.getElementById('root')
// );


// function Mailbox(props) {
//   const unreadMessages = props.unreadMessages;
//   return (
//     <div>
//       <h1>Hello!</h1>
//       {unreadMessages.length > 0 &&
//         <h2>
//           You have {unreadMessages.length} unread messages.
//         </h2>
//       }
//     </div>
//   );
// }

// const messages = ['React', 'Re: React', 'Re:Re: React'];

// ReactDOM.render(
//   <Mailbox unreadMessages={messages} />,
//   document.getElementById('root')
// );

//三段式写法
// render() {
//   const isLoggedIn = this.state.isLoggedIn;
//   return (
//     <div>
//       The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.
//     </div>
//   );
// }

// render() {
//   const isLoggedIn = this.state.isLoggedIn;
//   return (
//     <div>
//       {isLoggedIn ? (
//         <LogoutButton onClick={this.handleLogoutClick} />
//       ) : (
//         <LoginButton onClick={this.handleLoginClick} />
//       )}
//     </div>
//   );
// }

//阻止组件渲染，以达到显示隐藏效果
function WarningBanner(props) {
  if (!props.warn) {
    return null;
  }

  return (
    <div className="warning">
      Warning!
    </div>
  );
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showWarning: true}
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick() {
    this.setState(prevState => ({
      showWarning: !prevState.showWarning
    }));
  }

  render() {
    return (
      <div>
        <WarningBanner warn={this.state.showWarning} />
        <button onClick={this.handleToggleClick}>
          {this.state.showWarning ? 'Hide' : 'Show'}
        </button>
      </div>
    );
  }
}

ReactDOM.render(
  <Page />,
  document.getElementById('root')
);























