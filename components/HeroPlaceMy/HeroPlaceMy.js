import React from 'react';
import Card from '../Card/Card';
import state_list from '../../server/stateflie';
import BuffIon from '../BuffIon/BuffIon';
import {doAttack} from '../action';
import "./HeroPlaceMy.scss";
var socket = io();
class HeroPlaceMy extends React.Component{
    constructor(){
        super();
    }
    cardlist(){
        return this.props.mystate.cardid.map((card,i)=>{
            return <Card {...this.props} card={card} state={"my"} key={i}/>
        })
    }
    showstate(st){
        let buff = st.buff;//状态数组
        let buffTime = st.buffTime;//状态持续时间
        return buff.map((item,i)=>{
            return <BuffIon {...state_list[item]} buffTime={buffTime[i]} key={i}/>
        });
    }
    attackBtn(){
        let [attack,newstate] = doAttack(this.props);
        this.props.setState(newstate);

        if(attack==false)return;
        this.props.socket.emit('totalk', {
            id:this.props.thatid,
            obj:{
                funname:"getnewstate",
                newstate:{mystate:newstate.thatstate,thatstate:newstate.mystate},
                message:attack=="miss"?"对方普通攻击MISS":"普通攻击对你造成\""+attack+"\"点伤害",
            }
        });
    }
    roundOver(){//回合结束
        let messagelist = this.props.messagelist;
        messagelist.push("结束回合");
        let mystate = this.props.mystate;
        mystate.attackAccount = ("."+(mystate.attackAccount*100%100))*1;//攻击机会重置
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
    componentDidUpdate(){
        //判断游戏结束
        if(this.props.mystate.Hp<=0){
            alert("你输了");
            console.info("你输了");
            this.props.next_process({progress_state:1});
            socket.emit('fightResult', {
                id:this.props.myid,
                name:this.props.myname
            }); 
        }
    }
  	render() {
        let basic = this.props.mystate;
        return <div className="hero_place">
            <div className="hero_box">
                <div className="hero_ion">
                    {basic.herotype==0?"力量":(basic.herotype==1?"敏捷":"智力")}
                </div>
                {this.props.round==1?<div className="attack_btn" onClick={this.attackBtn.bind(this)}>
                    {"普通攻击x"+basic.attackAccount+"↑"+basic.attackRecove}</div>:""}
                {this.props.round==1?<div className="over_btn" onClick={this.roundOver.bind(this)}>{"回合结束"}</div>:""}
            </div>
            <div className="attribute_list">
                <div className="HP">{(basic.Hp>0?basic.Hp:0)+"/"+basic.maxHp+"+"+basic.Hprecove}</div>
                <div className="MP">{basic.Mp+"/"+basic.maxMp+"+"+basic.Mprecove}</div>
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