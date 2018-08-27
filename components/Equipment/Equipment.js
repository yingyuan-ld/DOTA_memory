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
        let equipmentready = (this.props.equipfor=="my"&&this.props.equipment.CD&&!this.props.equipment.CDnow)?this.useEquip.bind(this,this.props.equipment):()=>{}
        return <div className="equipment" 
        	style={{background: "url(./server/equipmentImg/"+this.props.equipment.id+".png) no-repeat center"}}
        	onClick={equipmentready}>
            {this.props.equipment.CDnow?<div className="shadow_box">
                <div className="box">
                    <div className="shadow_left" />
                </div>
                <div className="timeout">{this.props.equipment.CDnow}</div>
                <div className="box">
                    <div className="shadow_right" />
                </div>
            </div>:""}
        </div>
  	}
}
module.exports = Equipment;