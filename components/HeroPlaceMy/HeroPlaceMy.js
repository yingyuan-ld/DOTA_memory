import React from 'react';
import Card from '../Card/Card';
import "./HeroPlaceMy.scss";

class HeroPlaceMy extends React.Component{
    constructor(){
        super();
        this.state = {
        }
    }
    cardlist(){
        return this.props.mystate.cardid.map((card,i)=>{
            return <Card card={card} {...this.props} key={i}/>
        })
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
                <div className="statelist">{"状态:..."}</div>
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