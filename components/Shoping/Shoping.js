import React from 'react';
import {doskill} from '../action';//使用技能
import "./Shoping.scss";

class Shoping extends React.Component{
    constructor(){
        super();
    }
  	render() {
        return <div className={"shop_room "+(this.props.show?"room_show":"room_hide")}>
            <div className="back" onClick={this.props.goshoping}/>
        </div>
  	}
}
module.exports = Shoping;