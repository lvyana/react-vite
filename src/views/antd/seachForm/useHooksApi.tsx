/**
 * @file seachForm hooks
 * @author ly
 * @createDate 2023年1月3日
 */
import React, { useState } from 'react';
import { tableData } from './service';
import type { TableDataResponse, TableDataParams } from './service';
import useRequest from '@/useHooks/useApi';

// 查询表格数据
const useTableData = () => {
	// const [expensesTableData, setExpensesTableData] = useState<TableDataResponse[]>([]);

	const [total, setTotal] = useState(0);

	// const [loading, setLoading] = useState(false);

	// const getTableData = async (params: TableDataParams) => {
	// 	try {
	// 		setLoading(true);
	// 		const res = await tableData({ ...params });
	// 		const { data, total } = res;
	// 		setExpensesTableData(data);
	// 		setTotal(total);
	// 	} catch (error) {}
	// 	setLoading(false);
	// };

	const {
		loading,
		data,
		run: getTableData
	} = useRequest(tableData, {
		wait: 3000,
		leading: true,
		callback: (data) => {
			const { total } = data;
			setTotal(total);
		}
	});

	return { expensesTableData: data?.data, total, getTableData, loading };
};

export { useTableData };
