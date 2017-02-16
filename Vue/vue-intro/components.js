Vue.component('button-counter', {
	template: '<button v-on:click="increment">{{ counter }}</button>',
	// 组件中data必须是函数
	data: function () {
		return {
			counter: 0
		}
	},
	methods: {
		increment: function () {
			this.counter += 1;
			// 触发事件
			this.$emit('increment');
		}
	}
})

new Vue({
	el: '#counter-event-example',
	data: {
		total: 0
	},
	methods: {
		incrementTotal: function () {
			this.total += 1
		}
	}
})



