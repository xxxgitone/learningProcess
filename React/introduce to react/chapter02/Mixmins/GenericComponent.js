//初始渲染期间的生命周期
var GenericComponent = React.createClass({
	//第一步
	getInitalProps: function() {
		return {}
	},

	//第二步
	getInitalState: function() {
		return {}
	},

	//第三部步
	componentWillMount: function() {

	},

	//第四步
	render: function() {
		return ( <h1> Hello world </h1>),

		},

			//第五步
		componentDidMount: function() {

		}
});

//状态改变时的生命周期
var GenericComponent = React.createClass({

	//第一步，组件判断是否重新渲染时调用
	shouldComponentUpdate: function() {

	},

	//2
	componentWillUpdate: function() {

	},

	//3
	render: function() {
		return ( <h1> Hello world </h1>)
		}

	//3
	componentDidUpdate: function() {

	}
});

//属性改变的组件生命周期

var GenericComponent=React.createClass({
	//1
	componentWillReceiveProps:function (nextProps) {
		// body...
	},

	//2.
	shouldComponentUpdate:function (nextProps,nextState) {
		// body...
	},

	//3
	componentWillUpdate:function (nextProps,nextState) {
		// body...
	}

	//4
	render: function() {
		return ( <h1> Hello world </h1>)
		}

	//5
	componentDidUpdate:function () {
		
	}

})
