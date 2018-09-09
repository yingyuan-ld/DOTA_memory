import React from 'react';
import equipmentFile from '../../server/equipment';
import Equipment from '../Equipment/Equipment';
import MetailBox from '..//MetailBox/MetailBox';

import "./Shoping.scss";

class Shoping extends React.Component{
    constructor(){
        super();
        this.closeshop = this.closeshop.bind(this);
    }
    showtip(i,e){
        this.props.setState({Tooltip:{
            show:true,
            place:[e.clientX,e.clientY],
            name:equipmentFile[i].name,
            yeloT:equipmentFile[i].price,
            blueT:equipmentFile[i].mp,
            redT:equipmentFile[i].CD?"CD:"+equipmentFile[i].CD/2:"",
            message:equipmentFile[i].message,
        }})
    }
    componentWillReceiveProps(newProps){
        if(!this.props.show&&newProps.show){
            document.addEventListener("click",this.closeshop,false);
        }
        if(this.props.show&&!newProps.show){
            document.removeEventListener("click",this.closeshop,false);
        }
    }
    closeshop(e){
        let shopbox = this.refs.shop;
        if(!shopbox.contains(e.target)){
            document.removeEventListener("click",this.closeshop,false);
            this.props.goshoping();
        }
    }
    closetip(){
        this.props.setState({Tooltip:{show:false}});
    }
    buyone(i){
        let equipment = JSON.parse(JSON.stringify(equipmentFile[i]));
        let price = equipment.price.slice(1)*1
        let newstate = this.props;
        let mystate = this.props.mystate;

        if(mystate.equipment.length>=6){
            newstate.messagelist.push("物品栏不够");
            this.props.setState(mystate);
            return;
        }
        if(price > mystate.money){
            newstate.messagelist.push("还差"+(price - mystate.money)+"金购买\""+equipment.name+"\"");
            this.props.setState(mystate);
            return;
        }
        mystate.money-=price;//金钱
        mystate.equipment.push(equipment);
        newstate.messagelist.push("你购买了\""+equipment.name+"\"");
        this.props.setState(newstate);

        this.props.socket.emit('totalk', {
            id:this.props.thatid,
            obj:{
                funname:"getnewstate",
                newstate:{thatstate:mystate},
                message:"对方购买了\""+equipment.name+"\"",
            }
        });
    }
    showEquipment(){
        return equipmentFile.map((item,i)=>{
            return <div className="posi_tion" key={i}
                        onMouseOver={this.showtip.bind(this,i)}
                        onMouseOut={this.closetip.bind(this)}
                        onClick={this.buyone.bind(this,i)}>
                    <Equipment equipment={item}/>
                </div>
            })
    }
  	render() {
        return <div className={"shop_room_box "+(this.props.show?"room_show":"room_hide")} ref='shop'>
            <MetailBox>
                <div className={"shop_room"}>
                    {this.showEquipment()}
                </div>
                <div className="back" onClick={this.props.goshoping}/>
            </MetailBox>
        </div>
  	}
}
module.exports = Shoping;