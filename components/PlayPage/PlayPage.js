import React from 'react';
import "./PlayPage.scss";
import {shufflecards,cardheap} from '../action';
import {big_skill,small_skill} from '../../server/skill';
import HeroPlaceMy from "../HeroPlaceMy/HeroPlaceMy";
import HeroPlaceThat from "../HeroPlaceThat/HeroPlaceThat";

class PlayPage extends React.Component{
    constructor(){
        super();
    }
    componentWillReceiveProps(newProps){
        if((this.props.round+"").indexOf(".")>0&&(newProps.round+"").indexOf(".")>0){
            console.info(newProps.round);
            if(newProps.round>0){//准备完毕,并且先手
                console.info(newProps.round);
                let small_cardheap = shufflecards(small_skill)//洗牌
                let big_cardheap = shufflecards(big_skill)//洗牌
                //抓牌↓
                let mystate = this.props.mystate;
                mystate.cardid = small_cardheap.slice(0,8);
                this.props.setState({
                    small_cardheap:small_cardheap,
                    big_cardheap:big_cardheap,
                    round:1,
                    small_speed:16,
                    mystate:mystate
                });
                this.props.socket.emit('totalk', {
                    id:this.props.thatid,
                    obj:{
                        funname:"cardheap",
                        small_cardheap:small_cardheap,
                        big_cardheap:big_cardheap
                    }
                });
            }else{//准备完毕,并且后手
                this.props.setState({round:0});
            }
        }
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