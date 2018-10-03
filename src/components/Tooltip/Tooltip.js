import React from 'react';

import "./Tooltip.scss";

class Tooltip extends React.Component{
    constructor(){
        super();
    }
  	render() {
  		if(this.props.show){
            let top = this.props.place[1]/document.body.offsetHeight>0.5?"translate(-100%, -100%)":"translate(-100%, 0)";
	        return <div className="Tooltip" style={{left:this.props.place[0]+"px",top:this.props.place[1]+"px",transform:top}}>
	                <div>
	                    {this.props.name}
	                </div>
                <div>
                    <div className="yeloTitle">{this.props.yeloT}</div>
                    <div className="blueTitle">{this.props.blueT}</div>
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