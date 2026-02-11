/**
 * @file 表头搜索
 * @author ly
 * @createDate 2023年4月9日
 */
import React, { Key, useEffect, useMemo, useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import SeachStyle from './SeachStyle';
import { FilterDropdownProps } from 'antd/es/table/interface';
import getTreeSelect, { TreeSelectProps } from '@/antdComponents/iTreeSelect';
import { getInput, InputProps } from '@/antdComponents/iInput';
import { FormItemMapType } from '@/antdComponents/iForm';

/**
 * 表格表头参数配置
 * @param type 组件类型键
 * @param formItemParams 组件参数
 * @param dataIndex 表头搜索对应名字
 * @param form 表头所有搜索的ref数据
 * @param onSearch 搜索和重置回调
 */
type ColumnSearchProps<T extends Key | Key[], P> = {
	type: FormItemMapType;
	formItemParams: P;
	value?: T;
	onSearch: (value?: T) => void;
};

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

// 表格表头参数配置
const getColumnSearchProps = <T extends Key | Key[], P>({ type, value, onSearch, formItemParams }: ColumnSearchProps<T, P>) => ({
	filterDropdown: ({ ...config }: FilterDropdownProps) => {
		return <TableHeadSeach {...config} type={type} value={value} onSearch={onSearch} formItemParams={formItemParams}></TableHeadSeach>;
	},
	filterIcon: (filtered: boolean) => {
		return <SearchOutlined style={{ color: isValueType(value) }} />;
	}
});

// 表格表头filterDropdown组件
const TableHeadSeach = <T extends Key | Key[], P>({
	type,
	value,
	selectedKeys,
	setSelectedKeys,
	confirm,
	visible,
	onSearch,
	formItemParams
}: Omit<FilterDropdownProps, 'prefixCls' | 'close'> & ColumnSearchProps<T, P>) => {
	const cacheValue = useRef<T>();

	const onChangeTreeSelect: TreeSelectProps<T>['onChange'] = (value) => {
		if (Array.isArray(value)) {
			setSelectedKeys(value);
		} else {
			setSelectedKeys([value]);
		}
		cacheValue.current = value;
	};

	const onChangeInput: InputProps['onChange'] = (e) => {
		setSelectedKeys((e.target as HTMLInputElement).value ? [(e.target as HTMLInputElement).value] : []);
		cacheValue.current = (e.target as HTMLInputElement).value as T;
	};

	const isArray = useRef<'isArray'>();

	// 回显初始化数据
	useEffect(() => {
		if (visible) {
			if (Array.isArray(value)) {
				setSelectedKeys((value as Key[]) || []);
				isArray.current = 'isArray';
			} else {
				setSelectedKeys((value as Key) ? [value as Key] : []);
			}
		}
	}, [visible]);

	// 重置按钮
	const onClose = () => {
		setSelectedKeys([]);
		confirm();
		if (isArray.current === 'isArray') {
			onSearch([] as unknown as T);
		} else {
			onSearch(undefined);
		}
	};

	// 确认按钮
	const onSubmit = () => {
		onSearch(cacheValue.current);

		// if (type === 'input') {
		// 	form.current[dataIndex] = selectedKeys[0];
		// } else if (type === 'treeSelect') {
		// 	form.current[dataIndex] = selectedKeys;
		// }

		setSelectedKeys(selectedKeys);
		confirm();
	};

	const child = useMemo(() => {
		// if (formItemParams.onChange) {
		// 	console.warn(type + '-formItemParams.onChange 无法生效');
		// }

		if (type === 'treeSelect') {
			return getTreeSelect({ ...formItemParams, value: selectedKeys, onChange: onChangeTreeSelect });
		}
		if (type === 'input') {
			return getInput({ ...formItemParams, value: selectedKeys[0], onChange: onChangeInput });
		}
	}, [selectedKeys, formItemParams]);

	return (
		<SeachStyle onClose={onClose} onSubmit={onSubmit}>
			{child}
		</SeachStyle>
	);
};

export default getColumnSearchProps;

const isValueType = <T,>(value: T) => {
	if (Array.isArray(value)) {
		return value?.length ? '#1890ff' : undefined;
	}
	return value ? '#1890ff' : undefined;
};
