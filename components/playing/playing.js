import React from 'react';
import "./playing.scss";
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
                maxForce:"500",//最大蓝量
                Force:"500",//当前蓝量
                Forcerecove:"50",//魔法值恢复速度
                attack:"40",//攻击力
                armor:"10",//护甲
                status:[],//状态数组
            },
            cardid:[],//卡牌id
            money:"0",//金钱

            thatstate:{},//对手状态
            playingSpeed:0,//游戏进度
        }
    }
    componentDidMount(){
        that.props.socket.on('totalk', (res)=>{
            //(res.action)=>{}
            this.setState({thatstate:res.state});
        });
    }
    coeckhero(type){
        let mystate = this.state.mystate
        switch(type){
            case 0:
                mystate.herotype="0";
                mystate.maxHp="4000";
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
                mystate.maxForce="600";
                mystate.Force="600";
                mystate.Forcerecove="60";
                break;
        }
        this.setState({mystate:mystate});
        this.props.socket.emit('totalk', {
            id:this.props.thatid,
            state:this.state.mystate,
            action:{}
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
    playpage(){
        return<div>
            <div>对方</div>
            <div>对战区</div>
            <div>你自己</div>
        </div>
    }
  	render() {
        return <div className="system_body">
            {PLAYSPEED[this.state.playingSpeed]}
        </div>;
  	}
}
module.exports = Component;