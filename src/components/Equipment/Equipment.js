import React from 'react';
import {doAttack} from '../action';//使用技能
import "./Equipment.scss";

class Equipment extends React.Component{
    constructor(props){
        super();
    }
    useEquip(equipment){

        let [check,newstate] = doAttack(this.props,equipment,"equipt");
        this.props.setState(newstate);
        if(check==false)return;

        this.props.socket.emit('totalk', {
            id:this.props.thatid,
            obj:{
                funname:"getnewstate",
                newstate:{mystate:newstate.thatstate,thatstate:newstate.mystate},
                message:"对方使用了\""+equipment.name+"\"",
            }
        });
    }
  	render() {
        let CDnow = this.props.equipmentcd||0;
        let cdRound = this.props.equipmentcd/this.props.equipment.CD;
        if(CDnow/2==0.5){
            CDnow = "1/2";
        }else{
            CDnow = (CDnow/2+"").slice(0,1);
        }
        let equipmentready = (this.props.equipfor=="my"&&this.props.equipment.CD&&CDnow==0)?this.useEquip.bind(this,this.props.equipment):()=>{}
        return <div className="equipment" 
        	style={{background: "url(./src/server/equipmentImg/"+this.props.equipment.id+".png) no-repeat center"}}
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
  	}
}
module.exports = Equipment;