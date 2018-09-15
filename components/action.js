import {big_skill,small_skill} from '../server/skill';
import setUpData from './setUpData';


export function prepareOk (mystate,obj){//准备开始
    mystate.round-=obj.round
    mystate.thatstate=obj.state
    return mystate;
}
function getRandomInt(min, max) {  //返回一个区间的随机数
    return Math.floor(Math.random() * (max - min + 1) + min)
}
function deepCopy(obj) {  
    return JSON.parse(JSON.stringify(obj));
}
export function shufflecards(arr){//洗牌
    arr = arr.slice()  
    for (let i = 0; i < arr.length; i++) {  
      let j = getRandomInt(0, i)  
      // 将 _arr[i]与_arr中随机的项交换  
      let t = arr[i]  
      arr[i] = arr[j]  
      arr[j] = t  
    }  
    return arr
}
export function cardheap (state,obj){//洗牌结果
    if(state.small_cardheap.length==0){//判断是否第一次发牌
        state.mystate.cardid = obj.small_cardheap.slice(6,11);
        state.thatstate = obj.mystate;
        state.small_speed = 11
    }
    state.small_cardheap = obj.small_cardheap;
    state.big_cardheap = obj.big_cardheap;
    return state;
}
export function getnewstate(tate,obj){
    let messagelist =tate.messagelist;
    if(!obj.message)console.info("缺少动作的message");
    messagelist.push(obj.message);
    let newstate = obj.newstate;
    newstate.messagelist = messagelist;
    return newstate;
}
export function state_base(mystate,thatstate){
    if(!mystate.buff)return mystate;
    let stateBase = setUpData.herotype[mystate.herotype];//英雄型号
    stateBase = JSON.parse(JSON.stringify(stateBase));
    mystate.equipment.map((equp)=>{//装备遍历
        stateBase = setUpData.equiptTo_base[equp.id](stateBase,mystate,thatstate);
    })
    mystate.buff.map((key)=>{//状态遍历
        if(setUpData.buffTo_base[key]){
            stateBase = setUpData.buffTo_base[key](stateBase,mystate,thatstate);
        }
    })
    Object.assign(mystate, stateBase);
    return mystate;
}
function check_round (props){//判断回合
    if(props.round==0){
        props.messagelist.push("现在不是你的回合！");
        return [false,props];
    }else{
        return [true,props];
    }
}
function addBuff(props,MorT,buff,buffT){//添加buff方法
    let bufflist = props[MorT].buff;
    let bufflistTime = props[MorT].buffTime;
    buff.map((buffkey,i)=>{//i
        if(typeof(buffT[i])=="string")buffT[i] = parseInt(eval(buffT[i]));//字符串的时间,转换成数字
        let needadd = true;
        for(let I = bufflist.length-1;I>=0;I--){//I
            if(bufflist[I]==buffkey){
                bufflist.splice(I,1);
                bufflist.push(buffkey);
                let oldT = bufflistTime.splice(I,1)[0];
                bufflistTime.push(buffT[i]>oldT?buffT[i]:oldT);
                needadd = false;
            }
        }
        if(needadd){
            bufflist.push(buff[i]);
            bufflistTime.push(buffT[i]);
        }
    });
    props[MorT].buff = bufflist;
    props[MorT].buffTime = bufflistTime;
    return props;
}
function check_checkMp (props,card){//判断剩余蓝量
    let mystate = props.mystate;
    if(mystate.Mp+card.do.mMp<0){
        props.messagelist.push("剩余蓝量不够！");
        return [false,props];
    }else{
        return [true,props];
    }
}

