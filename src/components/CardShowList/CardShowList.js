import React,{useState,useEffect} from 'react';
import Card from '../Card/Card';
import "./CardShowList.scss";
let start;
const CardShowList = (props)=>{
  const {cardShowList} = props;
  const [index, setIndex] = useState(0);// 当前显示的卡牌
  const [tempindex, setTempIndex] = useState(0);// 当前显示的卡牌(参与计算用)
  const [top, setTop] = useState(92);// 定位用
  const [temptop, setTempTop] = useState(92);// 定位用(参与计算)
  
  useEffect(()=>{
    let index = cardShowList.length-1;
    setIndex(index);
    setTempIndex(index);
    setTop(70+22*index);
    setTempTop((70+22*index));
  },[cardShowList])
  
  const slide = (e)=>{//添加监听
    document.addEventListener("mousemove", mousemove,false);
    document.addEventListener("mouseup", mouseup,false);
    start = e.clientY;
  }
  const mousemove = (e)=>{
    let maxindex = cardShowList.length-1;
    let newindex = tempindex + parseInt((start - e.clientY)/22);
    if(newindex<0)newindex = 0;
    if(newindex>maxindex)newindex = maxindex;
    let newtop = temptop + (start - e.clientY);
    setIndex(newindex);
    setTop(newtop);
  }
  const mouseup = (e)=>{
    let top = 70+22*index;
    setTempIndex(index);
    setTop(top);
    setTempTop(top);
    document.removeEventListener("mousemove",mousemove,false); 
    document.removeEventListener("mouseup",mouseup,false);  
  }
  return(
    <div className="CardShow_box" style={{top:"calc(50% - "+top+"px)"}}>
      {cardShowList.map((card,i)=>{
        return (
          <div className="Slide_box" style={{zIndex:(index-Math.abs(i-index))}} onMouseDown={slide} key={i}>
            <Card card={card} state={"show"}/>
          </div>
        )
      })}
    </div>
  )
}
export default CardShowList;