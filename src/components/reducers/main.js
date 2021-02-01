export const main = (state = { 
	users : [],
	selectedId : "",
	paramsAsk : {},
}, action) => {

	switch( action.type ){
		
		case "setAddUsers" :
			state = {
				...state,
				users : [...state.users, ...action.payLoad],
			};
			break;
		
		case "setSelectedId" : 
			state = {
				...state,
				selectedId : action.payLoad,
			};
			break;
			
		case "setChangedUser" :
			state = {
				...state,
				users : state.users.map(item => item.id === action.payLoad.id ? action.payLoad : item),
			};
			break;
			
		case "setParamsAsk" : 
			state = {
				...state,
				paramsAsk : action.payLoad,
			};
			break;
	}
	
	return state;
}