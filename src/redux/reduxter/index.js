import produce from 'immer'

export default(state,action)=>{
    return produce(state, produceState=>{
	    switch (action.type){
	        case "NEXT_PROCESS":// 登录 (下一步)
		        Object.assign(produceState,action.newdata);
		        return produceState
	        case "SHOW_COMPOP":// 弹窗
    			let newdata = action.newdata;
		        Object.assign(produceState.CompopData,{
		        	show:true,
			        Closebtn:false,
			        CloseFun:null,
			        Turebtn:true,
			        TureFun:null,
		        },action.newdata);
		        return produceState
					case "HIDE_COMPOP":// 关闭
						produceState.CompopData.show = false;
						return produceState
					case "SET_STATE":// 更新状态
						produceState.gameState = {...produceState.gameState,...action.newdata};
						return produceState
					default:
	        	return produceState
	    }
	});
}