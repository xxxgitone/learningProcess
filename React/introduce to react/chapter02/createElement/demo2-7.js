//React.createElement方法会生成新的ReactElement。至少需要一个参数，加上可选的一共三个
//React.createElement(type,[props],[children...])

var MyComponent=React.createClass({
	displayName:"MyComponent", //是在你查看你的React应用的调用信息时所使用的属性

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