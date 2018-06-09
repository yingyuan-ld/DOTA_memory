import React from 'react';
import "./Card.scss";

class Card extends React.Component{
    constructor(){
        super();
        this.state = {
        }
    }
  	render() {
        // big_skill[0] = {id:0,name:"法力虚空",state: 1 ,message:"造成敌方己消耗能量值乘以200的伤害"}
        let basic = this.props.mystate;
        return <div className="card_box">
            <div className="card_ion"></div>
            <div className="card_name">{this.props.name}</div>
            <div className="card_message">{this.props.message}</div>
        </div>
  	}
}
module.exports = Card;