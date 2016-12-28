import { applyMiddleware, createStore } from 'redux';
import axios from 'axios';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

const initalState = {
	fetching: false,
	fetched: false,
	users: [],
	error: null
}

const reducer = (state=initalState, action) =>{
	switch (action.type){
		case "FETCH_USERS_PENDING": {
			return {
				...state, 
				fetching: true
			}
			break;
		}
		case "FETCH_USERS_REJECTED": {
			return {
				...state, 
				fetching: false, 
				error: action.payload
			}
			break;
		}
		case "FETCH_USERS_FULFILLED": {
			return {
				...state, 
				fetching: false, 
				fetched: true, 
				users: action.payload
			}
			break;
		}
	}
	return state;
}

//promise自动异步，thunk自动发送第二个action，logger日志
const middleware = applyMiddleware(promise(), thunk, logger());

const store = createStore(reducer, middleware);


store.dispatch({
	type: 'FETCH_USERS',
	payload: axios.get("https://rest.learncode.academy/api/wstern/users")
})

//下面这些异步可以使用promise代替
// store.dispatch((dispatch) => {
// 	dispatch({type: 'FETCH_USERS_START'});
// 	axios.get("http://rest.learncode.academy/api/wstern/users")
// 		.then((response) =>{
// 			dispatch({type: 'RECEICE_USERS', payload: response.data})
// 		})
// 		.catch((err) =>{
// 			dispatch({type: 'FETCH_USERS_ERROR',payload: err})
// 		})
// });


