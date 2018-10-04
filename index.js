import ReactDOM from 'react-dom'; //react-dom，仅在项目顶层使用
import React,{Component} from 'react'; //react
import { Provider } from 'react-redux';
import DotaSystem from './src/pages/DotaSystem/DotaSystem.js';
import "./src/style/index.scss";
import store from './src/redux/store';

ReactDOM.render(
	<Provider store={store}>
		<DotaSystem />
	</Provider>, document.getElementById("box")
);