import React from 'react';
import "./DotaSystem.scss";
import Login from "../login/login";
import Prepare from "../Prepare/Prepare.js";
import Playing from "../playing/playing";
import Compop from "@/components/Compop/Compop";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as allActions from '@/redux/actions/index';

var socket = io();
window.socket = socket;
setTimeout(() => {
  console.info(socket.id);
}, 100); 
const component = {//页面
	Login:Login,//登录
	Prepare:Prepare,//准备
	Playing:Playing//进行
}

const DotaSystem = (props)=>{
	const { process, progress_state, actions, CompopData} = props
	let FieldBox = component[process[progress_state]];

	return(
		<div style={{width:"100%",height:"100%"}}>
			<FieldBox />
			<Compop {...CompopData} actions={actions}/>
		</div>
	)
}

function mapStateToProps(state) {
  return state ;
}
function mapDispatchToProps(dispatch) {
  return{ actions: bindActionCreators(allActions, dispatch)};
}
export default connect(mapStateToProps, mapDispatchToProps)(DotaSystem);


