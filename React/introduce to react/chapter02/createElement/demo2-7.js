//React.createElement方法会生成新的ReactElement。至少需要一个参数，加上可选的一共三个
//React.createElement(type,[props],[children...])

var MyComponent=React.createClass({
	displayName:"MyComponent",

	render:function render(){
		return React.createElement(
			"div",
			null,
			this.props.name
			);
	}
})

ReactDOM.render(React.createElement(MyComponent,{name:'frodo'}),
		document.getElementById('container')
	);