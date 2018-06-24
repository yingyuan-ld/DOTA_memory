import React from 'react';
import Card from '../Card/Card';
import "./CardShowList.scss";

class CardShowList extends React.Component{
    constructor(){
        super();
        this.state = {
            index:0,//当前显示的卡牌
        }
    }
    componentWillReceiveProps(newProps){
        if(this.props.cardShowList.length<newProps.cardShowList.length){
            this.setState({index:newProps.cardShowList.length-1})
        }
    }
    cardShowList(){
        let index = this.state.index;
        return this.props.cardShowList.map((card,i)=>{
            return <div className="Slide_box" style={{zIndex:(index-Math.abs(i-index))}}>
                    <Card card={card} state={"show"} key={i}/>
                </div>
        })
    }
  	render() {
        return <div className="CardShow_box">
            {this.cardShowList()}
        </div>
  	}
}
module.exports = CardShowList;