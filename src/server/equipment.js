﻿let equipment = [];

equipment[0] = {id:0,name:"达贡之神力",price:"￥35",mp:"MP:100",state: 1 ,message:"【主动使用】对敌方造成250点伤害",CD:8}
equipment[0].do = {mMp:-100,tHp:"250",cd:8};
equipment[1] = {id:1,name:"深渊战刃",price:"￥30",mp:"MP:100",state: 2 ,message:"攻击+30 【主动使用】使敌方晕眩一回合,无视魔免",CD:8}
equipment[1].do = {tBuff:[0],tBuffT:[2],cd:8};
equipment[2] = {id:2,name:"秘法鞋",price:"￥20",state: 2 ,message:"回复200蓝量",CD:6}
equipment[2].do = {mMp:200,cd:6};
equipment[3] = {id:3,name:"虚灵之刃",price:"￥20",mp:"MP:100",state: 1 ,message:"使双方同时进入虚无状态一回合 虚无状态下受到法术伤害加50%,物理伤害免疫",CD:4}
equipment[3].do = {mMp:-100,mBuff:[2],mBuffT:[2],tBuff:[2],tBuffT:[2],cd:8};
equipment[4] = {id:4,name:"天堂之戟",price:"￥25",mp:"MP:50",state: 1 ,message:"攻击力+30【主动使用】敌方下一回合无法普通攻击",CD:6}
equipment[4].do = {mMp:-50,tBuff:[3],tBuffT:[2],cd:6};
equipment[5] = {id:5,name:"撒旦之邪力",price:"￥50",mp:"MP:100",state: 2 ,message:"【主动使用】一回合内将伤害转化为生命值",CD:10}
equipment[5].do = {mMp:-100,mBuff:[82],mBuffT:[2],cd:10};
equipment[6] = {id:6,name:"刃甲",price:"￥30",mp:"MP:50",state: 2 ,message:"护甲+10【开启状态】一回合内反弹任何伤害",CD:6}
equipment[6].do = {mMp:-50,mBuff:[83],mBuffT:[2],cd:6};
equipment[7] = {id:7,name:"邪恶镰刀",price:"￥45",mp:"MP:100",state: 1 ,message:"增加100点魔法上限,魔法恢复加10 【主动使用】将敌方变羊一回合",CD:10}
equipment[7].do = {mMp:-100,tBuff:[87],tBuffT:[2],cd:10};
// equipment[8] = {id:8,name:"散失之刃",price:"￥35",mp:"MP:100",state: 2 ,message:"普通攻击减少对方50点魔法值 【主动使用】净化敌方的所有buff",CD:8}
// equipment[8].do = {special:true}
equipment[9] = {id:9,name:"勇气勋章",price:"￥20",mp:"MP:50",state: 1 ,message:"护甲+10 【主动使用】敌方护甲-10,己方护甲-10,持续一回合",CD:4}
equipment[9].do = {mMp:-50,mBuff:[84],mBuffT:[2],tBuff:[84],tBuffT:[2],cd:4};
equipment[10] = {id:10,name:"BKB",price:"￥50",mp:"MP:100",state: 2 ,message:"攻击力+15 【主动使用】魔法免疫一回合",CD:8}
equipment[10].do = {mMp:-100,mBuff:[60],mBuffT:[2],cd:8};
equipment[11] = {id:11,name:"灵魂之戒",price:"￥20",state: 2 ,message:"生命恢复+10 【主动使用】生命值减少150,魔法值增加150",CD:4}
equipment[11].do = {mMp:150,mHp:-150,cd:4};
equipment[12] = {id:12,name:"梅肯斯姆",price:"￥40",mp:"MP:100",state: 2 ,message:"生命恢复+10 【主动使用】HP+100",CD:8}
equipment[12].do = {mMp:-100,mHp:100,cd:8};
equipment[13] = {id:13,name:"Eull的神圣法杖",price:"￥30",mp:"MP:100",state: 1 ,message:"魔法回复+10 【主动使用】使对方无敌,但不可操作,持续一回合",CD:8}
equipment[13].do = {mMp:-100,tBuff:[88],tBuffT:[2],cd:8};
equipment[14] = {id:14,name:"紫怨",price:"￥30",mp:"MP:100",state: 1 ,message:"魔法上限+100,魔法恢复+10,攻击+20 【主动使用】沉默敌方一回合",CD:8}
equipment[14].do = {mMp:-100,tBuff:[1],tBuffT:[2],cd:8};
// equipment[15] = {id:15,name:"食尸鬼王的臂章",price:"￥35",state: 2 ,message:"攻击+10 【开启状态】HP+300,攻击+30,每回合结束HP-100 【关闭】HP-300,不会致死,攻击-30"}
// equipment[15].do = {special:true};
// equipment[16] = {id:16,name:"林肯法球",price:"￥45",state: 2 ,message:"魔法上限+100,魔法回复+10 每3回合可以抵挡一次指向性法术(对装备的法术无效)"}
// equipment[17] = {id:17,name:"辉耀",price:"￥60",state: 2 ,message:"攻击+45,敌方每回合HP-40"}
equipment[18] = {id:18,name:"狂战斧",price:"￥35",state: 2 ,message:"攻击+(25+敌方手牌数*5)"}
equipment[19] = {id:19,name:"蝴蝶",price:"￥35",state: 2 ,message:"攻击+30 敌方的普通攻击有30%的概率丢失"}
equipment[20] = {id:20,name:"圣剑",price:"￥80",state: 2 ,message:"攻击+150"}
// equipment[21] = {id:21,name:"黯灭",price:"￥35",state: 1 ,message:"攻击时降低敌方40点护甲"}

module.exports = equipment