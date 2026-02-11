/**
 * @file 导入JSON
 * @author ly
 * @createDate 2023年1月12日
 */
import React, { FC } from 'react';
import Imodal from '@/antdComponents/iModal';
import Iform from '@/antdComponents/iForm';
import type { FormInstance } from 'antd/lib/form/hooks/useForm';
import type { FormTextAreaType } from '@/antdComponents/iForm/type';
import { Rule } from 'antd/es/form';

type ImportJsonProps = {
	open: boolean;
	onOk: () => void;
	onCancel: () => void;
	confirmLoading: boolean;
	form: FormInstance<ImportJsonForm>;
};

export type ImportJsonForm = {
	json: string;
};

type FormListParams = [FormTextAreaType];

const validator = (rule: Rule, str: string) => {
	if (typeof str === 'string') {
		try {
			let obj = JSON.parse(str);
			if (typeof obj === 'object' && obj) {
				return Promise.resolve();
			} else {
				return Promise.reject('格式不对');
			}
		} catch (e) {
			return Promise.reject('格式不对');
		}
	}
};
// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const ImportJson: FC<ImportJsonProps> = ({ form, open, onOk, onCancel, confirmLoading }) => {
	const formList: FormListParams = [
		{
			type: 'textArea',
			key: '1',
			comConfig: { autoSize: { minRows: 20 } },
			span: 24,
			formItemProps: {
				label: 'JSON',
				name: 'json',
				rules: [
					{
						validator: validator
					}
				],
				labelCol: { span: 2 },
				wrapperCol: { span: 22 }
			}
		}
	];
	return (
		<Imodal width={1000} title={'导入dnd-json'} open={open} onOk={onOk} onCancel={onCancel} confirmLoading={confirmLoading}>
			<Iform formProps={{ form: form }} formList={formList} />
		</Imodal>
	);
};

export default ImportJson;
