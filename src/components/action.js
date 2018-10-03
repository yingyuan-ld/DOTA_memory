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
    mystate.buff.map((buffid,i)=>{//
        switch(buffid){
            case 157://多重施法
                if(Math.random()>0.5){
                    Attack.do.tHp = parseInt(Attack.do.tHp*3);
                }
                break;
            case 107://余震 半合内自己使用任何技能都会使敌方眩晕半回合
                Attack.do.tBuff = Attack.do.tBuff?Attack.do.tBuff.push(0):[0];
                Attack.do.tBuffT = Attack.do.tBuffT?Attack.do.tBuffT.push(1):[1];
                break;
            case 95://静电场 每次释放任何技能都会对敌方额外50点伤害
                Attack.do.tHp = Attack.do.tHp*1+50;
                break;
            case 58://血之狂暴  伤害增加50%,受伤增加50%
                Attack.do.tHp = parseInt(Attack.do.tHp*1.5);
                break;
            case 161://静默诅咒  每使用一次技能,持续时间延长一回合
                Attack.do.mBuff = Attack.do.mBuff[0]?Attack.do.mBuff.push(161):[161];
                Attack.do.mBuffT = Attack.do.mBuffT[0]?Attack.do.mBuffT.push(mystate.buffT[i]+=2):[mystate.buffT[i]+=2];
                break;
            case 48://超负荷  每放1次技能就可以增加自己100点攻击,不可叠加,维持一次攻击
                Attack.do.mBuffObj = Object.assign(Attack.do.mBuffObj||{}, {48:1});
                break;
            case 49://法力流失  3回合内敌方任何攻击所需魔法值翻倍
                Attack.do.mMp *= 2;
                break;
            case 155://精气光环  释放技能时有50%的概率加100点魔法值
                if(Math.random()>0.5){
                    Attack.do.mMp += 100;
                }
                break;
            case 91://施虐之心  每对敌方造成100点伤害回复50点魔法和50点生命
                Attack.do.mHp = Attack.do.mHp+parseInt(Attack.do.tHp*0.5);
                Attack.do.mMp = Attack.do.mMp+parseInt(Attack.do.tHp*0.5);
                break;
            case 106://战意  每释放一次技能可以增加30点攻击力
                Object.assign(Attack.do.mBuffObj||{}, {148:mystate.buffObj[106]+=1});
                break;
            case 26://血肉傀儡  三回合内双方每少一张牌自己就加80点生命
                Attack.do.mHp += 80;
                break;
            case 39://割裂  自己每减少一张牌会减少100点生命值
                Attack.do.mHp -= 100;
                break;
            case 59:////虚妄之诺  生命恢复增加1倍伤害减为一半
                if(Attack.do.mHp>=0){
                    Attack.do.mHp*=2
                }else{
                    Attack.do.mHp=parseInt(Attack.do.mHp*0.5)
                }
                break;

        }
    });
    let tBuff= props.thatstate.buff;
    for(let i=0;i< tBuff.length;i++){
        switch(tBuff[i]){
            case 2://虚无
                Attack.do.tHp = parseInt(Attack.do.tHp*1.5);
                break;
            case 23://回音重踏
                if (Attack.do.tHp>0) {
                    props.thatstate.buff.splice(i,1);
                    props.thatstate.buffTime.splice(i,1);
                }
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
                // Attack.do.mHp = Attack.do.mHp - parseInt(Attack.do.tHp/5);
                Attack.do.mHp -= parseInt(Attack.do.tHp/5);
                break;
            case 138://腐蚀外表 被动牌:受到敌方的任何攻击之后敌方会掉40点血
                Attack.do.mHp -= 40;
                break;
            case 142://魔法护盾 受到伤害时1蓝可以抵挡5伤害
                let hurt = parseInt(Attack.do.tHp/5);
                if(thatstate.Mp-hurt >0){
                    Attack.do.tHp = 0;
                    Attack.do.tMp -= hurt;
                }else{
                    Attack.do.tHp -= (hurt-thatstate.Mp)*5;
                    Attack.do.tMp -= thatstate.Mp;
                }
                break;
            case 38://折光  5回合内抵挡4次伤害
                Object.assign(Attack.do.tBuffObj||{}, {8:thatstate.buffObj[38]-=1});
                Attack.do.tHp = 0;
                if(thatstate.buffObj[38]==0){
                    props.thatstate.buff.splice(i,1);
                    props.thatstate.buffTime.splice(i,1);
                    i--;
                }
                break;
            case 145://回到过去  有30%的概率免疫伤害
                if(Math.random()<0.3){
                    Attack.do.tHp = 0;
                };
                break;
            case 58://血之狂暴  伤害增加50%,受伤增加50%
                Attack.do.tHp = parseInt(Attack.do.tHp*1.5);
                break;
            case 94://屠戮  敌方每减少一张牌会使自己增加30点生命值
                Attack.do.tHp -= 30;
                // Attack.do.tHp = Attack.do.tHp*1-30;
                break;
            case 148://支配死灵  被动牌:敌方每减少一张牌,可以增加30点攻击
                Object.assign(Attack.do.tBuffObj||{}, {148:thatstate.buffObj[148]+=1});
                break;
            case 150://折射  被动牌:反弹自己受到一切伤害的25%
                Attack.do.mHp = Attack.do.mHp - parseInt(Attack.do.tHp/4);
                Attack.do.tHp = Attack.do.tHp - parseInt(Attack.do.tHp/4);
                break;
            case 44://灵魂猎手  一回合内使敌方额外承受50%的伤害
                Attack.do.tHp = parseInt(Attack.do.tHp*1.5);
                break;
            case 53://致命连接  本回合内对敌方额外造成手牌数0.1倍伤害
                Attack.do.tHp += parseInt(thatstate.cardid.length*0.1);
                break;
            case 166://上古封印 承受1.5倍魔法伤害，并沉默
                Attack.do.tHp = parseInt(Attack.do.tHp*1.5);
                break;
            case 169://幽冥守卫  对敌方造成敌方消耗魔法值的伤害
                Attack.do.mHp += Attack.do.mMp;
                break;
            case 7://船油  受到伤害减半
                Attack.do.tHp = parseInt(Attack.do.tHp/2);
                break;
            case 9://回光返照  将受到的伤害转化为自己的生命值
                if(Attack.do.tHp <0)Attack.do.tHp *= -1;
                break;
            case 26://血肉傀儡  三回合内双方每少一张牌自己就加80点生命
                Attack.do.tHp -= 80;
                break;
            case 80://激怒  伤害减少90%
                Attack.do.tHp = parseInt(Attack.do.tHp*0.1);
                break;
            case 59:////虚妄之诺  生命恢复增加1倍伤害减为一半
                if(Attack.do.tHp>=0){
                    Attack.do.tHp*=2
                }else{
                    Attack.do.tHp=parseInt(Attack.do.tHp*0.5)
                }
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
    Attack.do = Object.assign({//格式化数据
        "mMp":0,
        "mHp":0,
        "tMp":0,
        "tHp":0,
        "mBuff":[],
        "mBuffT":[],
        "tBuff":[],
        "tBuffT":[],
        "mBuffObj":{},
        "tBuffObj":{}
    }, Attack.do);
    if(isNaN(Attack.do.tHp))Attack.do.tHp = parseInt(eval(Attack.do.tHp));
    if(isNaN(Attack.do.mHp))Attack.do.mHp = parseInt(eval(Attack.do.mHp));
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
        [checked,props] = check_attackAccount(props)//判断剩余攻击次数
        if(!checked)return [false,props];
        props.mystate.attackAccount  = (props.mystate.attackAccount-1).toFixed(1);//攻击机会减1
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
                props.mystate.Mp += value;
                if(props.mystate.Mp > props.mystate.maxMp)props.mystate.Mp = props.mystate.maxMp;
                if(props.mystate.Mp < 0)props.mystate.Mp = 0;
                break;
            case "mHp":
                props.mystate.Hp += value;
                if(props.mystate.Hp > props.mystate.maxHp)props.mystate.Hp = props.mystate.maxHp;
                if(props.mystate.Hp < 0)props.mystate.Hp = 0;
                break;
            case "tMp":
                props.thatstate.Mp += value;
                if(props.thatstate.Mp > props.thatstate.maxMp)props.thatstate.Mp = props.thatstate.maxMp;
                if(props.thatstate.Mp < 0)props.thatstate.Mp = 0;
                break;
            case "tHp":
                props.thatstate.Hp -= value;
                if(props.thatstate.Hp > props.thatstate.maxHp)props.thatstate.Hp = props.thatstate.maxHp;
                if(props.thatstate.Hp < 0)props.thatstate.Hp = 0;
                break;
            case "mBuff":
                props = addBuff(props,"mystate",DO.mBuff,DO.mBuffT)//添加buff方法
                break;
            case "tBuff":
                props = addBuff(props,"thatstate",DO.tBuff,DO.tBuffT)//添加buff方法
                break;
            case "mBuffObj":
                props.mystate.buffObj = Object.assign(props.mystate.buffObj, DO.mBuffObj);
                break;
            case "tBuffObj":
                props.thatstate.buffObj = Object.assign(props.thatstate.buffObj, DO.tBuffObj);
                break;
            case "special":
                specialcard(props,Attack);
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
    if(mystate.attackAccount<1){
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
            case 40://烟幕
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
                    messagelist.push("\"旋风飞斧\"状态普通攻击MISS");
                    res[0] = "miss";
                    return;
                };
                break;
            case 57://醉酒云雾  普通攻击有75%的概率打不中
                if(Math.random()<0.75){
                    messagelist.push("\"醉酒云雾\"状态普通攻击MISS");
                    res[0] = "miss";
                    return;
                };
                break;

        }
    })
    thatstate.buff.map((buffid)=>{
        switch(buffid){
            case 117://崎岖外表 普通攻击你时有30%的概率使敌方晕眩一回合
                if(Math.random()<0.3){
                    messagelist.push("对方触发\"崎岖外表\"状态");
                    res[0] = "miss";
                    props = addBuff(props,"mystate",[0],[2])//添加buff方法
                    return;
                };
                break;
            case 123://醉拳 受到普通攻击时有40%的概率mis
                if(Math.random()<0.4){
                    messagelist.push("对方处于\"醉拳\"状态普通攻击MISS");
                    res[0] = "miss";
                    return;
                };
                break;
            case 24://磁场 物理miss
                messagelist.push("对方处于\"磁场\"状态普通攻击MISS");
                res[0] = "miss";
                return;
                break;
            case 123://模糊  被动牌:敌方在普通攻击你时有70%的概率mis
                if(Math.random()<0.7){
                    messagelist.push("对方处于\"模糊\"状态普通攻击MISS");
                    res[0] = "miss";
                    return;
                };
                break;
            case 145://回到过去  有30%的概率免疫伤害
                if(Math.random()<0.3){
                    messagelist.push("对方处于\"回到过去\"状态普通攻击MISS");
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
    let mBuff= props.mystate.buff;
    for(let i=0;i< mBuff.length;i++){
        switch(mBuff[i]){
            case 97://巨力重击 有30%的概率使敌方晕眩一回合并附加40点攻击
                if(Math.random()<0.3){
                    DO.tBuff.push(0),
                    DO.tBuffT.push(2),
                    DO.tHp += 40;
                };
                break;
            case 112://致死打击 攻击时有60%的概率1.5倍攻击
                if(Math.random()<0.6){
                    DO.tHp = parseInt(DO.tHp*1.5);
                };
                break;
            case 120://盛宴 普通攻击时将对方现有生命值的2%转化为自身生命
                let blud = parseInt(thatstate.Hp*0.02);
                thatstate.Hp -= blud;
                mystate.Hp += blud;
                break;
            case 124://重击 攻击时有30%的概率击晕敌方一回合并附加70点伤害
                if(Math.random()<0.3){
                    DO.tBuff.push(0),
                    DO.tBuffT.push(2),
                    DO.tHp = DO.tHp*1+70;
                }
                break;
            case 133://爆头 被动牌:攻击时有40%的概率附加100点伤害
                if(Math.random()<0.4){
                    DO.tHp += 100;
                }
                break;
            case 134://剑舞  攻击时有60%的概率1.5倍暴击
                if(Math.random()<0.6){
                    DO.tHp = parseInt(DO.tHp*1.5);
                }
                break;
            case 67://灼热之箭  攻击消耗20魔法值,附加50攻击
                if (props.mystate.mp>20) {
                    DO.tHp = DO.tHp*1+50;
                    DO.mMp -= 20;
                }
                break;
            case 140://忍术 攻击时有40%的概率双倍暴击
                if(Math.random()<0.4){
                    DO.tHp *= 2;
                }
                break;
            case 146://时间锁定  被动牌:普通攻击时有25%的概率使敌方晕眩一回合
                if(Math.random()<0.25){
                    DO.tBuff.push(0);
                    DO.tBuffT.push(2);
                }
                break;
            case 58://血之狂暴  伤害增加50%,受伤增加50%
                DO.tHp = parseInt(DO.tHp*1.5);
                break;
            case 151://麻痹撕咬 被动牌:普通攻击成功后可以使敌方1回合内有50%的概率攻击mis
                DO.tBuff.push(42);
                DO.tBuffT.push(2);
                break;
            case 48://超负荷  每放1次技能就可以增加自己100点攻击,不可叠加,维持一次攻击
                DO.mBuffObj = Object.assign(DO.mBuffObj||{}, {48:0});
                break;
            case 163://液态火   普通攻击成功后,对其每回合造成60点伤害持续3回合
                DO.tBuff.push(164);
                DO.tBuffT.push(6);
                break;
            case 12://海象挥击  攻击力变为现在攻击力的4倍
                props.mystate.buff.splice(i,1);
                props.mystate.buffTime.splice(i,1);
                i--
                break;
            case 146://恩赐解脱  攻击时有30%的概率4倍暴击
                if(Math.random()<0.3){
                    DO.tHp *= 4;
                }
                break;
            case 59:////虚妄之诺  生命恢复增加1倍伤害减为一半
                if(DO.mHp>=0){
                    DO.mHp*=2;
                }else{
                    DO.mHp=parseInt(DO.mHp*0.5);
                }
                break;
                

        }
    }
    let tBuff= props.thatstate.buff;
    for(let i=0;i< tBuff.length;i++){
        switch(tBuff[i]){
            case 37://石化
                DO.tHp *= 2;
                break;
            case 127://带刺外壳  受到伤害时,晕眩敌方半回合
                DO.mBuff.push(0);
                DO.mBuffT.push(1);
                break;
            case 58://血之狂暴  伤害增加50%,受伤增加50%
                DO.tHp = parseInt(DO.tHp*1.5);
                break;
            case 51://命运赦令
                DO.tHp *= 2;
                break;
            case 92://不可侵犯  被动牌:减少对方50%攻击速度
                DO.tBuff.push(168);
                DO.tBuffT.push(6);
                break;
            case 169://幽冥守卫  对敌方造成敌方消耗魔法值的伤害
                DO.mHp -= DO.mMp;
                break;
            case 7://船油  受到伤害减半
                DO.tHp = parseInt(DO.tHp/2);
                break;
            case 9://回光返照  将受到的伤害转化为自己的生命值
                if(DO.tHp <0)DO.tHp *= -1;
                break;
            case 59:////虚妄之诺  生命恢复增加1倍伤害减为一半
                if(DO.tHp>=0){
                    DO.tHp*=2;
                }else{
                    DO.tHp=parseInt(DO.tHp*0.5);
                }
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
    mystate.buff.map((buffid,i)=>{//
        switch(buffid){
            case 96://霜之哀伤
                let key = thatstate.cardid.length*Math.random();
                thatstate.cardid.splice(parseInt(key),1);
                break;
            case 111://吸血光环 将对方受到伤害的30%转化成自己的生命值
                DO.mHp = DO.mHp+parseInt(DO.tHp*0.3);
                break;
            case 125://法力损毁 普通攻击成功后可以削减敌方50能量值
                DO.tMp -= 50;
                break;
            case 135://热血战魂  每次普通攻击增加30攻速
                DO.mBuffObj = Object.assign(DO.mBuffObj||{}, {135:mystate.buffObj[135]+1});
                break;
            case 144://怒意狂击  被动牌:每次普通攻击成功后攻击力会增加20
                DO.mBuffObj = Object.assign(DO.mBuffObj||{}, {144:mBuffObj.buffObj[144]+1});//???
                break;
            case 65://高射火炮  该单位攻击+70
                DO.mBuffObj = Object.assign(DO.mBuffObj||{}, {65:mystate.buffObj[65]-=1});
                if(DO.mBuffObj[65]<=0){
                    props.mystate.buff.splice(i,1);
                    props.mystate.buffTime.splice(i,1);
                    i--;
                }
                break;
            case 91://施虐之心  每对敌方造成100点伤害回复50点魔法和50点生命
                DO.mHp = DO.mHp+parseInt(DO.tHp*0.5);
                DO.mMp = DO.mMp+parseInt(DO.tHp*0.5);
                break;
            case 43://极度饥渴  该单位攻击+80,且将对敌方造成伤害转化为己方生命值
                DO.mHp = DO.tHp;
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
            case 23://回音重踏
                props.thatstate.buff.splice(i,1);
                props.thatstate.buffTime.splice(i,1);
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
            case 62://撕裂伤口
                DO.mHp += DO.tHp;
                break;
            case 29://活体护甲
                DO.tHp -= 40;
                break;
            case 138://腐蚀外表 被动牌:受到敌方的任何攻击之后敌方会掉40点血
                DO.mHp-=40;
                break;
            case 142://魔法护盾 受到伤害时1蓝可以抵挡5伤害
                let hurt = parseInt(DO.tHp/5);
                if(thatstate.Mp-hurt >0){
                    DO.tHp = 0;
                    DO.tMp -= hurt;
                }else{
                    DO.tHp -= (hurt-thatstate.Mp)*5;
                    DO.tMp -= thatstate.Mp;
                }
                break;
            case 38://折光  5回合内抵挡4次伤害
                Object.assign(DO.tBuffObj||{}, {8:thatstate.buffObj[38]-=1});
                DO.tHp = 0;
                if(thatstate.buffObj[38]==0){
                    props.thatstate.buff.splice(i,1);
                    props.thatstate.buffTime.splice(i,1);
                    i--;
                }
                break;
            case 150://折射  被动牌:反弹自己受到一切伤害的25%
                DO.mHp = DO.mHp - parseInt(DO.tHp/5);
                DO.tHp = DO.tHp - parseInt(DO.tHp/5);
                break;
            case 44://灵魂猎手  一回合内使敌方额外承受50%的伤害
                DO.tHp = parseInt(DO.tHp*1.5);
                break;
            case 53://致命连接  本回合内对敌方额外造成手牌数0.1倍伤害
                DO.tHp += parseInt(thatstate.cardid.length*0.1);
                break;
            case 80://激怒  伤害减少90%
                DO.tHp = parseInt(DO.tHp*0.1);
                break;

        }
    }
    if(DO.tHp < 0)DO.tHp=0;
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
            r = Math.random();
            if (r >= 0.5){
                props = addBuff(props,"thatstate",[0],[4])//添加buff方法
            }else{
                props = addBuff(props,"mystate",[0],[2])//添加buff方法
            }
            break;
        case 1050://吞噬 1 将对方的随机一张牌,转化为100金币
            mystate.money = mystate.money*1+100;
            r = Math.random();
            let index = parseInt(r*thatstate.cardid.length);
            thatstate.cardid.splice(index, 1);
            break;
        case 1087://月神之箭  有50%的概率使敌方晕眩二回合并造成100点伤害
            if (Math.random() >= 0.5){
                props = addBuff(props,"thatstate",[0],[4])//添加buff方法
                thatstate.Hp-=100;
            }
            break;
        case 1108://闪烁突袭  增加两次攻击次数
            mystate.attackAccount = mystate.attackAccount*1+2;
            break;
        case 1141://超级力量  增加两次攻击次数
            mystate.attackAccount = mystate.attackAccount*1+2;
            break;
        case 1202://涤罪之焰  对敌方造成150点伤害,并清除所有状态
            props.thatstate.buff = [];
            props.thatstate.buffT = [];
            break;
        case 7://淘汰之刃  当敌方生命值少于600时直接秒杀
            if(thatstate.Hp<600){
                thatstate.Hp-=9999;
            }
            break;
        case 37://灵魂隔断  自己和敌方互换血量
            // {mystate.Hp,thatstate.Hp} = {thatstate.Hp,mystate.Hp}
            let tempHp = thatstate.Hp;
            thatstate.Hp = mystate.Hp;
            mystate.Hp = tempHp;
            break;
        case 54://技能窃取  抽取敌方一张卡牌
            r = Math.random();
            index = parseInt(r*thatstate.cardid.length);
            mystate.cardid.push(thatstate.cardid.splice(index, 1));
            break;
        case 57://寒冬诅咒  弃置敌方所有手牌
            thatstate.cardid = [];
            break;
            
            
        
    }
    return {mystate:mystate,thatstate:thatstate};
}