function check_myBuff (props,type){//释放技能判定 己方负面状态
    let mystate = props.mystate;
    let res = [true,props];
    mystate.buff.map((buffid)=>{//
        if(!res[0])return;
        if(setUpData["muBuffTo_"+type][buffid]){//已经设定好的状态判断
            props.messagelist.push("处于\""+setUpData["muBuffTo_"+type][buffid]+"\"状态,不能"+setUpData.whatToDo[type]+"！");
            res = [false,props];
        }
    });
    return res;
}
function attack_thatBuff (props,type){//物理攻击判断 对方状态
    let thatstate = props.thatstate;
    let res = [true,props];
    thatstate.buff.map((buffid)=>{//
        if(!res[0])return;
        if(setUpData["thatBuffTo_"+type][buffid]){
            props.messagelist.push("对方处于\""+setUpData["thatBuffTo_"+type][buffid]+"\"状态,不能"+setUpData.whatToDo[type]+"！");
            res = [false,props];
        }
    });
    return res;
}
function check_buffToCard (props,Attack){
    let mystate = props.mystate;
    let thatstate = props.thatstate;
    mystate.buff.map((buffid)=>{//
        switch(buffid){
            case 157://多重施法
                if(Math.random()>0.5){
                    Attack.do.tHp = parseInt(Attack.do.tHp*1.5);
                }
                break;
            case 107://余震 半合内自己使用任何技能都会使敌方眩晕半回合
                Attack.do.tBuff = Attack.do.tBuff?Attack.do.tBuff.push(0):[0];
                Attack.do.tBuffT = Attack.do.tBuffT?Attack.do.tBuffT.push(1):[1];
                break;
        }
    });
    let tBuff= props.thatstate.buff;
    for(let i=0;i< tBuff.length;i++){
        switch(tBuff[i]){
            case 2://虚无
                Attack.do.tHp = parseInt(Attack.do.tHp*1.5);
                break;
            case 8://无光之盾
                if(thatstate.buffObj[8]>(Attack.do.tHp||0)){
                    Object.assign(Attack.do.tBuffObj||{}, {8:thatstate.buffObj[8]-=Attack.do.tHp});
                    Attack.do.tHp = 0;
                }else{
                    Attack.do.tHp = Attack.do.tHp - thatstate.buffObj[8];
                    Attack.do.mHp = Attack.do.mHp - 100;
                    props.thatstate.buff.splice(i,1);
                    props.thatstate.buffTime.splice(i,1);
                    i--;
                }
                break;
            case 37://石化
                Attack.do.tHp = 0;
                break;
            case 100://反击
                Attack.do.mHp = Attack.do.mHp - parseInt(Attack.do.tHp/5);
                break;
        }
    }
    return [props,Attack];
}
export function doAttack (props,Attack,type){//物理攻击方法 type=card/attack/equipt
    let mystate = props.mystate;
    let thatstate = props.thatstate;
    let checked = true;//用于判断检查状态
    Attack = JSON.parse(JSON.stringify(Attack));
    [checked,props] = check_round(props);//检查回合
    if(!checked)return [false,props];
    [checked,props] = check_myBuff(props,type);//检查自己状态
    if(!checked)return [false,props];
    if(Attack.state==1){
        [checked,props] = attack_thatBuff(props,type);//检查对方状态
        if(!checked)return [false,props];
    }
    if(type=="card"){
        [checked,props] = check_checkMp(props,Attack);//检查剩余蓝量
        if(!checked)return [false,props];
        props.mystate.cardid.map((item,i)=>{//删除手牌
            if(item.id==Attack.id){
                props.mystate.cardid.splice(i,1);
            };
        });
        props.cardShowList.push(Attack);//放入弃牌堆
        //卡牌作用时的判断
        [props,Attack] = check_buffToCard(props,Attack,type);
    }
    if(type=="attack"){
        // [checked,props] = check_attackAccount(props)//判断剩余攻击次数
        if(!checked)return [false,props];
        props.mystate.attackAccount -=1;//攻击机会减1
        [checked,props] = check_miss(props);//此攻击miss
        if(checked=="miss")return ["miss",props];
        //物理攻击作用时的判断
        let armor = props.thatstate.armor;
        [Attack,props] = attackBefore(props,Attack);
        Attack.do.tHp = parseInt(Attack.do.tHp*(1-(armor * 0.06 / (1 + armor * 0.06))));
        [Attack,props] = attackAfter(props,Attack);
    }
    if(type=="equipt"){
        [checked,props] = check_checkMp(props,Attack);//检查剩余蓝量
        if(!checked)return [false,props];
        props.mystate.equipmentcd[Attack.id] = Attack.CD;//装备进入cd
    }
    let DO = Attack.do;
    for(let key in DO){
        let value = DO[key]
        switch(key){
            case "mMp":
                props.mystate.Mp =(props.mystate.Mp+value)>props.mystate.maxMp?props.mystate.maxMp:props.mystate.Mp+value;
                break;
            case "mHp":
                props.mystate.Hp =(props.mystate.Hp+value)>props.mystate.maxHp?props.mystate.maxHp:props.mystate.Hp+value;
                break;
            case "tMp":
                props.thatstate.Mp =(props.thatstate.Mp+value)>props.thatstate.maxMp?props.thatstate.maxMp:props.thatstate.Mp+value;
                break;
            case "tHp":
                props.thatstate.Hp =(props.thatstate.Hp-value)>props.thatstate.maxHp?props.thatstate.maxHp:props.thatstate.Hp-value;
                break;
            case "mBuff":
                props = addBuff(props,"mystate",DO.mBuff,DO.mBuffT)//添加buff方法
                break;
            case "tBuff":
                props = addBuff(props,"thatstate",value,DO.tBuffT)//添加buff方法
                break;
            case "mBuffObj":
                props.mystate.buffObj = Object.assign(props.mystate.buffObj, DO.mBuffObj);
                break;
            case "tBuffObj":
                props.thatstate.buffObj = Object.assign(props.thatstate.buffObj, DO.tBuffObj);
                break;
            case "special":
                specialcard(props,DO);
                break;
        }
    }

    let messagelist = props.messagelist;//消息
    if(type=="attack"){
        messagelist.push("物理攻击造成"+ Attack.do.tHp +"点伤害");
    }else{
        messagelist.push("你使用了\""+Attack.name+"\"");
    }
    props.mystate.messagelist = messagelist;

    return [type=="attack"?Attack.do.tHp:true,props];
}

