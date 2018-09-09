import React from 'react';
import Card from '../Card/Card';
import CardShowList from '../CardShowList/CardShowList';
import Shoping from '../Shoping/Shoping';
import MetailBox from '..//MetailBox/MetailBox';

import "./FightPlace.scss";

class FightPlace extends React.Component{
    constructor(){
        super();
        this.state = {
            shoping:false,
        }
    }
    messagelist(){
        return this.props.messagelist.map((message,i)=>{
            if(i==0)return; 
            return <div className="message_item" key={i}>{message}</div>
        })
    }
    goshoping(){
        this.setState({shoping:!this.state.shoping});
    }
  	render() {
        return <div className="fight_place" >
            <div className="fight_message">
                <MetailBox>
                    {this.messagelist()}
                </MetailBox>
            </div>
            <div className="cardShowList">
                <CardShowList cardShowList={this.props.cardShowList.slice(0,this.props.cardShowList.length-1)}/>
            </div>
            <div className="cardShow">
                {this.props.cardShowList[0]?<Card card={this.props.cardShowList[this.props.cardShowList.length-1]} cardfor={"show"}/>:""}
            </div>
            <div className="shop" onClick={this.goshoping.bind(this)}/>
            <Shoping 
                {...this.props}
                show={this.state.shoping}
                goshoping={this.goshoping.bind(this)}/>
        </div>
  	}
}
module.exports = FightPlace;