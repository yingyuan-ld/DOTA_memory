import React from 'react';
import Card from '../Card/Card';
import state_list from '../../server/stateflie';
import StateIon from '../StateIon/StateIon';
import {state_base} from '../action';//计算状态影响下的属性
import "./HeroPlaceThat.scss";

class HeroPlaceThat extends React.Component{
    constructor(){
        super();
        this.state = {
        }
    }
    cardlist(){
        return this.props.thatstate.cardid.map((card,i)=>{
            return <Card state={"that"} {...card} key={i}/>
        })
    }
    showstate(st){
        let status = st.status;//状态数组
        let statusTime = st.statusTime;//状态持续时间
        return status.map((item,i)=>{
            return <StateIon {...state_list[item]} statusTime={statusTime[i]} key={i}/>
        });
    }
  	render() {
        let basic = state_base(this.props.thatstate,this.props.mystate);//计算状态影响下的属性
        if(basic.herotype===""||basic.herotype===undefined){
            return <div className="hero_place" >
                对手正在准备中...
            </div>;
        }
        return <div className="hero_place">
            <div className="hero_box">
                <div className="hero_ion">
                    {basic.herotype==0?"力量":(basic.herotype==1?"敏捷":"智力")}
                </div>
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
module.exports = HeroPlaceThat;