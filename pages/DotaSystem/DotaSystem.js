import React from 'react';
import "./DotaSystem.scss";
import {Login,Prepare,Playing} from "../../components";
const component = {//所有的容器组件(最复杂有5层容器)
    Login:Login,
    Prepare:Prepare,
    Playing:Playing
}
class Component extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            process:["Login","Prepare","Playing"],//游戏流程
            progress_state:1
        }
    }
    next_process(){//进行到下一个流程
        this.setState({progress_state:this.state.progress_state+1});
    }
  	render() {
        let FieldBox = component[this.state.process[this.state.progress_state]];
        let data = {
            next_process:this.next_process.bind(this)
        }
        console.info(this.state.progress_state);
        return <FieldBox {...data}/>;
  	}
}
module.exports = Component;