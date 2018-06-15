import React from 'react';
import Card from '../Card/Card';
import state_list from '../../server/stateflie';
import StateIon from '../StateIon/StateIon';
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
  	render() {
        let basic = this.props.mystate;
        return <div className="hero_place">
            <div className="hero_ion">{basic.herotype}</div>
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