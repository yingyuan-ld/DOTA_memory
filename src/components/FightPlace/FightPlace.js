import React,{useState} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as allActions from '@/redux/actions/index';
import Card from '../Card/Card';
import CardShowList from '../CardShowList/CardShowList';
import Shoping from '../Shoping/Shoping';
import MetailBox from '..//MetailBox/MetailBox';

import "./FightPlace.scss";

const FightPlace = (props)=>{
  const {thatid,
    gameState:{mystate, messagelist, big_speed, round, big_cardheap, cardShowList},
    actions:{set_state}} = props;
  const [shoping, setShoping] = useState(false);
  
  const goshoping = (open)=>{
    setShoping(open);
  }
  const buycard = ()=>{
    // let mystate = this.props.mystate;
    // let messagelist = this.props.messagelist;
    const {money, cardid} = mystate;
    let getcard = true;
    if(!round){//回合判断
      messagelist.push("不是你的回合!");
      // mystate.messagelist = messagelist;
      getcard = false
    }
    if(money<100&&getcard){//金钱判断
      messagelist.push("小伙，你钱不够!");
      // mystate.messagelist = messagelist;
      getcard = false
    }
    if(cardid.length>=8&&getcard){//手牌处理
      messagelist.push("小伙，你手牌满了！");
      // mystate.messagelist = messagelist;
      getcard = false
    }
    if(getcard){
      mystate.cardid.push(big_cardheap[big_speed]);
      messagelist.push("你购买了一张卡牌");
      mystate.money-=100;
      window.socket.emit('totalk', {
        id: thatid,
        obj:{
          funname:"getnewstate",
          newstate:{thatstate:mystate,big_speed:big_speed+1},
          message:"对方购买了一张卡牌"
        }
      });
    }
    set_state({mystate:mystate,big_speed:big_speed+1,messagelist:messagelist});
  }
  return (
    <div className="fight_place" >
      <div className="fight_message">
        <MetailBox>
          {messagelist.map((message,i)=>{
            if(i==0)return; 
            return <div className="message_item" key={i}>{message}</div>
          })}
        </MetailBox>
      </div>
      <div className="cardShowList">
        <CardShowList cardShowList={cardShowList.slice(0,cardShowList.length-1)}/>
      </div>
      <div className="cardShow">
        {cardShowList[0]?<Card card={cardShowList[cardShowList.length-1]} cardfor={"show"}/>:""}
      </div>
      <div className="seal_card" onClick={buycard}>
        ¥:100
      </div>
      <div className="shop" onClick={()=>goshoping(true)}/>
      <Shoping 
        show={shoping}
        closeShop={()=>goshoping(false)}/>
    </div>
  )
}
function mapStateToProps(state) {
  return state ;
}
function mapDispatchToProps(dispatch) {
  return{ actions: bindActionCreators(allActions, dispatch)};
}
export default connect(mapStateToProps, mapDispatchToProps)(FightPlace);