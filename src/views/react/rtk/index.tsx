/**
 * @file RTK数据管理
 * @author ly
 * @createDate 2022年12月11日
 */
import React, { useEffect } from 'react';
import { useLog } from '@/store';
import Icard from '@/antdComponents/iCard';

const Ireduxtoolkit = () => {
	const { list, getMovieData } = useLog();

	useEffect(() => {
		getMovieData();
	}, [getMovieData]);

	return (
		<Icard>
			{list.map((item) => {
				return <div key={item.name}>{item.name}</div>;
			})}
		</Icard>
	);
};

export default Ireduxtoolkit;
