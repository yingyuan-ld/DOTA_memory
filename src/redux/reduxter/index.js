import produce from 'immer'

export default(state,action)=>{
    return produce(state, produceState=>{
	    switch (action.type){
	        case "NEXT_PROCESS"://登录 (下一步)
		        Object.assign(produceState,action.newdata);
		        return produceState
	        default:
	        	return produceState
	    }
	});
}