import React from 'react';
import "./BuffIon.scss";

class BuffIon extends React.Component{
    constructor(){
        super();
    }
  	render() {
        // {id:0,name:"晕眩",message:"使该单位无法攻击,出牌,使用装备"},
        return <div className="BuffIon_box" >
            <div>{this.props.name}</div>
            <div>{this.props.message}</div>
        </div>
    }
}
module.exports = BuffIon;