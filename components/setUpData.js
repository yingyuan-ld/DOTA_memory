module.exports = {
    whatToDo : {
        card:"出牌",
        attack:"攻击",
        equipt:"使用装备"
    },
    muBuffTo_card : {
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
    },
    muBuffTo_attack : {
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
    },
    muBuffTo_equipt : {
        0:"晕眩",
        3:"缴械",
        10:"超级新星",
        14:"决斗",
        22:"末日",
        23:"回音重踏",
        34:"剑刃风暴",
        36:"海妖之歌",
        37:"石化",
        55:"噩梦",
        68:"极寒之拥",
        87:"妖术",
        88:"风杖"
    },
	thatBuffTo_card : {
	    10:"超级新星",
	    34:"剑刃风暴",
	    36:"海妖之歌",
	    60:"魔免",
	    79:"暗影之舞",
	    88:"风杖"
	},
	thatBuffTo_attack : {
	    2:"虚无",
	    24:"磁场",
	    36:"海妖之歌",
	    79:"暗影之舞",
	    88:"风杖"
	},
	thatBuffTo_equipt : {
	    10:"超级新星",
	    34:"剑刃风暴",
	    36:"海妖之歌",
	    60:"魔免",
	    79:"暗影之舞",
	    88:"风杖"
	},
	herotype:{
        0:{//兽族
            herotype:0,
            maxHp:4000,//最大血量
            Hprecove:15,//生命值恢复速度
            maxMp:500,//最大蓝量
            Mprecove:50,//魔法值恢复速度
            attack:40,//攻击力
            attackRecove:1,//攻击速度
            armor:10//护甲
        },
        1:{//精灵族
            herotype:1,
            maxHp:3500,//最大血量
            Hprecove:10,//生命值恢复速度
            maxMp:500,//最大蓝量
            Mprecove:50,//魔法值恢复速度
            attack:70,//攻击力
            attackRecove:1.5,//攻击速度
            armor:15,//护甲
        },
        2:{//不死族
            herotype:2,
            maxHp:3000,//最大血量
            Hprecove:10,//生命值恢复速度
            maxMp:600,//最大蓝量
            Mprecove:60,//魔法值恢复速度
            attack:40,//攻击力
            attackRecove:1,//攻击速度
            armor:10,//护甲
        },
        3:{//人族
            herotype:3,
            maxHp:3500,//最大血量
            Hprecove:10,//生命值恢复速度
            maxMp:500,//最大蓝量
            attack:50,//攻击力
            Mprecove:50,//魔法值恢复速度
            attackRecove:1,//攻击速度
            armor:10,//护甲
        },
	},
	equiptTo_base:{
        0:(base)=>{//达贡之神力
        	return base;
        },
        1:(base)=>{//深渊战刃
            base.attack+= 30;
        	return base;
        },
        2:(base)=>{//秘法鞋
        	return base;
        },
        3:(base)=>{//虚灵之刃
        	return base;
        },
        4:(base)=>{//天堂之戟
            base.attack+= 30;
        	return base;
        },
        5:(base)=>{//撒旦之邪力
        	return base;
        },
        6:(base)=>{//刃甲
            base.armor+=10;
        	return base;
        },
        7:(base)=>{//邪恶镰刀
            base.maxMp+=100;
            base.Mprecove+=10;
        	return base;
        },
        8:(base)=>{//散失之刃
        	return base;
        },
        9:(base)=>{//勇气勋章
            base.armor+=10;
        	return base;
        },
        10:(base)=>{//BKB
            base.attack+= 15;
        	return base;
        },
        11:(base)=>{//灵魂之戒
            base.Hprecove+=10;
        	return base;
        },
        12:(base)=>{//梅肯斯姆
            base.Hprecove+=10;
        	return base;
        },
        13:(base)=>{//Eull的神圣法杖
            base.Mprecove+=10;
        	return base;
        },
        14:(base)=>{//紫怨
            base.maxMp+=100;
            base.Mprecove+=10;
        	return base;
        },
        15:(base)=>{//食尸鬼王的臂章
            base.attack+= 10;
        	return base;
        },
        16:(base)=>{//林肯法球
            base.maxMp+=100;
            base.Mprecove+=10;
        	return base;
        },
        17:(base)=>{//辉耀
            base.attack+= 45;
        	return base;
        },
        18:(base,Mstate,Tstate)=>{//狂战斧
            base.attack+= (25+Tstate.cardid.length*5);
        	return base;
        },
        19:(base)=>{//蝴蝶
            base.attack+= 30;
        	return base;
        },
        20:(base)=>{//圣剑
            base.attack+= 150;
        	return base;
        },
        21:(base)=>{//暗灭
        	return base;
        } 
    },
    buffTo_base:{
        5:(base)=>{//巨浪 0 减少敌方十点护甲(持续3回合)并对对方造成100点伤害
            base.armor-=10;
        	return base;
        },
        6:(base)=>{//锚击 1 造成(50+敌方手牌数*10)的伤害,并减少敌方50%攻击力(持续3回合)
            base.attack-= parseInt(base.attack/2);
        	return base;
        },                
        102:(base,Mstate,Tstate)=>{//潮汐使者 2 使自己本回合增加20+对方手牌数*10点攻击力
            base.attack+= (20+Tstate.cardid.length*10);
        	return base;
        },
        103:(base,Mstate,Tstate)=>{//活性护甲 2 每受到一次攻击增加10点护甲(持续3回合)
            base.armor+= (Mstate.buffObj["103"]*10);
        	return base;
        },
        11:(base)=>{//战士怒吼 0 增加自己40点护甲,使敌方下一回合只可以攻击自己
            base.armor+= 40;
        	return base;
        },
        13:(base)=>{//强化图腾 2 使自己攻击力变为现在攻击力的2倍(持续半回合)
            base.attack+= base.attack;
        	return base;
        },
        16:(base)=>{//嚎叫 0 本回合攻击加60
            base.attack+= 60;
        	return base;
        },
        113:(base)=>{//野性驱使 2 攻击加30
            base.attack+= 30;
        	return base;
        },
        73:(base)=>{//酸性喷雾 0 三回合降低敌方10点护甲并造成50点伤害
            base.armor-= 10;
            base.Hprecove-= 50;
        	return base;
        },
        99:(base,Mstate,Tstate)=>{//巨力挥舞 2 普通攻击时增加加敌方手牌数乘10的攻击力(持续3回合)
            base.attack+= Tstate.cardid.length*10;
        	return base;
        },
        18:(base)=>{//战吼 2 三回合内增加自身30点护甲
            base.armor+= 30;
        	return base;
        },
        114:(base)=>{//地精贪婪 2 每回合得到金钱数+50(持续3回合)
            base.moneyrecove += 50;
        	return base;
        },
        115:(base)=>{//龙族血统 2 每回合回复40点生命值(持续3回合)
            base.Hprecove+= 40;
        	return base;
        },
        21:(base)=>{//授予力量 2 本回合内攻击加80
            base.attack+= 80;
        	return base;
        },
        63:(base)=>{//自然秩序 使对方护甲归0
            base.armor= 0;
            return base;
        },
        62:(base)=>{//衰退光环 减少对方50%攻击力
            base.attack-= parseInt(base.attack/2);
            return base;
        },
        159:(base)=>{//活血术 生命值回复速度*5
            base.Hprecove*=5;
            return base;
        },
        //-------------------------------------------
        119:(base,Mstate)=>{//狂战士之血 增加已损失生命值百分比*2的攻速
            base.attackRecove += ((1 - Mstate.Hp / base.maxHp)*2).toFixed(1)*1;
            return base;
        },
        159:(base)=>{//活血术 生命值回复速度*5
            base.Hprecove*=5;
            return base;
        },
        159:(base)=>{//活血术 生命值回复速度*5
            base.Hprecove*=5;
            return base;
        },
    },

}