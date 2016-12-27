import { combineReducers, createStore } from "redux";

// {
// 	user: {
// 		name: "will",
// 		age: 22
// 	}
// 	tweets: []
// }


const userReducer = (state={}, action) => {
	switch(action.type){
		case "CHANGE_NAME": {
			state = {...state, name:action.payload};
			break;
		}
		case "CHANGE_AGE": {
			state = {...state, age:action.payload};
			break;
		}
	}
	return state;
}

const tweetsReducer = (state=[], action) => {
	return state;
}

const reducers = combineReducers({
	user: userReducer,
	tweets: tweetsReducer
});


const store = createStore(reducers);

store.subscribe(() => {
	console.log('store change',store.getState());
});

store.dispatch({type:"CHANGE_NAME", payload: "Jiang"});
store.dispatch({type:"CHANGE_AGE", payload: 22});
store.dispatch({type:"CHANGE_AGE", payload: 23});

	