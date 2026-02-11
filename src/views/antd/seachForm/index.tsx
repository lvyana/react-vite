/**
 * @file seachForm
 * @author ly
 * @createDate 2023年1月3日
 */
import React, { useEffect, useRef } from 'react';
import { Form } from 'antd';
import useHeaderTable, { ButtonEvent, HeaderTableParams } from './useHooks/useTable';
import Itable from '@/antdComponents/iTable';
import Icard from '@/antdComponents/iCard';
import SeachForm from './components/SeachForm';
import Ipaginations from '@/antdComponents/iPagination';
import HeaderEdit from '@/antdComponents/iEditHeader/Modal';
import { useTableData } from './useHooksApi';
import useKeepAlive, { KeepAliveKeys } from '@/useHooks/useKeepAlive';
import type { TableDataParams, TableDataResponse } from './service';
import type { ButtonType } from './components/SeachForm';

export type ExpensesFormParams = Omit<TableDataParams, 'pageSize' | 'pageNum' | 'name'>;

export type ColumnsSeachValue = Pick<TableDataParams, 'name' | 'height'>;

const KeepAliveKey = '1';
KeepAliveKeys.add(KeepAliveKey);

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const Expenses = () => {
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
		page.current.pageNum = 1;
		submit();
	};

	const { columns } = useHeaderTable({ buttonEvent, columnsSeachValue });

	const [form] = Form.useForm<ExpensesFormParams>();

	const { expensesTableData, total, getTableData, loading } = useTableData();

	// 缓存
	const { getKeepAliveData, setKeepAliveData } = useKeepAlive();

	const page = useRef({
		pageSize: 10,
		pageNum: 1
	});

	const setKeepAlive = (params: TableDataParams) => {
		setKeepAliveData({ key: '1', value: params });
	};

	useEffect(() => {
		const { pageNum, pageSize, name, age, status, height } = getKeepAliveData<TableDataParams>('1');
		form.setFieldsValue({ age, status });
		columnsSeachValue.current = {
			name: name || columnsSeachValue.current.name,
			height: height || columnsSeachValue.current.height
		};
		page.current = {
			pageNum: pageNum || page.current.pageNum,
			pageSize: pageSize || page.current.pageSize
		};
		submit();
	}, []);

	const submit = () => {
		let params = form.getFieldsValue();

		setKeepAlive({ ...params, ...page.current, ...columnsSeachValue.current });

		getTableData({ ...params, ...page.current, ...columnsSeachValue.current });
	};

	const onPaginationChange = (pageNum: number, pageSize: number) => {
		page.current = {
			pageNum: pageNum,
			pageSize: pageSize
		};
		submit();
	};

	const reset = () => {
		form.resetFields();
		submit();
	};
	return (
		<div>
			<SeachForm formProps={{ form }} reset={reset} submit={submit}></SeachForm>
			{/* <ClassCom hh={1}></ClassCom> */}
			<Icard styles={{ body: { marginTop: '10px' } }}>
				<HeaderEdit type={'seachForm'}></HeaderEdit>
				<Itable<TableDataResponse> rowKey="key" columns={columns} dataSource={expensesTableData} loading={loading} scroll={{ x: '100%' }} />
				<Ipaginations
					className="mt-4"
					total={total}
					pageSize={page.current.pageSize}
					current={page.current.pageNum}
					onChange={onPaginationChange}></Ipaginations>
			</Icard>
		</div>
	);
};

export default Expenses;
