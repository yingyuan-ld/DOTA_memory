import React from 'react';
import Card from '../Card/Card';
import state_list from '../../server/stateflie';
import StateIon from '../StateIon/StateIon';
import {state_base} from '../action';//计算状态影响下的属性
import "./HeroPlaceMy.scss";

class HeroPlaceMy extends React.Component{
    constructor(){
        super();
        this.state = {
        }
    }
    cardlist(){
        return this.props.mystate.cardid.map((card,i)=>{
            return <Card card={card} show={true} {...this.props} key={i}/>
        })
    }
    showstate(st){
        let status = st.status;//状态数组
        let statusTime = st.statusTime;//状态持续时间
        return status.map((item,i)=>{
            return <StateIon {...state_list[item]} statusTime={statusTime[i]} key={i}/>
        });
    }
    roundOver(){//回合结束
        let messagelist = this.props.messagelist;
        messagelist.push("结束回合");
        let mystate = this.props.mystate;
        for(let i=0;i<mystate.status.length;){//状态处理
            if(mystate.statusTime[i]==1){
                mystate.statusTime.splice(i,1);
                mystate.statusObj[mystate.status[i]]&&delete mystate.statusObj[mystate.status[i]];
                mystate.status.splice(i,1);
            }else{
                mystate.statusTime[i]-=1;
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
          
        let basic = state_base(this.props.mystate,this.props.thatstate);//计算状态影响下的属性
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
                {basic.equipment.map((equipment,i)=>{
                    <div></div>
                })}
            </div>
        </div>
  	}
}
module.exports = HeroPlaceMy;