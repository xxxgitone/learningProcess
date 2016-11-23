//React.Children.map是React.Children中的函数。该对象有几个辅助函数，可以让你更易于使用你的
//组件属性this.props.children,它会为每个当前包含的子代（children）执行函数，然后返回对象
//this.props.children 属性。它表示组件的所有子节点
//React.Children.map(children,myFn,[,context]),myFn会被每个children调用,context可选

//还有另一个方法与它类似React.Children.forEach,除了不返回对象，其他与map相似
var MyComponent=React.createClass({
	render:function(){
		React.Children.map(this.props.children,function(child){
			console.log(child);//输出 Object { type="p",  key="firsty",  props={...},  更多...}
								//Object { type="p",  key="2",  props={...},  更多...}
		});

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


