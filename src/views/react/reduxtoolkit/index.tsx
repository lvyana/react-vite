/**
 * @file Zustand数据管理
 * @author ly
 * @createDate 2022年12月11日
 */
import { useEffect } from 'react';
import { useLog } from '@/store';
import AppCard from '@/components/antd/AppCard';
import AppButton from '@/components/antd/AppButton';

const ReduxToolkit = () => {
	const { list, setList, getMovieData } = useLog();

	useEffect(() => {
		getMovieData();
	}, [getMovieData]);

	console.log('rendering');

	const onReadux = () => {
		setList([]);
	};

	return (
		<AppCard>
			<AppButton onClick={onReadux} name={'zustand 赋值'}></AppButton>
			{list.map((item) => {
				return <div key={item.name}>{item.name}</div>;
			})}
		</AppCard>
	);
};

export default ReduxToolkit;
