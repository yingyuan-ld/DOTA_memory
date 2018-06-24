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
        let messagelist = this.props.messagelist;//消息
        messagelist.push("你使用了\""+name+"\"");
        newstate.mystate.messagelist = messagelist;
        newstate.mystate.cardid.map((item,i)=>{
            if(item==this.props.card){
                newstate.mystate.cardid.splice(i,1);
            };
        });//删除手牌
        let cardShowList = this.props.cardShowList;
        cardShowList.push(this.props.card);//放入弃牌堆
        this.props.setState(newstate);
        this.props.socket.emit('totalk', {
            id:this.props.thatid,
            obj:{
                funname:"getnewstate",
                newstate:{mystate:newstate.thatstate,thatstate:newstate.mystate,cardShowList:cardShowList},
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