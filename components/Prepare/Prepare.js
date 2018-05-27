import React from 'react';
import "./Prepare.scss";
var socket = io();
class Component extends React.Component{
    constructor(){
        super();
        this.state = {
            getpersen:[]
        }
    }
    componentWillMount(){
        let that = this;
        that.props.socket.on('message', function(res){//刷新人员列表
			console.info(res);
            let getpersen = [];
            for(name in res.persen){
                getpersen.push({
                    name:name,
                    state:res.persen[name].state
                });
            }
            that.setState({getpersen:getpersen});
		})
        that.props.socket.on('letsFight', function(res){//接收挑战
			console.info(res);
            let r=confirm(res.message+",是否迎战?");
            if (r==true){
                that.props.socket.emit('okFight', {
                    name:res.name,
                    fight:true
                });
            }else{
                that.props.socket.emit('okFight', {
                    name:res.name,
                    fight:false
                });
            }
		})
    }
    render_presen(){//渲染 当前在线用户
        return this.state.getpersen.map((item,i)=>{
            if(item.name!==this.props.myname)
            return <div key={i} style={item.state=="fighting"?{background:"red"}:{}} onClick={this.select_persen.bind(this,item.name)}>{item.name}</div>
        })
    }
    select_persen(name){//选择用户发出要求
        let that = this;
        let r=confirm("是否向\""+name+"\"发出邀请");
        if (r==true){
            that.props.socket.emit('letsFight', name);
        }else{
            console.info("你按下了\"取消\"按钮!");
        }
    }
    edit(val){
        this.setState({message:val.target.value});
    }
  	render() {
        return <div className="prepare_body">
            <h1>请选择一个玩家</h1>
            <div className="Chat_record"></div>
            <textarea className="text_input" onChange={this.edit.bind(this)} value={this.state.message}></textarea>
            <div className="online_list">
                <div>在线人员列表</div>
                {this.render_presen()}
            </div>
            <div className="send" onClick={()=>{}}>发送</div>
        </div>;
  	}
}
module.exports = Component;