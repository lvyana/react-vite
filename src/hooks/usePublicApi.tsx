/**
 * @file 公共api
 * @author ly
 * @createDate 2023年1月3日
 */
import React, { useState, useEffect, useDebugValue } from 'react';

import { status, StatusDataProps } from '../api/publicApi';

/**
 * 获取状态数据
 * @param deep 能改变状态参数
 * @returns 状态数据
 */
const useHooksStatus = (deep = []) => {
	const [statusData, setStatusData] = useState<StatusDataProps[]>([]);
	// useDebugValue  可以用来在开发环境中调试组件
	useDebugValue(statusData);

	useEffect(() => {
		getStatus();
		return () => {
			setStatusData([]);
		};
	}, deep);

	// 状态
	const getStatus = async () => {
		try {
			const res = await status();
			const { data } = res;
			setStatusData(data);
		} catch (error) {}
	};

	return { statusData };
};

export { useHooksStatus };
