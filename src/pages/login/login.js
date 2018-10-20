import React from 'react';
import "./login.scss";
class login extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
			myname:"",
			myid:""
        }
	  }
	  
	componentWillMount(){
		let that = this;
		window.socket.on('getLogin', function(res){//返回登录结果
			if(res.type){
				console.info(res.message);
				that.props.next_process({//可以进行下一步了
					myname:res.name,
					myid:res.id,
					progress_state:1
				})
			}else{
				that.props.actions.show_compop({message:res.message,Turebtn:true});
			}
		})
	}
  	edit(val){
      	this.setState({myname:val.target.value});
  	}
  	send(){
		let that = this;
		if(that.state.myname===""){
			this.props.actions.show_compop({message:"名字必填!",Turebtn:true});
			return;
		}
		window.socket.emit('login', that.state.myname);
  	}
  	render() {
    	return (<div className="login_box">
    		<div className="login">
	        	<div className="login_title">输入名字</div>
	        	<input type="text" className="name_input" onChange={this.edit.bind(this)} value={this.state.myname}/>
	        	<div className="login_btn" onClick={this.send.bind(this)}>登录</div>
        	</div>
    	</div>);
  	}
}
module.exports = login;