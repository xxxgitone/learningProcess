const store = new Vuex.Store({
	state: {
		count: 0
	},
	mutations: {
		increment: state =>state.count++,
		decrement: state =>state.count--
	}
})

const app = new Vue({
	el: '#app',
	computed: {
		count() {
			return store.state.count;
		}
	},
	methods: {
		increment() {
			store.commit('increment');
		},
		decrement() {
			store.commit('decrement');
		}
	}
});