function check_attackAccount (props){//判断剩余攻击次数
    let mystate = props.mystate;
    if(mystate.attackAccount==0){
        props.messagelist.push("没有剩余的攻击次数！");
        return [false,props];
    }else{
        return [true,props];
    }
}
function check_miss(props){//物理攻击,判断miss
    let mystate = props.mystate;
    let thatstate = props.thatstate;
    let res = [true,props];
    let messagelist = props.messagelist;//消息
    mystate.buff.map((buffid)=>{
        switch(buffid){
            case 34://烟幕
                if(Math.random()<0.75){
                    messagelist.push("\"烟幕\"状态普通攻击MISS");
                    res[0] = "miss";
                    return;
                };
                break;
            case 42://麻痹撕咬
                if(Math.random()<0.5){
                    messagelist.push("\"麻痹撕咬\"状态普通攻击MISS");
                    res[0] = "miss";
                    return;
                };
                break;
            case 47://激光  该单位物理攻击100%miss
                messagelist.push("\"激光\"状态普通攻击MISS");
                res[0] = "miss";
                return;
                break;
            case 57://旋风飞斧  该单位攻击有30%的概率miss
                if(Math.random()<0.3){
                    messagelist.push("\"麻痹撕咬\"状态普通攻击MISS");
                    res[0] = "miss";
                    return;
                };
                break;
        }
    })
    props.mystate.messagelist = messagelist;
    return res
}
function attackBefore(props,Attack){
    let mystate = props.mystate;
    let thatstate = props.thatstate;
    let DO = Attack.do;
    mystate.buff.map((buffid)=>{//
        switch(buffid){
            case 97://巨力重击 有30%的概率使敌方晕眩一回合并附加40点攻击
                if(Math.random()<0.3){
                    DO.tBuff = 0,
                    DO.tBuffT = 2,
                    DO.tHp += 40;
                };
                break;
            case 112://致死打击 攻击时有60%的概率1.5倍攻击
                if(Math.random()<0.6){
                    DO.tHp = parseInt(DO.tHp*1.5);
                };
                break;
        }
    });
    let tBuff= props.thatstate.buff;
    for(let i=0;i< tBuff.length;i++){
        switch(tBuff[i]){
            case 37://石化
                DO.tHp *= 2;
                break;
        }
    }
    Attack.do = DO;
    return [Attack,props];
}

function attackAfter(props,Attack){
    let mystate = props.mystate;
    let thatstate = props.thatstate;
    let DO = Attack.do;
    mystate.buff.map((buffid)=>{//
        switch(buffid){
            case 96://霜之哀伤
                let key = thatstate.cardid.length*Math.random();
                thatstate.cardid.splice(parseInt(key),1);
                break;
            case 111://吸血光环 将对方受到伤害的30%转化成自己的生命值
                DO.mHp = DO.mHp+parseInt(DO.tHp*0.3);
                break;
        }
    });
    let tBuff= props.thatstate.buff;
    for(let i=0;i< tBuff.length;i++){
        switch(tBuff[i]){
            case 105://反击螺旋
                DO.mHp-=50;
                break;
            case 105://勇气之霎
                if(Math.random()<0.4){
                    thatstate.Hp+=100;
                };
                break;
            case 8://无光之盾
                if(thatstate.buffObj[8]>(DO.tHp||0)){
                    Object.assign(DO.tBuffObj||{}, {8:thatstate.buffObj[8]-=DO.tHp});
                    DO.tHp = 0;
                }else{
                    DO.tHp = DO.tHp - thatstate.buffObj[8];
                    DO.mHp = DO.mHp - 100;
                    props.thatstate.buff.splice(i,1);
                    props.thatstate.buffTime.splice(i,1);
                    i--;
                }
                break;
            case 100://反击
                DO.mHp = DO.mHp - parseInt(DO.tHp/5);
                break;
            case 101://海妖外壳
                DO.tHp -= 50;
                break;
            case 103://活性护甲
                DO.tBuffObj = Object.assign(DO.tBuffObj||{}, {103:thatstate.buffObj[103]+1});
                break;
        }
    }
    Attack.do = DO;
    return [Attack,props];
}


export function specialcard (props,card){//特殊技能处理
    let mystate = props.mystate;
    let thatstate = props.thatstate;
    let r;  
    switch (card.id)
    {
        case 1037://不稳定物 0 50%使对方晕眩两回合50%使自己晕眩一回合
            mystate.Mp -= 50;
            r = Math.random();
            if (r >= 0.5){
                thatstate.buff.push(0);
                thatstate.buffTime.push(4);
            }else{
                mystate.buff.push(0);
                mystate.buffTime.push(2)
            }
            break;
        case 1050://吞噬 1 将对方的随机一张牌,转化为100金币
            mystate.Mp -= 100;
            mystate.money = mystate.money*1+100;
            r = Math.random();
            let index = parseInt(r*thatstate.cardid.length);
            thatstate.cardid.splice(index, 1);
            break;
        
    }
    return {mystate:mystate,thatstate:thatstate};
}