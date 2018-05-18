require("./less/style.css");
// import demo from './components/demo.js';
var component = function () {
  var element = document.createElement('h1');

  element.innerHTML = 'Hello world';

  return element;
};
document.body.appendChild(component());


// import React from 'react'; //react
// ReactDOM.render(<demo></demo>, document.getElementById("text"));