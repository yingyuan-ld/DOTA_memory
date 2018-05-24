import React from 'react';
class login extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          	name:""
        }
  	}
  	edit(val){
      	this.setState({name:val.target.value});
  	}
  	send(){
		let that = this;
		let url = "/login?"+that.state.name;
		fetch(url,{
			method: "Get", 
			headers:{'Content-Tipe':'application/json'}
		}).then(function(response) {
			return response.json();
		}).then(function(data) {
			console.log(data);
			if(data.type){
				that.props.next_process()//可以进行下一步了
			}else{
				alert(data.message)
			}
		});
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