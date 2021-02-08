import React from 'react';
import "./BuffIon.scss";

class BuffIon extends React.Component{
    constructor(){
        super();
    }
  	render() {
        // {id:0,name:"晕眩",message:"使该单位无法攻击,出牌,使用装备"},
        return <div className="BuffIon_box" style={{background: "url(./src/server/stateImg/"+this.props.id+".jpg) no-repeat center"}}>
            <div className="tooltip">
                <div>
                    {this.props.name}
                    <div className="Buff_time">{this.props.buffTime}</div>
                    {this.props.buffObj[this.props.id]?<div className="Buff_obj">{this.props.buffObj[this.props.id]}</div>:""}
                </div>
                <div>{this.props.message}</div>
            </div>
        </div>
    }
}
export default BuffIon;