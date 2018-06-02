import React from 'react';
import "./DotaSystem.scss";
import {Login,Prepare,Playing} from "../../components";
var socket = io();
setTimeout(() => {
    console.info(socket.id);
}, 100); 
const component = {//页面
    Login:Login,//登录
    Prepare:Prepare,//准备
    Playing:Playing//进行
}
class Component extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            myname:"",
            myid:"",
            thatname:"",
            thatid:"",
            process:["Login","Prepare","Playing"],//游戏流程
            progress_state:2
        }
    }
    componentWillMount(){
    }
    next_process(newdata){//进行到下一个流程
        let state = this.state;
        state = Object.assign(state,newdata);
        this.setState(state);
    }
  	render() {
        let FieldBox = component[this.state.process[this.state.progress_state]];
        let data = {
            next_process:this.next_process.bind(this),
            socket:socket
        }
      return <FieldBox {...data}{...this.state}/>;
  	}
}
module.exports = Component;