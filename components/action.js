import {big_skill,small_skill} from '../server/skill';


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
    let stateBase = {
        maxHp:3500,//最大血量
        Hprecove:10,//生命值恢复速度
        maxMp:500,//最大蓝量
        Mprecove:50,//魔法值恢复速度
        attack:40,//攻击力
        armor:10,//护甲
        attackRecove:1,//攻击速度
    }
    switch(mystate.herotype){
        case 0:
            stateBase.herotype=0;
            stateBase.maxHp=4000;
            stateBase.Hprecove=15;
            break;
        case 1:
            stateBase.herotype=1;
            stateBase.attack=70;
            stateBase.armor=15;
            break;
        case 2:
            stateBase.herotype=2;
            stateBase.maxHp=3000;
            stateBase.maxMp=600;
            stateBase.Mprecove=60;
            break;
    }
    mystate.equipment.map((equp)=>{
        switch(equp.id){
            case 0://达贡之神力
                break;
            case 1://深渊战刃
                stateBase.attack+= 30;
                break;
            case 2://秘法鞋
                break;
            case 3://虚灵之刃
                break;
            case 4://天堂之戟
                stateBase.attack+= 30;
                break;
            case 5://撒旦之邪力
                break;
            case 6://刃甲
                stateBase.armor+=10;
                break;
            case 7://邪恶镰刀
                stateBase.maxMp+=100;
                stateBase.Mprecove+=10;
                break;
            case 8://散失之刃
                break;
            case 9://勇气勋章
                stateBase.armor+=10;
                break;
            case 10://BKB
                stateBase.attack+= 15;
                break;
            case 11://灵魂之戒
                stateBase.Hprecove+=10;
                break;
            case 12://梅肯斯姆
                stateBase.Hprecove+=10;
                break;
            case 13://Eull的神圣法杖
                stateBase.Mprecove+=10;
                break;
            case 14://紫怨
                stateBase.maxMp+=100;
                stateBase.Mprecove+=10;
                break;
            case 15://食尸鬼王的臂章
                stateBase.attack+= 10;
                break;
            case 16://林肯法球
                stateBase.maxMp+=100;
                stateBase.Mprecove+=10;
                break;
            case 17://辉耀
                stateBase.attack+= 45;
                break;
            case 18://狂战斧
                stateBase.attack+= (25+thatstate.cardid.length*5);
                break;
            case 19://蝴蝶
                stateBase.attack+= 30;
                break;
            case 20://圣剑
                stateBase.attack+= 150;
                break; 
            case 21://暗灭
                break; 
        }
    })
    mystate.buff.map((key)=>{
        switch (key){
            case 5://巨浪 0 减少敌方十点护甲(持续3回合)并对对方造成100点伤害
                stateBase.armor-=10;
                break;
            case 6://锚击 1 造成(50+敌方手牌数*10)的伤害,并减少敌方50%攻击力(持续3回合)
                stateBase.attack-= parseInt(stateBase.attack/2);
                break;                
            case 102://潮汐使者 2 使自己本回合增加20+对方手牌数*10点攻击力
                stateBase.attack+= (20+thatstate.cardid.length*10);
                break;
            case 103://活性护甲 2 每受到一次攻击增加10点护甲(持续3回合)
                stateBase.armor+= (mystate.buffObj["103"]*10);
                break;
            case 11://战士怒吼 0 增加自己40点护甲,使敌方下一回合只可以攻击自己
                stateBase.armor+= 40;
                break;
            case 13://强化图腾 2 使自己攻击力变为现在攻击力的2倍(持续半回合)
                stateBase.attack+= stateBase.attack;
                break;
            case 16://嚎叫 0 本回合攻击加60
                stateBase.attack+= 60;
                break;
            case 113://野性驱使 2 攻击加30
                stateBase.attack+= 30;
                break;
            case 73://酸性喷雾 0 三回合降低敌方10点护甲并造成50点伤害
                stateBase.armor-= 10;
                stateBase.Hprecove-= 50;
                break;
            case 99://巨力挥舞 2 普通攻击时增加加敌方手牌数乘10的攻击力(持续3回合)
                stateBase.attack+= thatstate.cardid.length*10;
                break;
            case 18://战吼 2 三回合内增加自身30点护甲
                stateBase.armor+= 30;
                break;
            case 114://地精贪婪 2 每回合得到金钱数+50(持续3回合)
                stateBase.moneyrecove += 50;
                break;
            case 115://龙族血统 2 每回合回复40点生命值(持续3回合)
                stateBase.Hprecove+= 40;
                break;
            case 21://授予力量 2 本回合内攻击加80
                stateBase.attack+= 80;
                break;
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
function addBuff(props,MorT,buff,buffT,buffObj){//添加buff方法
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
        Object.assign(props[MorT].buffObj, buffObj);
    });
    props[MorT].buff = bufflist;
    props[MorT].buffTime = bufflistTime;
    return props;
}
function check_myBuff (props){//释放技能判定 己方负面状态
    const debuff_doskill = {
        0:"晕眩",
        1:"沉默",
        10:"超级新星",
        14:"决斗",
        22:"末日",
        23:"回音重踏",
        32:"战士怒吼",
        34:"剑刃风暴",
        36:"海妖之歌",
        37:"石化",
        40:"烟幕",
        55:"噩梦",
        68:"极寒之拥",
        87:"妖术",
        88:"风杖"
    }
    let mystate = props.mystate;
    let res = [true,props];
    mystate.buff.map((buffid)=>{//
        if(!res[0])return;
        if(debuff_doskill[buffid]){
            props.messagelist.push("处于\""+debuff_doskill[buffid]+"\"状态,不能出牌！");
            res = [false,props];
        }
    });
    return res;
}
function check_thatBuff(props){//释放技能判定 对方防御状态
    const defenbuff_doskill = {
        34:"剑刃风暴",
        36:"海妖之歌",
        60:"魔免",
        79:"暗影之舞",
        88:"风杖"
    };
    let mystate = props.mystate;
    mystate.buff.map((buffid)=>{//
        if(defenbuff_doskill[buffid]){
            props.messagelist.push("对方处于\""+defenbuff_doskill[buffid]+"\"状态！");
            return [false,props];
        }
    });
    return [true,props];
}
function check_checkMp (props,card){//判断剩余蓝量
    let mystate = props.mystate;
    if(mystate.Mp<card.do.mMp){
        props.messagelist.push("剩余蓝量不够！");
        return [false,props];
    }else{
        return [true,props];
    }
}
function check_buffToSkill (props,card){
    let mystate = props.mystate;
    let thatstate = props.thatstate;
    mystate.buff.map((buffid)=>{//
        switch(buffid){
            case 157://多重施法
                if(Math.random()>0.5){
                    card.do.tHp = parseInt(card.do.tHp*1.5);
                }
                break;
            case 107://余震 半合内自己使用任何技能都会使敌方眩晕半回合
                card.do.tBuff = card.do.tBuff?card.do.tBuff.push(0):[0];
                card.do.tBuffT = card.do.tBuffT?card.do.tBuffT.push(1):[1];
                break;
        }
    });
    let tBuff= props.thatstate.buff;
    for(let i=0;i< tBuff.length;i++){
        switch(tBuff[i]){
            case 2://虚无
                card.do.tHp = parseInt(card.do.tHp*1.5);
                break;
            case 8://无光之盾
                if(thatstate.buffObj[8]>(card.do.tHp||0)){
                    Object.assign(card.do.tBuffObj||{}, {8:thatstate.buffObj[8]-=card.do.tHp});
                    card.do.tHp = 0;
                }else{
                    card.do.tHp = card.do.tHp - thatstate.buffObj[8];
                    card.do.mHp = card.do.mHp - 100;
                    props.thatstate.buff.splice(i,1);
                    props.thatstate.buffTime.splice(i,1);
                    i--;
                }
                break;
            case 37://石化
                card.do.tHp = 0;
                break;
            case 100://反击
                card.do.mHp = card.do.mHp - parseInt(card.do.tHp/5);
                break;
            case 103://活性护甲
                Object.assign(card.do.tBuffObj, {103:thatstate.buffObj[103]+1});
                break;
        }
    }
    return [props,card];
}
export function doskill (props,card){//使用技能
    let mystate = props.mystate;
    let thatstate = props.thatstate;
    card = JSON.parse(JSON.stringify(card));
    let checked = true;//用于判断检查状态

    for(let key in card.do){
        let value = card.do[key]
        if(typeof(value)=="string")card.do[key] = parseInt(eval(value));
    }
    [checked,props]= check_round(props);
    if(!checked)return [false,props];
    [checked,props] = check_myBuff(props);
    if(!checked)return [false,props];

    switch(card.state){
        case 0://可以被闪避的技能
            [checked,props] = check_checkMp(props,card);
            if(!checked)return false;
            //轮到那边的回合 后面再做
            props = docard(props,card);
            break
        case 1://指向性技能
            [checked,props] = check_checkMp(props,card);
            if(!checked)return [false,props];
            [checked,props] = check_thatBuff(props);
            if(!checked)return [false,props];
            props = docard(props,card);
            break
        case 2://状态类技能
            props = docard(props,card);
            break
    }
    return [true,props];
}

function docard(props,card){
    let messagelist = props.messagelist;//消息
    messagelist.push("你使用了\""+card.name+"\"");
    props.mystate.messagelist = messagelist;
    props.mystate.cardid.map((item,i)=>{//删除手牌
        if(item==props.card){
            props.mystate.cardid.splice(i,1);
        };
    });
    props.cardShowList.push(props.card);//放入弃牌堆

    //技能作用时的判断
    [props,card] = check_buffToSkill(props,card);
    for(let key in card.do){
        let value = card.do[key]
        switch(key){
            case "mMp":
                props.mystate.Mp +=value;
                break;
            case "mHp":
                props.mystate.Hp +=value;
                break;
            case "tMp":
                props.thatstate.Mp +=value;
                break;
            case "tHp":
                props.thatstate.Hp -=value;
                break;
            case "mBuff":
                props = addBuff(props,"mystate",card.do.mBuff,card.do.mBuffT,card.do.mBuffObj)//添加buff方法
                break;
            case "tBuff":
                props = addBuff(props,"thatstate",value,card.do.tBuffT,card.do.tBuffObj)//添加buff方法
                break;
            case "special":
                specialcard(props,card);
                break;
        }
    }
    return props;
}

export function doAttack (props){//物理攻击方法
    let mystate = props.mystate;
    let thatstate = props.thatstate;
    let checked = true;//用于判断检查状态

    [checked,props] = check_round(props);//检查回合
    if(!checked)return [false,props];
    [checked,props] = check_attackAccount(props)//判断剩余攻击次数
    if(!checked)return [false,props];
    [checked,props] = attack_myBuff(props);//检查自己状态
    if(!checked)return [false,props];
    [checked,props] = attack_thatBuff(props);//检查对方状态
    if(!checked)return [false,props];
    props.mystate.attackAccount -=1;//攻击机会减1
    [checked,props] = check_miss(props);//此攻击miss
    if(checked=="miss")return ["miss",props];

    //物理攻击作用时的判断
    let Attack={tHp:props.mystate.attack,mHp:0};
    let armor = props.thatstate.armor;
    [Attack,props] = attackBefore(props,Attack);
    Attack.tHp = parseInt(Attack.tHp*(1-(armor * 0.06 / (1 + armor * 0.06))));
    [Attack,props] = attackAfter(props,Attack);
    

    for(let key in Attack){
        let value = Attack[key]
        switch(key){
            case "mMp":
                props.mystate.Mp +=value;
                break;
            case "mHp":
                props.mystate.Hp =(props.mystate.Hp+value)>props.mystate.maxHp?props.mystate.maxHp:props.mystate.Hp+value;
                break;
            case "tMp":
                props.thatstate.Mp +=value;
                break;
            case "tHp":
                props.thatstate.Hp -=value;
                break;
            case "mBuff":
                    props = addBuff(props,"mystate",Attack.mBuff,Attack.mBuffT,Attack.mBuffObj)//添加buff方法
                break;
            case "tBuff":
                    props = addBuff(props,"thatstate",value,Attack.tBuffT,Attack.tBuffObj)//添加buff方法
                break;
        }
    }
    let messagelist = props.messagelist;//消息
    messagelist.push("物理攻击造成"+ Attack.tHp +"点伤害");
    props.mystate.messagelist = messagelist;

    return [Attack.tHp,props];
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
function attack_myBuff (props){//物理攻击判断 己方状态
    const debuff_doskill = {
        0:"晕眩",
        2:"虚无",
        3:"缴械",
        10:"超级新星",
        23:"回音重踏",
        28:"疯狂生长",
        36:"海妖之歌",
        37:"石化",
        50:"虚妄之诺",
        55:"噩梦",
        68:"极寒之拥",
        87:"妖术",
        88:"风杖"
    }
    let mystate = props.mystate;
    let res = [true,props];
    mystate.buff.map((buffid)=>{//
        if(!res[0])return;
        if(debuff_doskill[buffid]){
            props.messagelist.push("处于\""+debuff_doskill[buffid]+"\"状态,不能攻击！");
            res = [false,props];
        }
    });
    return res;
}
function attack_thatBuff (props){//物理攻击判断 对方状态
    const debuff_doskill = {
        2:"虚无",
        24:"磁场",
        36:"海妖之歌",
        79:"暗影之舞",
        88:"风杖"
    }
    let thatstate = props.thatstate;
    let res = [true,props];
    thatstate.buff.map((buffid)=>{//
        if(!res[0])return;
        if(debuff_doskill[buffid]){
            props.messagelist.push("对方处于\""+debuff_doskill[buffid]+"\"状态,不能攻击！");
            res = [false,props];
        }
    });
    return res;
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
    mystate.buff.map((buffid)=>{//
        switch(buffid){
            case 97://巨力重击 有30%的概率使敌方晕眩一回合并附加40点攻击
                if(Math.random()<0.3){
                    Attack.tBuff = 0,
                    Attack.tBuffT = 2,
                    Attack.tHp += 40;
                };
                break;
            case 112://致死打击 攻击时有60%的概率1.5倍攻击
                if(Math.random()<0.6){
                    Attack.tHp = parseInt(Attack.tHp*1.5);
                };
                break;
        }
    });
    let tBuff= props.thatstate.buff;
    for(let i=0;i< tBuff.length;i++){
        switch(tBuff[i]){
            case 37://石化
                Attack.tHp *= 2;
                break;
        }
    }
    return [Attack,props];
}

function attackAfter(props,Attack){
    let mystate = props.mystate;
    let thatstate = props.thatstate;
    mystate.buff.map((buffid)=>{//
        switch(buffid){
            case 96://霜之哀伤
                let key = thatstate.cardid.length*Math.random();
                thatstate.cardid.splice(parseInt(key),1);
                break;
            case 111://吸血光环 将对方受到伤害的30%转化成自己的生命值
                Attack.mHp = Attack.mHp+parseInt(Attack.tHp*0.3);
                break;
        }
    });
    let tBuff= props.thatstate.buff;
    for(let i=0;i< tBuff.length;i++){
        switch(tBuff[i]){
            case 105://反击螺旋
                Attack.mHp-=50;
                break;
            case 105://勇气之霎
                if(Math.random()<0.4){
                    thatstate.Hp+=100;
                };
                break;
            case 8://无光之盾
                if(thatstate.buffObj[8]>(Attack.tHp||0)){
                    Object.assign(Attack.tBuffObj||{}, {8:thatstate.buffObj[8]-=Attack.tHp});
                    Attack.tHp = 0;
                }else{
                    Attack.tHp = Attack.tHp - thatstate.buffObj[8];
                    Attack.mHp = Attack.mHp - 100;
                    props.thatstate.buff.splice(i,1);
                    props.thatstate.buffTime.splice(i,1);
                    i--;
                }
                break;
            case 100://反击
                Attack.mHp = Attack.mHp - parseInt(Attack.tHp/5);
                break;
            case 101://海妖外壳
                Attack.tHp -= 50;
                break;
            case 103://活性护甲
                Object.assign(Attack.tBuffObj||{}, {103:thatstate.buffObj[103]+1});
                break;
        }
    }
    return [Attack,props];
}

export function doEquip (props,card){//使用技能
    let mystate = props.mystate;
    let thatstate = props.thatstate;
    card = JSON.parse(JSON.stringify(card));
    let checked = true;//用于判断检查状态

    for(let key in card.do){
        let value = card.do[key]
        if(typeof(value)=="string")card.do[key] = parseInt(eval(value));
    }
    [checked,props]= check_round(props);
    if(!checked)return [false,props];

    //check_myBuff(props);
    //释放技能判定 己方负面状态
    const debuff_doskill = {
        0:"晕眩",
        10:"超级新星",
        14:"决斗",
        22:"末日",
        23:"回音重踏",
        32:"战士怒吼",
        34:"剑刃风暴",
        36:"海妖之歌",
        37:"石化",
        55:"噩梦",
        68:"极寒之拥",
        87:"妖术",
        88:"风杖"
    }
    let res = [true,props];
    mystate.buff.map((buffid)=>{//
        if(!res[0])return;
        if(debuff_doskill[buffid]){
            props.messagelist.push("处于\""+debuff_doskill[buffid]+"\"状态,不能出牌！");
            res = [false,props];
        }
    });
    [checked,props] = res;
//---------------------------------------


    switch(card.state){
        case 1://指向性装备技能
            [checked,props] = check_checkMp(props,card);
            if(!checked)return [false,props];
            [checked,props] = check_thatBuff(props);
            if(!checked)return [false,props];
            props = docard(props,card);
            break
        case 2://非指向性
            [checked,props] = check_checkMp(props,card);
            if(!checked)return [false,props];
            props = docard(props,card);
            break
    }
    return [true,props];
}








export function specialcard (props,card){//使用技能
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