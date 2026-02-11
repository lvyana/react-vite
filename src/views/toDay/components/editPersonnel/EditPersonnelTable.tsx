/**
 * @file 编辑团队表格信息
 * @author ly
 * @createDate 2022年11月20日
 */
import React, { FC } from 'react';
import Itable, { ColumnsType } from '@/antdComponents/iTable';
import Idropdown, { DropdownProps } from '@/antdComponents/iDropdown';
import { MenuProps } from 'antd/es/menu';
export interface EditPersonnelTableDataParams {
	key: string;
	name: string;
	age: number;
	address: string;
}

interface EditPersonnelTableProps {
	loading: boolean;
	data: EditPersonnelTableDataParams[];
}

type OnClickBtnType = '修改' | '删除';

const buttonOption: MenuProps['items'] = [
	{ label: '修改', key: 'link' },
	{ label: '删除', key: 'link' }
];
// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const EditPersonnelTable: FC<EditPersonnelTableProps> = ({ loading, data }) => {
	const onOpenChange: DropdownProps['onOpenChange'] = (open: boolean, info) => {};

	const onClickBtn = (type?: OnClickBtnType, value?: EditPersonnelTableDataParams) => {
		// console.log(type, value);
	};

	const columns: ColumnsType<EditPersonnelTableDataParams> = [
		{
			title: '姓名',
			dataIndex: 'name',
			key: 'name'
		},
		{
			title: '岗位',
			dataIndex: 'post',
			key: 'post'
		},
		{
			title: '操作',
			dataIndex: 'operation',
			key: 'operation',
			render: (value, record) => {
				return <Idropdown menu={{ items: buttonOption }} onOpenChange={onOpenChange}></Idropdown>;
			}
		}
	];

	return (
		<div>
			<Itable rowKey="key" columns={columns} dataSource={data} loading={loading}></Itable>
		</div>
	);
};

export default EditPersonnelTable;
