/**
 * @file antd组件大小
 * @author ly
 * @createDate 2022年11月19日
 */
import React from 'react';
import { useLayout } from '@/store';

const useAntdSize = () => {
	const { size } = useLayout();

	return { size };
};

export default useAntdSize;
