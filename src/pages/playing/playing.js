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

const Playing = (props)=>{
	const { gameState, actions:{set_state} } = props;
  useEffect(()=>{
    window.socket.on('totalk', (res)=>{
      let tempState = ACTION[res.obj.funname](gameState,res.obj);
      console.info("totalk",JSON.stringify(tempState))
      set_state(tempState);
    })
  },[gameState])
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