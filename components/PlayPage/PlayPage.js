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
    componentWillMount(){
        if(this.props.thatstate.herotype!=undefined){//对手比你先进来
            this.prepare_card(this.props.round,this.props.thatstate);
        }
    }
    componentWillReceiveProps(newProps){
        if((this.props.round+"").indexOf(".")>0&&(newProps.round+"").indexOf(".")>0){//对手比你后进来
            this.prepare_card(newProps.round,newProps.thatstate);
        }
    }
    prepare_card(round,thatstate){
        if(round>0){//准备完毕,并且先手
            let small_cardheap = shufflecards(small_skill)//洗牌
            let big_cardheap = shufflecards(big_skill)//洗牌
            //抓牌↓
            let mystate = this.props.mystate;
            mystate.cardid = small_cardheap.slice(0,8);
            thatstate.cardid = small_cardheap.slice(8,16);
            this.props.setState({
                small_cardheap:small_cardheap,
                big_cardheap:big_cardheap,
                round:1,
                small_speed:16,
                mystate:mystate,
                thatstate:thatstate
            });
            console.info("emit_totalk");
            this.props.socket.emit('totalk', {
                id:this.props.thatid,
                obj:{
                    funname:"cardheap",
                    small_cardheap:small_cardheap,
                    big_cardheap:big_cardheap,
                    mystate:this.props.mystate
                }
            });
        }else{//准备完毕,并且后手
            this.props.setState({round:0});
        }
    }
    fight_place(){
        return <div className="fight_place">
            {this.props.thatstate.herotype!=undefined?
                <div>{(this.props.round>0?"我的回合":"对方回合")+this.props.round}</div>:
            ""}
        </div>
    }
  	render() {
        console.info(this.props);
        return<div className="main_box">
            <HeroPlaceThat {...this.props}/>
            {this.fight_place(this.props.thatstate)}
            <HeroPlaceMy {...this.props}/>
        </div>
  	}
}
module.exports = PlayPage;