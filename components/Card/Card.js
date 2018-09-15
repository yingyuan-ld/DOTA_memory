import React from 'react';
import {doAttack} from '../action';//使用技能
import "./Card.scss";

class Card extends React.Component{
    constructor(){
        super();
    }
    usecard(id,name){

        let [check,newstate] = doAttack(this.props,this.props.card,"card");
        this.props.setState(newstate);
        if(check==false)return;

        this.props.socket.emit('totalk', {
            id:this.props.thatid,
            obj:{
                funname:"getnewstate",
                newstate:{mystate:newstate.thatstate,thatstate:newstate.mystate,cardShowList:newstate.cardShowList},
                message:"对方使用了\""+name+"\"",
            }
        });
    }
  	render() {
        // big_skill[0] = {id:0,name:"法力虚空",state: 1 ,message:"造成敌方己消耗能量值乘以200的伤害"}
        let card = this.props.card
        if(this.props.cardfor!="that"){
            return <div className={this.props.cardfor=="my"?"card_box card_my":"card_box"}
                        onClick={this.props.cardfor=="my"?this.usecard.bind(this,card.id,card.name):()=>{}}>
                <div className="card_mp">{card.mp}</div>
                <div className="card_ion" style={{background: "url(./server/skillImg/"+card.id+".jpg) no-repeat center"}}></div>
                <div className="card_name">{card.name}</div>
                <div className="card_message">{card.message}</div>
            </div>
        }
        if(this.props.cardfor=="that"){
            return <div className="card_box_hide" />
        }
        return <div className="card_box_hide" />
  	}
}
module.exports = Card;