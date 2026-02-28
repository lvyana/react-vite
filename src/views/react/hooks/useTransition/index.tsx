/**
 * @file useTransition 返回一个状态值表示过渡任务的等待状态，以及一个启动该过渡任务的函数。
 * @author ly
 * @createDate 2023年3月9日
 */
import React, { useState, useTransition, useCallback } from 'react';
import { debounce } from 'lodash';
import AppCard from '@/components/antd/AppCard';
import Markdown from '@/components/plugin/Markdown';
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
		<AppCard>
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
			<Markdown url={'useTransition.md'}></Markdown>
		</AppCard>
	);
};

export default UseTransition;
