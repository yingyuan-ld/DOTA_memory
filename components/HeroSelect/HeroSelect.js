import React from 'react';
import "./HeroSelect.scss";

class HeroSelect extends React.Component{
    constructor(){
        super();
        this.state = {
        }
    }
    coeckhero(type){
        let mystate = this.props.mystate
        switch(type){
            case 0:
                mystate.herotype=0;
                mystate.maxHp=4000;
                mystate.Hp=4000;
                mystate.Hprecove=15;
                break;
            case 1:
                mystate.herotype=1;
                mystate.attack=70;
                mystate.armor=15;
                break;
            case 2:
                mystate.herotype=2;
                mystate.maxHp=3000;
                mystate.Hp=3000;
                mystate.maxMp=600;
                mystate.Mp=600;
                mystate.Mprecove=60;
                break;
            case 3:
                mystate.herotype=3;
                mystate.maxHp=3500;
                mystate.Hp=3500;
                mystate.maxMp=500;
                mystate.Mp=500;
                mystate.attack=50;
                break;
        }
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