import React from 'react';
import "./HeroPlaceMy.scss";

class HeroPlaceMy extends React.Component{
    constructor(){
        super();
        this.state = {
        }
    }
  	render() {
        let basic = this.props.mystate;
        return <div className="hero_place">
            <div className="hero_ion">{basic.herotype}</div>
            <div className="attribute_list">
                <div className="HP">{basic.Hp+"/"+basic.maxHp}</div>
                <div className="MP">{basic.Mp+"/"+basic.maxMp}</div>
                <div className="attack">{"攻击力:"+basic.attack}</div>
                <div className="armor">{"护甲:"+basic.armor}</div>
                <div className="statelist">{"状态:..."}</div>
            </div>
            <div className="card_list">卡牌列表</div>
            <div className="equipment_list">
                {basic.equipment.map((equipment,i)=>{
                    <div></div>
                })}
            </div>
        </div>
  	}
}
module.exports = HeroPlaceMy;