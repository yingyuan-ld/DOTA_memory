import React, {useEffect} from 'react';
import "./playing.scss";
import {prepareOk,cardheap,getnewstate} from '@/components/functions';
import Tooltip from '@/components/Tooltip/Tooltip';
import PAGES from '@/components/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as allActions from '@/redux/actions/index';
const ACTION = {
  prepareOk,
  cardheap,
  getnewstate
}
const PLAYSPEED = ["HeroSelect","PlayPage"];
let tempGameState = {value:null} // 建立一个临时变量，用于获取最新的游戏数据
const Playing = (props)=>{
	const { gameState, actions:{set_state} } = props;
  tempGameState.value = gameState;
  useEffect(()=>{
    window.socket.on('totalk', (res)=>{
      let tempState = ACTION[res.obj.funname](tempGameState.value,res.obj);
      console.info("totalk",JSON.stringify(tempState))
      set_state(tempState);
    })
  },[])
  let Field = PAGES[PLAYSPEED[gameState.playingSpeed]];
  
  return (
    <div className="system_body">
      <Field />
      <Tooltip {...gameState.Tooltip}/>
    </div>
  );
}
function mapStateToProps(state) {
  return state;
}
function mapDispatchToProps(dispatch) {
  return{ actions: bindActionCreators(allActions, dispatch)};
}
export default connect(mapStateToProps, mapDispatchToProps)(Playing);