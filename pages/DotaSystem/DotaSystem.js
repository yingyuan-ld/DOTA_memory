import React from 'react';
import "./DotaSystem.scss";
import {Login,Prepare,Playing} from "../../components";
var socket = io();
setTimeout(() => {
    console.info(socket.id);
}, 100); 
const component = {//所有的容器组件(最复杂有5层容器)
    Login:Login,
    Prepare:Prepare,
    Playing:Playing
}
class Component extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            myname:"",
            process:["Login","Prepare","Playing"],//游戏流程
            progress_state:0
        }
    }
    next_process(name){//进行到下一个流程
        this.setState({
            progress_state:this.state.progress_state+1,
            myname:name||this.state.myname
        });
    }
  	render() {
        let FieldBox = component[this.state.process[this.state.progress_state]];
        let data = {
            myname:this.state.myname,
            next_process:this.next_process.bind(this),
            socket:socket
        }
        // console.info(this.state.progress_state);
        return <FieldBox {...data}/>;
  	}
}
module.exports = Component;