class TestClickComponent extends React.Component{
	constructor(props) {
	    super(props);
	    this.handleClick=this.handleClick.bind(this);
 	};
	
	handleClick(e){
		var tipE=this.refs.tip;//取得span元素

		if(tipE.style.display=='none'){
			tipE.style.display='inline';
		}else{
			tipE.style.display='none';
		}

		e.preventDefault();
		e.stopPropagation();
	};

	render(){
		return(
			<div>
				<button onClick={this.handleClick}>显示|隐藏</button><span ref="tip">测试点击</span>
			</div>
		);
	};

};

class TestInputComponent extends React.Component{
	constructor(props){
		super(props);
		this.state={inputContent:''};
		this.handleChange=this.handleChange.bind(this);
	};
	handleChange(e){
		this.setState({
			inputContent:e.target.value
		});

		e.preventDefault();
		e.stopPropagation();
	};

	render(){
		return(
			<div>
				<input type="text" onChange={this.handleChange} /><span>{this.state.inputContent}</span>
			</div>
		)
	};

}

ReactDOM.render(
	<div>
		<TestClickComponent />
		<TestInputComponent />
	</div>,

	document.getElementById('container')
);
