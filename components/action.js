export function prepareOk (mystate,obj){//准备开始
    mystate.round-=obj.round
    mystate.thatstate=obj.state
    return mystate;
}
function getRandomInt(min, max) {  
    return Math.floor(Math.random() * (max - min + 1) + min)  
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
        state.mystate.cardid = obj.small_cardheap.slice(8,16);
        state.thatstate = obj.mystate;
        state.small_speed = 16
    }
    state.small_cardheap = obj.small_cardheap;
    state.big_cardheap = obj.big_cardheap;
    return state;
}

export function doskill (mystate,thatstate,cardid){//使用技能    
    switch (cardid)
    {
         // case 0:
         //     //毁灭 0 对敌方造成100点伤害并晕眩敌方手牌数除以2的回合
         //     thatstate.Hp -= 100;
         //     thatstate.statusTime.push(t)hatstate.cardid.length;
         //     thatstate.status.push(0);
             
         //     break;
         // case 1:
         //     //幽灵船 0 对敌方造成130点伤害晕眩一回合,三回合内自己受到伤害减半
         //     thatstate.Hp -= 130;
         //     thatstate.statusTime.push(2);
         //     thatstate.status.push(0);
             
         //     mystate.status.push();
         //    mystate.statusTime.push(6)
             
         //     break;
         // case 2:
         //     //雷神之怒 1 对敌方造成自己手牌乘以60的伤害
         //     thatstate.Hp -= (form4.mycardnumber + 1) * 60;
         //     break;
         // case 3:
         //     //飞锯 0 使敌方受到敌方最大生命值的10%的伤害
         //     thatstate.Hp -= form4.you.Maxhp / 10;
         //     break;
         // case 4:
         //     //回光返照 2 发动后4回合内受到的伤害都会增加自己的生命值
         //     mystate.status.push();
         //    mystate.statusTime.push(6)
             
         //     break;
         // case 5:
         //     //超级新星 3回合内敌方攻击自己6次就死，不然血量变为最大值的一半
         //     mystate.status.push();
         //    mystate.statusTime.push(6)
             
         //     break;
         // case 6:
         //     //淘汰之刃 1 当敌方生命值少于500时直接秒杀,否则造成200点伤害
         //     if (form4.you.Hp <= 500)
         //     {
         //         thatstate.Hp -= 10000;
         //     }
         //     else
         //     {
         //         thatstate.Hp -= 200;
         //     }
         //     break;
         // case 7:
         //     //战意 2 每释放一次技能可以增加20点攻击力
         //     mystate.status.push(6;
         //     mystate.status.push();
         //    mystate.statusTime.push(6)
             
         //     break;
         // case 8:
         //     //海象挥击 2 使自己攻击力变为现在攻击力的4倍，攻击后恢复正常
         //     mystate.status.push();
         //    mystate.statusTime.push(6)
             
         //     break;
         // case 9:
         //     //回音击 0 造成敌方手牌数乘以60的伤害
         //     thatstate.Hp -= thatstate.cardid.length * 60;
         //     break;
         // case 10:
         //     //决斗 在3回合内双方只能互相攻击
         //     thatstate.statusTime.push[14] = 6;
         //     thatstate.status.push(14);
             
         //     mystate.status.push();
         //    mystate.statusTime.push(6)
             
         //     break;
         // case 11:
         //     //重生 死亡后可以重生，重生后拥有400点生命值
         //     mystate.status.push(10;
         //     mystate.status.push();
         //    mystate.statusTime.push(6)
             
         //     break;
         // case 12:
         //     //变身 三回合内攻击加100
         //     mystate.status.push();
         //    mystate.statusTime.push(6)
             
         //     break;
         // case 13:
         //     //化学狂暴 持续三回合,攻击加40并且每回合回复100点生命值
         //     mystate.status.push();
         //    mystate.statusTime.push(6)
             
         //     break;
         // case 14:
         //     //幽冥一击 对敌方造成300加自己攻击力的伤害并晕眩一回合
         //     thatstate.statusTime.push(2);
         //     thatstate.status.push(0);
             
         //     thatstate.Hp -= 300 + mystate.attack;
         //     break;
         // case 15:
         //     //神之力量 三回合内攻击翻倍
         //     mystate.status.push();
         //    mystate.statusTime.push(6)
             
         //     break;
         // case 16:
         //     //真龙形态 三回合内攻击力加上自身装备数目乘以15
         //     mystate.status.push();
         //    mystate.statusTime.push(6)
             
         //     break;
         // case 17:
         //     //两级反转 造成100点伤害并晕眩对手3回合
         //     thatstate.statusTime.push(6);
         //     thatstate.status.push(0);
             
         //     thatstate.Hp -= 100;
         //     break;
         // case 18:
         //     //末日 对敌方造成300点伤害，敌方三回合内不能使用技能和物品
         //     thatstate.statusTime.push[22] = 6;
         //     thatstate.status.push(22);
             
         //     break;
         // case 19:
         //     //裂地者 对敌方造成自己现有生命值的30%的伤害，无视法免疫
         //     thatstate.Hp -= form4.you.Hp * 3 / 10;
         //     break;
         // case 20:
         //     //守护天使 2回合内使自己物理免疫，并回复300点生命值
         //     mystate.Hp += 300;
         //     mystate.status.push();
         //    mystate.statusTime.push(6)
             
         //     break;
         // case 21:
         //     //地震 对敌方造成300+敌方手牌数乘50的伤害
         //     thatstate.Hp -= 300 + thatstate.cardid.length * 50;
         //     break;
         // case 22:
         //     //牺牲 自己和对方同时掉50%的血
         //     thatstate.Hp -= form4.you.Hp / 2;
         //     mystate.Hp /= 2;
         //     break;
         // case 23:
         //     //血肉傀儡 回复200点生命,三回合内对方每少一张牌自己就加80点生命
         //     mystate.Hp += 200;
         //     mystate.status.push();
         //    mystate.statusTime.push(6)
             
         //     break;
         // case 24:
         //     //原始咆哮 造成200点伤害并晕眩敌方2回合无视魔法免疫
         //     thatstate.Hp -= 200;
         //     thatstate.statusTime.push(4);
         //     thatstate.status.push(0);
             
         //     break;
         // case 25:
         //     //疯狂生长 对敌方造成200点伤害并使敌方3回合内无法普通攻击,无视魔免
         //     thatstate.Hp -= 200;
         //     thatstate.statusTime.push[28] = 6;
         //     thatstate.status.push(28);
             
         //     break;
         // case 26:
         //     //肢解 对敌方造成自身现有血量的25%的伤害
         //     thatstate.Hp -= mystate.Hp / 4;
         //     break;
         // case 27:
         //     //伤害加深 三回合内使敌方的护甲减少100点
         //     thatstate.statusTime.push[31] = 6;
         //     thatstate.status.push(31);
             
         //     break;
         // case 28:
         //     //变形术 永久增加自己600点血量上限，并回复450点生命值
         //     form4.me.Maxhp += 600;
         //     mystate.Hp += 450;
         //     form4.maxhp += 600;
         //     break;
         // case 29:
         //     //射手天赋 2 增加150点攻击力
         //     mystate.status.push(30;
         //     mystate.status.push();
         //    mystate.statusTime.push(6)
             
         //     break;
         // case 30:
         //     //恩赐解脱 2 攻击时有30%的概率4倍暴击
         //     mystate.status.push(32;
         //     mystate.status.push();
         //    mystate.statusTime.push(6)
             
         //     break;
         // case 31:
         //     //暗杀 0 下一回合自己不可以出牌,如果没有被打断,敌方受到1000点伤害
         //     form4.statecontinue[23]=1;
         //     mystate.status.push();
         //    mystate.statusTime.push(6)
             
         //     break;
         // case 32:
         //     //无敌斩 0 快速普通攻击敌方6次，不消耗能量值
         //     for (let j=0 ;j<6 ;j++ )
         //     {
         //         form4.gongji();
         //         Thread.Sleep(100);
         //     }
         //     break;
         // case 33:
         //     //战斗专注 2 每次普通攻击时可以多攻击敌方一次,只维持一回合
         //     mystate.status.push();
         //    mystate.statusTime.push(6)
             
         //     break;
         // case 34:
         //     //剧毒新星 0 对敌方造成300点伤害
         //     thatstate.Hp -= 300;
         //     break;
         // case 35:
         //     //死亡契约 2 本回合内每弃掉自己的1张手牌可以提高自己的攻击力100点
         //     mystate.status.push();
         //    mystate.statusTime.push(6)
             
         //     break;
         // case 36:
         //     //灵魂隔断 1 自己和敌方互换血量
         //     let n = mystate.Hp;
         //     mystate.Hp = form4.you.Hp;
         //     thatstate.Hp -= form4.you.Hp - n;
         //     break;
         // case 37:
         //     //时光倒流 2 可以瞬间使自己的能量值变为4点，手牌数增加到4张
         //     break;
         // case 38:
         //     //蝮蛇突袭 1 对敌方造成300点伤害
         //     thatstate.Hp -= 300;
         //     break;
         // case 39:
         //     //海妖之歌 0 晕眩敌方3回合,敌方在3回合内处于无敌状态
         //     thatstate.statusTime.push[36] = 6;
         //     thatstate.status.push(36);
             
         //     break;
         // case 40:
         //     //风暴之眼 0 3回合内每回合对敌方造成你手牌数乘以30的伤害
         //     mystate.status.push();
         //    mystate.statusTime.push(6)
             
         //     break;
         // case 41:
         //     //石化凝视 0 晕眩敌方一回合,并使敌方魔免,但受到的物理伤害加倍
         //     thatstate.statusTime.push[37] = 1;
         //     thatstate.status.push(37);
             
         //     break;
         // case 42:
         //     //暗影之舞 2 回复200点生命并使敌方在2回合内无法攻击自己
         //     mystate.Hp += 200;
         //     mystate.status.push();
         //    mystate.statusTime.push(6)
             
         //     break;
         // case 43:
         //     //激怒 2 本回合内增加自己当前生命5%的攻击力
         //     mystate.status.push();
         //    mystate.statusTime.push(6)
             
         //     break;
         // case 44:
         //     //时间结界 0 晕眩敌方2回合
         //     thatstate.statusTime.push(4);
         //     thatstate.status.push(0);
             
         //     break;
         // case 45:
         //     //割裂 1 三回合敌方减少一张牌会减少200点生命值
         //     thatstate.statusTime.push[39] = 6;
         //     thatstate.status.push(39);
             
         //     break;
         // case 46:
         //     //极度饥渴 2 3回合增加80点攻击,将敌方受到普攻伤害的100%变为自己生命
         //     mystate.status.push();
         //    mystate.statusTime.push(6)
             
         //     break;
         // case 47:
         //     //月蚀 0 对敌方造成350点伤害
         //     thatstate.Hp -= 350;
         //     break;
         // case 48:
         //     thatstate.Hp -= 200 + thatstate.cardid.length * 30;
         //     //召唤飞弹 0 造成200加上,敌方手牌数乘30的伤害
         //     break;
         // case 49:
         //     //编织 0 三回合增加自己50点护甲,减少敌方50点护甲
         //     thatstate.statusTime.push[45] = 6;
         //     thatstate.status.push(45);
             
         //     break;
         // case 50:
         //     //燃烧枷锁 1 晕眩敌方3回合
         //     thatstate.statusTime.push(6);
         //     thatstate.status.push(0);
             
         //     break;
         // case 51:
         //     //极寒领域 0 对敌方造成350点伤害
         //     thatstate.Hp -= 350;
         //     break;
         // case 52:
         //     //全域静默 1 使敌方3回合内无法使用技能
         //     thatstate.statusTime.push[1] = 6;
         //     thatstate.status.push(1);
             
         //     break;
         // case 53:
         //     //技能窃取 2 可以抽取敌方的两张手牌
         //     break;
         // case 54:
         //     //死亡一指 1 造成600点伤害
         //     thatstate.Hp -= 600;
         //     break;
         // case 55:
         //     //火力聚焦 2 3回合减少自身50点攻击,每次攻击后可以再攻击两次
         //     mystate.status.push();
         //    mystate.statusTime.push(6)
             
         //     break;
         // case 56:
         //     //寒冬诅咒 1 弃置敌方所有手牌
         //     break;
         // case 57:
         //     //神智之蚀 0 造成自己能量值减敌方能量值的数值乘以220的伤害
         //     if (form4.me.Force > form4.you.Force)
         //     {
         //         thatstate.Hp -= (form4.me.Force - form4.you.Force) * 220;
         //     }
         //     else
         //         thatstate.Hp -= 0;
         //     break;
         // case 58:
         //     //神灭斩 1 造成650点伤害
         //     thatstate.Hp -= 650;
         //     break;
         // case 59:
         //     //冰晶爆轰 0 对方血量低于15%时直接秒杀
         //     if ((form4.you.Hp / form4.you.Maxhp) < 0.15)
         //     {
         //         thatstate.Hp -= form4.you.Hp;
         //     }
         //     break;
         // case 60:
         //     //多重施法 2 释放技能时有50%的概率2倍暴击
         //     mystate.status.push(57;
         //     mystate.status.push();
         //    mystate.statusTime.push(6)
             
         //     break;
         // case 61:
         //     //黑洞 0 对敌方造成250点伤害并晕眩2回合无视魔免
         //     thatstate.Hp -= 250;
         //     thatstate.statusTime.push(4);
         //     thatstate.status.push(0);
             
         //     break;
         // case 62:
         //     //虚妄之诺 2 回复300点生命值并使对方三回合内无法攻击你
         //     mystate.Hp += 300;
         //     mystate.status.push();
         //    mystate.statusTime.push(6)
             
         //     break;
         // case 63:
         //     //上帝之手 2 回复己方500点生命值
         //     mystate.Hp += 500;
         //     break;
         // case 64:
         //     //脉冲新星 0 对敌方造成450点伤害
         //     thatstate.Hp -= 450;
         //     break;
         // case 65:
         //     thatstate.Hp -= 450;
         //     //万火焚身 0 对敌方造成450点伤害
         //     break;
         // case 66:
         //     //死神镰刀 1 对敌方造成20%损失生命值的伤害，并使对方晕眩一回合
         //     thatstate.Hp -= (form4.you.Maxhp - form4.you.Hp) / 5;
         //     thatstate.statusTime.push(2);
         //     thatstate.status.push(0);
             
         //     break;
         // case 67:
         //     //驱使恶灵 1 对敌方造成400点伤害，并使己方回复100点生命值
         //     thatstate.Hp -= 400;
         //     mystate.Hp += 100;
         //     break;
         // case 68:
         //     //神秘之耀 0 对敌方造成450点伤害
         //     thatstate.Hp -= 450;
         //     break;
         // case 69:
         //     //超声冲击波 0 对敌方造成400点伤害
         //     thatstate.Hp -= 400;
         //     break;
         // case 70:
         //     //恶魔的掌握 1 对敌方造成400点伤害，无视魔法免疫
         //     thatstate.Hp -= 400;
         //     break;
         // case 71:
         //     //连环霜冻 0 对敌方造成100*敌方手牌数的伤害
         //     thatstate.Hp -= 100 * thatstate.cardid.length;
         //     break;
         // case 72:
         //     //梦境缠绕 0 对敌方造成200点伤害并使敌方晕眩一回合
         //     thatstate.Hp -= 200;
         //     thatstate.statusTime.push(2);
         //     thatstate.status.push(0);
             
         //     break;
         // case 73:
         //     //自然之怒 0 对敌方造成300点伤害
         //     thatstate.Hp -= 300;
         //     break;
         // case 74:
         //     //生命汲取 0 对敌方造成300点伤害，同时回复300点生命值
         //     thatstate.Hp -= 300;
         //     mystate.Hp += 300;
         //     break;
         // case 75:
         //     //静态风暴 0 对敌方造成200点伤害并使敌方沉默一回合
         //     thatstate.Hp -= 200;
         //     thatstate.statusTime.push[1] = 2;
         //     thatstate.status.push(1);
             
         //     break;
         // case 76:
         //     //法力虚空 1 造成敌方己消耗能量值乘以200的伤害
         //     thatstate.Hp -= (form4.you.Forcemax - form4.you.Force) * 200;
         //     break;
        case 1000:
            //雷霆之击 1 对敌方造成300点伤害
            thatstate.Hp -= 300;
            mystate.Mp -=100;
        case 1001:
            //马蹄践踏 0 对敌方造成(50+敌方手牌数*10)并晕眩1回合
            thatstate.Hp -= (50+thatstate.cardid.length*10);
            mystate.Mp -=50;
            thatstate.status.push(0);
            thatstate.statusTime.push(2);
            break;
        case 1002:
            //双刃剑 1 使自己和敌方同时受到150点伤害
            mystate.Hp -= 150;
            thatstate.Hp -= 150;
            break;
        case 1003:
            //反击 2 在自己受到伤害时对敌方造成自身承受伤害的20%,持续3回合
            mystate.status.push(101);
            mystate.statusTime.push(6);
            break;
        case 1004:
            //巨浪 0 减少敌方十点护甲(持续3回合)并对对方造成100点伤害
            thatstate.status.push(5);
            thatstate.statusTime.push(6);
            break;
        case 1005:
            //海妖外壳 2 受到普通攻击时可以减少50点伤害
            mystate.status.push(102);
            mystate.statusTime.push(6);
            break;
        case 1006:
            //锚击 1 造成(50+敌方手牌数*10)的伤害,并减少敌方50%攻击力(持续3回合)
            thatstate.Hp -= (50+thatstate.cardid.length*10);
            mystate.Mp -=30;
            thatstate.status.push(6);
            thatstate.statusTime.push(6);
            break;
        case 1007:
            //洪流 0 对敌方造成100点伤害并晕眩半回合
            thatstate.Hp-=100;
            mystate.Mp-=80;
            thatstate.status.push(0);
            thatstate.statusTime.push(1);
            break;
        case 1008:
            //潮汐使者 2 使自己本回合增加20+对方手牌数*10点攻击力
            mystate.status.push(103);
            mystate.statusTime.push(2);
            break;
        case 1009:
            //死亡旋风 0 对敌方造成200点伤害(可闪避)
            thatstate.Hp-=200;
            mystate.Mp-=60;
            break;
        case 1010:
            //伐木链锯 0 对敌方造成100点伤害(可闪避)
            thatstate.Hp-=100;
            mystate.Mp-=30;
            break;
        case 1011:
            //活性护甲 2 每受到一次攻击增加10点护甲(持续3回合)
            mystate.status.push(104);
            mystate.statusTime.push(6);
            break;
        case 1012:
            //死亡缠绕 1 消耗自己100点生命,对敌方造成250点伤害
            thatstate.Hp-=250;
            mystate.Hp-=100;
            mystate.Mp-=30;
            break;
        case 1013:
            //无光之盾 2 最大吸收250点伤害并在破裂时对敌方造成100点伤害(持续3回合)
            mystate.Mp-=100;
            mystate.status.push(8);
            mystate.statusTime.push(6);
            break;
        case 1014:
            //霜之哀伤 2 本回合内攻击对手后可以去除对手一张手牌
            mystate.status.push(166);
            mystate.statusTime.push(2);
            break;
        case 1015:
            //烈火精灵 1 对敌方造成100点伤害并且减少敌方100能量值
            thatstate.Hp-=100;
            thatstate.Mp-=100;
            mystate.Mp-=100;
            break;
        case 1016:
            //烈日炎烤 0 对自己造成50点伤害并造成敌方现有生命值5%的伤害
            thatstate.Hp-= parseInt(thatstate.Hp/20);
            mystate.Hp-=50;
            mystate.Mp-=100;
            break;
        case 1017:
            //战士怒吼 0 增加自己40点护甲,使敌方下一回合只可以攻击自己
            mystate.Mp-=100;
            mystate.status.push(11);
            mystate.statusTime.push(2);
            thatstate.status.push(32);
            thatstate.statusTime.push(2);
            break;
        case 1018:
            //反击螺旋 2 敌方普通攻击自己时会受到50点伤害(持续3回合)
            mystate.status.push(106);
            mystate.statusTime.push(6);
            break;
        case 1019:
            //寒冰碎片 0 对敌方造成100点伤害
            thatstate.Hp-=100;
            mystate.Mp-=50;
            break;
        case 1020:
            //雪球 0 对敌方造成80点伤害并晕眩半回合
            thatstate.Hp-=80;
            mystate.Mp-=80;
            thatstate.status.push(0);
            thatstate.statusTime.push(1);
            break;
        case 1021:
            //沟壑 0 对敌方造成(90+敌方手牌数*10)点伤害并晕眩一回合
            thatstate.Hp -= (90+thatstate.cardid.length*10);
            mystate.Mp-=100;
            thatstate.status.push(0);
            thatstate.statusTime.push(2);
            break;
        case 1022:
            //强化图腾 2 使自己攻击力变为现在攻击力的2倍(持续半回合)
            mystate.status.push(13);
            mystate.statusTime.push(1);
            break;
        case 1023:
            //余震 2 半回合内自己使用任何技能都会使敌方眩晕半回合
            mystate.status.push(108);
            mystate.statusTime.push(1);
            break;
        case 1024:
            //混乱之箭 1 随机对敌方造成1-200的伤害，并晕眩1-2回合
            let r = Math.random();
            let t = parseInt(r*2+1);
            thatstate.Hp -= parseInt(r*200);
            mystate.Mp-=100;
            thatstate.status.push(0);
            thatstate.statusTime.push(t);
            break;
        case 1025:
            //实相裂隙 1 造成物理攻击的伤害
            thatstate.Hp -= mystate.attack;
            mystate.Mp-=30;
            break;
        case 1026:
            //致命一击 2 攻击时有40%的概率双倍攻击(持续3回合)
            mystate.status.push(109);
            mystate.statusTime.push(6);
            break;
        case 1027:
            //幽光之魂 0 对敌方造成130点伤害
            thatstate.Hp -= 130;
            mystate.Mp-=50;
            break;
        case 1028:
            //压倒性优势 0 对敌方造成敌方手牌乘以30的伤害
            thatstate.Hp -= thatstate.cardid.length * 30;
            mystate.Mp-=80;
            break;
        case 1029:
            //勇气之霎 2 受到普通攻击时有40%的概率增加自己100点血
            mystate.status.push(109);
            mystate.statusTime.push(6)
            break;
        case 1030:
            //强攻 2 回复100点生命值并造成物理攻击的伤害
            thatstate.Hp -= mystate.attack;
            mystate.Hp += 100;
            mystate.Mp -= 80;
            break;
        case 1031:
            //冥火暴击 0 对敌方造成150点伤害并晕眩1回合
            thatstate.Hp -= 150;
            thatstate.status.push(0);
            thatstate.statusTime.push(2);
            
            break;
        case 1032:
            //吸血光环 2 普通攻击时将对方受到伤害的30%转化成自己的生命值(持续3回合)
            mystate.status.push(11);
            mystate.statusTime.push(6)
            break;
        case 1033:
            //致死打击 2 攻击时有60%的概率1.5倍攻击(持续3回合)
            mystate.status.push(12);
            mystate.statusTime.push(6)
            
            break;
        case 1034:
            //嚎叫 0 本回合攻击加60
            mystate.Mp -= 50;
            mystate.status.push(16);
            mystate.statusTime.push(2)
            
            break;
        case 1035:
            //野性驱使 2 攻击加30
            mystate.status.push(113);
            mystate.statusTime.push(6)
            break;
        case 1036:
            //酸性喷雾 0 三回合降低敌方10点护甲并造成50点伤害
            thatstate.Hp -= 50;
            mystate.Mp -= 80;
            thatstate.status.push(73);
            thatstate.statusTime.push(6);
            break;
        case 1037:
            //不稳定物 0 50%使对方晕眩两回合50%使自己晕眩一回合
            mystate.Mp -= 50;
            let r = Math.random();
            if (i >= 0.5)
            {
                thatstate.status.push(0);
                thatstate.statusTime.push(4);
                
            }
            else
            {
                mystate.status.push(0);
                mystate.statusTime.push(2)
            }
            break;
        case 1038:
            //地精贪婪 2 每回合得到金钱数+10(持续3回合)
            mystate.status.push(114);
            mystate.statusTime.push(6)
            
            break;
        case 1039:
            //暗影冲刺 0 对敌方造成60点伤害并眩晕半回合
            mystate.Mp -= 50;
            thatstate.Hp -= 60;
            thatstate.status.push(0);
            thatstate.statusTime.push(1);
            
            break;
        case 1040:
            //巨力重击 2 攻击时有30%的概率使敌方晕眩一回合并且额外造成40点伤害
            mystate.statusTime.push(6)
            mystate.status.push(166);
            break;
        case 1041:
            //风暴之锤 0 对敌方造成100点伤害并晕眩一回合
            mystate.Mp -= 100;
            thatstate.Hp -= 100;
            thatstate.status.push(0);
            thatstate.statusTime.push(2);
            break;
        case 1042:
            //巨力挥舞 2 普通攻击时增加加敌方手牌数乘10的攻击力(持续3回合)
            mystate.status.push(168);
            mystate.statusTime.push(6)
            break;
        case 1043:
            //战吼 2 三回合内增加自身30点护甲
            mystate.Mp -= 30;
            mystate.status.push(18);
            mystate.statusTime.push(6)
            
            break;
        case 1044:
            //火焰气息 0 对敌方造成200点伤害
            mystate.Mp -= 90;
            thatstate.Hp -= 200;
            break;
        case 1045:
            //神龙摆尾 1 对敌方造成50点伤害并晕眩一回合
            mystate.Mp -= 80;
            thatstate.Hp -= 50;
            thatstate.status.push(0);
            thatstate.statusTime.push(2);
            break;
        case 1046:
            //龙族血统 2 每回合回复40点生命值(持续3回合)
            mystate.status.push(115);
            mystate.statusTime.push(6)
            break;
        case 1047:
            //震荡波 0 对敌方造成200点伤害(可闪避)
            mystate.Mp -= 90;
            thatstate.Hp -= 200;
            break;
        case 1048:
            //授予力量 2 本回合内攻击加80
            mystate.Mp -= 50;
            mystate.status.push(21);
            mystate.statusTime.push(2)
            break;
        case 1049:
            //獠牙冲刺 0 对敌方造成100点伤害
            mystate.Mp -= 50;
            thatstate.Hp -= 100;
            break;
        case 1050:
            //吞噬 1 将对方的随机一张牌,转化为100金币
            mystate.Mp -= 100;
            alert("未实现")
            break;
        // case 127:
        //     //焦土 2 敌方掉70血，自己回复80血
        //     thatstate.Hp -= 70;
        //     mystate.Hp += 80;
        //     break;
        // case 128:
        //     //回音重踏 0 使对方晕眩两回合，对方受到任何伤害都会解除眩晕状态
        //     thatstate.statusTime.push[23] = 4;
        //     thatstate.status.push(23);
            
        //     break;
        // case 129:
        //     //自然秩序 2 使对方护甲归0
        //     mystate.status.push(16;
        //     mystate.status.push();
        //     mystate.statusTime.push(6)
            
        //     thatstate.status.push(63);
            
        //     break;
        // case 130:
        //     //洗礼 0 回复自己200点生命值
        //     mystate.Hp += 200;
        //     break;
        // case 131:
        //     //驱逐 2 使自己魔免两回合
        //     mystate.status.push();
        //     mystate.statusTime.push(6)
            
        //     break;
        // case 132:
        //     //掘地穿刺 0 对敌方造成65点伤害并晕眩一回合
        //     thatstate.Hp -= 65;
        //     thatstate.statusTime.push(2);
        //     thatstate.status.push(0);
            
        //     break;
        // case 133:
        //     //沙尘暴 0 对敌方造成40点伤害，敌方的下一回合不可以攻击自己
        //     thatstate.Hp -= 40;
        //     thatstate.statusTime.push[3] = 2;
        //     thatstate.status.push(3);
            
        //     break;
        // case 134:
        //     //雷击 1 对敌方造成140点伤害
        //     thatstate.Hp -= 140;
        //     break;
        // case 135:
        //     //投掷 0 对敌方造成80点伤害
        //     thatstate.Hp -= 80;
        //     break;
        // case 136:
        //     //崎岖外表 2 敌方在普通攻击你时有30%的概率使自己晕眩一回合
        //     mystate.status.push(17;
        //     mystate.status.push();
        //     mystate.statusTime.push(6)
            
        //     break;
        // case 137:
        //     //山崩 0 对敌方造成30点伤害并晕眩一回合
        //     thatstate.Hp -= 30;
        //     thatstate.statusTime.push(2);
        //     thatstate.status.push(0);
            
        //     break;
        // case 138:
        //     //火焰风暴 0 对敌方造成90点伤害
        //     thatstate.Hp -= 90;
        //     break;
        // case 139:
        //     //怨念深渊 0 使对方晕眩半回合
        //     thatstate.statusTime.push(1);
        //     thatstate.status.push(0);
            
        //     break;
        // case 140:
        //     //衰退光环 2 减少对方50%攻击力
        //     mystate.status.push(18;
        //     mystate.status.push();
        //     mystate.statusTime.push(6)
            
        //     thatstate.status.push(62);
            
        //     break;
        // case 141:
        //     //活血术 2 增加自己当前攻击力的血量
        //     mystate.Hp += mystate.attack;
        //     break;
        // case 142:
        //     //沸血之矛 2 消耗自身50点生命值使本回合内攻击加100
        //     mystate.Hp -= 50;
        //     mystate.status.push();
        //     mystate.statusTime.push(6)
            
        //     break;
        // case 143:
        //     //狂战士之血 2 血量低于50%时每次普通攻击可以不消耗能量格多攻击一次
        //     mystate.status.push(19;
        //     mystate.status.push();
        //     mystate.statusTime.push(6)
            
        //     break;
        // case 144:
        //     //静电场 2 每次释放任何技能都会对敌方造成40点伤害
        //     mystate.status.push(64;
        //     mystate.status.push();
        //     mystate.statusTime.push(6)
            
        //     break;
        // case 145:
        //     //腐朽 0 可以对敌方造成70点伤害
        //     thatstate.Hp -= 70;
        //     break;
        // case 146:
        //     //噬魂 1 造成己方和敌方手牌数的总和乘以15的伤害
        //     thatstate.Hp -= (form4.mycardnumber + thatstate.cardid.length) * 15;
        //     break;
        // case 147:
        //     //狂暴 3 可以使自己魔免一回合
        //     mystate.status.push();
        //     mystate.statusTime.push(6)
            
        //     break;
        // case 148:
        //     //盛宴 2 普通攻击时将对方现有生命值的2%转化为自身生命
        //     mystate.status.push(20;
        //     mystate.status.push();
        //     mystate.statusTime.push(6)
            
        //     break;
        // case 149:
        //     //撕裂伤口 1 本回合内普通攻击敌方时会将敌方受到伤害转化成自己生命
        //     mystate.status.push();
        //     mystate.statusTime.push(6)
            
        //     break;
        // case 150:
        //     //野性之斧 0 对敌方造成150点伤害
        //     thatstate.Hp -= 150;
        //     break;
        // case 151:
        //     //寄生种子 1 使敌方减少90点生命值自己回复80点生命值并且可以再摸一张牌
        //     thatstate.Hp -= 90;
        //     mystate.Hp += 80;
        //     form4.getcard();
        //     break;
        // case 152:
        //     //活体护甲 2 受到物理伤害减少20点持续2回合每回合加40点血
        //     mystate.status.push();
        //     mystate.statusTime.push(6)
            
        //     break;
        // case 153:
        //     //腐烂 2 自己掉100点血，对方掉180点血
        //     mystate.Hp -= 100;
        //     thatstate.Hp -= 180;
        //     break;
        // case 154:
        //     //腐肉堆积 2 敌方每少一张手牌自己加40点血，并且加40点血量上限
        //     mystate.status.push(22;
        //     mystate.status.push();
        //     mystate.statusTime.push(6)
            
        //     break;
        // case 155:
        //     //雷霆一击 0 对敌方造成80点伤害
        //     thatstate.Hp -= 80;
        //     break;
        // case 156:
        //     //醉酒云雾 1 3回合使敌方的普通攻击有75%的概率打不中
        //     thatstate.statusTime.push[30] = 6;
        //     thatstate.status.push(30);
            
        //     break;
        // case 157:
        //     //醉拳 2 受到普通攻击时有40%的概率mis
        //     mystate.status.push(23;
        //     mystate.status.push();
        //     mystate.statusTime.push(6)
            
        //     break;
        // case 158:
        //     //虚空 1 对敌方造成130点伤害
        //     thatstate.Hp -= 130;
        //     break;
        // case 159:
        //     //伤残恐惧 1 使敌方2回合内不可以使用技能
        //     thatstate.statusTime.push[1] = 4;
        //     thatstate.status.push(1);
            
        //     break;
        // case 160:
        //     //重击 2 攻击时有40%的概率击晕敌方半回合并附加70点伤害
        //     mystate.status.push(24;
        //     mystate.status.push();
        //     mystate.statusTime.push(6)
            
        //     break;
        // case 161:
        //     //鱼人碎击 0 对敌方造成60点伤害并晕眩一回合
        //     thatstate.Hp -= 60;
        //     thatstate.statusTime.push(2);
        //     thatstate.status.push(0);
            
        //     break;
        // case 162:
        //     //群星坠落 0 对敌方造成40加上敌方手牌乘10的伤害
        //     thatstate.Hp -= 40 * form4.you.Cardnum;
        //     break;
        // case 163:
        //     //月神之箭 0 有50%的概率使敌方晕眩二回合
        //     let a = Math.random();
        //     let b = a.Next(0, 2);
        //     if (b == 1)
        //     {
        //         thatstate.statusTime.push(4);
        //         thatstate.status.push(0);
                
        //     }
        //     break;
        // case 164:
        //     //波浪形态 0 对敌方造成70点伤害
        //     thatstate.Hp -= 70;
        //     break;
        // case 165:
        //     //变体攻击 1 对敌方造成50点伤害并晕眩半回合
        //     thatstate.Hp -= 50;
        //     thatstate.statusTime.push(1);
        //     thatstate.status.push(0);
            
        //     break;
        // case 166:
        //     //法力损毁 2 普通攻击成功后可以削减敌方一点能量值
        //     mystate.status.push(25;
        //     mystate.status.push();
        //     mystate.statusTime.push(6)
            
        //     break;
        // case 167:
        //     //自杀攻击 0 对自己和敌方同时造成500点伤害
        //     mystate.Hp -= 500;
        //     thatstate.Hp -= 500;
        //     break;
        // case 168:
        //     //忽悠 3 可以闪避一次敌方的攻击
        //     break;
        // case 169:
        //     //地之突袭 2 攻击力加30
        //     mystate.status.push(26;
        //     mystate.status.push();
        //     mystate.statusTime.push(6)
            
        //     break;
        // case 170:
        //     //穿刺 0 造成70点伤害并晕眩敌方一回合
        //     thatstate.Hp -= 70;
        //     thatstate.statusTime.push(2);
        //     thatstate.status.push(0);
            
        //     break;
        // case 171:
        //     //法力燃烧 1 减少敌方3点能量值
        //     break;
        // case 172:
        //     //带刺外壳 2 每回合可以抵挡一次指身性法术
        //     form4.statecontinue[22] = 1;
        //     mystate.status.push(27;
        //     mystate.status.push();
        //     mystate.statusTime.push(6)
            
        //     break;
        // case 173:
        //     //魔法箭 1 造成80点伤害并晕眩敌方一回合
        //     thatstate.Hp -= 80;
        //     thatstate.statusTime.push(2);
        //     thatstate.status.push(0);
            
        //     break;
        // case 174:
        //     //恐怖波动 0 减少敌方10点护甲并造成20点伤害
        //     form4.you.Armor -= 10;
        //     thatstate.Hp -= 20;
        //     break;
        // case 175:
        //     //命令光环 2 增加25%的攻击力
        //     mystate.status.push(28;
        //     mystate.status.push();
        //     mystate.statusTime.push(6)
            
        //     break;
        // case 176:
        //     //霜冻之箭 1 本次攻击可以削减敌方2点能量值
        //     break;
        // case 177:
        //     //沉默魔法 0 敌方在一回合内不可以使用技能
        //     thatstate.statusTime.push[1] = 2;
        //     thatstate.status.push(1);
            
        //     break;
        // case 178:
        //     //强击光环 2 增加25%的攻击力
        //     mystate.status.push(29;
        //     mystate.status.push();
        //     mystate.statusTime.push(6)
            
        //     break;
        // case 179:
        //     //灵魂之矛 0 对敌方造成90点伤害
        //     thatstate.Hp -= 90;
        //     break;
        // case 180:
        //     //神出鬼没 3 可以闪避一次敌方的攻击
        //     break;
        // case 181:
        //     //磁场 2 使自己在两回合内物理免疫
        //     mystate.status.push();
        //     mystate.statusTime.push(6)
            
        //     break;
        // case 182:
        //     //闪光冤魂 0 对敌方造成100点伤害
        //     thatstate.Hp -= 100;
        //     break;
        // case 183:
        //     //窒息之刃 0 对敌方造成30点伤害,使用过后本技能不消耗能量值
        //     thatstate.Hp -= 30;
        //     form4.me.Force++;
        //     break;
        // case 184:
        //     //闪烁突袭 3 可以闪避掉一次攻击
        //     break;
        // case 185:
        //     //模糊 2 敌方在普通攻击你时有70%的概率mis
        //     mystate.status.push(31;
        //     mystate.status.push();
        //     mystate.statusTime.push(6)
            
        //     break;
        // case 186:
        //     //火焰壁垒 2 可以抵挡150点魔法伤害，对方每回合减少30点生命值
        //     mystate.status.push();
        //     mystate.statusTime.push(6)
            
        //     break;
        // case 187:
        //     //无影拳 0 对敌方造成70点伤害
        //     thatstate.Hp -= 70;
        //     break;
        // case 188:
        //     //榴霰弹 0 对敌方造成60点伤害
        //     thatstate.Hp -= 60;
        //     break;
        // case 189:
        //     //爆头 2 攻击时有40%的概率附加100点伤害
        //     mystate.status.push(33;
        //     mystate.status.push();
        //     mystate.statusTime.push(6)
            
        //     break;
        // case 190:
        //     //剑刃风暴 0 一回合内使自己魔免,并对敌方造成50点伤害
        //     mystate.status.push();
        //     mystate.statusTime.push(6)
            
        //     thatstate.Hp -= 50;
        //     break;
        // case 191:
        //     //弧形闪电 0 对敌方造成80点伤害
        //     thatstate.Hp -= 80;
        //     break;
        // case 192:
        //     //剑舞 2 攻击时有60%的概率1.5倍暴击
        //     mystate.status.push(34;
        //     mystate.status.push();
        //     mystate.statusTime.push(6)
            
        //     break;
        // case 193:
        //     //狂战士之怒 2 本回合内加70点攻击
        //     mystate.status.push();
        //     mystate.statusTime.push(6)
            
        //     break;
        // case 194:
        //     //热血战魂 2 加30点攻击
        //     mystate.status.push(35;
        //     mystate.status.push();
        //     mystate.statusTime.push(6)
            
        //     break;
        // case 195:
        //     //旋风飞斧 0 三回合对敌方造成40点伤害并使敌方攻击有30%的概率mis
        //     thatstate.Hp -= 40;
        //     thatstate.statusTime.push[57] = 6;
        //     thatstate.status.push(57);
            
        //     break;
        // case 196:
        //     //肉钩 0 对敌方造成80点伤害
        //     thatstate.Hp -= 80;
        //     break;
        // case 197:
        //     //瘴气 0 对敌方造成70点伤害
        //     thatstate.Hp -= 70;
        //     break;
        // case 198:
        //     //毒刺 2 攻击时对敌方额外造成20点伤害
        //     mystate.status.push(36;
        //     mystate.status.push();
        //     mystate.statusTime.push(6)
            
        //     break;
        // case 199:
        //     //扫射 2 攻击力加40
        //     form4.mystatelist(71);
        //     mystate.status.push();
        //     mystate.statusTime.push(6)
        //     Thread.Sleep(100);
        //     break;
        // case 200:
        //     //灼热之箭 2 本回合内攻击加50
        //     mystate.status.push();
        //     mystate.statusTime.push(6)
            
        //     break;
        // case 201:
        //     //变身 2 永久增加20点攻击力
        //     form4.attack += 20;
        //     break;
        // case 202:
        //     //连击 2 每次攻击降低敌方10点护甲
        //     mystate.status.push(56;
        //     mystate.status.push();
        //     mystate.statusTime.push(6)
            
        //     break;
        // case 203:
        //     //蝗虫群 1 对敌方造成60点伤害并永久降低10点护甲
        //     thatstate.Hp -= 60;
        //     break;
        // case 204:
        //     //毒性攻击 2 本回合攻击力加40
        //     mystate.status.push();
        //     mystate.statusTime.push(6)
            
        //     break;
        // case 205:
        //     //幽冥剧毒 2 敌方血量低于50%时,攻击附加50点伤害
        //     mystate.status.push(37;
        //     mystate.status.push();
        //     mystate.statusTime.push(6)
            
        //     break;
        // case 206:
        //     //腐蚀外表 2 受到敌方的任何攻击之后敌方会掉40点血
        //     mystate.status.push(38;
        //     mystate.status.push();
        //     mystate.statusTime.push(6)
            
        //     break;
        // case 207:
        //     //等离子场 0 敌方每次对你使用指向性技能时会减少100点生命值
        //     mystate.status.push(39;
        //     mystate.status.push();
        //     mystate.statusTime.push(6)
            
        //     break;
        // case 208:
        //     //静电连接 1 永久性减少敌方5点攻击,自己增加5点攻击
        //     form4.attack += 5;
        //     break;
        // case 209:
        //     //投掷飞镖 1 对敌方造成80点伤害
        //     thatstate.Hp -= 80;
        //     break;
        // case 210:
        //     //忍术 2 攻击时有40%的概率双倍暴击
        //     mystate.status.push(40;
        //     mystate.status.push();
        //     mystate.statusTime.push(6)
            
        //     break;
        // case 211:
        //     //分裂箭 2 攻击力增加敌方手牌数乘以15的数值
        //     mystate.status.push(41;
        //     mystate.status.push();
        //     mystate.statusTime.push(6)
            
        //     break;
        // case 212:
        //     //秘术异蛇 0 造成敌手牌数乘以20的伤害
        //     thatstate.Hp -= thatstate.cardid.length * 20;
        //     break;
        // case 213:
        //     //魔法护盾 2 受到伤害时一点能量值可以抵挡100点伤害
        //     mystate.status.push(42;
        //     mystate.status.push();
        //     mystate.statusTime.push(6)
            
        //     break;
        // case 214:
        //     //折光 2 抵挡4次伤害
        //     mystate.status.push();
        //     mystate.statusTime.push(6)
            
        //     break;
        // case 215:
        //     //黑暗契约 2 下回合双方损失50点生命值,可以清除自己身上所有状态
        //     mystate.status.push();
        //     mystate.statusTime.push(6)
        //            case 216:
        //     //能量转换 2 每次攻击永久减少敌方1点攻击力,并增加自己2点攻击
        //     mystate.status.push(43;
        //     mystate.status.push();
        //     mystate.statusTime.push(6)
            
        //     break;
        // case 217:
        //     //超级力量 2 下一次普通攻击成功后可以额外造成自己攻击乘2的伤害
        //     mystate.status.push();
        //     mystate.statusTime.push(6)
            
        //     break;
        // case 218:
        //     //怒意狂击 2 每次普通攻击成功后攻击力会增加20
        //     mystate.status.push(44;
        //     mystate.status.push();
        //     mystate.statusTime.push(6)
            
        //     break;
        // case 219:
        //     //回到过去 2 受到任何攻击时有25%的概率免疫
        //     mystate.status.push(45;
        //     mystate.status.push();
        //     mystate.statusTime.push(6)
            
        //     break;
        // case 220:
        //     //时间锁定 2 普通攻击时有25%的概率使敌方晕眩一回合
        //     mystate.status.push(46;
        //     mystate.status.push();
        //     mystate.statusTime.push(6)
            
        //     break;
        // case 221:
        //     //血之狂暴 1 使敌方2回合内无法使用技能
        //     thatstate.statusTime.push[58] = 4;
        //     thatstate.status.push(58);
            
        //     break;
        // case 222:
        //     //屠戮 2 敌方每减少一张牌会使自己增加30点生命值
        //     mystate.status.push(63;
        //     mystate.status.push();
        //     mystate.statusTime.push(6)
            
        //     break;
        // case 223:
        //     //嗜血渴望 2 敌方血量低于50%时，自己增加50点攻击
        //     mystate.status.push(47;
        //     mystate.status.push();
        //     mystate.statusTime.push(6)
            
        //     break;
        // case 224:
        //     //烟幕 0 使敌方在1回合内攻击有75%的概率mis,并qin以使用技能,
        //     thatstate.statusTime.push[40] = 2;
        //     thatstate.status.push(40);
            
        //     break;
        // case 225:
        //     //闪烁突袭 3 可以闪避掉一次攻击
        //     break;
        // case 226:
        //     //魔王降临 2 减少敌方20点护甲
        //     mystate.status.push(62;
        //     mystate.status.push();
        //     mystate.statusTime.push(6)
            
        //     thatstate.status.push(41);
            
        //     break;
        // case 227:
        //     //毁灭阴影 0 对敌方造成90点伤害
        //     thatstate.Hp -= 90;
        //     break;
        // case 228:
        //     //支配死灵 2 敌方每减少一张牌,你可以永久增加2点攻击
        //     mystate.status.push(48;
        //     mystate.status.push();
        //     mystate.statusTime.push(6)
            
        //     break;
        // case 229:
        //     //幽鬼之刃 0 对敌方造成80点伤害
        //     thatstate.Hp -= 80;
        //     break;
        // case 230:
        //     //荒芜 2 增加30点攻击
        //     mystate.status.push(49;
        //     mystate.status.push();
        //     mystate.statusTime.push(6)
            
        //     break;
        // case 231:
        //     //折射 2 反弹自己受到一切伤害的25%
        //     mystate.status.push(50;
        //     mystate.status.push();
        //     mystate.statusTime.push(6)
            
        //     break;
        // case 232:
        //     //麻痹撕咬 2 普通攻击成功后可以使敌方1回合内有50%的概率攻击mis
        //     mystate.status.push(51;
        //     mystate.status.push();
        //     mystate.statusTime.push(6)
            
        //     break;
        // case 233:
        //     //月光 1 对敌方造成90点伤害
        //     thatstate.Hp -= 90;
        //     break;
        // case 234:
        //     //月之祝福 2 攻击力加60
        //     mystate.status.push(52;
        //     mystate.status.push();
        //     mystate.statusTime.push(6)
            
        //     break;
        // case 235:
        //     //月刃 2 攻击力加敌方手牌数乘10的数值
        //     mystate.status.push(67;
        //     mystate.status.push();
        //     mystate.statusTime.push(6)
            
        //     break;
        // case 236:
        //     //高射火炮 2 本回合内攻击增加70
        //     mystate.status.push();
        //     mystate.statusTime.push(6)
            
        //     break;
        // case 237:
        //     //追踪导弹 0 造成160点伤害
        //     thatstate.Hp -= 160;
        //     break;
        // case 238:
        //     //灵魂猎手 0 使敌方额外承受25%的伤害,持续一回合
        //     thatstate.statusTime.push[44] = 2;
        //     thatstate.status.push(44);
            
        //     break;
        // case 239:
        //     //薄葬 2 三回合内不会死亡
        //     mystate.status.push();
        //     mystate.statusTime.push(6)
            
        //     break;
        // case 240:
        //     //暗影波 0 回复自己手牌数乘以25点的生命
        //     mystate.Hp += form4.mycardnumber * 25;
        //     break;
        // case 241:
        //     //叉形闪电 1 对敌方造成90点伤害
        //     thatstate.Hp -= 90;
        //     break;
        // case 242:
        //     //妖术 1 将敌方变成小羊,持续1回合
        //     thatstate.statusTime.push[87] = 2;
        //     thatstate.status.push(87);
            
        //     break;
        // case 243:
        //     //枷锁 1 自己摸一张牌,敌方受到50点伤害
        //     thatstate.Hp -= 50;
        //     form4.getcard();
        //     break;
        // case 244:
        //     //烈焰破击 0 对敌方造成100点伤害
        //     thatstate.Hp -= 100;
        //     break;
        // case 245:
        //     //冰霜新星 0 对敌方造成60点伤害
        //     thatstate.Hp -= 60;
        //     break;
        // case 246:
        //     //冰封禁制 1 对敌方造成30点伤害并晕眩一回合
        //     thatstate.Hp -= 30;
        //     thatstate.statusTime.push(2);
        //     thatstate.status.push(0);
            
        //     break;
        // case 247:
        //     //辉煌光环 2 每回合可以额外回复1点能量值
        //     mystate.status.push(53;
        //     mystate.status.push();
        //     mystate.statusTime.push(6)
            
        //     break;
        // case 248:
        //     //静默诅咒 1 减少敌方1点能量值
        //     break;
        // case 249:
        //     //智慧之刃 2 攻击力增加自己能量值乘以20的数值
        //     mystate.status.push();
        //     mystate.statusTime.push(6)
            
        //     break;
        // case 250:
        //     //遗言 1 对敌方造成60点伤害,并沉默1回合
        //     thatstate.Hp -= 60;
        //     thatstate.statusTime.push[1] = 2;
        //     thatstate.status.push(1);
            
        //     break;
        // case 251:
        //     //弱化能流 1 永久减少敌方10点攻击
        //     break;
        // case 252:
        //     //激光 0 造成100点伤害并使敌方下1回合攻击100%mis
        //     thatstate.Hp -= 100;
        //     thatstate.statusTime.push[47] = 2;
        //     thatstate.status.push(47);
            
        //     break;
        // case 253:
        //     //热导飞弹 0 造成100点伤害
        //     thatstate.Hp -= 100;
        //     break;
        // case 254:
        //     //法力汲取 1 减少敌方两点能量格,自己增加两点能量格
        //     form4.me.Force += 2;
        //     break;
        // case 255:
        //     //超负荷 2 每放1次技能就可以增加自己40点攻击,不可叠加,维持一次攻击
        //     mystate.status.push(54;
        //     mystate.status.push();
        //     mystate.statusTime.push(6)
            
        //     break;
        // case 256:
        //     //束缚之箭 1 造成40点伤害晕眩敌方半回合
        //     thatstate.Hp -= 40;
        //     thatstate.statusTime.push(1);
        //     thatstate.status.push(0);
            
        //     break;
        // case 257:
        //     //强力一击 0 造成100点伤害
        //     thatstate.Hp -= 100;
        //     break;
        // case 258:
        //     //冲击波 0 造成130点伤害
        //     thatstate.Hp -= 130;
        //     break;
        // case 259:
        //     //法力流失 1 3回合内敌方任何攻击所需能量值加1
        //     thatstate.statusTime.push[49] = 6;
        //     thatstate.status.push(49);
            
        //     break;
        // case 260:
        //     //查克拉魔法 2 瞬间将自身能量值回满
        //     form4.me.Force = form4.me.Forcemax;
        //     break;
        // case 261:
        //     //严寒烧灼 2 2回合增加敌方现有生命值2%的攻击力
        //     mystate.status.push();
        //     mystate.statusTime.push(6)
            
        //     break;
        // case 262:
        //     //碎裂冲击 0 造成100点伤害
        //     thatstate.Hp -= 100;
        //     break;
        // case 263:
        //     //极寒之拥 2 使自己加100点护甲回复100点生命,但本回合不可以再出牌
        //     mystate.Hp += 100;
        //     form4.mystatelist(68);
        //     mystate.status.push();
        //     mystate.statusTime.push(6)
        //     Thread.Sleep(100);
        //     break;
        // case 264:
        //     //离子外壳 2 对敌方造成80点伤害
        //     thatstate.Hp -= 80;
        //     break;
        // case 265:
        //     //凤凰冲击 3 减少自身100点生命值，闪避对方一次攻击
        //     mystate.Hp -= 100;
        //     break;
        // case 266:
        //     //秘法天球 2 本回合增加能量值乘以25的攻击力
        //     mystate.status.push();
        //     mystate.statusTime.push(6)
            
        //     break;
        // case 267:
        //     //星体禁锢 1 使对方减少2点能量格,并轮空一回合
        //     form4.you.Force -= 2;
        //     form4.me.Force += 2;
        //     form4.getcard();
        //     break;
        // case 268:
        //     //精气光环 2 释放技能时有50%的概率加1点能量值
        //     mystate.status.push(55;
        //     mystate.status.push();
        //     mystate.statusTime.push(6)
            
        //     break;
        // case 269:
        //     //龙破斩 0 造成100点伤害
        //     thatstate.Hp -= 100;
        //     break;
        // case 270:
        //     //光击阵 0 造成80点伤害并晕眩1回合
        //     thatstate.Hp -= 80;
        //     thatstate.statusTime.push(2);
        //     thatstate.status.push(0);
            
        //     break;
        // case 271:
        //     //寒冰之触 2 对敌方造成80点伤害并晕眩半回合
        //     thatstate.Hp -= 80;
        //     thatstate.statusTime.push(1);
        //     thatstate.status.push(0);
            
        //     break;
        // case 272:
        //     //火焰爆轰 1 造成80点伤害并晕眩敌方1回合
        //     thatstate.Hp -= 80;
        //     thatstate.statusTime.push(2);
        //     thatstate.status.push(0);
            
        //     break;
        // case 273:
        //     //引燃 1 造成150点伤害
        //     thatstate.Hp -= 150;
        //     break;
        // case 274:
        //     //嗜血术 2 增加自己30点攻击力
        //     mystate.status.push();
        //     mystate.statusTime.push(6)
            
        //     break;
        // case 275:
        //     //憎恶 1 对敌方造成50点伤害并晕眩半回合
        //     thatstate.Hp -= 50;
        //     thatstate.statusTime.push(1);
        //     thatstate.status.push(0);
            
        //     break;
        // case 276:
        //     //午夜凋零 0 造成80点伤害
        //     thatstate.Hp -= 80;
        //     break;
        // case 277:
        //     //命运赦令 1 使敌方1回合不可以攻击并且所受的物理伤害增加100%
        //     thatstate.statusTime.push[51] = 2;
        //     thatstate.status.push(51);
            
        //     break;
        // case 278:
        //     //涤罪之焰 1 对敌方造成150点伤害
        //     thatstate.Hp -= 150;
        //     break;
        // case 279:
        //     //忠诚考验 1 随机对敌方造成50-300点伤害
        //     let r = Math.random();
        //     let hurtmofa = r.Next(5, 31);
        //     thatstate.Hp -= hurtmofa * 10;
        //     break;
        // case 280:
        //     //麻痹陷阱 0 对敌方晕眩一回合
        //     thatstate.statusTime.push(2);
        //     thatstate.status.push(0);
            
        //     break;
        // case 281:
        //     //恶魔赦令 0 三回合内每回合对敌方造成80点伤害
        //     mystate.status.push();
        //     mystate.statusTime.push(6)
            
        //     break;
        // case 282:
        //     //致命连接 1 使己方下回合对敌方造成1.5倍技能伤害
        //     thatstate.statusTime.push[53] = 2;
        //     thatstate.status.push(53);
            
        //     break;
        // case 283:
        //     //暗言术 0 使己方回复80点生命值并对敌方造成80点伤害
        //     mystate.Hp += 80;
        //     thatstate.Hp -= 80;
        //     break;
        // case 284:
        //     //冰火交加 0 对敌方造成150点伤害
        //     thatstate.Hp -= 150;
        //     break;
        // case 285:
        //     //冰封路径 0 使敌方晕眩一回合
        //     thatstate.statusTime.push(2);
        //     thatstate.status.push(0);
            
        //     break;
        // case 286:
        //     //液态火 2 对敌方造成150点伤害
        //     thatstate.Hp -= 150;
        //     break;
        // case 287:
        //     //死亡脉冲 0 对敌方造成100点伤害，同时回复100点生命值
        //     thatstate.Hp -= 100;
        //     mystate.Hp += 100;
        //     break;
        // case 288:
        //     //竭心光环 2 每回合减少敌方0.1%生命值
        //     mystate.status.push(59;
        //     mystate.status.push();
        //     mystate.statusTime.push(6)
            
        //     break;
        // case 289:
        //     //施虐之心 2 每对敌方造成200点伤害回复1点能量格和100点生命
        //     mystate.status.push(60;
        //     mystate.status.push();
        //     mystate.statusTime.push(6)
            
        //     break;
        // case 290:
        //     //灵魂超度 0 对敌方造成自己损失血量10%的伤害
        //     thatstate.Hp -= (form4.me.Maxhp - mystate.Hp) / 10;
        //     break;
        // case 291:
        //     //食腐蝙群 0 对敌方造成200点伤害
        //     thatstate.Hp -= 200;
        //     break;
        // case 292:
        //     //上古封印 0 使敌方承受1.5倍魔法伤害，并使敌方沉默一回合
        //     thatstate.statusTime.push[1] = 2;
        //     thatstate.status.push(1);
            
        //     break;
        // case 293:
        //     //奥术箭 0 对敌方造成50*其能量格的伤害
        //     thatstate.Hp -= form4.you.Force * 50;
        //     break;
        // case 294:
        //     //暗影突袭 0 对敌方造成200点伤害
        //     thatstate.Hp -= 200;
        //     break;
        // case 295:
        //     //闪烁 3 可闪避敌方一次技能，对无视闪避技能无效
        //     break;
        // case 296:
        //     //痛苦尖叫 0 对敌方造成200点伤害
        //     thatstate.Hp -= 200;
        //     break;
        // case 297:
        //     //虚弱 1 3回合内降低敌方30点攻击力
        //     thatstate.statusTime.push[54] = 6;
        //     thatstate.status.push(54);
            
        //     break;
        // case 298:
        //     //蚀脑 1 对敌方造成200点伤害，同时回复100点生命值
        //     thatstate.Hp -= 200;
        //     mystate.Hp += 100;
        //     break;
        // case 299:
        //     //噩梦 1 使敌方沉睡一回合不能摸牌，己方也不能进行攻击
        //     form4.emeng = 1;
        //     thatstate.statusTime.push[55] = 2;
        //     thatstate.status.push(55);
            
        //     break;
        // case 300:
        //     //霜冻行星 1 对地敌方造成200点伤害
        //     thatstate.Hp -= 200;
        //     break;
        // case 301:
        //     //霜冻护甲 2 增加20点护甲
        //     mystate.status.push();
        //     mystate.statusTime.push(6)
            
        //     break;
        // case 302:
        //     //邪恶祭祀 2 丢弃一张手牌，回复1点能量格
        //     mystate.Hp -= 50;
        //     form4.me.Force += 3;
        //     break;
        // case 303:
        //     //麻痹药剂 0 使敌方晕眩,若敌方手牌超过4张晕眩2回合,否则晕眩1回合
        //     if (thatstate.cardid.length > 4)
        //     {
        //         thatstate.statusTime.push(4);
        //     }
        //     else
        //     {
        //         thatstate.statusTime.push(2);
        //     }
        //     thatstate.status.push(0);
            
        //     break;
        // case 304:
        //     //巫毒回复术 2 回复150点生命
        //     mystate.Hp += 150;
        //     break;
        // case 305:
        //     //诅咒 0 使敌方受到未来3回合内承受伤害的50%
        //     thatstate.statusTime.push[56] = 6;
        //     thatstate.status.push(56);
            
        //     break;
        // case 306:
        //     //相位转移 3 免疫一次任何伤害
        //     break;
        // case 307:
        //     //新月之痕 0 对敌方造成100点伤害并使对方沉默一回合
        //     thatstate.Hp -= 100;
        //     thatstate.statusTime.push[1] = 2;
        //     thatstate.status.push(1);
            
        //     break;
        // case 308:
        //     //不可侵犯 2 使对方普通攻击时消耗双倍能量格
        //     mystate.status.push(61;
        //     mystate.status.push();
        //     mystate.statusTime.push(6)
            
        //     break;
        // case 309:
        //     //自然之助 2 回复自身200点生命值
        //     mystate.Hp += 200;
        //     break;
        // case 310:
        //     //幽冥爆轰 0 对敌方造成200点伤害
        //     thatstate.Hp -= 200;
        //     break;
        // case 311:
        //     //幽冥守卫 2 对敌方造成100倍消耗能量格的伤害
        //     thatstate.Hp -= (form4.you.Forcemax - form4.you.Force) * 100;
        //     break;
        // case 312:
        //     //衰老 1 使敌方不能攻击,同时物理免疫,承受1.5倍魔法伤害
        //     thatstate.statusTime.push[2] = 4;
        //     thatstate.status.push(2);
            
        //     break;
        // case 313:
        //     //雷霆之击 1 对敌方造成200点伤害
        //     thatstate.Hp -= 200;
        //     break;
    }
    if (form4.statecontinue[8] == 1)
    {
        thatstate.statusTime.push(1);
        thatstate.status.push(0);
        
    }

    return mystate;
}