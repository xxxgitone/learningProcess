Vue.component('task', {
	//使用特殊的 <slot> 元素作为原始内容的插槽
	//除非子组件模板包含至少一个 <slot> 插口，否则父组件的内容将会被丢弃。当子组件模板只有一个没有属性的 slot 时，父组件整个内容片段将插入到 slot 所在的 DOM 位置，并替换掉 slot 标签本身。
	// template: '<li><slot></slot></li>'
	
	template: '<li><slot></slot></li>'

});

Vue.component('task-list', {

	template: `
		<div>
			<task v-for="task in tasks" >{{ task.task }}</task>
		</div>
	`,

	
	//组件中的data要为函数 
	data() {

		return {

			tasks: [
				{ task: 'Go to the store', completed: true },
				{ task: 'Go to the email', completed: false },
				{ task: 'Go to the farm', completed: false },
				{ task: 'Go to work', completed: true },
			]
		}
	}

});

new Vue({

	el: '#root',


});