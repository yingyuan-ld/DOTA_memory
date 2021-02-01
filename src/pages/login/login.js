import React,{ useState, useEffect } from 'react';
import "./login.scss";

const login = (regs)=>{
	const { next_process, actions } = regs;
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
				actions.show_compop({message:res.message,Turebtn:true});
			}
		})
	})
	const edit = (e)=>{
		setMyname(e.target.value);
	}
	const send = ()=>{
		let that = this;
		if(that.state.myname===""){
			actions.show_compop({message:"名字必填!",Turebtn:true});
			return;
		}
		window.socket.emit('login', that.state.myname);
	}
	return (
		<div className="login_box">
			<div className="login">
				<div className="login_title">输入名字1</div>
				<input type="text"
					className="name_input"
					onChange={edit}
					value={this.state.myname}
				/>
				<div className="login_btn" onClick={send}>登录</div>
			</div>
		</div>
	);
}
// class login extends React.Component{
//     constructor(props) {
//       super(props);
//       this.state = {
// 				myname:"",
// 				myid:""
//       }
//     	// this.textInput = React.createRef();
// 	 }
	  
// 	componentWillMount(){
// 		let that = this;
// 		window.socket.on('getLogin', function(res){//返回登录结果
// 			if(res.type){
// 				console.info(res.message);
// 				that.props.next_process({//可以进行下一步了
// 					myname:res.name,
// 					myid:res.id,
// 					progress_state:1
// 				})
// 			}else{
// 				that.props.actions.show_compop({message:res.message,Turebtn:true});
// 			}
// 		})
// 	}
//   	edit(val){
//       	this.setState({myname:val.target.value});
//   	}
//   	send(){
// 		let that = this;
// 		if(that.state.myname===""){
// 			this.props.actions.show_compop({message:"名字必填!",Turebtn:true});
// 			return;
// 		}
// 		window.socket.emit('login', that.state.myname);
//   	}
// 	componentDidMount() {
// 		this.refs.textInput.focus();
// 	}
//   	render() {
//     	return (<div className="login_box">
//     		<div className="login">
// 	        	<div className="login_title">输入名字</div>
// 	        	<input type="text"
// 	        		ref={"textInput"}
// 	        		className="name_input"
// 	        		onChange={this.edit.bind(this)}
// 	        		value={this.state.myname}
// 	        	/>
// 	        	<div className="login_btn" onClick={this.send.bind(this)}>登录</div>
//         	</div>
//     	</div>);
//   	}
// }
module.exports = login;