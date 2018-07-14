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

        let [check,newstate] = doskill(this.props,this.props.card);
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
        if(this.props.state=="my"){
            return <div className="card_box card_my" onClick={this.usecard.bind(this,card.id,card.name)}>
                <div className="card_ion"></div>
                <div className="card_name">{card.name}</div>
                <div className="card_message">{card.message}</div>
            </div>
        }
        if(this.props.state=="show"){
            return <div className="card_box">
                <div className="card_ion"></div>
                <div className="card_name">{card.name}</div>
                <div className="card_message">{card.message}</div>
            </div>
        }
        if(this.props.state=="that"){
            return <div className="card_box_hide" />
        }
        return <div className="card_box_hide" />
  	}
}
module.exports = Card;