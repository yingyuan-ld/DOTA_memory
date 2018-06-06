import React from 'react';
import "./playing.scss";
import {prepareOk} from '../../components/action';
// import {HeroSelect,PlayPage} from '../../components/index';
import PAGES from '../../components/index';
const ACTION = {
    prepareOk,
}
// const PAGES = {
//     HeroSelect,
//     PlayPage
// }
const PLAYSPEED = ["HeroSelect","PlayPage"];
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
            
            round:0, //是否是我的回合 0不是 1是
            thatstate:{},//对手状态
            playingSpeed:0,//游戏进度
        }
    }

    componentWillMount(){
        this.props.socket.on('totalk', (res)=>{
            let action = res.action;
            let state = ACTION[action.funname](this.state,res.state,action.cardid);
            this.setState(state);
            this.setState({thatstate:res.state});
        });
    }
  	render() {
        let Field = PAGES[PLAYSPEED[this.state.playingSpeed]];
        return <div className="system_body">
            <Field setState={this.setState.bind(this)} {...this.props}{...this.state}/>
        </div>;
  	}
}
module.exports = Component;