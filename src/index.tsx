import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import errorBoundaryHoc from '@/hoc/errorBoundaryHoc';
import { App as AntdApp } from 'antd';

import './index.css';

// i18n
import '@/config/i18n';

// React Query
import { queryClient } from '@/config/reactQuery';

// import reportWebVitals from './reportWebVitals';

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
// import enUS from 'antd/lib/locale/en_US';

// antd定制化
import AntdConfig from '@/config/antd';

import routes from '@/router';

const routerBasename = () => {
	// Vite 环境变量
	const env = import.meta.env.VITE_APP_ENV;

	// 生产区分部署环境
	if (env === 'production-github') {
		// github环境部署
		return '/admin/';
	}

	// 默认
	return '/';
};
const router = createBrowserRouter(routes, {
	basename: routerBasename()
});

function render() {
	const container = document.querySelector('#root') as Element;

	const root = ReactDOM.createRoot(container);
	root.render(
		// Zustand不需要Provider
		// <StrictMode>
		<QueryClientProvider client={queryClient}>
			<AntdConfig>
				<RouterProvider router={router} />
			</AntdConfig>
			{/* React Query DevTools - 仅在开发环境显示 */}
			{import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
		</QueryClientProvider>
		// </StrictMode>
	);
}

render();
