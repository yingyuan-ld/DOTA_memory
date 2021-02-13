import React from 'react';
import "./BuffIon.scss";

const BuffIon = (props)=>{
  const {id, buffTime, buffObj, name, message} = props;
  // {id:0,name:"晕眩",message:"使该单位无法攻击,出牌,使用装备"},
  return (
    <div className="BuffIon_box" style={{background: "url(./src/server/stateImg/"+id+".jpg) no-repeat center"}}>
      <div className="tooltip">
          <div>
              {name}
              <div className="Buff_time">{buffTime}</div>
              {buffObj[id]?<div className="Buff_obj">{buffObj[id]}</div>:""}
          </div>
          <div>{message}</div>
      </div>
    </div>
  )
}
export default BuffIon;