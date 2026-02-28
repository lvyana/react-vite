/**
 * @file useTransition 返回一个状态值表示过渡任务的等待状态，以及一个启动该过渡任务的函数。
 * @author ly
 * @createDate 2023年3月9日
 */
import React, { useState, useTransition, useCallback } from 'react';
import { debounce } from 'lodash';
import Icard from '@/components/antd/AppCard';
import { Input } from 'antd';
// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const UseTransition = () => {
	const [isPending, startTransition] = useTransition();
	const [input, setInput] = useState('');
	const [list, setList] = useState<string[]>([]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInput(e.target.value);
		startTransition(() => {
			const newList = [];
			for (let i = 0; i < 10000; i++) {
				newList.push(e.target.value);
			}
			setList(newList);
		});
	};

	return (
		<Icard>
			<Input value={input} onChange={handleChange} />
			{isPending ? (
				<div>Loading...</div>
			) : (
				<div>
					{list.map((item, index) => (
						<div key={index}>{item}</div>
					))}
				</div>
			)}
			<Imarkdown url={'useTransition.md'}></Imarkdown>
		</Icard>
	);
};

export default UseTransition;
