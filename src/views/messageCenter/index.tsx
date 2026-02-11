/**
 * @file 消息中心
 * @author ly
 * @createDate 2023年1月3日
 */
import React, { useState } from 'react';
import Itable from '@/antdComponents/iTable';
import { useRequest } from 'ahooks';
import useHeaderTable from './components/useTable';
import { tableData, TableDataResponse } from './service';

const MessgeCenter = () => {
	const buttonEvent = () => {};

	const { columns } = useHeaderTable({ buttonEvent });

	const [backlogData, setbacklogData] = useState<TableDataResponse[]>([]);

	useRequest(tableData, {
		onSuccess: (res) => {
			// console.log(res);
			setbacklogData(res.data);
		}
	});
	return (
		<div>
			<Itable columns={columns} dataSource={backlogData}></Itable>
		</div>
	);
};

export default MessgeCenter;
