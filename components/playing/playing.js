import React from 'react';
import "./playing.scss";
import {prepareOk} from '../action.js';
const ACTION = {
    prepareOk,
}

const PLAYSPEED = ["selecthero","playpage"];
class Component extends React.Component{
    constructor(){
        super();
        this.state = {
            mystate:{
                herotype:"",//英雄种类 0力量 1敏捷 2智力
                maxHp:"3500",//最大血量
                Hp:"3500",//当前血量
                Hprecove:"10",//生命值恢复速度
                maxMp:"500",//最大蓝量
                Mp:"500",//当前蓝量
                Mprecove:"50",//魔法值恢复速度
                attack:"40",//攻击力
                armor:"10",//护甲
                status:[],//状态数组
                equipment:[],//装备列表
            },
            cardid:[],//卡牌id
            money:"0",//金钱

            thatstate:{},//对手状态
            playingSpeed:0,//游戏进度
        }
    }
    componentDidMount(){
        window.onunload = (event)=> {
            socket.emit('logout', {
                id:this.props.myid,
                name:this.props.myname
            }); 
        }
        this.props.socket.on('totalk', (res)=>{
            let action = res.action;
            let state = ACTION[action.funname](this.state,res.state,action.cardid);
            this.setState(state);
            this.setState({thatstate:res.state});
        });
    }
    coeckhero(type){
        let mystate = this.state.mystate
        switch(type){
            case 0:
                mystate.herotype="0";
                mystate.maxHp="4000";
                mystate.Hp="4000";
                mystate.Hprecove="15";
                break;
            case 1:
                mystate.herotype="1";
                mystate.attack="70";
                mystate.armor="15";
                break;
            case 2:
                mystate.herotype="2";
                mystate.maxHp="3000";
                mystate.Hp="3000";
                mystate.maxMp="600";
                mystate.Mp="600";
                mystate.Mprecove="60";
                break;
        }
        this.setState({mystate:mystate,playingSpeed:1});
        this.props.socket.emit('totalk', {
            id:this.props.thatid,
            state:this.state.mystate,
            action:{
                funname:"prepareOk",
                cardid:""
            }
        });
    }
    selecthero(){
        return<div>
                <h1>请选择英雄</h1>
                <div onClick={this.coeckhero.bind(this,0)}>力量</div>
                <div onClick={this.coeckhero.bind(this,1)}>敏捷</div>
                <div onClick={this.coeckhero.bind(this,2)}>智力</div>
            </div>
    }
    hero_place(basic,more){
        if(basic.herotype===""||basic.herotype===undefined)return <div className="hero_place" />;
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

    playpage(){
        return<div className="main_box">
            {this.hero_place(this.state.thatstate)}
            <div className="fight_place">对战区</div>
            {this.hero_place(this.state.mystate,this.state)}
        </div>
    }
  	render() {
        return <div className="system_body">
            {this[PLAYSPEED[this.state.playingSpeed]]()}
        </div>;
  	}
}
module.exports = Component;