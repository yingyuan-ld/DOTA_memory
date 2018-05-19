import ReactDOM from 'react-dom'; //react-dom，仅在项目顶层使用
import React,{Component} from 'react'; //react
import Demo from './components/demo.js';
import "./style/index.scss";

ReactDOM.render(<Demo></Demo>, document.getElementById("text"));