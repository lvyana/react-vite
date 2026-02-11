/**
 * @file Zustand数据管理
 * @author ly
 * @createDate 2022年12月11日
 */
import { useEffect } from 'react';
import { useLog } from '@/store';
import Icard from '@/antdComponents/iCard';
import Ibutton from '@/antdComponents/iButton';

const Ireduxtoolkit = () => {
	const { list, setList, getMovieData } = useLog();

	useEffect(() => {
		getMovieData();
	}, [getMovieData]);

	console.log('rendering');

	const onReadux = () => {
		setList([]);
	};

	return (
		<Icard>
			<Ibutton onClick={onReadux} name={'zustand 赋值'}></Ibutton>
			{list.map((item) => {
				return <div key={item.name}>{item.name}</div>;
			})}
		</Icard>
	);
};

export default Ireduxtoolkit;
