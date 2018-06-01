import React from 'react';
import "./playing.scss";
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
  	render() {
        return <div className="system_body">
            <h1>一个界面</h1>
        </div>;
  	}
}
module.exports = Component;