import React from 'react';
import Card from '../Card/Card';
import CardShowList from '../CardShowList/CardShowList';
import Shoping from '../Shoping/Shoping';
import MetailBox from '..//MetailBox/MetailBox';

import "./FightPlace.scss";

class FightPlace extends React.Component{
    constructor(){
        super();
        this.state = {
            shoping:false,
        }
    }
    messagelist(){
        return this.props.messagelist.map((message,i)=>{
            if(i==0)return; 
            return <div className="message_item" key={i}>{message}</div>
        })
    }
    goshoping(){
        this.setState({shoping:!this.state.shoping});
    }
    buycard(){

        let tempspeed = this.props.big_speed;
        let mystate = this.props.mystate;
        let messagelist = this.props.messagelist;
        let getcard = true;
        if(!this.props.round){//回合判断
            messagelist.push("不是你的回合!");
            mystate.messagelist = messagelist;
            getcard = false
        }
        if(mystate.money<100&&getcard){//金钱判断
            messagelist.push("小伙，你钱不够!");
            mystate.messagelist = messagelist;
            getcard = false
        }
        if(mystate.cardid.length>=8&&getcard){//手牌处理
            messagelist.push("小伙，你手牌满了！");
            mystate.messagelist = messagelist;
            getcard = false
        }
        if(getcard){
            mystate.cardid.push(this.props.big_cardheap[this.props.big_speed]);
            messagelist.push("你购买了一张卡牌");
            tempspeed++;
            mystate.money-=100;
            window.socket.emit('totalk', {
                id:this.props.thatid,
                obj:{
                    funname:"getnewstate",
                    newstate:{thatstate:mystate,big_speed:tempspeed},
                    message:"对方购买了一张卡牌"
                }
            });
        }
        this.props.setState({mystate:mystate,big_speed:tempspeed,messagelist:messagelist});
    }
  	render() {
        return <div className="fight_place" >
            <div className="fight_message">
                <MetailBox>
                    {this.messagelist()}
                </MetailBox>
            </div>
            <div className="cardShowList">
                <CardShowList cardShowList={this.props.cardShowList.slice(0,this.props.cardShowList.length-1)}/>
            </div>
            <div className="cardShow">
                {this.props.cardShowList[0]?<Card card={this.props.cardShowList[this.props.cardShowList.length-1]} cardfor={"show"}/>:""}
            </div>
            <div className="seal_card" onClick={this.buycard.bind(this)}>
                ¥:100
            </div>
            <div className="shop" onClick={this.goshoping.bind(this)}/>
            <Shoping 
                {...this.props}
                show={this.state.shoping}
                goshoping={this.goshoping.bind(this)}/>
        </div>
  	}
}
module.exports = FightPlace;