/**
 * @file 首次初始化API 存储到Zustand
 * @author ly
 * @createDate 2022年4月27日
 */
import React, { useState, useEffect } from 'react';
// 引入相关的hooks
import { useGlobalConfig } from '@/store';

const useApi = () => {
	const { getHeaderConfig } = useGlobalConfig();

	useEffect(() => {
		getHeaderConfig();
	}, []);
};

export default useApi;
