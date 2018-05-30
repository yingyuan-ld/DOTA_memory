import React from 'react';
import "./Prepare.scss";
var socket = io();
class Component extends React.Component{
    constructor(){
        super();
        this.state = {
            persenAry:[],
            message:[],//{name value system}
            mymessage:""
        }
    }
    componentWillMount(){
        let that = this;
        that.props.socket.on('getpersen', function(res){//刷新人员列表
			console.info(res);
            let message = that.state.message;
            message.push({
                system:true,
                name:"系统消息",
                value:res.message
            })
            that.setState({persenAry:res.persenAry,message:message});
        })
        
        that.props.socket.on('getFight', function(res){//接收挑战
			console.info(res);
            let r=confirm(res.message+",是否迎战?");
            if (r==true){
                that.props.socket.emit('fightAns', {
                    name:res.name,
                    fight:true
                });
				that.props.next_process()//可以进行下一步了
            }else{
                that.props.socket.emit('fightAns', {
                    name:res.name,
                    fight:false
                });
            }
		})
    }
    select_persen(challengName){//选择用户发出要求 defier挑战 challeng被挑战
        let that = this;
        let r=confirm("是否向\""+challengName+"\"发出邀请");
        if (r==true){
            that.props.socket.emit('sendFight', challengName);
        }else{
            console.info("你按下了\"取消\"按钮!");
        }
    }
    render_presen(){//渲染 当前在线用户
        return this.state.persenAry.map((item,i)=>{
            if(item.name!==this.props.myname)
            return <div key={i} style={item.state=="fighting"?{background:"red"}:{}} onClick={this.select_persen.bind(this,item.name)}>{item.name}</div>
        })
    }
    render_message(){//渲染消息
        return this.state.message.map((item,i)=>{
            // return(item.system?<div key={i} >{item.value</div>:
            return <div>
                    {item.system?<div key={i} className="system_message">{"系统消息:"+item.value}</div>:
                                <div key={i} className="organ_message">{item.name+":"+item.value}</div>}
                </div>
        })
    }
    edit(val){
        this.setState({mymessage:val.target.value});
    }
  	render() {
        return <div className="prepare_body">
            <h1>请选择一个玩家</h1>
            <div className="Chat_record">
                {this.render_message()}
            </div>
            <textarea className="text_input" onChange={this.edit.bind(this)} value={this.state.mymessage}></textarea>
            <div className="online_list">
                <div>在线人员列表</div>
                {this.render_presen()}
            </div>
            <div className="send" onClick={()=>{}}>发送</div>
        </div>;
  	}
}
module.exports = Component;