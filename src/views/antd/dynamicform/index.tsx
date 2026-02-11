/**
 * @file 实现表单集合demo
 * @author ly
 * @createDate 2020年4月27日
 */
import React, { startTransition, useEffect, useState } from 'react';
import Iform from '@/antdComponents/iForm';
import { Form, Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { FormItemParams } from '@/antdComponents/iForm/type';
import Icard from '@/antdComponents/iCard';
import { baseURL } from '@/api/request';
import { SelectType } from '@/antdComponents/iSelect';
import { SetChildrenDom, useFormTitle } from '@/antdComponents/iForm/useHooks';
import getRadio from '@/antdComponents/iRadio';
import { RadioChangeEvent } from 'antd/lib/radio';
import dayjs from 'dayjs';

type FormListParam = {
	selectOnChange: (value: SelectType['value']) => void;
	onSubmit: () => void;
	onReset: () => void;
	isTitle: string;
};
// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const Dynamicform = () => {
	const [isTitle, setIsTitle] = useState('0');

	const onChange = ({ target: { value } }: RadioChangeEvent) => {
		setIsTitle(value);
	};

	const selectOnChange = (value: SelectType['value']) => {};

	const onSubmit = () => {
		// 格式化时间
		const currentTime = dayjs(form.getFieldsValue().date).format('YYYY-MM-DD HH:mm:ss');
		console.log(currentTime);
	};
	const onReset = () => {
		// console.log(form.getFieldsValue());
	};

	const { formList } = useFormList({ selectOnChange, onSubmit, onReset, isTitle });

	//表单
	const [form] = Form.useForm();

	return (
		<div>
			<Icard>
				{getRadio({
					value: isTitle,
					options: [
						{ label: '表单', value: '0' },
						{ label: '文本', value: '1' }
					],
					optionType: 'button',
					onChange: onChange
				})}
				<Iform formList={formList} formProps={{ form: form }} />
			</Icard>
		</div>
	);
};
export default Dynamicform;

