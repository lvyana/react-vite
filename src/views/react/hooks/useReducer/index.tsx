/**
 * @file useReduce
 * @author ly
 * @createDate 2020年4月27日
 */
import React, { useReducer } from 'react';
import { Button } from 'antd';
import Icard from '@/components/antd/AppCard';
import Icollapse from '@/components/antd/AppCollapse';

type ActionFuncType = (state: number, action: { type: string; value: number }) => number;

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const UseReducer = () => {
	// reduce实现加减乘除

	const [value, dispatch] = useReducer(reducer, 0);

	return (
		<Icard>
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
			<Imarkdown url={'useReducer.md'}></Imarkdown>
		</Icard>
	);
};

export default UseReducer;
