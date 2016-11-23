//1.React.Children.count这个方法会返回this.props.children中所包含的组件的数量
//接受一个参数React.Children.count(children);

//2.React.Children.only方法会返回this.props.children中唯一的子代。接受一个参数，如果子代多于
//一个，则不允许调用

var MyComponent=React.createClass({
	render:function(){
		var cnt=React.Children.count(this.props.children);
		console.log(cnt);//2

		return (
			<div>
				{this.props.name}
			</div>
			);
	}
});

ReactDOM.render(
	<MyComponent name='frodo' >
		<p key='firsty'>a child</p>
		<p key='2'>a child</p>
	</MyComponent>,

	document.getElementById('container')
	)