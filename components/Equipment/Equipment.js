import React from 'react';

import "./Equipment.scss";

class Equipment extends React.Component{
    constructor(){
        super();
    }
  	render() {
        return <div className="equipment" style={{background: "url(./server/equipmentImg/"+this.props.id+".png) no-repeat center"}}>

        </div>
  	}
}
module.exports = Equipment;