/**
 * @file 表格
 * @author ly
 * @createDate 2020年4月27日
 */
import React from 'react';
import { SpinProps, Table } from 'antd';
import { ColumnsType, TableProps } from 'antd/es/table';
import { antIcon } from '@/antdComponents/iLoading';

/**
 * @method 表格内事件
 * @param type 类型
 * @param record 选中数据
 * @retruns void
 */
export type ItbClick<T> = (type: keyof T, record: T) => void;

export type AlignType = 'left' | 'right' | 'center';

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const Itable = <T extends object>({ ...config }: TableProps<T>) => {
	const { loading, pagination, ...rest } = config;

	return <Table {...rest} style={{ marginTop: '10px' }} loading={loadingHandler(loading)} pagination={false} />;
};

const loadingHandler = (loading?: boolean | SpinProps) => {
	if (typeof loading === 'boolean') {
		return { indicator: antIcon, spinning: loading };
	} else {
		return loading;
	}
};

export type { ColumnsType };
export default Itable;
