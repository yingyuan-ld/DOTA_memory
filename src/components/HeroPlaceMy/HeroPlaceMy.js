import React from 'react';
import Card from '../Card/Card';
import state_list from '../../server/stateflie';
import BuffIon from '../BuffIon/BuffIon';
import Equipment from '../Equipment/Equipment';
import {doAttack} from '../functions';
import "./HeroPlaceMy.scss";
import MetailBox from '..//MetailBox/MetailBox';
var socket = io();
class HeroPlaceMy extends React.Component{
    constructor(){
        super();
        this.state = {
            count_down:60,//回合倒计时
        }
        this.timeInterval;
    }
    cardlist(){
        return this.props.mystate.cardid.map((card,i)=>{
            return <Card {...this.props} card={card} cardfor={"my"} key={i}/>
        })
    }
    showstate(st){
        let buff = st.buff;//状态数组
        let buffTime = st.buffTime;//状态持续时间
        return buff.map((item,i)=>{
            return <BuffIon {...state_list[item]} buffTime={buffTime[i]} buffObj={st.buffObj} key={i}/>
        });
    }
    attackBtn(){

        let attack = {
            name:"普通攻击",
            state: 1,
            do:{
                tHp:this.props.mystate.attack
            }
        }
        let [check,newstate] = doAttack(this.props,attack,"attack");
        this.props.setState(newstate);

        if(check==false)return;
        this.props.socket.emit('totalk', {
            id:this.props.thatid,
            obj:{
                funname:"getnewstate",
                newstate:{mystate:newstate.thatstate,thatstate:newstate.mystate},
                message:check=="miss"?"对方普通攻击MISS":"普通攻击对你造成\""+check+"\"点伤害",
            }
        });
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.round == 1&&this.props.round != 1){
            this.setState({count_down:60})
            this.timeInterval = window.setInterval(this.count_down.bind(this),1000);
        }
        if(nextProps.round != 1&&this.props.round == 1){
            window.clearInterval(this.timeInterval); 
        }
    }
    count_down(){
        let count_down = this.state.count_down;
        if(count_down>1){
            this.setState({count_down:--count_down});
        }else{
            this.roundOver();
        }
    }
    roundOver(){//回合结束
        let messagelist = this.props.messagelist;
        messagelist.push("结束回合");
        let mystate = this.props.mystate;
        mystate.attackAccount = ("."+(mystate.attackAccount*100%100))*1;//攻击机会重置
        for(let i=0;i<mystate.buff.length;){//状态处理
            if(mystate.buffTime[i]==1){
                mystate.buffTime.splice(i,1);
                mystate.buffObj[mystate.buff[i]]&&delete mystate.buffObj[mystate.buff[i]];
                mystate.buff.splice(i,1);
            }else{
                mystate.buffTime[i]-=1;
                i++;
            }
        }
        for(let i in mystate.equipmentcd){//装备处理
            if(mystate.equipmentcd[i]>0){
                mystate.equipmentcd[i]-=1;
            }
            i++;
        }
        let newstate= {round:0,messagelist:messagelist,mystate:mystate};
        this.props.setState(newstate);
        this.props.socket.emit('totalk', {
            id:this.props.thatid,
            obj:{
                funname:"getnewstate",
                newstate:{round:1,thatstate:mystate},
                message:"对方回合结束，现在是你的回合"
            }
        });
    }
    componentDidUpdate(){
        //判断游戏结束
        if(this.props.mystate.Hp<=0){
            alert("你输了");
            console.info("你输了");
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
                    <Equipment {...this.props} equipment={item} equipmentcd={this.props.mystate.equipmentcd[item.id]} equipfor={"my"}/>
                </div>
            })
    }
  	render() {
        let basic = this.props.mystate;
        return <div className="hero_place">
        <MetailBox>
            <div className="hero_box">
                <div className={"hero_ion hero_ion_"+basic.herotype} />
                {this.props.round==1?<div className="attack_btn" onClick={this.attackBtn.bind(this)}>
                    {"攻击x"+basic.attackAccount+"↑"+basic.attackRecove}</div>:""}
                {this.props.round==1?<div className="over_btn" onClick={this.roundOver.bind(this)}>{"回合结束"+this.state.count_down}</div>:""}
            </div>
            <div className="attribute_list">
                <div className="HP" style={{width:(basic.Hp/basic.maxHp*100).toFixed(2)+"%"}}>
                    {basic.Hp+"/"+basic.maxHp+(basic.Hprecove>0?"+":"")+basic.Hprecove}</div>
                <div className="MP" style={{width:(basic.Mp/basic.maxMp*100).toFixed(2)+"%"}}>
                    {basic.Mp+"/"+basic.maxMp+(basic.Mprecove>0?"+":"")+basic.Mprecove}</div>
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
                <div>{"金钱:"+this.props.mystate.money}</div>
                {this.showEquipment(basic.equipment)}
            </div>
        </MetailBox>
        </div>
  	}
}
module.exports = HeroPlaceMy;