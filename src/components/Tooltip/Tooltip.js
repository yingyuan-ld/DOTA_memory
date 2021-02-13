import React from 'react';
import "./Tooltip.scss";

const Tooltip = (props)=>{
  const {show, place, name, yeloT, blueT, redT, message} = props;
  if(show){
    let top = place[1]/document.body.offsetHeight>0.5?"translate(-100%, -100%)":"translate(-100%, 0)";
    return (
      <div className="Tooltip" style={{left:place[0]+"px",top:place[1]+"px",transform:top}}>
          <div>
              {name}
          </div>
        <div>
            <div className="yeloTitle">{yeloT}</div>
            <div className="blueTitle">{blueT}</div>
            <div className="redTitle">{redT}</div>
        </div>
          <div>{message}</div>
      </div>
    )
  }else{
    return <div/>
  }
}
export default Tooltip;