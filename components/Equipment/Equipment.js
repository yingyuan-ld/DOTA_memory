import React from 'react';
import {doEquip} from '../action';//使用技能
import "./Equipment.scss";

class Equipment extends React.Component{
    constructor(props){
        super();
    }
    useEquip(equipment){

        let [check,newstate] = doEquip(this.props,equipment);
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
        return <div className="equipment" 
        	style={{background: "url(./server/equipmentImg/"+this.props.equipment.id+".png) no-repeat center"}}
        	onClick={this.props.equipfor=="my"?this.useEquip.bind(this,this.props.equipment):()=>{}}>

        </div>
  	}
}
module.exports = Equipment;