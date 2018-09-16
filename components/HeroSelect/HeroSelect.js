import React from 'react';
import "./HeroSelect.scss";

class HeroSelect extends React.Component{
    constructor(){
        super();
        this.state = {
        }
    }
    coeckhero(type){
        let mystate = this.props.mystate;
        let mystateHerotype = {};
        switch(type){
            case 0://兽族
                mystateHerotype = {
                    herotype:0,
                    maxHp:4000,//最大血量
                    Hp:4000,//当前血量
                    Hprecove:15,//生命值恢复速度
                    maxMp:500,//最大蓝量
                    Mp:500,//当前蓝量
                    Mprecove:50,//魔法值恢复速度
                    attack:40,//攻击力
                    attackRecove:1,//攻击速度
                    armor:10//护甲
                }
                break;
            case 1://精灵族
                mystateHerotype = {
                    herotype:1,
                    maxHp:3500,//最大血量
                    Hp:3500,//当前血量
                    Hprecove:10,//生命值恢复速度
                    maxMp:500,//最大蓝量
                    Mp:500,//当前蓝量
                    Mprecove:50,//魔法值恢复速度
                    attack:70,//攻击力
                    attackRecove:1.5,//攻击速度
                    armor:15,//护甲
                }
                break;
            case 2://不死族
                mystateHerotype = {
                    herotype:2,
                    maxHp:3000,//最大血量
                    Hp:3000,//当前血量
                    Hprecove:10,//生命值恢复速度
                    maxMp:600,//最大蓝量
                    Mp:600,//当前蓝量
                    Mprecove:60,//魔法值恢复速度
                    attack:40,//攻击力
                    attackRecove:1,//攻击速度
                    armor:10,//护甲
                }
                break;
            case 3://人族
                mystateHerotype = {
                    herotype:3,
                    maxHp:3500,//最大血量
                    Hp:3500,//当前血量
                    Hprecove:10,//生命值恢复速度
                    maxMp:500,//最大蓝量
                    Mp:500,//当前蓝量
                    attack:50,//攻击力
                    Mprecove:50,//魔法值恢复速度
                    attackRecove:1,//攻击速度
                    armor:10,//护甲
                }
                break;
        }
        Object.assign(mystate,mystateHerotype);
        let round = Math.random();//随机回合用
        this.props.setState({mystate:mystate,mystateBase:mystate,playingSpeed:1,round:(this.props.round+round)});
        this.props.socket.emit('totalk', {
            id:this.props.thatid,
            obj:{
                state:this.props.mystate,
                funname:"prepareOk",
                round:round
            }
        });
    }
  	render() {
        return<div className="heroSelect">
                <div className="select_title">
                    <span>请选择你要使用的英雄</span>
                </div>
                <div className="picture_box">
                    <div className="hero0 heropicture" onClick={this.coeckhero.bind(this,0)} />
                    <div className="hero1 heropicture" onClick={this.coeckhero.bind(this,1)} />
                    <div className="hero2 heropicture" onClick={this.coeckhero.bind(this,2)} />
                    <div className="hero3 heropicture" onClick={this.coeckhero.bind(this,3)} />
                </div>
            </div>
  	}
}
module.exports = HeroSelect;