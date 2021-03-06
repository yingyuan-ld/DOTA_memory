import {createStore} from 'redux'
import reducer from '../reduxter' 
const initValue={
  myname:"",
  myid:"",
  thatname:"",
  thatid:"",
  process:["Login","Prepare","Playing"],//游戏流程
  progress_state:0,
  CompopData:{
    show:false,
    message:"",
      Closebtn:false,
      Turebtn:true,
  },
  gameState:{
    mystateBase:{},//基础属性(排除状态影响)
    mystate:{//计算属性(状态加成)
      herotype:"",//英雄种类 0力量 1敏捷 2智力
      maxHp:3500,//最大血量
      Hp:3500,//当前血量
      Hprecove:10,//生命值恢复速度
      maxMp:500,//最大蓝量
      Mp:500,//当前蓝量
      Mprecove:50,//魔法值恢复速度
      attack:40,//攻击力
      attackRecove:1,//攻击速度
      armor:10,//护甲
      attackAccount:0,//剩余攻击次数
      buff:[],//状态数组
      buffTime:[],//状态持续时间
      buffObj:{},//有些状态需要对象来存储
      equipment:[],//装备列表
      equipmentcd:{},//装备cd
      cardid:[],//卡牌数组
      money:0,//金钱
      moneyrecove:50,//金钱获得速度
    },
    round:0, //是否是我的回合 0不是 1是
    messagelist:[],//战斗记录
    small_cardheap:[],//小技能 牌堆
    small_speed:0,//记录小技能牌使用进度
    big_cardheap:[],//大技能 牌堆
    big_speed:0,//记录大技能牌使用进度
    small_discard:[],//小技能 弃牌堆
    big_discard:[],//大技能 弃牌堆
    cardShowList:[],//出牌历史
    thatstate:{},//对手状态
    playingSpeed:0,//游戏进度
    Tooltip:{},//
  }
}
const store=createStore(reducer,initValue)
export default store