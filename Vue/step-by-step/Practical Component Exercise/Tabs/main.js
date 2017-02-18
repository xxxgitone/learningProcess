Vue.component('tabs', {

	template: `
		
		<div>

			<div class="tabs">
			  <ul>
			  	<!--
					<li class="is-active"><a>Pictures</a></li>
					<li><a>Music</a></li>
					<li><a>Videos</a></li>
					<li><a>Documents</a></li>
			  	-->

			  	<li v-for="tab in tabs" :class="{ 'is-active': tab.isActive }">
			  		<a :href="tab.href" @click="selectTab(tab)">{{ tab.name }}</a>
			  	</li>
			    
			  </ul>
			</div>

			<div class="tabs-details">
				<slot></slot>
			</div>

		</div>
	

	`,

	data() {
		
		return {
			tabs: []
		}
	},

	created() {
		this.tabs = this.$children;
	},

	methods: {
		selectTab(selectedTab) {
			this.tabs.forEach(tab => {
				//后面判断式成立则为true
				tab.isActive = (tab.name === selectedTab.name);
			})
		}
	}

});

Vue.component('tab', {

	template: `
		<div v-show="isActive"><slot></slot></div>
	`,

	props: {
		name: { require: true},
		selected: { default: false}
	},

	data() {
		return {
			isActive: false
		}
	},

	computed: {
		
		href() {
			return '#' + this.name.toLowerCase().replace(/ /g, '-');
		}
	},

	mounted() {
		this.isActive = this.selected;
	},

})

new Vue({

	el: '#root'

});