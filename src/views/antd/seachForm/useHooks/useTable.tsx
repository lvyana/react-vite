/**
 * @file 表格组件
 * @author ly
 * @createDate 2022年3月26日
 */
import React, { Key, useRef, useState } from 'react';
import { Button, Tag, Space } from 'antd';
import Itooltip from '@/antdComponents/iTooltip';
import Idropdown from '@/antdComponents/iDropdown';
import { ColumnsType } from '@/antdComponents/iTable';
import { useNavigate } from 'react-router-dom';
import { TableDataParams, TableDataResponse } from '../service';
import getColumnSearchProps from '@/antdComponents/iTable/components/headSeach';
import { ColumnsSeachValue } from '../index';
import { MenuProps } from 'antd/lib/menu';
import { TreeSelectProps } from '@/antdComponents/iTreeSelect';
import { InputProps } from '@/antdComponents/iInput';

/**
 * @method 按钮回调事件
 * @param type 事件类型标识
 * @param value 某一条数据
 * @returns void
 */
export type ButtonEvent = { type: 'name'; value?: string[] };
export type ButtonEvent1 = { type: 'height'; value?: string };

export interface HeaderTableParams {
	buttonEvent: (value: ButtonEvent | ButtonEvent1) => void;
	columnsSeachValue: React.MutableRefObject<ColumnsSeachValue>;
}

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const useHeaderTable = ({ buttonEvent, columnsSeachValue }: HeaderTableParams) => {
	const navigate = useNavigate();

	//表格单元里面的功能回调
	const tbClick = (type: Key, record: TableDataResponse) => {
		if (type === 'name') {
			navigate('/mycenter', { state: { name: record.name } });
		}
	};

	// 表格图表移入移出功能
	const onOpenChange = (open: boolean, record: TableDataResponse) => {
		if (open) {
			// setButtonOption([
			// 	{ label: '修改', key: '1' },
			// 	{ label: '删除', key: '2' }
			// ]);
		} else {
			// setBtFun([]);
		}
	};
	// 初始化按钮
	const [buttonOption, setButtonOption] = useState<MenuProps['items']>([
		{ label: <div>修改</div>, key: '11' },
		{ label: <div>删除</div>, key: '22' }
	]);

	const columns: ColumnsType<TableDataResponse> = [
		{
			title: '名字',
			dataIndex: 'name',
			key: 'name',
			...getColumnSearchProps<string[], TreeSelectProps<{ title: string; value: string }>>({
				type: 'treeSelect',
				value: columnsSeachValue.current.name,
				onSearch: (value) => buttonEvent({ type: 'name', value }),
				formItemParams: {
					multiple: true,
					treeData: [
						{
							title: 'placeholder',
							value: 'light'
						},
						{
							title: 'placeholder1',
							value: 'light1'
						}
					],
					fieldNames: { label: 'title', value: 'value' },
					placeholder: '请选择名字'
				}
			}),

			width: 100,
			align: 'center',
			render: (text, record) => (
				<Itooltip placement="top" overlayInnerStyle={{ width: 200 }} title={<>{text}</>}>
					<Button type="link" style={{ width: 100 }} onClick={() => tbClick('name', record)}>
						<div className="truncate" style={{ width: 70 }}>
							{text}
						</div>
					</Button>
				</Itooltip>
			)
		},
		{
			title: '年龄',
			dataIndex: 'age',
			key: 'age',
			width: 100,
			align: 'center',

			render: (text) => (
				<Itooltip placement="top" overlayInnerStyle={{ width: '100px' }} title={<>{text}</>}>
					<div className="truncate">{text}</div>
				</Itooltip>
			)
		},
		{
			title: '体重',
			dataIndex: 'weight',
			key: 'weight',
			align: 'center',
			render: (text) => (
				<Itooltip placement="top" overlayInnerStyle={{ width: '100px' }} title={<>{text}</>}>
					<div className="truncate">{text}</div>
				</Itooltip>
			)
		},
		{
			title: '身高',
			dataIndex: 'height',
			key: 'height',
			align: 'center',
			...getColumnSearchProps<string, InputProps>({
				type: 'input',
				value: columnsSeachValue.current.height,
				onSearch: (value) => buttonEvent({ type: 'height', value }),
				formItemParams: {
					placeholder: '请输入身高'
				}
			}),
			render: (text) => (
				<Itooltip placement="top" overlayInnerStyle={{ width: '100px' }} title={<>{text}</>}>
					<div className="truncate">{text}</div>
				</Itooltip>
			)
		},
		{
			title: '备注',
			dataIndex: 'remark',
			key: 'remark',
			align: 'center',
			render: (text) => (
				<Itooltip placement="top" overlayInnerStyle={{ width: '180px' }} title={<>{text}</>}>
					<div className="truncate">{text}</div>
				</Itooltip>
			)
		},
		{
			title: '操作',
			key: 'operation',
			width: 80,
			align: 'center',
			render: (text, record) => {
				return (
					<Idropdown
						menu={{ items: buttonOption, onClick: (info) => tbClick(info.key, record) }}
						onOpenChange={(open) => onOpenChange(open, record)}></Idropdown>
				);
			}
		}
	];

	return { columns };
};

export default useHeaderTable;
