import React from 'react';
import "./playing.scss";
import {prepareOk,cardheap,getnewstate} from '../../components/functions';
import Tooltip from '../../components/Tooltip/Tooltip';
// import {HeroSelect,PlayPage} from '../../components/index';
import PAGES from '../../components/index';
const ACTION = {
    prepareOk,
    cardheap,
    getnewstate
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
            mystateBase:{},//基础属性(排除状态影响)
            mystate:{//计算属性(状态加成)
                herotype:"",//英雄种类 0力量 1敏捷 2智力
                maxHp:3500,//最大血量
                Hp:3500,//当前血量
                Hprecove:10,//生命值恢复速度
                maxMp:500,//最大蓝量
                Mp:500,//当前蓝量
                Mprecove:50,//魔法值恢复速度
                attack:40,//攻击力
                attackRecove:1,//攻击速度
                armor:10,//护甲
                attackAccount:0,//剩余攻击次数
                buff:[],//状态数组
                buffTime:[],//状态持续时间
                buffObj:{},//有些状态需要对象来存储
                equipment:[],//装备列表
                equipmentcd:{},//装备cd
                cardid:[],//卡牌数组
                money:0,//金钱
                moneyrecove:100,//金钱获得速度
            },
            round:0, //是否是我的回合 0不是 1是
            messagelist:[],//战斗记录
            small_cardheap:[],//小技能 牌堆
            small_speed:0,//记录小技能牌使用进度
            big_cardheap:[],//大技能 牌堆
            big_speed:0,//记录大技能牌使用进度
            small_discard:[],//小技能 弃牌堆
            big_discard:[],//大技能 弃牌堆
            cardShowList:[],//出牌历史
            thatstate:{},//对手状态

            playingSpeed:0,//游戏进度

            Tooltip:{},//
        }
    }

    componentWillMount(){
        this.props.socket.on('totalk', (res)=>{
            let state = ACTION[res.obj.funname](this.state,res.obj);
            console.info(state);
            this.setState(state);
        });
    }
  	render() {
        let Field = PAGES[PLAYSPEED[this.state.playingSpeed]];
        return <div className="system_body">
            <Field 
                setState={this.setState.bind(this)}
                {...this.props}
                {...this.state}/>
            <Tooltip {...this.state.Tooltip}/>
        </div>;
  	}
}
module.exports = Component;