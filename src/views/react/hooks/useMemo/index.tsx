/**
 * @file IuseMemo 优化任意组件计算 缓存变量
 * @author ly
 * @createDate 2020年4月27日
 */
import React, { useState, useMemo, useEffect } from 'react';
import { Button } from 'antd';
import AppCard from '@/components/antd/AppCard';
import Markdown from '@/components/plugin/Markdown';
import dayjs from 'dayjs';

const getTime = () => {
	return dayjs().valueOf().toString();
};

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const UseMemo = () => {
	const [value, setValue] = useState(0);

	const [first, setfirst] = useState(0);

	const add = () => {
		setValue(value + 1);
	};

	const addFirst = () => {
		setfirst(first + 1);
	};

	const memoValue = useMemo(() => {
		console.log('useMemo');
		return value;
	}, [value]);

	return (
		<AppCard>
			<Button type="link" onClick={add}>
				+1
			</Button>
			<Button type="link" onClick={addFirst}>
				+1
			</Button>
			{value}
			{first}
			{memoValue}
			<Markdown url={'useMemo.md'}></Markdown>
		</AppCard>
	);
};

export default UseMemo;
