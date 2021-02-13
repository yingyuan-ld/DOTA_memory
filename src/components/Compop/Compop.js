import React from 'react';
import MetailBox from '..//MetailBox/MetailBox';
import "./Compop.scss";

const Compop = (regs)=>{
  const {actions, TureFun, show, Turebtn, Closebtn, message, CloseFun} = regs;
	const turefun = ()=>{
	  actions.hide_compop();
	  TureFun&&TureFun();
	}
	const closefun = ()=>{
		actions.hide_compop();
		CloseFun?.();
	}
  if(!show)return "";
	return (
		<div className="ComBox">
			<div className="shadow"/>
			<div className="Compop">
				<MetailBox>
					<div className="ComMessage">{message}</div>
					<div className="ComFoot">
					{Turebtn?<div className="popBtn" onClick={turefun}>确定</div>:""}
					{Closebtn?<div className="popBtn" onClick={closefun}>取消</div>:""}
					</div>
				</MetailBox>
			</div>
		</div>
	)
}
export default Compop;