import React from 'react';
import "./PlayPage.scss";
import {shufflecards} from '../action';
import {HeroPlaceMy,HeroPlaceThat} from '../index';

class PlayPage extends React.Component{
    constructor(){
        super();
        this.state = {
        }
    }
    componentWillMount(){
    }
    fight_place(){
        return <div className="fight_place">
            {this.props.thatstate.herotype!=undefined?
                <div>{this.props.round>0?"我的回合":"对方回合"}</div>:
            ""}
        </div>
    }
  	render() {
        return<div className="main_box">
            <HeroPlaceThat {...this.props}/>
            {this.fight_place(this.props.thatstate)}
            <HeroPlaceMy {...this.props}/>
        </div>
  	}
}
module.exports = PlayPage;