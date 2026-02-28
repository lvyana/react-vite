/**
 * @file 表格
 * @author ly
 * @createDate 2020年4月27日
 */
import React from 'react';
import { SpinProps, Table } from 'antd';
import { ColumnsType, TableProps } from 'antd/es/table';
import { antIcon } from '@/components/antd/AppLoading';

/**
 * @method 表格内事件
 * @param type 类型
 * @param record 选中数据
 * @returns void
 */
export type TableClick<T> = (type: keyof T, record: T) => void;

export type AlignType = 'left' | 'right' | 'center';

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const Itable = <T extends object>({ loading, pagination, style, ...rest }: TableProps<T>) => {
	return (
		<Table
			{...rest}
			style={{ marginTop: '10px', ...style }}
			loading={loadingHandler(loading)}
			pagination={pagination === undefined ? false : pagination}
		/>
	);
};

const loadingHandler = (loading?: boolean | SpinProps) => {
	if (typeof loading === 'boolean') {
		return { indicator: antIcon, spinning: loading };
	}
	return loading;
};

export type { ColumnsType };
export default Itable;
