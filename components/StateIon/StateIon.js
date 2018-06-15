import React from 'react';
import "./StateIon.scss";

class StateIon extends React.Component{
    constructor(){
        super();
        this.state = {
        }
    }
  	render() {
        // {id:0,name:"晕眩",message:"使该单位无法攻击,出牌,使用装备"},statusTime
        return <div className="StateIon_box" >
            <div>{this.props.name}</div>
            <div>{this.props.message}</div>
        </div>
    }
}
module.exports = StateIon;