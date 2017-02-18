Vue.component('modal', {

	template: `
		<div class="modal is-active">
		  <div class="modal-background"></div>
		  <div class="modal-content">
		  
		      <div class="box">

		         <!--<p>
		          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
		          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
		          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
		        </p>
				-->

				<p>
					<slot></slot>
				</p>

		      </div>
		     

		  </div>
		  <button class="modal-close" @click="$emit('close')"></button>
		</div>
	`,


})


new Vue({

	el: '#root',

	data: {
		showModal: false
	}

})