import React,{ useState, useEffect } from 'react';
import MetailBox from '../../components/MetailBox/MetailBox';
import "./Prepare.scss";

const Prepare = (props)=>{
	const { myid, myname, actions, next_process } = props;
  const [persenAry, setPersenAry] = useState([]);
  const [message, setMessage] = useState([]);// {name value system}
	const [mymessage, setMymessage] = useState('');

  useEffect(()=>{
    window.socket.on('updatePersen', (persenAry)=>{// 监听人员列表
      setPersenAry(persenAry);
    })
    window.socket.on('updateMessage', (mewmessage)=>{// 监听消息
      setMessage(mewmessage);
    })
    window.socket.emit('getPersen', {id: myid});  // 请求人员列表
    window.socket.emit('getMessage', {id: myid}); // 请求消息
    window.socket.on('getFight', (res)=>{//接收挑战
      actions.show_compop({
        message:res.message,
        Turebtn:true,
        TureFun:()=>{
          next_process({
            thatname:res.name,
            thatid:res.id,
            progress_state:2
          })//可以进行下一步了
          window.socket.emit('fightAns', {
            id:res.id,
            name:res.name,
            fight:true
          });
        },
        Closebtn:true,
        CloseFun:()=>{
          window.socket.emit('fightAns', {
            id:res.id,
            name:res.name,
            fight:false
          });
        },
      });
    });
    window.socket.on('fightAns', (res)=>{//挑战答复
      if(res.fight){
        next_process({
            thatname:res.name,
            thatid:res.id,
            progress_state:2
        })//可以进行下一步了
      }else{
        actions.show_compop({
          message:res.message,
          Turebtn:true
        });
      }
    })
    window.socket.on('runaway', (res)=>{//对方逃跑
      actions.show_compop({
        message:res.message,
        Turebtn:true,
        TureFun:()=>{
          next_process({progress_state:1});
          socket.emit('fightResult', {
            id: myid,
            name: myname
          }); 
        }
      });
    })
    window.socket.on('areYouOk', ()=>{  //服务器问，还活着没？
      socket.emit('imOk', {           //告诉服务器，我还活着！
        id: myid,
        name: myname
      });
    })
    window.onunload = (event)=> {
      window.socket.emit('logout', {
        id: myid,
        name: myname
      });
    }
  },[]);
  const select_persen = (challengName,challengId)=>{//选择用户发出要求 defier挑战 challeng被挑战
    actions.show_compop({
      message:"是否向\""+challengName+"\"发出邀请",
      Turebtn:true,
      TureFun:()=>{window.socket.emit('sendFight', challengId)},
      Closebtn:true,
    });
  }
  const render_presen = ()=>{//渲染 当前在线用户
    return persenAry.map((item,i)=>{
      if(item.name!== myname)
      return <div className="perseni" key={i} style={item.state=="fighting"?{background:"red"}:{}} onClick={()=>select_persen(item.name,item.id)}>{item.name}</div>
    })
  }
  const render_message = ()=>{// 渲染消息
    return (
      <div>
        {message.map((item,i)=>{
          return (
            <div key={i} >
              {item.system?
                <div className="system_message">{"系统消息:"+item.value}</div>:
                <div className="organ_message">{item.name+":"+item.value}</div>}
            </div>
          )
        })}
      </div>
    )
  }
  const edit = (val)=>{
    setMymessage(val.target.value);
  }
  const sendmessage = ()=>{
    if(mymessage==='')return;
    window.socket.emit('sendmessage', mymessage);
    setMymessage('')
  }
  return (
    <div className="prepare_body">
      <div className="tip_message">该游戏仍有很多bug，如发现严重bug，请立即通知作者(907280636@qq.com)</div>
      <div className="Chat_record">
        <MetailBox>
          {render_message()}
        </MetailBox>
      </div>
      <div className="text_input">
        <MetailBox>
          <textarea spellCheck="false" onChange={edit} value={mymessage}></textarea>
        </MetailBox>
      </div>
      <div className="online_list">
        <MetailBox>
          <div>请选取一名在线人员开始游戏↓</div>
          <div className="small_ps">ps:如果实在没人，你就再打开一个窗口自己跟自己玩吧...</div>
          {render_presen()}
        </MetailBox>
      </div>
      <div className={`send ${mymessage===''?'disable':''}`} onClick={sendmessage}>发送</div>
    </div>
  );
}
export default Prepare;