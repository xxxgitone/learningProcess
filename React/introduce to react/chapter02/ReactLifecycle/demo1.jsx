var Hello=React.createClass({

	getInitialState:function () {
		//最先执行1
		alert('inti');
		return{
			opacity:1,
			fontSize:'12px'
		};
	},

	render:function () {
		// var styleObj={
		// opacity:1,
		// fontSize:'12px'
		// };

		// 3
		//使用内联样式的化，需要写成对象形式style={{color:'red'}}，属性名驼峰法
		//style={this.styleObj}
		return <div style={{opacity:this.state.opacity,fontSize:this.state.fontSize}}>Hello {this.props.name}</div>
	},

	componentWillMount:function () {
		//记载之前调用
		//2
		alert('will');
	},
	componentDidMount:function () {
		//加载之后调用
		//4
		alert('did');

		// var _self=this;
		// window.setTimeout(function(){
		// 	_self.setState({
		// 		opacity:0.5,
		// 		fontSize:'50px'
		// 	});
		// },1000);

		window.setTimeout(function(){
			this.setState({
				opacity:0.5,
				fontSize:'50px'
			});
		}.bind(this),1000);
	},


});

ReactDOM.render(
	<Hello name="Word" />,
	document.getElementById('container')
);