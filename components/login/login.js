import React from 'react';
class login extends React.Component{
  	constructor(){
        super();
        this.state = {
          	name:""
        }
  	}
  	edit(val){
      	this.setState({name:val.target.value});
  	}
  	send(){
		let url = "/login?name="+this.state.name;
		fetch(url,{
			method: "Get", 
			headers:{'Content-Tipe':'application/json'}
		}).then(function(response) {
			return response.json();
		}).then(function(data) {
			console.log(data);
		}).catch(function(e) {
			console.log("error");
		});
  	}
  	render() {
    	return (<div>
        	<h1>输入名字</h1>
        	<input type="text" className="name_input" onChange={this.edit.bind(this)} value={this.state.name}/>
        	<div onClick={this.edit.bind(this)}>确定</div>
    	</div>);
  	}
}
module.exports = login;