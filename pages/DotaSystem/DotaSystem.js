import React from 'react';
import "./DotaSystem.scss";
import {Login,Playing} from "../../components";
class Component extends React.Component{
    constructor(){
        super();
        this.state = {
        }
    }
  	render() {
        return <Login />;
  	}
}
module.exports = Component;