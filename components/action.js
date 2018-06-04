export function prepareOk (mystate,thatstate,cardid){//准备开始
    mystate.round-=cardid
    return mystate;
}