/**
 * @file useReduce
 * @author ly
 * @createDate 2020年4月27日
 */
import React, { useReducer } from 'react';
import { Button } from 'antd';
import AppCard from '@/components/antd/AppCard';
import Markdown from '@/components/plugin/Markdown';
import AppCollapse from '@/components/antd/AppCollapse';

type ActionFuncType = (state: number, action: { type: string; value: number }) => number;

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

// Reducer 函数
const reducer = (state: number, action: { type: string; value: number }): number => {
	switch (action.type) {
		case 'add':
			return state + action.value;
		case 'sub':
			return state - action.value;
		case 'mul':
			return state * action.value;
		case 'div':
			return state / action.value;
		default:
			return state;
	}
};

const UseReducer = () => {
	// reduce实现加减乘除

	const [value, dispatch] = useReducer(reducer, 0);

	return (
		<AppCard>
			<Button type="link" onClick={() => dispatch({ type: 'add', value: 1 })}>
				+1
			</Button>
			<Button type="link" onClick={() => dispatch({ type: 'sub', value: 1 })}>
				-1
			</Button>
			<Button type="link" onClick={() => dispatch({ type: 'mul', value: 2 })}>
				*2
			</Button>
			<Button type="link" onClick={() => dispatch({ type: 'div', value: 2 })}>
				/2
			</Button>
			{value}
			<Markdown url={'useReducer.md'}></Markdown>
		</AppCard>
	);
};

export default UseReducer;
