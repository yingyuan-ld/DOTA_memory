import React,{useEffect, useRef} from 'react';
import "./MetailBox.scss";

const MetailBox = ({children})=>{
  const boxRef = useRef();
  useEffect(()=>{
    boxRef.current.scrollTop = boxRef.current.scrollHeight;
  },[children])
  return (
    <div className="metal_box">
      <div className="border_corner1"/>
      <div className="border_line1"/>
      <div className="border_corner2"/>
      <div className="border_line2"/>
      <div className="border_corner3"/>
      <div className="border_line3"/>
      <div className="border_corner4"/>
      <div className="border_line4"/>
      <div className="inner_scroll" ref={boxRef}>
        {children}
      </div>
    </div>
  )
}
export default MetailBox;