import React from 'react';
import MetailBox from '..//MetailBox/MetailBox';
import "./Compop.scss";

class Compop extends React.Component{
    constructor(){
        super();
    }
    turefun(){
        this.props.actions.hide_compop();
        this.props.TureFun&&this.props.TureFun();
    }
    closefun(){
        this.props.actions.hide_compop();
        this.props.CloseFun&&this.props.CloseFun();
    }
  	render() {
  		if(this.props.show){
	        return <div className="ComBox">
                <div className="shadow"/>
                <div className="Compop">
                    <MetailBox>
                        <div className="ComMessage">{this.props.message}</div>
                        <div className="ComFoot">
                        {this.props.Turebtn?<div className="popBtn" onClick={this.turefun.bind(this)}>确定</div>:""}
                        {this.props.Closebtn?<div className="popBtn" onClick={this.closefun.bind(this)}>取消</div>:""}
                        </div>
                    </MetailBox>
                </div>
	        </div>
        }else{
        	return <div/>
        }
  	}
}
module.exports = Compop;