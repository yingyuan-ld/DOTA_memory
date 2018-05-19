require("./less/style.css");
import ReactDOM from 'react-dom'; //react-dom，仅在项目顶层使用
import React,{Component} from 'react'; //react
import Demo from './components/demo.js';
// var component = function () {
//   var element = document.createElement('h1');

//   element.innerHTML = 'Hello world';

//   return element;
// };
// document.body.appendChild(component());


ReactDOM.render(<Demo></Demo>, document.getElementById("text"));