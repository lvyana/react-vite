/**
 * @file
 * @author
 * @createDate
 */
import React, { useEffect, useRef } from 'react';
import { Form } from 'antd';
import AppTable from '@/components/antd/AppTable';
import AppCard from '@/components/antd/AppCard';
import AppPagination from '@/components/antd/AppPagination';
import { tableData, type TableDataParams, type TableDataResponse } from './service';
import useHeaderTable, { HeaderTableParams } from './useHooks/useTable';
import SeachForm from './components/SearchForm';
import useFusionTable from '@/useHooks/useTableApi';

export type ExpensesFormParams = Omit<TableDataParams, 'pageSize' | 'pageNum' | 'name'>;

export type ColumnsSeachValue = Pick<TableDataParams, 'name' | 'height'>;

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const AntTable = () => {
	const columnsSeachValue = useRef<ColumnsSeachValue>({
		name: [],
		height: ''
	});

	const buttonEvent: HeaderTableParams['buttonEvent'] = ({ type, value }) => {
		if (type === 'name') {
			columnsSeachValue.current.name = value;
		}
		if (type === 'height') {
			columnsSeachValue.current.height = value;
		}
		search.submit();
	};

	const { columns } = useHeaderTable({ buttonEvent, columnsSeachValue });

	const [form] = Form.useForm<ExpensesFormParams>();

	const { dataSource, total, search, loading, page, onPaginationChange } = useFusionTable(tableData, {
		form,
		extraParams: columnsSeachValue.current
	});

	useEffect(() => {
		search.submit();
	}, []);

	return (
		<div>
			<SeachForm formProps={{ form }} submit={search.submit} reset={search.reset}></SeachForm>
			{/* <ClassCom hh={1}></ClassCom> */}
			<AppCard styles={{ body: { marginTop: '10px' } }}>
				<AppTable<TableDataResponse> rowKey="key" columns={columns} dataSource={dataSource} loading={loading} scroll={{ x: '100%' }} />
				<AppPagination
					className="mt-4"
					total={total}
					pageSize={page.pageSize}
					current={page.pageNum}
					onChange={onPaginationChange}></AppPagination>
			</AppCard>
		</div>
	);
};

export default AntTable;
