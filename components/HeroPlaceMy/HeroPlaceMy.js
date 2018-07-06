import React from 'react';
import Card from '../Card/Card';
import state_list from '../../server/stateflie';
import BuffIon from '../BuffIon/BuffIon';
import {state_base} from '../action';//计算状态影响下的属性
import "./HeroPlaceMy.scss";

class HeroPlaceMy extends React.Component{
    constructor(){
        super();
    }
    cardlist(){
        return this.props.mystate.cardid.map((card,i)=>{
            return <Card card={card} state={"my"} {...this.props} key={i}/>
        })
    }
    showstate(st){
        let buff = st.buff;//状态数组
        let buffTime = st.buffTime;//状态持续时间
        return buff.map((item,i)=>{
            return <BuffIon {...state_list[item]} buffTime={buffTime[i]} key={i}/>
        });
    }
    roundOver(){//回合结束
        let messagelist = this.props.messagelist;
        messagelist.push("结束回合");
        let mystate = this.props.mystate;
        for(let i=0;i<mystate.buff.length;){//状态处理
            if(mystate.buffTime[i]==1){
                mystate.buffTime.splice(i,1);
                mystate.buffObj[mystate.buff[i]]&&delete mystate.buffObj[mystate.buff[i]];
                mystate.buff.splice(i,1);
            }else{
                mystate.buffTime[i]-=1;
                i++;
            }
        }
        let newstate= {round:0,messagelist:messagelist,mystate:mystate};
        this.props.setState(newstate);
        this.props.socket.emit('totalk', {
            id:this.props.thatid,
            obj:{
                funname:"getnewstate",
                newstate:{round:1,thatstate:mystate},
                message:"对方回合结束，现在是你的回合"
            }
        });
    }
  	render() {
        let basic = this.props.mystate;
        return <div className="hero_place">
            <div className="hero_box">
                <div className="hero_ion">
                    {basic.herotype==0?"力量":(basic.herotype==1?"敏捷":"智力")}
                </div>
                {this.props.round==1?<div className="attack_btn">{"普通攻击"}</div>:""}
                {this.props.round==1?<div className="over_btn" onClick={this.roundOver.bind(this)}>{"回合结束"}</div>:""}
            </div>
            <div className="attribute_list">
                <div className="HP">{basic.Hp+"/"+basic.maxHp+"+"+basic.Hprecove+"/s"}</div>
                <div className="MP">{basic.Mp+"/"+basic.maxMp+"+"+basic.Mprecove+"/s"}</div>
                <div className="attack">{"攻击力:"+basic.attack}</div>
                <div className="armor">{"护甲:"+basic.armor}</div>
                <div className="statelist">状态:{this.showstate(basic)}</div>
            </div>
            <div className="card_list">
                {this.cardlist()}
            </div>
            <div className="equipment_list">
                {"金钱:"+this.props.mystate.money}
                {basic.equipment.map((equipment,i)=>{
                    <div></div>
                })}
            </div>
        </div>
  	}
}
module.exports = HeroPlaceMy;