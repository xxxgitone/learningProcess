//mixins在组件中是个数组。mixins可以分配你的组件的生命周期，并且还可以确保它在组建生命周期
//中的适当时间才被执行
//使用主要组件TicTock时合并生命周期事件到SetIntervatMixin中

var SetIntervalMixin={
	componentWillMount:function(){//插入真实dom之前调用
		this.intervals=[];
	},
	setInterval:function () {
		this.intervals.push(setInterval.apply(null,arguments));
	},
	componentWillUnmount:function(){//移除真实DOM之前调用
		this.intervals.map(clearInterval);
	}
};

var TickTock=React.createClass({
	mixins:[SetIntervalMixin],  //use the mixin
	getInitialState:function(){//getInitialState 方法用于定义初始状态，也就是一个对象，
		//这个对象可以通过 this.state 属性读取.一般需要改变的属性就用它来定义
		return {seconds:0};
	},
	componentDidMount:function(){//插入DOM之后调用
		this.setInterval(this.tick,1000);
	},
	tick:function () {
		this.setState({seconds:this.state.seconds+1});
	},
	render:function () {
		return (
			<p>
				React has been running fo {this.state.seconds} seconds.
			</p>
			)
	}
});

ReactDOM.render(
	<TickTock />,
	document.getElementById('container')
	)

//组件的生命周期分成三个状态

        // Mounting：已插入真实 DOM
        // Updating：正在被重新渲染
        // Unmounting：已移出真实 DOM
        
//React 为每个状态都提供了两种处理函数，will 函数在进入状态之前调用，
//did 函数在进入状态之后调用，三种状态共计五种处理函数。


        // componentWillMount()
        // componentDidMount()
        // componentWillUpdate(object nextProps, object nextState)
        // componentDidUpdate(object prevProps, object prevState)
        // componentWillUnmount()
        


// componentWillReceiveProps(object nextProps)：已加载组件收到新的参数时调用
// shouldComponentUpdate(object nextProps, object nextState)：组件判断是否重新渲染时调用







