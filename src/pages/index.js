import { createRoot } from 'react-dom/client'; //react-dom，仅在项目顶层使用
import React from 'react'; //react
import { Provider } from 'react-redux';
import DotaSystem from '@/pages/DotaSystem/DotaSystem.js';
import "@/style/index.scss";
import store from '@/redux/store';

createRoot(
	document.getElementById("box")
).render(
	<Provider store={store}>
		<DotaSystem />
	</Provider>
);