import React from 'react';
import Card from '../Card/Card';
import state_list from '../../server/stateflie';
import BuffIon from '../BuffIon/BuffIon';
import Equipment from '../Equipment/Equipment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as allActions from '@/redux/actions/index';
import "./HeroPlaceThat.scss";
import MetailBox from '..//MetailBox/MetailBox';

const HeroPlaceThat = (props)=>{
  const {gameState:{thatstate},actions:{set_state}} = props;
  const cardlist = ()=>{
    return thatstate.cardid.map((card,i)=>{
      return <Card cardfor={"that"} {...card} key={i}/>
    })
  }
  const showstate = (basic)=>{
    const {buff, buffTime, buffObj} = thatstate;
    //buff 状态数组, buffTime 状态持续时间
    return buff.map((item,i)=>{
      return <BuffIon {...state_list[item]} buffTime={buffTime[i]} buffObj={buffObj} key={i}/>
    });
  }
  const showtip = (item,e)=>{
    set_state({Tooltip:{
      show:true,
      place:[e.clientX,e.clientY],
      name:item.name,
      blueT:item.mp,
      redT:item.CD?"CD:"+item.CD/2:"",
      message:item.message,
    }})
  }
  const closetip = ()=>{
    set_state({Tooltip:{show:false}});
  }
  const showEquipment = (equipments)=>{
    return equipments.map((item,i)=>{
      return (
        <div className="posi_tion" key={i}
            onMouseOver={()=>showtip(item)}
            onMouseOut={closetip}>
          <Equipment {...props} equipment={item} equipfor={"that"} equipmentcd={0}/>
        </div>
      )
    })
  }
  const {herotype, Hp, maxHp, Hprecove, Mp, maxMp, Mprecove, attack, armor, equipment} = thatstate;
  
  if(herotype===undefined){
    return <div className="hero_place" >
      对手正在准备中...
    </div>;
  }
  return (
    <div className="hero_place">
      <MetailBox>
        <div className="hero_box">
          <div className={"hero_ion hero_ion_"+herotype} />
        </div>
        <div className="attribute_list">
          <div className="HP" style={{width:(Hp/maxHp*100).toFixed(2)+"%"}}
          >{(Hp>0?Hp:0)+"/"+maxHp+(Hprecove>0?"+":"")+Hprecove}</div>
          <div className="MP" style={{width:(Mp/maxMp*100).toFixed(2)+"%"}}
          >{Mp+"/"+maxMp+(Mprecove>0?"+":"")+Mprecove}</div>
          <div className="attack">{"攻击力:"+attack}</div>
          <div className="armor">{"护甲:"+armor}</div>
          <div className="statelist">
            <span>状态:</span>
            {showstate()}
          </div>
        </div>
        <div className="card_list">
          {cardlist()}
        </div>
        <div className="equipment_list">
          {showEquipment(equipment)}
        </div>
      </MetailBox>
    </div>
  )
}
function mapStateToProps(state) {
  return state;
}
function mapDispatchToProps(dispatch) {
  return{ actions: bindActionCreators(allActions, dispatch)};
}
export default connect(mapStateToProps, mapDispatchToProps)(HeroPlaceThat);