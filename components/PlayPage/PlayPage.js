import React from 'react';
import "./PlayPage.scss";

class PlayPage extends React.Component{
    constructor(){
        super();
        this.state = {
        }
    }
    hero_place(basic,more){
        if(basic.herotype===""||basic.herotype===undefined){
            return <div className="hero_place" >
                对手正在准备中...
            </div>;
        }
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
    fight_place(){
        return <div className="fight_place">
            {this.props.thatstate.herotype!=undefined?
                <div>{this.props.round>0?"我的回合":"对方回合"}</div>:
            ""}
        </div>
    }
  	render() {
        return<div className="main_box">
            {this.hero_place(this.props.thatstate)}
            {this.fight_place(this.props.thatstate)}
            {this.hero_place(this.props.mystate,this.props)}
        </div>
  	}
}
module.exports = PlayPage;