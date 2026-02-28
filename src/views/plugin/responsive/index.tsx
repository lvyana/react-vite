/**
 * @file 响应式 https://github.com/yocontra/react-responsive
 * @author ly
 * @createDate 2023年1月3日
 */
import React from 'react';
import { IresponsiveMax, IresponsiveMin } from '@/components/plugin/Responsive';
import AppCard from '@/components/antd/AppCard';

const Responsive = () => {
	return (
		<AppCard>
			<IresponsiveMax maxWidth={1000}>
				<div>大于1000 隐藏</div>
			</IresponsiveMax>
			<IresponsiveMin minWidth={900}>
				<div>小于900 隐藏</div>
			</IresponsiveMin>
		</AppCard>
	);
};

export default Responsive;
