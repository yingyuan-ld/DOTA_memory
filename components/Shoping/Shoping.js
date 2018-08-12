import React from 'react';
import equipmentFile from '../../server/equipment';
import Equipment from '../Equipment/Equipment';

import "./Shoping.scss";

class Shoping extends React.Component{
    constructor(){
        super();
    }
    showtip(i,e){
        // console.info(e.target)
        this.props.setState({Tooltip:{
            show:true,
            place:[e.clientX,e.clientY],
            name:equipmentFile[i].name,
            redT:equipmentFile[i].price,
            message:equipmentFile[i].message,
        }})
    }
    closetip(){
        this.props.setState({Tooltip:{show:false}});
    }
    buyone(i){
        console.info(this.props);
        let equipment = equipmentFile[i];
        let price = equipment.price.slice(1)*1
        let newstate = this.props;
        let mystate = this.props.mystate;

        if(mystate.equipment.length>=6){
            newstate.messagelist.push("物品栏不够");
            this.props.setState(mystate);
            return;
        }
        if(price > mystate.money){
            newstate.messagelist.push("还差"+(price - mystate.money)+"金购买\""+equipment.name+"\"");
            this.props.setState(mystate);
            return;
        }
        mystate.money-=price;//金钱
        mystate.equipment.push(equipment.id);
        newstate.messagelist.push("你购买了\""+equipment.name+"\"");
        this.props.setState(newstate);

        this.props.socket.emit('totalk', {
            id:this.props.thatid,
            obj:{
                funname:"getnewstate",
                newstate:{thatstate:mystate},
                message:"对方购买了\""+equipment.name+"\"",
            }
        });
    }
    showEquipment(){
        return equipmentFile.map((item,i)=>{
            return <div className="posi_tion"
                        onMouseOver={this.showtip.bind(this,i)}
                        onMouseOut={this.closetip.bind(this)}
                        onClick={this.buyone.bind(this,i)}>
                    <Equipment {...item}/>
                </div>
            })
    }
  	render() {
        return <div className={"shop_room "+(this.props.show?"room_show":"room_hide")}>
            <div className={"shop_room"}>
                {this.showEquipment()}
            </div>
            <div className="back" onClick={this.props.goshoping}>>>></div>
        </div>
  	}
}
module.exports = Shoping;