import {createStore} from 'redux'
import reducer from '../reduxter' 
const initValue={
    myname:"",
    myid:"",
    thatname:"",
    thatid:"",
    process:["Login","Prepare","Playing"],//游戏流程
    progress_state:0
}
const store=createStore(reducer,initValue)
export default store