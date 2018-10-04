import React from 'react';
import Card from '../Card/Card';
import state_list from '../../server/stateflie';
import BuffIon from '../BuffIon/BuffIon';
import Equipment from '../Equipment/Equipment';
import {state_base} from '../functions';//计算状态影响下的属性
import "./HeroPlaceThat.scss";
import MetailBox from '..//MetailBox/MetailBox';
var socket = io();

class HeroPlaceThat extends React.Component{
    constructor(){
        super();
    }
    cardlist(){
        return this.props.thatstate.cardid.map((card,i)=>{
            return <Card cardfor={"that"} {...card} key={i}/>
        })
    }
    showstate(basic){
        let buff = basic.buff;//状态数组
        let buffTime = basic.buffTime;//状态持续时间
        return buff.map((item,i)=>{
            return <BuffIon {...state_list[item]} buffTime={buffTime[i]} buffObj={basic.buffObj} key={i}/>
        });
    }
    componentDidUpdate(){
        //判断游戏结束
        if(this.props.thatstate.Hp<=0){
            alert("你赢了");
            console.info("你赢了");
            this.props.next_process({progress_state:1});
            socket.emit('fightResult', {
                id:this.props.myid,
                name:this.props.myname
            }); 
        }
    }
    showtip(item,e){
        this.props.setState({Tooltip:{
            show:true,
            place:[e.clientX,e.clientY],
            name:item.name,
            blueT:item.mp,
            redT:item.CD?"CD:"+item.CD/2:"",
            message:item.message,
        }})
    }
    closetip(){
        this.props.setState({Tooltip:{show:false}});
    }
    showEquipment(equipments){
        return equipments.map((item,i)=>{
            return <div className="posi_tion" key={i}
                        onMouseOver={this.showtip.bind(this,item)}
                        onMouseOut={this.closetip.bind(this)}>
                    <Equipment {...this.props} equipment={item} equipfor={"that"} equipmentcd={0}/>
                </div>
            })
    }
  	render() {
        let basic = this.props.thatstate;
        if(basic.herotype===""||basic.herotype===undefined){
            return <div className="hero_place" >
                对手正在准备中...
            </div>;
        }
        return <div className="hero_place">
        <MetailBox>
            <div className="hero_box">
                <div className={"hero_ion hero_ion_"+basic.herotype} />
            </div>
            <div className="attribute_list">
                <div className="HP" style={{width:(basic.Hp/basic.maxHp*100).toFixed(2)+"%"}}
                >{(basic.Hp>0?basic.Hp:0)+"/"+basic.maxHp+(basic.Hprecove>0?"+":"")+basic.Hprecove}</div>
                <div className="MP" style={{width:(basic.Mp/basic.maxMp*100).toFixed(2)+"%"}}
                >{basic.Mp+"/"+basic.maxMp+(basic.Mprecove>0?"+":"")+basic.Mprecove}</div>
                <div className="attack">{"攻击力:"+basic.attack}</div>
                <div className="armor">{"护甲:"+basic.armor}</div>
                <div className="statelist">
                    <span>状态:</span>
                    {this.showstate(basic)}
                </div>
            </div>
            <div className="card_list">
                {this.cardlist()}
            </div>
            <div className="equipment_list">
                {this.showEquipment(basic.equipment)}
            </div>
        </MetailBox>
        </div>
  	}
}
module.exports = HeroPlaceThat;