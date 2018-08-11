import React from 'react';

import "./Tooltip.scss";

class Tooltip extends React.Component{
    constructor(){
        super();
    }
  	render() {
        return <div className="Tooltip">
                <div>
                    {this.props.name}
                    <div className="redmessage">{this.props.price}</div>
                </div>
                <div>{this.props.message}</div>
            </div>
  	}
}
module.exports = Tooltip;