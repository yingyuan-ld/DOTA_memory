import React from 'react';
import "./DotaSystem.scss";
class Component extends React.Component{
    constructor(){
        super();
        this.state = {
            message:"",
            record:""
        }
    }
    edit(val){
        this.setState({message:val.target.value});
    }
    send(){
        console.info(this.state.message);
        console.info(fetch);
        let url = "/message?name=ludi&value="+this.state.message;
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
        return <div className="system_body">
            <h1>Hello React</h1>
            <div className="Chat_record"></div>
            <textarea className="text_input" onChange={this.edit.bind(this)} value={this.state.message}></textarea>
            <div className="online_list"></div>
            <div className="send" onClick={this.send.bind(this)}>发送</div>
        </div>;
  	}
}
module.exports = Component;