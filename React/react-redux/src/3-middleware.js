import { applyMiddleware, createStore } from 'redux';

const reducer = (initalState=0, action) =>{
	if (action.type === "INC") {
		return initalState + 1;
	}else if (action.type === "DEC") {
		return initalState - 1;
	}else if(action.type ==="E"){
		throw new Error("AHHHHHHH");
	}

	return initalState;
}

const logger = (store) => (next) => (action) =>{
	console.log("action fired", action);
	//action.type = "DEC";
	
	next(action); //这里相当于再执行一次action let next=store.dispacth();

}

const error = (store) => (next) => (action) =>{
	try{
		next(action); 
	}catch(e){
		console.log("AHHHHH!!", e);
	}
}

const middleware = applyMiddleware(logger, error);

const store = createStore(reducer, 1, middleware);

store.subscribe(() =>{
	console.log("store changed", store.getState());
})

store.dispatch({type: "INC"});
store.dispatch({type: "INC"});
store.dispatch({type: "INC"});
store.dispatch({type: "DEC"});
store.dispatch({type: "DEC"});
store.dispatch({type: "DEC"});
store.dispatch({type: "E"});

