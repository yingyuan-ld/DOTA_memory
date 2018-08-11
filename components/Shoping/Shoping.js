import React from 'react';
import equipmentFile from '../../server/equipment';
import Equipment from '../Equipment/Equipment';
import Tooltip from '../Tooltip/Tooltip';

import "./Shoping.scss";

class Shoping extends React.Component{
    constructor(){
        super();
    }
    showtip(i){
        console.info(i);
    }
    showEquipment(){
        return equipmentFile.map((item,i)=>{
            return <div onMouseOver={this.showtip.bind(this,i)}>
                    <Equipment {...item}/>
                </div>
            })
    }
  	render() {
        return <div className={"shop_room "+(this.props.show?"room_show":"room_hide")}>
            <div className={"shop_room"}>
                {this.showEquipment()}
            </div>
            <Tooltip />
            <div className="back" onClick={this.props.goshoping}>>>></div>
        </div>
  	}
}
module.exports = Shoping;