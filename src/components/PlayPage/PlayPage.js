import React from 'react';
import "./PlayPage.scss";
import {shufflecards,state_base} from '../functions';
        //洗牌
import {big_skill,small_skill} from '../../server/skill';
import HeroPlaceMy from "../HeroPlaceMy/HeroPlaceMy";
import HeroPlaceThat from "../HeroPlaceThat/HeroPlaceThat";
import FightPlace from "../FightPlace/FightPlace";

class PlayPage extends React.Component{
    constructor(){
        super();
    }
    componentWillMount(){
        if(this.props.thatstate.herotype!=undefined){//对手比你先进来
            this.prepare_card(this.props.round,this.props.thatstate);
        }else{
            this.props.actions.show_compop({
                message:"对方还在英雄选择中",
                Turebtn:false,
            });
        }
    }
    componentWillReceiveProps(newProps){
        if(this.props.thatstate.herotype==undefined&&newProps.thatstate.herotype!=undefined){//对手比你后进来
            this.props.actions.hide_compop();
        }
        if((this.props.round+"").indexOf(".")>0&&(newProps.round+"").indexOf(".")>0&&this.props.round!=newProps.round){//对手比你后进来
            this.prepare_card(newProps.round,newProps.thatstate);
        }
        if(this.props.round==0&&newProps.round==1){//你的回合开始
            let mystate = this.props.mystate;
            mystate.Hp = mystate.Hp+mystate.Hprecove>mystate.maxHp?mystate.maxHp:mystate.Hp+mystate.Hprecove;//生命值恢复
            mystate.Mp = mystate.Mp+mystate.Mprecove>mystate.maxMp?mystate.maxMp:mystate.Mp+mystate.Mprecove;//魔法值恢复
            mystate.attackAccount += mystate.attackRecove//普攻恢复
            mystate.money+=mystate.moneyrecove;//金钱
            let messagelist = this.props.messagelist;
            let small_speed = this.props.small_speed;
            if(mystate.cardid.length>=8){//手牌处理
                messagelist.push("小伙，你手牌满了！");
                mystate.messagelist = messagelist;
            }else{
                mystate.cardid.push(this.props.small_cardheap[small_speed]);
                small_speed++;
            }
            for(let i=0,l = mystate.buff.length;i<l;){//状态处理
                if(mystate.buffTime[i]==1){
                    mystate.buffTime.splice(i,1);
                    mystate.buffObj[mystate.buff[i]]&&delete mystate.buffObj[mystate.buff[i]];
                    mystate.buff.splice(i,1);
                }else{
                    mystate.buffTime[i]-=1;
                    i++;
                }
            }
            for(let i in mystate.equipmentcd){//装备处理
                if(mystate.equipmentcd[i]>0){
                    mystate.equipmentcd[i]-=1;
                }
                i++;
            }
            this.props.setState({mystate:mystate,small_speed:small_speed,messagelist:messagelist});
            this.props.socket.emit('totalk', {
                id:this.props.thatid,
                obj:{
                    funname:"getnewstate",
                    newstate:{thatstate:mystate,small_speed:small_speed},
                    message:"现在是对方回合"
                },
                myid:this.props.myid
            });
        }
    }
    prepare_card(round,thatstate){
        if(round>0){//准备完毕,并且先手
            let arr=[];
            small_skill.map(function(val, index) {//去除空项
                if (val !== "" && val != undefined) {
                    arr.push(val);
                }
            });
            let small_cardheap = shufflecards(arr)//洗牌
            arr = [];
            big_skill.map(function(val, index) {//去除空项
                if (val !== "" && val != undefined) {
                    arr.push(val);
                }
            });
            let big_cardheap = shufflecards(arr)//洗牌
            //抓牌↓
            let mystate = this.props.mystate;
            mystate.money = 100;
            mystate.attackAccount = 1,
            mystate.cardid = small_cardheap.slice(0,6);


// mystate.cardid[0] = {id:"0054",name:"技能窃取",state: 1 ,mp:100,message:"抽取敌方一张卡牌"}
// mystate.cardid[0].do = {mMp:-100,special:true};

            thatstate.cardid = small_cardheap.slice(6,11);
            this.props.setState({
                small_cardheap:small_cardheap,
                big_cardheap:big_cardheap,
                round:1,
                messagelist:["你是先手"],
                small_speed:11,
                mystate:mystate,
                thatstate:thatstate
            });
            this.props.socket.emit('totalk', {
                id:this.props.thatid,
                obj:{
                    funname:"cardheap",
                    small_cardheap:small_cardheap,
                    big_cardheap:big_cardheap,
                    mystate:this.props.mystate
                }
            });
        }else{//准备完毕,并且后手
            this.props.setState({
                round:0,
                messagelist:["对方先手"]
            });
        }
    }
  	render() {
        let myBasic = state_base(this.props.mystate,this.props.thatstate);//计算状态影响下的属性
        let thatBasic = state_base(this.props.thatstate,this.props.mystate);//计算状态影响下的属性
        let basic = {mystate:myBasic,thatstate:thatBasic}
        return<div className="main_box">
            <HeroPlaceThat {...this.props} {...basic}/>
            <FightPlace {...this.props}/>
            <HeroPlaceMy {...this.props} {...basic}/>
        </div>
  	}
}
module.exports = PlayPage;