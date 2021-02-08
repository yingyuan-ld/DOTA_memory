import React from 'react';
import Card from '../Card/Card';
import "./CardShowList.scss";

class CardShowList extends React.Component{
    constructor(){
        super();
        this.state = {
            index:0,//当前显示的卡牌
            tempindex:0,//当前显示的卡牌(参与计算用)
            top:92,//定位用
            temptop:92,//定位用(参与计算)
        }
        this.mousemove = this.mousemove.bind(this);
        this.mouseup = this.mouseup.bind(this);
    }
    componentWillReceiveProps(newProps){
        if(this.props.cardShowList.length<newProps.cardShowList.length){
            let index = newProps.cardShowList.length-1;
            this.setState({index:index,tempindex:index,top:(70+22*index),temptop:(70+22*index)});
        }
    }
    slide(e){//添加监听
        document.addEventListener("mousemove", this.mousemove,false);
        document.addEventListener("mouseup", this.mouseup,false);
        this.start = e.clientY;
    }
    mousemove(e){
        let tempindex = this.state.tempindex;
        let maxindex = this.props.cardShowList.length-1;
        tempindex += parseInt((this.start - e.clientY)/22);
        console.info(tempindex);
        if(tempindex<0)tempindex = 0;
        if(tempindex>maxindex)tempindex = maxindex;
        let temptop = this.state.temptop;
        temptop  +=(this.start - e.clientY);
        this.setState({index:tempindex,top:temptop});
    }
    mouseup(e){
        console.info("移除监听");
        let top = 70+22*this.state.index;
        this.setState({tempindex:this.state.index,top:top,temptop:top});
        document.removeEventListener("mousemove",this.mousemove,false); 
        document.removeEventListener("mouseup",this.mouseup,false);  
    }
    cardShowList(){
        let index = this.state.index;
        return this.props.cardShowList.map((card,i)=>{
            return <div className="Slide_box" style={{zIndex:(index-Math.abs(i-index))}} onMouseDown={this.slide.bind(this)} key={i}>
                    <Card card={card} state={"show"}/>
                </div>
        })
    }
  	render() {
        return <div className="CardShow_box" style={{top:"calc(50% - "+this.state.top+"px)"}}>
            {this.cardShowList()}
        </div>
  	}
}
export default CardShowList;