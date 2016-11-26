//DOM绑定事件方式
//<button onclick="activateLasers()">
  //Activate Lasers
//</button>

// React绑定事件方式
//<button onClick={activateLasers}>
 // Activate Lasers
// </button>

//在DOM绑定事件有时候要使用return false阻止默认行为，但在React中不需要
//<a href="#" onclick="console.log('The link was clicked.'); return false">
 // Click me
//</a>

// 在React中可以写为如下
// function ActionLink() {
//   function handleClick(e) {
//     e.preventDefault();
//     console.log('The link was clicked.');
//   }

//   return (
//     <a href="#" onClick={handleClick}>
//       Click me
//     </a>
//   );
// }

//可以不是addEventListener监听DOM事件

// class Toggle extends React.Component{
// 	constructor(props){
// 		super(props);
// 		this.state={isToggleOn:false};

// 		this.handleClick=this.handleClick.bind(this);
// 	};

// 	handleClick(){
// 		this.setState(
// 			prevState=>({
// 				isToggleOn:!prevState.isToggleOn
// 			})
// 		);
// 	};

// 	render(){
// 		return(
// 			<button onClick={this.handleClick}>
//         		{this.state.isToggleOn ? 'ON' : 'OFF'}
//       		</button>
// 		)
// 	};
// }

// ReactDOM.render(
// 	<Toggle />,
//   	document.getElementById('root')
// 	)

//这样可以不是用bind
class LoggingButton extends React.Component {
  handleClick() {
    console.log('this is:', this);
  }

  render() {
    // This syntax ensures `this` is bound within handleClick
    return (
      <button onClick={(e) => this.handleClick(e)}>
        Click me
      </button>
    );
  }
}
ReactDOM.render(
	<LoggingButton />,
  	document.getElementById('root')
	)












