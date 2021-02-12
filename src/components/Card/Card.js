import React from 'react';
import {doAttack} from '../functions';//使用技能
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as allActions from '@/redux/actions/index';
import "./Card.scss";
const Card = (props)=>{
  const { card, cardfor, thatid, actions:{set_state} } = props;
  const usecard = (id,name)=>{
    let [check,newstate] = doAttack(props,card,"card");
    set_state(newstate);
    if(check==false)return;

    window.socket.emit('totalk', {
      id: thatid,
      obj:{
        funname:"getnewstate",
        newstate:{mystate:newstate.thatstate,thatstate:newstate.mystate,cardShowList:newstate.cardShowList},
        message:"对方使用了\""+name+"\"",
      }
    });
  }
  // card Dom
  if(cardfor!="that"){
    const {id, name, mp, message} = card;
    return (
      <div className={cardfor=="my"?"card_box card_my":"card_box"}
          onClick={cardfor=="my"?()=>usecard(id,name):()=>{}}>
        <div className="card_mp">{mp}</div>
        <div className="card_ion" style={{background: "url(./src/server/skillImg/"+id+".jpg) no-repeat center"}}></div>
        <div className="card_name">{name}</div>
        <div className="card_message">{message}</div>
      </div>
    )
  }
  if(cardfor=="that"){
    return <div className="card_box_hide" />
  }
  return <div className="card_box_hide" />
}
function mapStateToProps(state) {
  return state ;
}
function mapDispatchToProps(dispatch) {
  return{ actions: bindActionCreators(allActions, dispatch)};
}
export default connect(mapStateToProps, mapDispatchToProps)(Card);