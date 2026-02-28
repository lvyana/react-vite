/**
 * @file Suspense
 * @author ly
 * @createDate 日期：2020年4月27日
 */
import React, { ComponentType, lazy, ReactNode, Suspense } from 'react';
// import Loading from '@/components/antd/AppLoading';
import AppLoading from '@/components/plugin/Loading';
// import Nprogress from './Nprogress';
// 两种均可

const suspenseLoad = (element: () => Promise<{ default: ComponentType }>) => {
	const LazyComponent = lazy(element);
	return (
		<Suspense fallback={<AppLoading />}>
			<LazyComponent />
		</Suspense>
	);
};

export default suspenseLoad;
