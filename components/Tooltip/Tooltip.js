import React from 'react';

import "./Tooltip.scss";

class Tooltip extends React.Component{
    constructor(){
        super();
    }
  	render() {
  		if(this.props.show){
	        return <div className="Tooltip" style={{left:this.props.place[0]+"px",top:this.props.place[1]+"px"}}>
	                <div>
	                    {this.props.name}
	                    <div className="redTitle">{this.props.redT}</div>
	                </div>
	                <div>{this.props.message}</div>
	            </div>
        }else{
        	return <div/>
        }
  	}
}
module.exports = Tooltip;