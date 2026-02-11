/**
 * @file 实现缓存
 * @author ly
 * @createDate 2020年4月27日
 */
import React from 'react';
import { useKeepAlive as useKeepAliveStore } from '@/store';
import type { KeepAliveDataItem } from '@/store/slices/keepAliveSlice';

// 存储缓存唯键
export const KeepAliveKeys = new Set<string>();

type KeepAliveDataParams<T> = {
	key: string;
	value: T;
};

/**
 * @param 路径或者自定义别名
 * @returns initKeepAliveData 获取缓存参数
 * @returns setKeepAliveData 修改缓存数据方法
 */
const useKeepAlive = () => {
	const { keepAliveData: initValue, setKeepAliveData: setData, getKeepAliveData: getData } = useKeepAliveStore();

	const getKeepAliveData = <T,>(key: string): T => {
		return getData<T>(key);
	};

	const setKeepAliveData = <T extends object>(value: KeepAliveDataParams<T>) => {
		const { key } = value;

		if (!KeepAliveKeys.has(key)) {
			return console.error(`KeepAlive没有key:${key}，本次将不会缓存！`);
		}
		setData({ key, value });
	};

	return { getKeepAliveData, keepAliveAllData: initValue, setKeepAliveData };
};

export default useKeepAlive;
