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
        }
        let round = Math.random();//随机回合用
        this.props.setState({mystate:mystate,playingSpeed:1,round:(this.props.round+round)});
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
        return<div>
                <h1>请选择英雄</h1>
                <div onClick={this.coeckhero.bind(this,0)}>力量</div>
                <div onClick={this.coeckhero.bind(this,1)}>敏捷</div>
                <div onClick={this.coeckhero.bind(this,2)}>智力</div>
            </div>
  	}
}
module.exports = HeroSelect;