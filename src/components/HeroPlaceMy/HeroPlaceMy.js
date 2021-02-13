import React,{useState, useEffect} from 'react';
import Card from '../Card/Card';
import state_list from '../../server/stateflie';
import BuffIon from '../BuffIon/BuffIon';
import Equipment from '../Equipment/Equipment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as allActions from '@/redux/actions/index';
import {doAttack} from '../functions';
import "./HeroPlaceMy.scss";
import MetailBox from '..//MetailBox/MetailBox';

let timeInterval;

const HeroPlaceMy = (props)=>{
  const {myname, myid, thatid,
    gameState:{mystate, thatstate, round, messagelist},
    actions:{show_compop, next_process, set_state}} = props;
  const [countDown, setCountDown] = useState(60);// 回合倒计时
  const cardlist = ()=>{
    return mystate.cardid.map((card,i)=>{
        return <Card card={card} cardfor={"my"} key={i}/>
    })
  }
  const showstate = (st)=>{
    let buff = st.buff;//状态数组
    let buffTime = st.buffTime;//状态持续时间
    return buff.map((item,i)=>{
        return <BuffIon {...state_list[item]} buffTime={buffTime[i]} buffObj={st.buffObj} key={i}/>
    });
  }
  const attackBtn = ()=>{
    let attack = {
      name:"普通攻击",
      state: 1,
      do:{
        tHp: mystate.attack
      }
    }
    let [check,newstate] = doAttack(props.gameState,attack,"attack");
    set_state(newstate);

    if(check==false)return;
    window.socket.emit('totalk', {
      id: thatid,
      obj:{
        funname:"getnewstate",
        newstate:{mystate:newstate.thatstate,thatstate:newstate.mystate},
        message:check=="miss"?"对方普通攻击MISS":"普通攻击对你造成\""+check+"\"点伤害",
      }
    });
  }
  useEffect(()=>{
    if(round === 1){
      setCountDown(60)
      timeInterval = window.setInterval(count_down,1000);// 开始倒数计时
    }else{
      window.clearInterval(timeInterval); // 清除倒数计时
    }
  },[round])
  useEffect(()=>{
    //判断游戏结束
    let message = "";
    if(thatstate.Hp<=0){
      message = "你赢了!";
    }
    if(mystate.Hp<=0){
      message = "你输了!"
    }
    if(message){
      show_compop({
        message:message,
        Turebtn:true,
        TureFun:()=>{
          next_process({progress_state:1});
          window.socket.emit('fightResult', {
            id: myid,
            name: myname
          }); 
        }
      })
    }
  },[props]);
  const count_down = ()=>{
    setCountDown(e=>{
      if(e>1){
        return --e;
      }else{
        roundOver();
        return e
      }
    });
  }
  const roundOver = ()=>{// 回合结束
    messagelist.push("结束回合");
    mystate.attackAccount = ("."+(mystate.attackAccount*100%100))*1;//攻击机会重置
    for(let i=0;i<mystate.buff.length;){//状态处理
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
    let newstate= {round:0,messagelist,mystate};
    set_state(newstate);
    console.info("回合结束")
    window.socket.emit('totalk', {
      id: thatid,
      obj:{
        funname:"getnewstate",
        newstate:{round:1,thatstate:mystate},
        message:"对方回合结束，现在是你的回合"
      },
      myoverid: myid
    });
  }
  const showtip = (item,e)=>{
    set_state({Tooltip:{
      show:true,
      place:[e.clientX,e.clientY],
      name:item.name,
      blueT:item.mp,
      redT:item.CD?"CD:"+item.CD/2:"",
      message:item.message,
    }})
  }
  const closetip = ()=>{
    set_state({Tooltip:{show:false}});
  }
  const showEquipment = (equipments)=>{
    return equipments.map((item,i)=>{
      return (
        <div className="posi_tion" key={i}
            onMouseOver={(e)=>showtip(item,e)}
            onMouseOut={closetip}>
          <Equipment {...props} equipment={item} equipmentcd={mystate.equipmentcd[item.id]} equipfor={"my"}/>
        </div>
      )
    })
  }
   
  const {herotype, attackAccount, attackRecove, Hp, maxHp, Hprecove, Mp, maxMp, Mprecove, attack, armor, money, equipment} = mystate;
  return (
    <div className="hero_place">
      <MetailBox>
        <div className="hero_box">
          <div className={"hero_ion hero_ion_"+ herotype} />
          {round==1?<div className="attack_btn" onClick={attackBtn}>
            {"攻击x"+attackAccount+"↑"+attackRecove}</div>:""}
          {round==1?<div className="over_btn" onClick={roundOver}>{"回合结束"+countDown}</div>:""}
        </div>
        <div className="attribute_list">
          <div className="HP" style={{width:(Hp/maxHp*100).toFixed(2)+"%"}}>
            {Hp+"/"+maxHp+(Hprecove>0?"+":"")+Hprecove}</div>
          <div className="MP" style={{width:(Mp/maxMp*100).toFixed(2)+"%"}}>
              {Mp+"/"+maxMp+(Mprecove>0?"+":"")+Mprecove}</div>
          <div className="attack">{"攻击力:"+attack}</div>
          <div className="armor">{"护甲:"+armor}</div>
          <div className="statelist">
            <span>状态:</span>
            {showstate(mystate)}
          </div>
        </div>
        <div className="card_list">
          {cardlist()}
        </div>
        <div className="equipment_list">
          <div>{"金钱:"+money}</div>
          {showEquipment(equipment)}
        </div>
      </MetailBox>
    </div>
  )
}

function mapStateToProps(state) {
  return state;
}
function mapDispatchToProps(dispatch) {
  return{ actions: bindActionCreators(allActions, dispatch)};
}
export default connect(mapStateToProps, mapDispatchToProps)(HeroPlaceMy);