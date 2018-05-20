import React from 'react';
import "./DotaSystem.scss";
class Component extends React.Component{
  
  	render() {
        return <div className="system_body">
            <h1>Hello React</h1>
            <div className="Chat_record"></div>
            <textarea className="text_input"></textarea>
            <div className="online_list"></div>
            <div className="send">发送</div>
        </div>;
  	}
}
module.exports = Component;