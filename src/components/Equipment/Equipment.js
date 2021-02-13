import React from 'react';
import {doAttack} from '../functions';//使用技能
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as allActions from '@/redux/actions/index';
import "./Equipment.scss";

const Equipment = (props)=>{
  const {thatid, equipment, equipmentcd, equipfor, actions:{set_state}} = props;
  const useEquip = (equipment)=>{
    let [check,newstate] = doAttack(props.gameState,equipment,"equipt");
    set_state(newstate);
    if(check==false)return;

    window.socket.emit('totalk', {
      id: thatid,
      obj:{
        funname:"getnewstate",
        newstate:{mystate:newstate.thatstate,thatstate:newstate.mystate},
        message:"对方使用了\""+equipment.name+"\"",
      }
    });
  }
  let CDnow = equipmentcd||0;
  let cdRound = equipmentcd/equipment.CD;
  if(CDnow/2==0.5){
    CDnow = "1/2";
  }else{
    CDnow = (CDnow/2+"").slice(0,1);
  }
  let equipmentready = (equipfor=="my"&&equipment.CD&&CDnow==0)?()=>useEquip(equipment):()=>{}
  return (
    <div className="equipment" 
    	style={{background: "url(./src/server/equipmentImg/"+equipment.id+".png) no-repeat center"}}
    	onClick={equipmentready}>
      {CDnow!=0?<div className="shadow_box">
        <div className="box">
          <div className="shadow_left" style={{transform: "rotate("+(1-cdRound<=0.5?0:(1-cdRound-0.5))*360+"deg)"}}/>
        </div>
        <div className="timeout">{CDnow}</div>
        <div className="box">
          <div className="shadow_right" style={{transform: "rotate("+(1-cdRound>0.5?0.5:1-cdRound)*360+"deg)"}}/>
        </div>
      </div>:""}
    </div>
  )
}
function mapStateToProps(state) {
  return state;
}
function mapDispatchToProps(dispatch) {
  return{ actions: bindActionCreators(allActions, dispatch)};
}
export default connect(mapStateToProps, mapDispatchToProps)(Equipment);