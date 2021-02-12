import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as allActions from '@/redux/actions/index';
import {shufflecards,state_base} from '../functions';
import {big_skill,small_skill} from '../../server/skill';
import HeroPlaceMy from "../HeroPlaceMy/HeroPlaceMy";
import HeroPlaceThat from "../HeroPlaceThat/HeroPlaceThat";
import FightPlace from "../FightPlace/FightPlace";
import "./PlayPage.scss";

const PlayPage = (props)=>{
  const { set_state, show_compop, hide_compop } = props.actions;
  const {mystate, thatstate, round, messagelist, small_speed, small_cardheap,
    myid, thatid} = props.gameState;
  console.info(thatstate);
  useEffect(()=>{
    if(thatstate.herotype!=undefined){//对手比你先进来
      hide_compop();
      prepare_card(round,thatstate);
    }else{
      show_compop({
        message:"对方还在英雄选择中",
        Turebtn:false,
      });
    }
  },[thatstate.herotype])
  useEffect(()=>{
    if(round === 1){
      let tempsmallspeed = small_speed
      mystate.Hp = mystate.Hp+mystate.Hprecove>mystate.maxHp?mystate.maxHp:mystate.Hp+mystate.Hprecove;//生命值恢复
      mystate.Mp = mystate.Mp+mystate.Mprecove>mystate.maxMp?mystate.maxMp:mystate.Mp+mystate.Mprecove;//魔法值恢复
      mystate.attackAccount += mystate.attackRecove//普攻恢复
      mystate.money+=mystate.moneyrecove;//金钱
      if(mystate.cardid.length>=8){//手牌处理
        messagelist.push("小伙，你手牌满了！");
        mystate.messagelist = messagelist;
      }else{
        mystate.cardid.push(small_cardheap[tempsmallspeed]);
        tempsmallspeed++;
      }
      for(let i=0,l = mystate.buff.length;i<l;){//状态处理
        if(mystate.buffTime[i]<=1){
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
      set_state({mystate:mystate,small_speed:tempsmallspeed,messagelist:messagelist});
      window.socket.emit('totalk', {
        id: thatid,
        obj:{
          funname:"getnewstate",
          newstate:{thatstate:mystate,small_speed:tempsmallspeed},
          message:"现在是对方回合"
        },
        myid: myid
      });
    }
  },[round]);
  
  const prepare_card = (round,thatstate)=>{
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
      mystate.money = 50;
      mystate.attackAccount = 1,
      mystate.cardid = small_cardheap.slice(0,6);

// mystate.cardid[0] = {id:"1145",name:"血之狂暴",state: 1 ,message:"该单位无法使用技能,伤害增加50%,受伤增加50%"}
// mystate.cardid[0].do = {mBuff:[58],mBuffT:[6]};

      thatstate.cardid = small_cardheap.slice(6,11);
      set_state({
        small_cardheap:small_cardheap,
        big_cardheap:big_cardheap,
        round:1,
        messagelist:["你是先手"],
        small_speed:11,
        mystate:mystate,
        thatstate:thatstate
      });
      window.socket.emit('totalk', {
        id: thatid,
        obj:{
          funname:"cardheap",
          small_cardheap:small_cardheap,
          big_cardheap:big_cardheap,
          mystate: mystate
        }
      });
      }else{//准备完毕,并且后手
        set_state({
          round:0,
          messagelist:["对方先手"]
        });
      }
    }
    let myBasic = state_base(mystate,thatstate);//计算状态影响下的属性
    let thatBasic = state_base(thatstate,mystate);//计算状态影响下的属性
    let basic = {mystate:myBasic,thatstate:thatBasic}
    return(
      <div className="main_box">
        {/* <HeroPlaceThat {...props} {...basic}/> */}
        {/* <FightPlace {...props}/> */}
        {/* <HeroPlaceMy {...props} {...basic}/> */}
      </div>
  	)
}

function mapStateToProps(state) {
  return state ;
}
function mapDispatchToProps(dispatch) {
  return{ actions: bindActionCreators(allActions, dispatch)};
}
export default connect(mapStateToProps, mapDispatchToProps)(PlayPage);