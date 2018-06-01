import React from 'react';
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
		this.props.socket.on('getLogin', function(res){//返回登录结果
			if(res.type){
				console.info(res.message);
				that.props.next_process({//可以进行下一步了
					myname:res.name,
					myid:res.id,
					progress_state:1
				})
			}else{
				alert(res.message)
			}
		})
	}
  	edit(val){
      	this.setState({myname:val.target.value});
  	}
  	send(){
		let that = this;
		this.props.socket.emit('login', that.state.myname);
  	}
  	render() {
    	return (<div>
        	<h1>输入名字</h1>
        	<input type="text" className="name_input" onChange={this.edit.bind(this)} value={this.state.myname}/>
        	<div onClick={this.send.bind(this)}>确定</div>
    	</div>);
  	}
}
module.exports = login;