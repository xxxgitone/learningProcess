import Vue from 'vue';
import Vuex from 'vuex';

import actions from './actions.js';
import getters from './getters.js';
import mutations from './mutations.js';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		registrations: [],
		users: [
		    {id: 1, name: 'Max', registered: false},
		    {id: 2, name: 'Anna', registered: false},
		    {id: 3, name: 'Chris', registered: false},
		    {id: 4, name: 'Sven', registered: false}
		]
	},
	getters,
	mutations,
	actions
	// // 从state派生出一些状态,可以认为是 store 的计算属性
	// getters: {
	// 	unregisteredUsers(state) {
	// 		return state.users.filter(user => !user.registered);
	// 	},
	// 	registrations(state) {
	// 		return state.registrations;
	// 	},
	// 	totalRegistrations(state) {
	// 		return state.registrations.length;
	// 	}
	// },
	// mutations: {
	// 	register(state, userId) {
	// 	    const date = new Date;
	// 	    //注意是双等于
	// 	    const user = state.users.find(user => user.id == userId);
	// 	    user.registered = true;
	// 		const registration = {
	// 			userId: user.id,
	// 			name: user.name,
	// 			date: date.getMonth() + '/' + date.getDay(),
	// 		}
	// 		state.registrations.push(registration);
	// 	},
	// 	unregister(state, payload) {
	// 	    const user = state.users.find(user => user.id == payload.userId);
	// 	    user.registered = false;
	// 	    const registration = state.registrations.find(registration =>  registration.id == payload.userId);
	// 	    state.registrations.splice(state.registrations.indexOf(registration), 1);
	// 	}
	// },
	// //处理异步操作
	// actions: {
	// 	register({ commit }, userId) {
	// 		setTimeout(() => {
	// 			commit('register', userId);
	// 		}, 1000)
	// 	}
	// }
});




