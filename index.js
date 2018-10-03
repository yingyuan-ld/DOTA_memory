import ReactDOM from 'react-dom'; //react-dom，仅在项目顶层使用
import React,{Component} from 'react'; //react
import DotaSystem from './src/pages/DotaSystem/DotaSystem.js';
import "./src/style/index.scss";

ReactDOM.render(<DotaSystem></DotaSystem>, document.getElementById("box"));