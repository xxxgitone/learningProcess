//ES6类的组件
class MyComponent extends React.Component{
	render(){
		return(
			<div>
				{this.props.name}
			</div>
		);
	}
};

//ReactDOM.render会将ReactElement渲染成DOM，通过为它提供一个DOM元素作为容器container，就知道放在哪
//接受三个参数
//ReactDOM.render(element,container[,callback])
//回调函数为可选参数
ReactDOM.render(
	<MyComponent name='frodo' />,
	document.getElementById('container')
	);