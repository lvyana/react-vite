/**
 * @file RTK数据管理
 * @author ly
 * @createDate 2022年12月11日
 */
import React, { useEffect } from 'react';
import { useLog } from '@/store';
import AppCard from '@/components/antd/AppCard';

const Rtk = () => {
	const { list, getMovieData } = useLog();

	useEffect(() => {
		getMovieData();
	}, [getMovieData]);

	return (
		<AppCard>
			{list.map((item) => {
				return <div key={item.name}>{item.name}</div>;
			})}
		</AppCard>
	);
};

export default Rtk;
