import React,{useEffect, useRef} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as allActions from '@/redux/actions/index';
import equipmentFile from '../../server/equipment';
import Equipment from '../Equipment/Equipment';
import MetailBox from '..//MetailBox/MetailBox';
import "./Shoping.scss";

const Shoping = (props)=>{
  const shop = useRef()
  const {show, closeShop, thatid,
    gameState:{mystate},
    actions:{set_state}} = props;
  const showtip = (i,e)=>{
    set_state({Tooltip:{
      show:true,
      place:[e.clientX,e.clientY],
      name:equipmentFile[i].name,
      yeloT:equipmentFile[i].price,
      blueT:equipmentFile[i].mp,
      redT:equipmentFile[i].CD?"CD:"+equipmentFile[i].CD/2:"",
      message:equipmentFile[i].message,
    }})
  }
  useEffect(()=>{
    if(show){
      document.addEventListener("click",closeShopBack,false);
    }else{
      document.removeEventListener("click",closeShopBack,false);
    }
  },[show]);
  const closeShopBack = (e)=>{
    let shopbox = shop.current;
    if(!shopbox.contains(e.target)){
      document.removeEventListener("click",closeShopBack,false);
      closeShop();
    }
  }
  const closetip = ()=>{
    set_state({Tooltip:{show:false}});
  }
  const buyone = (i)=>{
    let equipment = JSON.parse(JSON.stringify(equipmentFile[i]));
    let price = equipment.price.slice(1)*1
    let newstate = props.gameState;

    if(mystate.equipment.length>=6){
      newstate.messagelist.push("物品栏不够");
      set_state(mystate);
      return;
    }
    if(price > mystate.money){
      newstate.messagelist.push("还差"+(price - mystate.money)+"金购买\""+equipment.name+"\"");
      set_state(mystate);
      return;
    }
    mystate.money-=price;//金钱
    mystate.equipment.push(equipment);
    newstate.messagelist.push("你购买了\""+equipment.name+"\"");
    set_state(newstate);

    window.socket.emit('totalk', {
      id: thatid,
      obj:{
        funname:"getnewstate",
        newstate:{thatstate:mystate},
        message:"对方购买了\""+equipment.name+"\"",
      }
    });
  }
  const showEquipment = ()=>{
    return equipmentFile.map((item,i)=>{
      return (
        <div className="posi_tion" key={i}
            onMouseOver={(e)=>showtip(i,e)}
            onMouseOut={closetip}
            onClick={()=>buyone(i)}>
          <Equipment equipment={item}/>
        </div>
      )
    })
  }
  return (
    <div className={"shop_room_box "+(show?"room_show":"room_hide")} ref={shop}>
      <MetailBox>
        <div className={"shop_room"}>
          {showEquipment()}
        </div>
        <div className="back" onClick={closeShop}/>
      </MetailBox>
    </div>
  )
}
function mapStateToProps(state) {
  return state ;
}
function mapDispatchToProps(dispatch) {
  return{ actions: bindActionCreators(allActions, dispatch)};
}
export default connect(mapStateToProps, mapDispatchToProps)(Shoping);