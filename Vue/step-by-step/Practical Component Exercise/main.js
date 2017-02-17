Vue.component('message', {
	
	//父组件通过props向子组件传递数据
	props: ['title', 'body'],

	data() {

		return {
			isVisible: true
		}

	},

	template : `
		<article class="message" v-show="isVisible">
		  <div class="message-header">
		    
		    {{ title }}

		    <button type="button" @click="isVisible = false">X</button>

		  </div>
		  <div class="message-body">
		    
			{{ body }}

		  </div>
		</article>
	`,
	
	//这里简单的逻辑操作，可以直接写进@click里面
	// methods: {

	// 	hideModel() {
	// 		this.isVisible = !this.isVisible;
	// 	}

	// }

});

new Vue({

	el: '#root'

});