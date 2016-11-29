var TestClickComponent=React.createClass({

	handleClick:function (e) {
			var tipE=this.refs.tip;//取得span元素

			if(tipE.style.display=='none'){
				tipE.style.display='inline';
			}else{
				tipE.style.display='none';
			}

			e.preventDefault();
			e.stopPropagation();
	},
	render:function(){
		return(
			<div>
				<button onClick={this.handleClick}>显示|隐藏</button><span ref="tip">测试点击</span>
			</div>
		);
	},

});

var TestInputComponent=React.createClass({
	getInitialState:function (e) {
		return {
			inputContent:''
		}
	},
	handleChange:function (e) {
		this.setState({
			inputContent:e.target.value
		});

		e.preventDefault();
		e.stopPropagation();
	},

	render:function(){
		return(
			<div>
				<input type="text" onChange={this.handleChange} /><span>{this.state.inputContent}</span>
			</div>
		)
	},

});



ReactDOM.render(
	<div>
		<TestClickComponent />
		<TestInputComponent />
	</div>,

	document.getElementById('container')
);















