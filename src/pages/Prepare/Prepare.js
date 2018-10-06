import React from 'react';
import "./Prepare.scss";
import MetailBox from '../../components/MetailBox/MetailBox';
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
        this.Unmount = false;//组件移除
        window.onunload = (event)=> {
            socket.emit('logout', {
                id:this.props.myid,
                name:this.props.myname
            }); 
        }
        this.props.socket.on('getpersen', (persenAry)=>{//刷新人员列表
            if(!this.Unmount){
                this.setState({persenAry:persenAry});
            }
        })
        this.props.socket.on('getmessage', (mewmessage)=>{//刷新消息
            if(!this.Unmount){
                this.setState({message:mewmessage});
            }
        })
        
        this.props.socket.on('getFight', (res)=>{//接收挑战
            // debugger
            this.props.actions.show_compop({
                message:res.message,
                Turebtn:true,
                TureFun:()=>{
                    this.props.next_process({
                        thatname:res.name,
                        thatid:res.id,
                        progress_state:2
                    })//可以进行下一步了
                    this.props.socket.emit('fightAns', {
                        id:res.id,
                        name:res.name,
                        fight:true
                    });
                },
                Closebtn:true,
                CloseFun:()=>{
                    this.props.socket.emit('fightAns', {
                        id:res.id,
                        name:res.name,
                        fight:false
                    });
                },
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
                this.props.actions.show_compop({
                    message:res.message,
                    Turebtn:true
                });
            }
		})
    }
    componentWillUnmount(){
        this.Unmount = true;
    }
    select_persen(challengName,challengId){//选择用户发出要求 defier挑战 challeng被挑战
        this.props.actions.show_compop({
            message:"是否向\""+challengName+"\"发出邀请",
            Turebtn:true,
            TureFun:()=>{this.props.socket.emit('sendFight', challengId)},
            Closebtn:true,
        });
    }
    render_presen(){//渲染 当前在线用户
        return this.state.persenAry.map((item,i)=>{
            if(item.name!==this.props.myname)
            return <div className="perseni" key={i} style={item.state=="fighting"?{background:"red"}:{}} onClick={this.select_persen.bind(this,item.name,item.id)}>{item.name}</div>
        })
    }
    render_message(){//渲染消息
        return <div>
            {this.state.message.map((item,i)=>{
                return <div key={i} >
                        {item.system?<div className="system_message">{"系统消息:"+item.value}</div>:
                                    <div className="organ_message">{item.name+":"+item.value}</div>}
                    </div>
            })}
        </div>
    }
    edit(val){
        this.setState({mymessage:val.target.value});
    }
    sendmessage(){
        this.props.socket.emit('sendmessage', this.state.mymessage);
        this.setState({mymessage:""});
    }
  	render() {
        return <div className="prepare_body">
            <div className="Chat_record">
                <MetailBox>
                    {this.render_message()}
                </MetailBox>
            </div>
            <div className="text_input">
                <MetailBox>
                    <textarea spellCheck="false" onChange={this.edit.bind(this)} value={this.state.mymessage}></textarea>
                </MetailBox>
            </div>
            <div className="online_list">
                <MetailBox>
                    <div>在线人员列表</div>
                    {this.render_presen()}
                </MetailBox>
            </div>
            <div className="send" onClick={this.sendmessage.bind(this)}>发送</div>
        </div>;
  	}
}
module.exports = Component;