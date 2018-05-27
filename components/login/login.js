import React from 'react';
class login extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          	name:""
        }
  	}
	componentWillMount(){
		let that = this;
		this.props.socket.on('loginreturn', function(res){//返回登录结果
			if(res.type){
				that.props.next_process(that.state.name)//可以进行下一步了
			}else{
				alert(res.message)
			}
		})
	}
  	edit(val){
      	this.setState({name:val.target.value});
  	}
  	send(){
		let that = this;
		this.props.socket.emit('login', that.state.name);
  	}
  	render() {
    	return (<div>
        	<h1>输入名字</h1>
        	<input type="text" className="name_input" onChange={this.edit.bind(this)} value={this.state.name}/>
        	<div onClick={this.send.bind(this)}>确定</div>
    	</div>);
  	}
}
module.exports = login;