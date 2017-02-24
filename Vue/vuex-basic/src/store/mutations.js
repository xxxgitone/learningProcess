export default {
	register(state, userId) {
	    const date = new Date;
	    //注意是双等于
	    const user = state.users.find(user => user.id == userId);
	    user.registered = true;
		const registration = {
			userId: user.id,
			name: user.name,
			date: date.getMonth() + '/' + date.getDay(),
		}
		state.registrations.push(registration);
	},
	unregister(state, payload) {
	    const user = state.users.find(user => user.id == payload.userId);
	    user.registered = false;
	    const registration = state.registrations.find(registration =>  registration.id == payload.userId);
	    state.registrations.splice(state.registrations.indexOf(registration), 1);
	}
}