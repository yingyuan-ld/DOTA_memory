import React from 'react';
import Card from '../Card/Card';
import CardShowList from '../CardShowList/CardShowList';

import "./FightPlace.scss";

class FightPlace extends React.Component{
    constructor(){
        super();
        this.state = {
        }
    }
    messagelist(){
        return this.props.messagelist.map((message,i)=>{
            if(i==0)return; 
            return <div className="message_item" key={i}>{message}</div>
        })
    }
  	render() {
        this.props.cardShowList
        return <div className="fight_place">
            <div className="fight_message">
                {this.messagelist()}
            </div>
            <div className="cardShowList">
                <CardShowList cardShowList={this.props.cardShowList.slice(0,this.props.cardShowList.length-1)}/>
            </div>
            <div className="cardShow">
                {this.props.cardShowList[0]?<Card card={this.props.cardShowList[this.props.cardShowList.length-1]} state={"show"}/>:""}
            </div>
        </div>
  	}
}
module.exports = FightPlace;