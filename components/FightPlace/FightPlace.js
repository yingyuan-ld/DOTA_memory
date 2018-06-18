import React from 'react';
import "./FightPlace.scss";

class FightPlace extends React.Component{
    constructor(){
        super();
        this.state = {
        }
    }
    messagelist(){
        return this.props.messagelist.map((message,i)=>{
            return <div className="message_item" key={i}>{message}</div>
        })
    }
  	render() {
        return <div className="fight_place">
            <div className="fight_message">
                {this.messagelist()}
            </div>:
        </div>
  	}
}
module.exports = FightPlace;