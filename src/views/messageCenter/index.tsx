/**
 * @file 消息中心
 * @author ly
 * @createDate 2023年1月3日
 */
import Itable from '@/antdComponents/iTable';
import { useQuery } from '@tanstack/react-query';
import useHeaderTable from './components/useTable';
import { tableData, type TableDataParams } from './service';

const MessgeCenter = () => {
	const buttonEvent = () => {};

	const { columns } = useHeaderTable({ buttonEvent });

	// 默认查询参数
	const params: TableDataParams = {
		name: '',
		age: '',
		status: '1',
		pageSize: 10,
		pageNum: 1
	};

	// 使用 React Query 获取数据
	const { data } = useQuery({
		queryKey: ['messageCenter', 'tableData', params],
		queryFn: async () => {
			const res = await tableData(params);
			return res.data;
		}
	});

	return (
		<div>
			<Itable columns={columns} dataSource={data || []}></Itable>
		</div>
	);
};

export default MessgeCenter;
