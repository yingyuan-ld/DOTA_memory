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
        window.onunload = (event)=> {
            socket.emit('logout', {
                id:this.props.myid,
                name:this.props.myname
            }); 
        }
        this.props.socket.on('getpersen', (persenAry)=>{//刷新人员列表
            this.setState({persenAry:persenAry});
        })
        this.props.socket.on('getmessage', (mewmessage)=>{//刷新消息
            // let message = this.state.message;
            // message.push(mewmessage);
            this.setState({message:mewmessage});
        })
        
        this.props.socket.on('getFight', (res)=>{//接收挑战
            let r=confirm(res.message);
            if (r==true){
				this.props.next_process({
                    thatname:res.name,
                    thatid:res.id,
                    progress_state:2
                })//可以进行下一步了
            }
            this.props.socket.emit('fightAns', {
                id:res.id,
                name:res.name,
                fight:r
            });
		})
        this.props.socket.on('fightAns', (res)=>{//挑战答复
            if(res.fight){
				this.props.next_process({
                    thatname:res.name,
                    thatid:res.id,
                    progress_state:2
                })//可以进行下一步了
            }else{
                alert(res.message);
            }
		})
    }
    select_persen(challengName,challengId){//选择用户发出要求 defier挑战 challeng被挑战
        let r=confirm("是否向\""+challengName+"\"发出邀请");
        if (r==true){
            this.props.socket.emit('sendFight', challengId);
        }else{
            console.info("你按下了\"取消\"按钮!");
        }
    }
    render_presen(){//渲染 当前在线用户
        return this.state.persenAry.map((item,i)=>{
            if(item.name!==this.props.myname)
            return <div key={i} style={item.state=="fighting"?{background:"red"}:{}} onClick={this.select_persen.bind(this,item.name,item.id)}>{item.name}</div>
        })
    }
    render_message(){//渲染消息
        return this.state.message.map((item,i)=>{
            return <div key={i} >
                    {item.system?<div className="system_message">{"系统消息:"+item.value}</div>:
                                <div className="organ_message">{item.name+":"+item.value}</div>}
                </div>
        })
    }
    edit(val){
        this.setState({mymessage:val.target.value});
    }
    sendmessage(){
        this.props.socket.emit('sendmessage', this.state.mymessage);
    }
  	render() {
        return <div className="prepare_body">
            <div>请选择一个玩家</div>
            <div className="Chat_record">
                {this.render_message()}
            </div>
            <textarea className="text_input" onChange={this.edit.bind(this)} value={this.state.mymessage}></textarea>
            <div className="online_list">
                <div className="metal_box">
                    <div className="border_corner1"/>
                    <div className="border_line1"/>
                    <div className="border_corner2"/>
                    <div className="border_line2"/>
                    <div className="border_corner3"/>
                    <div className="border_line3"/>
                    <div className="border_corner4"/>
                    <div className="border_line4"/>
                    <div className="inner_box">
                        <div>在线人员列表</div>
                        {this.render_presen()}
                    </div>
                </div>
            </div>
            <div className="send" onClick={this.sendmessage.bind(this)}>发送</div>
        </div>;
  	}
}
module.exports = Component;