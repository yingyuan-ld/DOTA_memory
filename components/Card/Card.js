import React from 'react';
import {doskill} from '../action';//使用技能
import "./Card.scss";

class Card extends React.Component{
    constructor(){
        super();
        this.state = {
        }
    }
    usecard(id,name){
        if(this.props.round==0){
            let messagelist = this.props.messagelist;
            messagelist.push("现在不是你的回合！");
            this.props.setState({messagelist:messagelist});
            return;
        }
        let newstate = doskill(this.props.mystate,this.props.thatstate,id);
        this.props.setState(newstate);
        this.props.socket.emit('totalk', {
            id:this.props.thatid,
            obj:{
                funname:"getnewstate",
                newstate:newstate,
                message:"对方使用了\""+name+"\"",
            }
        });
    }
  	render() {
        // big_skill[0] = {id:0,name:"法力虚空",state: 1 ,message:"造成敌方己消耗能量值乘以200的伤害"}
        let card = this.props.card
        if(this.props.show){
            return <div className="card_box" onClick={this.usecard.bind(this,card.id,card.name)}>
                <div className="card_ion"></div>
                <div className="card_name">{card.name}</div>
                <div className="card_message">{card.message}</div>
            </div>
        }else{
            return <div className="card_box_hide" />
        }
  	}
}
module.exports = Card;