import React from 'react';
import "./HeroSelect.scss";

const HeroSelect = (props)=>{
  const {mystate, thatid, setState, round} = props
  const coeckhero = (type)=>{
    let mystateHerotype = {};
    switch(type){
      case 0://兽族
        mystateHerotype = {
          herotype:0,
          maxHp:4000,//最大血量
          Hp:4000,//当前血量
          Hprecove:15,//生命值恢复速度
          maxMp:300,//最大蓝量
          Mp:300,//当前蓝量
          Mprecove:50,//魔法值恢复速度
          attack:40,//攻击力
          attackRecove:1,//攻击速度
          armor:10//护甲
        }
        break;
      case 1://精灵族
        mystateHerotype = {
          herotype:1,
          maxHp:3500,//最大血量
          Hp:3500,//当前血量
          Hprecove:10,//生命值恢复速度
          maxMp:300,//最大蓝量
          Mp:300,//当前蓝量
          Mprecove:50,//魔法值恢复速度
          attack:70,//攻击力
          attackRecove:1.5,//攻击速度
          armor:15,//护甲
        }
        break;
      case 2://不死族
        mystateHerotype = {
          herotype:2,
          maxHp:3000,//最大血量
          Hp:3000,//当前血量
          Hprecove:10,//生命值恢复速度
          maxMp:400,//最大蓝量
          Mp:400,//当前蓝量
          Mprecove:60,//魔法值恢复速度
          attack:40,//攻击力
          attackRecove:1,//攻击速度
          armor:10,//护甲
        }
        break;
      case 3://人族
        mystateHerotype = {
          herotype:3,
          maxHp:3500,//最大血量
          Hp:3500,//当前血量
          Hprecove:10,//生命值恢复速度
          maxMp:300,//最大蓝量
          Mp:300,//当前蓝量
          attack:50,//攻击力
          Mprecove:50,//魔法值恢复速度
          attackRecove:1,//攻击速度
          armor:10,//护甲
        }
        break;
    }
    Object.assign(mystate,mystateHerotype);
    let round1 = Math.random();//随机回合用
    setState({mystate:mystate,mystateBase:mystate,playingSpeed:1,round:(round+round1)});
    window.socket.emit('totalk', {
      id: thatid,
      obj:{
          state:mystate,
          funname:"prepareOk",
          round:round
      }
    });
  }
  return(
    <div className="heroSelect">
      <div className="select_title">
        <span>请选择你要使用的种族</span>
      </div>
      <div className="picture_box">
        <div className="hero0 heropicture" onClick={()=>coeckhero(0)} />
        <div className="hero1 heropicture" onClick={()=>coeckhero(1)} />
        <div className="hero2 heropicture" onClick={()=>coeckhero(2)} />
        <div className="hero3 heropicture" onClick={()=>coeckhero(3)} />
      </div>
    </div>
  )
}
export default HeroSelect;