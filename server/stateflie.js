﻿let state_list = [
	{id:0,name:"晕眩",message:"使该单位无法攻击,出牌,使用装备"},
	{id:1,name:"沉默",message:"使该单位无法出牌"},
	{id:2,name:"虚无",message:"使该单位无法攻击,所受魔法伤害增加50%"},
	{id:3,name:"缴械",message:"使该单位无法攻击"},
	{id:4,name:"死亡契约",message:"该单位的攻击力暴涨了 (90)"},
	{id:5,name:"巨浪",message:"减少10点护甲"},
	{id:6,name:"锚击",message:"减少50%攻击力"},
	{id:7,name:"船游",message:"受到伤害减半"},
	{id:8,name:"无光之盾",message:"最大吸收250点伤害并在破裂时对敌方造成100点伤害(持续3回合)"},
	{id:9,name:"回光返照",message:"将受到的伤害转化为自己的生命值"},
	{id:10,name:"超级新星",message:"承受6次攻击则死亡,否则重生"},
	{id:11,name:"战士怒吼",message:"增加40点护甲"},
	{id:12,name:"海象挥击",message:"攻击力变为现在攻击力的4倍"},
	{id:13,name:"强化图腾",message:"攻击力变为现在攻击力的2倍"},
	{id:14,name:"决斗",message:"强制攻击,无法使用装备，技能"},
	{id:15,name:"变身",message:"攻击加100"},
	{id:16,name:"嚎叫",message:"攻击加60"},
	{id:17,name:"化学狂暴",message:"攻击加40并且每回合回复100点生命值"},
	{id:18,name:"战吼",message:"增加30点护甲"},
	{id:19,name:"神之力量",message:"攻击翻倍"},
	{id:20,name:"真龙形态",message:"攻击力增加装备数目乘以15"},
	{id:21,name:"授予力量",message:"攻击加80"},
	{id:22,name:"末日",message:"每回合造成100点伤害,不能使用技能和物品"},
	{id:23,name:"回音重踏",message:"晕眩状态,受到任何伤害都会解除"},
	{id:24,name:"磁场",message:"物理免疫"},
	{id:25,name:"守护天使",message:"物理免疫"},
	{id:26,name:"血肉傀儡",message:"对方每少一张牌加80点生命"},
	{id:27,name:"狂暴",message:"魔法免疫"},
	{id:28,name:"疯狂生长",message:"无法攻击"},
	{id:29,name:"活体护甲",message:"受到物理伤害减少20每回合加40点血"},
	{id:30,name:"醉酒云雾",message:"普通攻击有75%的概率打不中"},
	{id:31,name:"伤害加深",message:"护甲减少100点"},
	{id:32,name:"战士怒吼2",message:"强迫攻击,无法使用技能物品"},
	{id:33,name:"火焰壁垒",message:"抵挡150点魔法伤害,对方每回合减少30点生命值"},
	{id:34,name:"剑刃风暴",message:"使自己魔免,不可以攻击和出牌"},
	{id:35,name:"战斗专注",message:"普通攻击时可以多攻击敌方一次"},
	{id:36,name:"海妖之歌",message:"处于无敌状态"},
	{id:37,name:"石化凝视",message:"晕眩且魔免,但受到的物理伤害加倍"},
	{id:38,name:"折光",message:"抵挡伤害"},
	{id:39,name:"割裂",message:"自己每减少一张牌会减少200点生命值"},
	{id:40,name:"烟幕",message:"攻击有75%的概率miss,并不可以使用技能"},
	{id:41,name:"魔王降临",message:"减少20点护甲"},
	{id:42,name:"麻痹撕咬",message:"该单位50%概率攻击miss"},
	{id:43,name:"极度饥渴",message:"该单位攻击+80,且将对敌方造成伤害转化为己方生命值"},
	{id:44,name:"灵魂猎手",message:"该单位承受伤害加深25%"},
	{id:45,name:"编织",message:"该单位护甲+50"},
	{id:46,name:"薄葬",message:"该单位不会死亡"},
	{id:47,name:"激光",message:"该单位物理攻击100%miss"},
	{id:48,name:"超负荷",message:"空"},
	{id:49,name:"法力流失",message:"该单位攻击所需能量值+1"},
	{id:50,name:"虚妄之诺",message:"该单位不能攻击"},
	{id:51,name:"命运赦令",message:"该单位不能攻击切所受物理伤害加倍"},
	{id:52,name:"恶魔赦令",message:"该单位每回合对敌方造成80点伤害"},
	{id:53,name:"致命链接",message:"该单位承受1.5倍技能伤害"},
	{id:54,name:"虚弱",message:"该单位攻击力-30"},
	{id:55,name:"噩梦",message:"该单位沉睡中,不能出牌,攻击和使用装备"},
	{id:56,name:"诅咒",message:"该单位能量值-1"},
	{id:57,name:"旋风飞斧",message:"该单位攻击有30%的概率miss"},
	{id:58,name:"血之狂暴",message:"该单位无法使用技能"},
	{id:59,name:"超级力量",message:"普通攻击成功后额外对敌方造成该单位双倍攻击的伤害"},
	{id:60,name:"魔免",message:"魔法免疫"},
	{id:61,name:"撕裂伤口",message:"将该单位受到的普通攻击伤害转化为生命值"},
	{id:62,name:"衰退光环",message:"该单位攻击力减半"},
	{id:63,name:"自然秩序",message:"该单位护甲归0"},
	{id:64,name:"编织",message:"该单位护甲-50"},
	{id:65,name:"高射火炮",message:"该单位攻击+70"},
	{id:66,name:"嗜血术",message:"该单位攻击+30"},
	{id:67,name:"灼热之箭",message:"该单位攻击+50"},
	{id:68,name:"极寒之拥",message:"该单位护甲+100,且不可攻击,出牌和实用装备"},
	{id:69,name:"毒性攻击",message:"该单位攻击+40"},
	{id:70,name:"狂战士之怒",message:"该单位血量<50%时,攻击次数+1且不消耗能量格"},
	{id:71,name:"扫射",message:"该单位攻击+40"},
	{id:72,name:"沸血之矛",message:"该单位攻击+100"},
	{id:73,name:"酸性喷雾",message:"该单位护甲-10"},
	{id:74,name:"严寒灼烧",message:"增加敌方当前生命值2%的攻击力"},
	{id:75,name:"火力聚焦",message:"该单位攻击-50,攻击次数+2"},
	{id:76,name:"智慧之刃",message:"增加该单位20倍能量值的攻击力"},
	{id:77,name:"霜冻护甲",message:"该单位护甲+20"},
	{id:78,name:"秘法天球",message:"增加该单位25倍能量值的攻击力"},
	{id:79,name:"暗影之舞",message:"令该单位处于无法受到攻击状态"},
	{id:80,name:"激怒",message:"增加该单位当前生命5%的攻击力"},
	{id:81,name:"暗杀",message:""}, 
	{id:82,name:"撒旦",message:"将造成的物理伤害转化为生命值"},
	{id:83,name:"刃甲",message:"反弹任何伤害,对魔免状态无效"},
	{id:84,name:"勇气徽章",message:"敌方护甲-10,己方护甲-10"},
	{id:85,name:"林肯",message:"抵挡一次指向性法术(对装备的法术无效)"},
	{id:86,name:"鬼手",message:"回合结束时HP-100"},
	{id:87,name:"妖术",message:"使该单位无法攻击,出牌,使用装备"},
	{id:88,name:"风杖",message:"使该单位无法攻击,出牌,使用装备,并且无敌"},
	{id:89,name:"黑暗契约",message:"状态结束后清除所有状态,并造成伤害"},
	{id:90,name:"竭心光环",message:"每回合减少敌方0.1%生命值"},
	{id:91,name:"施虐之心",message:"每对敌方造成200点伤害回复1点能量格和100点生命"},
	{id:92,name:"不可侵犯",message:"使对方普通攻击时消耗双倍能量格"},
	{id:93,name:"魔王降临",message:"减少敌方20点护甲"},
	{id:94,name:"屠戮",message:"敌方每减少一张手牌自己回复30点生命"},
	{id:95,name:"静电场",message:"每次释放任何技能都会对敌方造成40点伤害"},
	{id:96,name:"霜之哀伤",message:"攻击成功后会弃置敌方一张手牌"},
	{id:97,name:"巨力重击",message:"攻击时有30%的概率晕眩敌方一回合并附加40点攻击"},
	{id:98,name:"月刃",message:"攻击力加敌方手牌数乘10的数值"},
	{id:99,name:"巨力挥舞",message:"普通攻击时增加加敌方手牌数乘10的攻击力"},
	{id:100,name:"反击",message:"在自己受到伤害时对敌方造成自身承受伤害的20%"},
	{id:101,name:"海妖外壳",message:"受到普通攻击时可以减少50点伤害"},
	{id:102,name:"潮汐使者",message:"使自己本回合增加20+对方手牌数*10点攻击力"},
	{id:103,name:"活性护甲",message:"每受到一次攻击增加10点护甲"},
	{id:104,name:"回光返照",message:"受到的伤害都会增加自己的生命值"},
	{id:105,name:"反击螺旋",message:"敌方普通攻击自己时会受到50点伤害(持续3回合)"},
	{id:106,name:"战意",message:"每释放一次技能可以增加20点攻击力"},
	{id:107,name:"余震",message:"半合内自己使用任何技能都会使敌方眩晕半回合"},
	{id:108,name:"致命一击",message:"攻击时有40%的概率双倍攻击(持续3回合)"},
	{id:109,name:"勇气之霎",message:"受到普通攻击时有40%的概率增加自己100点血"},
	{id:110,name:"重生",message:"死亡后可以重生，重生后拥有400点生命值"},
	{id:111,name:"吸血光环",message:"普通攻击时将对方受到伤害的30%转化成自己的生命值(持续3回合)"},
	{id:112,name:"致死打击",message:"攻击时有60%的概率1.5倍攻击"},
	{id:113,name:"野性驱使",message:"攻击加30"},
	{id:114,name:"地精贪婪",message:"每回合得到金钱数+10"},
	{id:115,name:"龙族血统",message:"每回合回复40点生命值"},
	{id:116,name:"自然秩序",message:"令对方护甲归0"},
	{id:117,name:"崎岖外表",message:"敌方在普通攻击你时有30%的概率晕眩一回合"},
	{id:118,name:"衰退光环",message:"减少对方50%攻击力"},
	{id:119,name:"狂战士之血",message:"血量低于50%时每次普通攻击可以多攻击一次"},
	{id:120,name:"盛宴",message:"普通攻击时将对方现有生命值的2%转化为自身生命"},
	{id:121,name:"活体护甲",message:"免疫三次敌方的普通攻击"},
	{id:122,name:"腐肉堆积",message:"敌方每少一张手牌自己加40点血，并且加40点血量上限"},
	{id:123,name:"醉拳",message:"受到普通攻击时有40%的概率mis"},
	{id:124,name:"重击",message:"攻击时有40%的概率击晕敌方半回合并附加70点伤害"},
	{id:125,name:"法力损毁",message:"普通攻击成功后可以削减敌方一点能量值"},
	{id:126,name:"地之突袭",message:"攻击力加30"},
	{id:127,name:"带刺外壳",message:"每回合可以抵挡一次指向性法术"},
	{id:128,name:"命令光环",message:"增加25%的攻击力"},
	{id:129,name:"强击光环",message:"增加25%的攻击力"},
	{id:130,name:"射手天赋",message:"增加150点攻击力"},
	{id:131,name:"模糊",message:"敌方在普通攻击你时有70%的概率mis"},
	{id:132,name:"恩赐解脱",message:"攻击时有30%的概率4倍暴击"},
	{id:133,name:"爆头",message:"攻击时有40%的概率附加100点伤害"},
	{id:134,name:"剑舞",message:"攻击时有60%的概率1.5倍暴击"},
	{id:135,name:"热血战魂",message:"加30点攻击"},
	{id:136,name:"毒刺",message:"攻击时对敌方额外造成20点伤害"},
	{id:137,name:"幽冥剧毒",message:"敌方血量低于50%时,攻击附加50点伤害"},
	{id:138,name:"腐蚀外表",message:"受到敌方的任何攻击之后敌方会掉40点血"},
	{id:139,name:"等离子场",message:"敌方每次对你使用指向性技能时会减少100点生命值"},
	{id:140,name:"忍术",message:"攻击时有40%的概率双倍暴击"},
	{id:141,name:"分裂箭",message:"攻击力增加敌方手牌数乘以15的数值"},
	{id:142,name:"魔法护盾",message:"受到伤害时一点能量值可以抵挡100点伤害"},
	{id:143,name:"能量转换",message:"每次攻击永久减少敌方1点攻击力,并增加该单位2点攻击"},
	{id:144,name:"怒意狂击",message:"每次普通攻击成功后攻击力会增加20"},
	{id:145,name:"回到过去",message:"受到任何攻击时有25%的概率免疫"},
	{id:146,name:"时间锁定",message:"普通攻击时有25%的概率使敌方晕眩一回合"},
	{id:147,name:"嗜血渴望",message:"敌方血量低于50%时，该单位增加50点攻击"},
	{id:148,name:"支配死灵",message:"敌方每减少一张牌,该单位可以永久增加2点攻击"},
	{id:149,name:"荒芜",message:"增加30点攻击"},
	{id:150,name:"折射",message:"反弹自己受到一切伤害的25%"},
	{id:151,name:"麻痹撕咬",message:"普通攻击成功后可以使敌方1回合内有50%的概率攻击mis"},
	{id:152,name:"月之祝福",message:"攻击力加60"},
	{id:153,name:"辉煌光环",message:"每回合可以额外回复1点能量值"},
	{id:154,name:"超负荷",message:"每放1次技能就可以增加自己40点攻击,不可叠加,维持一次攻击"},
	{id:155,name:"精气光环",message:"释放技能时有50%的概率加100点能量值"},
	{id:156,name:"连击",message:"每次攻击降低敌方10点护甲"},
	{id:157,name:"多重施法",message:"释放技能时有50%的概率2倍暴击"},
	{id:158,name:"嗜血术",message:"增加自己30点攻击力"},
]
module.exports =state_list;