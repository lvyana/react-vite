/**
 * @file 搜索组件
 * @author ly
 * @createDate 2023年1月3日
 */
import React, { FC } from 'react';
import IsearchForm from '@/antdComponents/iSearchForm';
import { useHooksStatus } from '@/useHooks/usePublicApi';
import type { ExpensesFormParams } from '../index';
import type { FormInputType, FormSelectType, FormButtonType, FormItemParams } from '@/antdComponents/iForm/type';
import { FormInstance } from 'antd';
import type { FormProps } from '@/antdComponents/iForm';
export type ButtonType = 'subimt' | 'onReset';

/**
 * @param form 表单实例
 * @param onFinish
 */
interface Iprops {
	formProps: FormProps<ExpensesFormParams>;
	submit: () => void;
	reset: () => void;
}

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const SeachForm: FC<Iprops> = ({ formProps, submit, reset }) => {
	const { statusData } = useHooksStatus();

	const formList: FormItemParams[] = [
		{
			type: 'input',
			key: 2,
			span: 6,
			formItemProps: { name: 'age', label: '年龄', labelCol: { span: 6 }, wrapperCol: { span: 18 } },
			comConfig: {
				placeholder: '请输入年龄'
			}
		},
		{
			type: 'select',
			key: 3,
			span: 6,
			comConfig: {
				options: statusData,
				placeholder: '请选择状态',
				fieldNames: { label: 'name', value: 'status' }
			},
			formItemProps: {
				name: 'status',
				label: '状态',
				labelCol: { span: 6 },
				wrapperCol: { span: 18 }
			}
		},
		{
			type: 'button',
			key: 14,
			span: 6,
			comConfig: {
				options: [
					{ comConfig: { type: 'primary', name: '搜索', icon: 'icon-sousuo', onClick: submit }, tag: 'subimt' },
					{ comConfig: { name: '重置', icon: 'icon-zhongzhi', className: 'ml-1', onClick: reset }, tag: 'onReset' }
				],
				style: { marginLeft: '10px' }
			}
		}
	];

	return <IsearchForm formProps={formProps} formList={formList}></IsearchForm>;
};

export default SeachForm;