const useFormList = ({ selectOnChange, onSubmit, onReset, isTitle }: FormListParam) => {
	// 参数
	const formListDate: FormItemParams[] = [
		{
			type: 'input',
			key: 1,
			span: 24,
			formItemProps: { name: 'name', label: '姓名', rules: [], labelCol: { span: 6 }, wrapperCol: { span: 18 } },
			comConfig: {
				placeholder: '请输入姓名'
			}
		},
		{
			type: 'select',
			key: 2,
			span: 24,
			comConfig: {
				mode: 'multiple',
				placeholder: '请选择下拉框',
				options: [
					{ name: 'male', value: 'male', key: 1 },
					{ name: 'female', value: 'female', key: 2 }
				],
				onChange: selectOnChange,
				fieldNames: {
					label: 'name',
					value: 'value'
				}
			},
			formItemProps: {
				name: 'select',
				label: '下拉框',
				rules: [],
				labelCol: { span: 6 },
				wrapperCol: { span: 18 }
			}
		},
		{
			type: 'radio',
			key: 3,
			span: 24,
			comConfig: {
				options: [
					{
						icon: 'icon-taiyang',
						value: 'icon-zhuzhuangtu-dashuju',
						label: '太阳'
					},
					{
						icon: 'icon-ClearNight-qing-yewan',
						value: 'icon-drxx91',
						label: '月亮'
					}
				]
			},
			formItemProps: { name: 'radioIcon', label: '图标单选框', rules: [], labelCol: { span: 6 }, wrapperCol: { span: 18 } }
		},
		{
			type: 'radio',
			key: 4,
			span: 24,
			comConfig: {
				options: [
					{ label: '按钮11111111', value: '1' },
					{ label: '菜单222222222', value: '2' }
				]
			},
			formItemProps: { name: 'radio', label: '单选框', rules: [], labelCol: { span: 6 }, wrapperCol: { span: 18 } }
		},
		{
			type: 'checkboxGroup',
			key: 5,
			span: 24,
			comConfig: {
				options: [
					{ label: '按钮', value: '1' },
					{ label: '菜单', value: '2' }
				]
			},
			formItemProps: { name: 'checkbox', label: '多选框', rules: [], labelCol: { span: 6 }, wrapperCol: { span: 18 } }
		},
		{
			type: 'rate',
			key: 6,
			span: 24,
			comConfig: {
				tooltips: ['terrible', 'bad', 'normal', 'good', 'wonderful']
			},
			formItemProps: { name: 'rate', label: '评分', rules: [], labelCol: { span: 6 }, wrapperCol: { span: 18 } }
		},
		{
			type: 'treeSelect',
			key: 7,
			span: 24,
			comConfig: {
				placeholder: '请选择下拉树',
				fieldNames: { label: 'name', value: 'value', children: 'children' },
				treeData: [
					{
						name: 'Light122222222222',
						value: 'light',
						children: [{ title: 'Bamboo', value: 'bamboo' }]
					},
					{
						name: 'Light22333333333333',
						value: 'light2',
						children: [{ title: 'Bamboo2', value: 'bamboo2' }]
					}
				],
				treeCheckable: true
			},
			formItemProps: { name: 'treeSelect', label: '下拉树', rules: [], labelCol: { span: 6 }, wrapperCol: { span: 18 } }
		},
		{
			type: 'cascader',
			key: 8,
			span: 24,
			comConfig: {
				placeholder: '请选择联级',
				options: [
					{
						value: 'zhejiang',
						label: 'Zhejiang',
						children: [
							{
								value: 'hangzhou',
								label: 'Hangzhou'
							}
						]
					}
				]
			},
			formItemProps: {
				name: 'cascader',
				label: '联级',
				rules: [],
				labelCol: { span: 6 },
				wrapperCol: { span: 18 }
			}
		},
		{
			type: 'datePicker',
			key: 9,
			span: 24,
			formItemProps: {
				name: 'date',
				label: '时间',
				rules: [],
				labelCol: { span: 6 },
				wrapperCol: { span: 18 }
			},
			comConfig: { showTime: { defaultValue: dayjs('00:00:00', 'HH:mm:ss') }, format: 'YYYY-MM-DD HH:mm:ss' }
		},
		{
			type: 'rangePicker',
			key: 10,
			span: 24,
			formItemProps: {
				name: 'rangePicker',
				label: '时间区间',
				rules: [],
				labelCol: { span: 6 },
				wrapperCol: { span: 18 }
			}
		},
		{
			type: 'timeRangePicker',

			key: 11,
			span: 24,
			formItemProps: {
				name: 'timeRangePicker2',
				label: '可面试时间',
				rules: [
					{
						required: true,
						message: '请选择时间'
					}
				],
				labelCol: { span: 6 },
				wrapperCol: { span: 18 }
			}
		},
		{
			type: 'inputNumber',
			key: 12,
			span: 24,
			formItemProps: { name: 'inputNumber', label: '数字', rules: [], labelCol: { span: 6 }, wrapperCol: { span: 18 } }
		},
		{
			type: 'switch',
			key: 13,
			span: 24,
			formItemProps: { name: 'switch', valuePropName: 'checked', label: '是否', rules: [], labelCol: { span: 6 }, wrapperCol: { span: 18 } }
		},

		{
			type: 'upload',
			key: 14,
			span: 24,
			comConfig: {
				name: 'file',
				action: `${baseURL}/file`,
				headers: {
					Authorization: '{token:00}'
				},
				onChange: (info) => {
					const { status } = info.file;

					if (status !== 'uploading') {
						// console.log(info.file, info.fileList);
					}
					if (status === 'done') {
						message.success(`${info.file.name} file uploaded successfully.`);
					} else if (status === 'error') {
						message.error(`${info.file.name} file upload failed.`);
					}
				}
			},
			formItemProps: { label: 'upload', name: 'file', labelCol: { span: 6 }, wrapperCol: { span: 18 } }
		},
		{
			type: 'button',
			key: 15,
			span: 24,
			comConfig: {
				options: [
					{ comConfig: { name: '搜索', type: 'primary', waveType: 'happy', onClick: onSubmit }, tag: 'submit' },
					{ comConfig: { name: '重置', onClick: onReset }, tag: 'onReset' }
				],
				style: { float: 'right' }
			}
		}
	];
	const [formList, setFormList] = useState<FormItemParams[]>(formListDate);
	const setChildrenDom: SetChildrenDom = (name, comConfig) => {
		// const { children, ...config } = comConfig || {};
		// if (children) {
		// 	return comConfig;
		// }
		return {
			children: '--',
			...comConfig
		};
	};

	const { setFormListTitle } = useFormTitle(setChildrenDom);
	const getFormTitle = () => {
		startTransition(() => {
			if (isTitle === '0') {
				setFormList(formListDate);
			} else {
				setFormList(setFormListTitle(formList));
			}
		});
	};

	useEffect(() => {
		getFormTitle();
	}, [isTitle]);

	return { formList };
};
