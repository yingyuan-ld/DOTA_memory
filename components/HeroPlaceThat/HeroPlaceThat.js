import React from 'react';
import Card from '../Card/Card';
import state_list from '../../server/stateflie';
import BuffIon from '../BuffIon/BuffIon';
import {state_base} from '../action';//计算状态影响下的属性
import "./HeroPlaceThat.scss";
var socket = io();

class HeroPlaceThat extends React.Component{
    constructor(){
        super();
    }
    cardlist(){
        return this.props.thatstate.cardid.map((card,i)=>{
            return <Card cardfor={"that"} {...card} key={i}/>
        })
    }
    showstate(basic){
        let buff = basic.buff;//状态数组
        let buffTime = basic.buffTime;//状态持续时间
        return buff.map((item,i)=>{
            return <BuffIon {...state_list[item]} buffTime={buffTime[i]} buffObj={basic.buffObj} key={i}/>
        });
    }
    componentDidUpdate(){
        //判断游戏结束
        if(this.props.thatstate.Hp<=0){
            alert("你赢了");
            console.info("你赢了");
            this.props.next_process({progress_state:1});
            socket.emit('fightResult', {
                id:this.props.myid,
                name:this.props.myname
            }); 
        }
    }
  	render() {
        let basic = this.props.thatstate;
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
                <div className="HP">{(basic.Hp>0?basic.Hp:0)+"/"+basic.maxHp+"+"+basic.Hprecove+"/s"}</div>
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