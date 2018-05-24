import React from 'react';
import "./Prepare.scss";
class Component extends React.Component{
    constructor(){
        super();
        this.state = {
            getpersen:[]
        }
    }
    componentWillMount(){
        this.getpersen();
        console.info("1234567890")
    }
    getpersen(){
        let that = this;
        let url = "/getpersen";
        fetch(url,{
            method: "Get", 
            headers:{'Content-Tipe':'application/json'}
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            let getpersen = [];
            for(name in data){
                getpersen.push(name);
            }
            that.setState({getpersen:getpersen});
        });
    }
    render_presen(){
        return this.state.getpersen.map((name,i)=>{
            return <div onClick={this.select_persen.bind(this,name)}>{name}</div>
        })
    }
    select_persen(){
        
    }
    edit(val){
        this.setState({message:val.target.value});
    }
  	render() {
        return <div className="prepare_body">
            <h1>请选择一个玩家</h1>
            <div className="Chat_record"></div>
            <textarea className="text_input" onChange={this.edit.bind(this)} value={this.state.message}></textarea>
            <div className="online_list">
                {this.render_presen()}
            </div>
            <div className="send" onClick={this.getpersen.bind(this)}>发送</div>
        </div>;
  	}
}
module.exports = Component;