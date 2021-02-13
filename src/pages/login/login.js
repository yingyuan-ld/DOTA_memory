import React,{ useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as allActions from '@/redux/actions/index';
import "./login.scss";

const login = (props)=>{
	const { actions:{ next_process, show_compop } } = props;
	const [myname, setMyname] = useState('');
	const [myid, setMyid] = useState('');
	useEffect(()=>{
		window.socket.on('getLogin', function(res){//返回登录结果
			if(res.type){
				console.info(res.message);
				next_process({//可以进行下一步了
					myname:res.name,
					myid:res.id,
					progress_state:1
				})
			}else{
				show_compop({message:res.message,Turebtn:true});
			}
		})
	})
	const edit = (e)=>{
		setMyname(e.target.value);
	}
	const send = ()=>{
		if(myname===""){
			show_compop({message:"名字必填!",Turebtn:true});
			return;
		}
		window.socket.emit('login', myname);
	}
	return (
		<div className="login_box">
			<div className="login">
				<div className="login_title">输入名字</div>
				<input type="text"
					className="name_input"
					onChange={edit}
					value={myname}
				/>
				<div className="login_btn" onClick={send}>登录</div>
			</div>
		</div>
	);
}
function mapStateToProps(state) {
  return state ;
}
function mapDispatchToProps(dispatch) {
  return{ actions: bindActionCreators(allActions, dispatch)};
}
export default connect(mapStateToProps, mapDispatchToProps)(login);