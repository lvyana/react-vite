/**
 * @file useDeferredValue
 * @author ly
 * @createDate
 */
import React, { Suspense, useDeferredValue, useState, memo, FC, useMemo } from 'react';
import AppCard from '@/components/antd/AppCard';
import Markdown from '@/components/plugin/Markdown';
import { Input } from 'antd';

type ListProps = {
	query: string;
};
const numbers = [...new Array(20000).keys()];

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const UseDeferredValue = () => {
	const [query, setQuery] = useState('');
	const deferredQuery = useDeferredValue(query);

	return (
		<AppCard>
			<Input value={query} onChange={(e) => setQuery(e.target.value)} />
			<Suspense fallback={<div>Loading...</div>}>{/* <SearchResults query={deferredQuery} /> */}</Suspense>
			<Markdown url={'useDeferredValue.md'}></Markdown>
		</AppCard>
	);
};

const List: FC<ListProps> = ({ query }) => {
	const defQuery = useDeferredValue(query);

	const list = useMemo(
		() => defQuery && numbers.filter((i) => i.toString().indexOf(defQuery) > -1).map((i) => <div key={i}>{i}</div>),
		[defQuery]
	);

	return <div>{list}</div>;
};

export default UseDeferredValue;
