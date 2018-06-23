import React from 'react';
import Card from '../Card/Card';
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
    cardShowList(){
        return this.props.cardShowList.map((card,i)=>{
            return <Card card={card} state={"show"} key={i}/>
        })
    }
  	render() {
        this.props.cardShowList
        return <div className="fight_place">
            <div className="fight_message">
                {this.messagelist()}
            </div>
            <div className="cardShowList">
                {this.cardShowList()}
            </div>
        </div>
  	}
}
module.exports = FightPlace;