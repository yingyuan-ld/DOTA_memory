import React from 'react';
import "./DotaSystem.scss";
import Login from "../login/login";
import Prepare from "../Prepare/Prepare.js";
import Playing from "../playing/playing";

import Compop from "../../components/Compop/Compop";


import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as allActions from '../../redux/actions/index';
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
    }
  	render() {
        let pagedata = this.props;
        let FieldBox = component[pagedata.process[pagedata.progress_state]];
        let data = {
            next_process:this.props.actions.next_process,
            socket:socket,
            actions:this.props.actions
        }
        return <div style={{width:"100%",height:"100%"}}>
            <FieldBox {...data}{...pagedata}/>
            <Compop {...this.props.CompopData} actions={this.props.actions}/>
        </div>;
  	}
}

function mapStateToProps(state) {
    return state ;
}

function mapDispatchToProps(dispatch) {
    return{ actions: bindActionCreators(allActions, dispatch)};
}
export default connect(mapStateToProps, mapDispatchToProps)(Component);


