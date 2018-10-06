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
        88:"风杖",
        58:"血之狂暴",
        166:"上古封印",
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
        55:"噩梦",
        68:"极寒之拥",
        87:"妖术",
        88:"风杖",
        51:"命运赦令",
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
            attack:8000,//攻击力
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

        84:(base)=>{//勇气徽章",message:"敌方护甲-10,己方护甲-10
            base.armor-=10;
            return base;
        },
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
        119:(base,Mstate)=>{//狂战士之血 增加已损失生命值百分比*2的攻速
            base.attackRecove += ((1 - Mstate.Hp / base.maxHp)*2).toFixed(1)*1;
            return base;
        },
        29:(base)=>{//活体护甲
            base.Hprecove+=20;
            return base;
        },
        126:(base)=>{//地之突袭  被动牌:攻击力加50
            base.attack += 50;
            return base;
        },
        121:(base)=>{//恐怖波动  减少10点护甲
            base.armor -= 10;
            return base;
        },
        128:(base)=>{//命令光环  被动牌:增加30%的攻击力
            base.attack = parseInt(base.attack*1.3);
            return base;
        },
        129:(base)=>{//强击光环  被动牌:增加25%的攻击力
            base.attack = parseInt(base.attack*1.25);
            return base;
        },
        135:(base,Mstate)=>{//热血战魂  每次普通攻击增加30攻速
            base.attackRecove+= (Mstate.buffObj["135"]*0.3);
            return base;
        },
        71:(base)=>{//扫射   增加100%攻击速度
            base.attackRecove+= 1;
            return base;
        },
        160:(base)=>{//变身  增加20攻击
            base.attack += 20;
            return base;
        },
        156:(base)=>{//连击  每回合增加一次攻击次数
            base.attackRecove+= 1;
            return base;
        },
        137:(base,Mstate,Tstate)=>{//幽冥剧毒  被动牌:增加(对方已损失生命值百分比*200)的攻击
            base.attack += parseInt((1-Tstate.Hp/base.maxHp)*200);
            return base;
        },
        141:(base,Mstate,Tstate)=>{//分裂箭 攻击力增加敌方手牌数乘以15的数值"
            base.attack+= Tstate.cardid.length*15;
            return base;
        },
        144:(base,Mstate)=>{//怒意狂击  被动牌:每次普通攻击成功后攻击力会增加20
            base.attack += (Mstate.buffObj["144"]*20);
            return base;
        },
        147:(base,Mstate,Tstate)=>{//嗜血渴望  敌方血量低于50%时，增加加70点攻击
            if(Tstate.Hp/base.maxHp<0.5){
                base.attack += 70;
            }
            return base;
        },
        41:(base)=>{//魔王降临  被动牌:减少敌方20点护甲
            base.armor -= 20;
            return base;
        },
        148:(base)=>{//支配死灵  被动牌:敌方每减少一张牌,可以增加30点攻击
            base.attack += (Mstate.buffObj["148"]*30);
            return base;
        },
        149:(base)=>{//荒芜  增加50点攻击
            base.attack += 50;
            return base;
        },
        152:(base)=>{//月之祝福 攻击力加60"
            base.attack += 50;
            return base;
        },
        98:(base,Mstate,Tstate)=>{//月刃 对方每张手牌,增加自己10%的攻击
            base.attack += base.attack*Tstate.cardid.length*0.1;
            return base;
        },
        65:(base)=>{//高射火炮   本回合内攻击增加70,维持4次攻击
            base.attack += 70;
            return base;
        },
        153:(base)=>{//辉煌光环 增加50点魔法值恢复
            base.Mprecove+=50;
            return base;
        },
        161:(base)=>{//静默诅咒 魔法值恢复速度减少100
            base.Hprecove-=50;
            base.Mprecove-=50;
            return base;
        },
        76:(base,Mstate,Tstate)=>{//智慧之刃 增加同等魔法恢复速度的攻击
            base.attack += Mstate.Mprecove;
            return base;
        },
        48:(base,Mstate,Tstate)=>{//超负荷  每放1次技能就可以增加自己100点攻击,不可叠加,维持一次攻击
            if(Mstate.buffObj[48]){
                base.attack += 100;
            }
            return base;
        },
        74:(base,Mstate,Tstate)=>{//严寒烧灼  2回合内增加敌方现有生命值10%的攻击力
            base.attack += parseInt(Tstate.Hp*0.1);
            return base;
        },
        68:(base,Mstate,Tstate)=>{//极寒之拥  该单位护甲+100,且不可攻击,出牌和实用装备
            base.armor += 100;
            return base;
        },
        78:(base,Mstate,Tstate)=>{//秘法天球",state: 2 ,message:"增加魔法值25%的攻击力
            base.attack += parseInt(Mstate.Mp*0.25);
            return base;
        },
        158:(base,Mstate,Tstate)=>{//嗜血术  "3回合内增加自己30%攻击速度
            base.attackRecove += 0.3;
            return base;
        },
        162:(base,Mstate,Tstate)=>{//暗言术  每回合造成60点伤害
            base.Hprecove-=60;
            return base;
        },
        164:(base,Mstate,Tstate)=>{//液态火  每回合造成60点伤害
            base.Hprecove-=60;
            return base;
        },
        165:(base,Mstate,Tstate)=>{//竭心光环  每回合减少3%生命值
            base.Hprecove-=parseInt(Mstate.maxHp*0.03);
            return base;
        },
        54:(base,Mstate,Tstate)=>{//虚弱  该单位攻击力-50
            base.attack -= 50;
            return base;
        },
        77:(base,Mstate,Tstate)=>{//霜冻护甲  该单位护甲+20
            base.armor += 20;
            return base;
        },
        167:(base,Mstate,Tstate)=>{//巫毒回复术  每回合消耗50魔法,恢复100生命
            base.Hprecove+=100;
            base.Mprecove-=50;
            return base;
        },
        168:(base,Mstate,Tstate)=>{//不可侵犯  减少对方50%攻击速度"},
            base.attackRecove -= 0.5;
            return base;
        },
        106:(base,Mstate)=>{//战意  每释放一次技能可以增加30点攻击力
            base.attack += (Mstate.buffObj["106"]*30);
            return base;
        },
        12:(base,Mstate,Tstate)=>{//海象挥击  攻击力变为现在攻击力的4倍
            base.attack *= 4;
            return base;
        },
        15:(base,Mstate,Tstate)=>{//变身",message:"攻击加100,攻速加80
            base.attack += 100;
            base.attackRecove += 0.8;
            return base;
        },
        17:(base,Mstate,Tstate)=>{//化学狂暴",message:"攻速加100,生命恢复回复加150
            base.Hprecove += 150;
            base.attackRecove += 1;
            return base;
        },
        19:(base,Mstate,Tstate)=>{//神之力量",message:"三回合内攻击增加200
            base.attack += 200;
            return base;
        },
        22:(base,Mstate,Tstate)=>{//末日  每回合造成100点伤害
            base.Hprecove -= 100;
            return base;
        },
        25:(base,Mstate,Tstate)=>{//守护天使 3回合内物理免疫
            base.armor = 9999;
            return base;
        },
        31:(base,Mstate,Tstate)=>{//伤害加深  护甲减少40点
            base.armor -= 40;
            return base;
        },
        130:(base,Mstate,Tstate)=>{//射手天赋  增加100点攻击力,100攻速
            base.attack += 100;
            base.attackRecove += 1;
            return base;
        },
        35:(base,Mstate,Tstate)=>{//战斗专注",message:"增加200攻速
            base.attackRecove += 2;
            return base;
        },
        79:(base,Mstate,Tstate)=>{//暗影之舞  增加5%生命恢复并使敌方在2回合内无法攻击自己
            base.Hprecove += parseInt(base.maxHp*0.05);
            return base;
        },
        43:(base,Mstate,Tstate)=>{//极度饥渴  该单位攻击+80,且将对敌方造成伤害转化为己方生命值
            base.attack += 80;
            return base;
        },
        45:(base,Mstate,Tstate)=>{//编织 护甲+20
            base.armor += 25;
            return base;
        },
        64:(base,Mstate,Tstate)=>{//编织 护甲减20
            base.armor -= 25;
            return base;
        },
        75:(base,Mstate,Tstate)=>{//火力聚焦  三回合内减少自身50%攻击,增加300攻速
            base.attack = parseInt(base.attack*0.5);
            base.attackRecove += 3;
            return base;
        },
        50:(base,Mstate,Tstate)=>{//虚妄之诺  生命恢复增加1倍伤害减为一半
            base.Hprecove *= 2;
            return base;
        },

        // :(base,Mstate,Tstate)=>{
        //     base.attack += parseInt(Tstate.Hp*0.1);
        //     return base;
        // },
        // :(base,Mstate,Tstate)=>{
        //     base.attack += parseInt(Tstate.Hp*0.1);
        //     return base;
        // },
        // :(base,Mstate,Tstate)=>{
        //     base.attack += parseInt(Tstate.Hp*0.1);
        //     return base;
        // },
        // :(base,Mstate,Tstate)=>{
        //     base.attack += parseInt(Tstate.Hp*0.1);
        //     return base;
        // },
        // :(base,Mstate,Tstate)=>{
        //     base.attack += parseInt(Tstate.Hp*0.1);
        //     return base;
        // },

        
    },

}