import React from 'react';

import "./MetailBox.scss";

let scrollRoll = true;//只有滚动条在底部,才自动滚动
class MetailBox extends React.Component{
    componentWillReceiveProps(){
        var div = this.refs.scroll;
         this.scrollRoll = div.scrollHeight == div.clientHeight + div.scrollTop;
    }
    componentDidUpdate(){
        if(this.scrollRoll){
            var div = this.refs.scroll;
            div.scrollTop = div.scrollHeight;
        }
    }
  	render() {
        return <div className="metal_box">
            <div className="border_corner1"/>
            <div className="border_line1"/>
            <div className="border_corner2"/>
            <div className="border_line2"/>
            <div className="border_corner3"/>
            <div className="border_line3"/>
            <div className="border_corner4"/>
            <div className="border_line4"/>
            <div className="inner_scroll" ref='scroll'>
                {this.props.children}
            </div>
        </div>
  	}
}
export default MetailBox;