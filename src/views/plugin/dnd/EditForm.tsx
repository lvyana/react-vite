/**
 * @file 右侧编辑表单
 * @author ly
 * @createDate 2022年12月17日
 */
import React, { memo, useContext, useEffect, useMemo, useState } from 'react';
import Iform, { OnValuesChange } from '@/antdComponents/iForm';
import { Button, Form, Tabs, TabsProps } from 'antd';
import { Context } from './context';
import { useEditFormItemValue, useEditItemValue, useWatchUrl } from './useHooks';
import StaticOptions from './components/StaticOptions';
import CreatButton from './components/CreatButton';
import { isPassword } from '@/utils/rules';
import { v4 as uuidv4 } from 'uuid';
import type { FormItemMapType, FormItemParams } from '@/antdComponents/iForm/type';
import type { ItemTypes, Options } from './type';
import useThemeHooks from '@/config/antd/theme/useThemeHooks';
import { ButtonItemParams } from '@/antdComponents/iButton/List';

type FormListParam = {
	staticPattern: string;
	items: TabsProps['items'];
	onChangeStatic(value: string): void;
	staticOptions: typeof OPTIONS;
	updateStaticOptions: (data: Options[]) => void;
	onGetOption(): Promise<void>;
	formListLabel?: {
		label: string | undefined;
		name: string;
	}[];
	buttonOptions: ButtonOptionsParams[];
	updateButtonOptions(data: ButtonOptionsParams[]): void;
};

/**
 * @param span 宽度
 * @param label 名称
 * @param disabled 禁用
 * @param url 请求数据路径
 * @param parent 关联父级id
 * @param isRule 是否必填
 * @param ruleTitle 必填提示
 * @param name 字段名
 * @param labelCol label宽度
 * @param trigger option切换类型
 * @param option options数据
 * @param urlLabel options label
 * @param urlValue options value
 */
export type FormParams<T = FormItemMapType> = {
	span: number;
	label?: string;
	placeholder?: string;
	disabled?: boolean;
	url?: string;
	parent?: string;
	isRule?: 1 | 2;
	isRuleTitle?: string;
	rule?: string;
	ruleTitle?: string;
	name: string;
	labelCol?: number;
	trigger?: string;
	options?: T extends 'button' ? ButtonOptionsParams[] : Options[];
	urlLabel?: string;
	urlValue?: string;
	type: T;
	permission?: string;
	icon?: string;
	key: string;
};

/**
 * @param label 名称
 * @param value 标识
 */
type DisabledParams = {
	label: string;
	value: boolean;
};

const DISABLED_OPTIONS: DisabledParams[] = [
	{ label: '启用', value: false },
	{ label: '禁用', value: true }
];

/**
 * @param label 名称
 * @param value 标识
 */
export type ButtonOptionsParams = {
	// id: string;
} & ButtonItemParams<string>;

const BUTTON_OPTIONS: ButtonOptionsParams[] = [
	// {
	// 	name: '确认',
	// 	type: 'ok',
	// 	btnType: 'primary',
	// 	span: 12,
	// 	hasPermiss: '',
	// 	iconFont: '',
	// 	id: '0'
	// }
];

// options类型对应form类型
const HAS_SELECT_TYPE = ['select', 'cascader'];
const HAS_SELECT_NAME = [
	'label',
	'placeholder',
	'name',
	'labelCol',
	'span',
	'disabled',
	'trigger',
	'urlType',
	'staticOptions',
	'url',
	'urlLabel',
	'urlValue',
	'urlBtn',
	'parent',
	'isRule',
	'isRuleTitle',
	'rule',
	'ruleTitle'
];

// 通用类型
const HAS_COMMON_TYPE = ['input', 'textArea'];
const HAS_COMMON_NAME = [
	'label',
	'placeholder',
	'name',
	'labelCol',
	'span',
	'disabled',
	'parent',
	'isRule',
	'isRuleTitle',
	'rule',
	'ruleTitle'
];

// 按钮
const HAS_BUTTON_TYPE = ['button'];
const HAS_BUTTON_NAME = ['name', 'span', 'button'];

const OPTIONS = [{ value: '', label: '', id: uuidv4() }];

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const EditForm = memo(() => {
	const { token } = useThemeHooks();

	const { editItemValue } = useEditItemValue();

	const context = useContext(Context);

	const [form] = Form.useForm<FormParams>();

	// 获取options数据
	const [getAnyOptions] = useWatchUrl();

	// 点击发送
	const onGetOption = async () => {
		if (staticPattern === '1') {
			editItemValue({ options: staticOptions });
		} else if (staticPattern === '2') {
			try {
				await form.validateFields(['url']);
				const url = form.getFieldValue('url');
				getAnyOptions(url);
			} catch (error) {}
		}
	};

	// 获取所有label name(不包括自己 关联父级)
	const formListLabel = useMemo(() => {
		// 先过滤
		const filterOneself = context?.state.formList.filter((item) => {
			return item.key !== context.state.selectFormItemKey;
		});

		return filterOneself?.map((item) => {
			return { label: item.label, name: item.name };
		});
	}, [context?.state.formList]);

	// 静态、动态模式切换
	const [staticPattern, setStaticPattern] = useState('1');

	const items: TabsProps['items'] = [
		{
			key: '1',
			label: `静态数据`
		},
		{
			key: '2',
			label: `动态数据`
		}
	];

	const onChangeStatic: FormListParam['onChangeStatic'] = (value) => {
		setStaticPattern(value);

		if (value === '1') {
			form.setFieldValue('url', '');
			form.setFieldValue('urlLabel', '');
			form.setFieldValue('urlValue', '');
		} else if (value === '2') {
			setStaticOptions(OPTIONS);
		}

		// 清空option数据
		editItemValue({ options: [], trigger: value });
	};

	// 静态数据模板
	const [staticOptions, setStaticOptions] = useState(OPTIONS);
	const updateStaticOptions: FormListParam['updateStaticOptions'] = (data) => {
		setStaticOptions(data);
	};

	// 生成按钮
	const [buttonOptions, setButtonOptions] = useState(BUTTON_OPTIONS);
	const updateButtonOptions: FormListParam['updateButtonOptions'] = (data) => {
		setButtonOptions(data);
		editItemValue({ options: data });
	};

	const { formList } = useFormList({
		staticPattern,
		items,
		onChangeStatic,
		staticOptions,
		updateStaticOptions,
		onGetOption,
		formListLabel,
		buttonOptions,
		updateButtonOptions
	});
	// 匹配类型 生成表单
	const newFormList = useMemo(() => {
		const selectFormItem = context?.state.formList.find((item) => {
			return item.key === context?.state.selectFormItemKey;
		});
		if (selectFormItem?.type) {
			return formList.filter((item) => {
				const { name } = item.formItemProps || {};
				if (HAS_SELECT_TYPE.indexOf(selectFormItem?.type) > -1) {
					// 读取下拉类型所需要的form类型
					return HAS_SELECT_NAME.indexOf(name) > -1;
				} else if (HAS_COMMON_TYPE.indexOf(selectFormItem?.type) > -1) {
					// 读取通用类型所需要的form类型
					return HAS_COMMON_NAME.indexOf(name) > -1;
				} else if (HAS_BUTTON_TYPE.indexOf(selectFormItem?.type) > -1) {
					return HAS_BUTTON_NAME.indexOf(name) > -1;
				}
			});
		} else {
			return [];
		}
	}, [context?.state.selectFormItemKey, context?.state.formList, staticOptions, buttonOptions]);

	// 初始化表单数据
	useEffect(() => {
		if (context?.state.selectFormItemKey) {
			const newFormListItem = context.state.formList.find((item) => {
				return context?.state.selectFormItemKey === item.key;
			});

			const { type, span, label, placeholder, disabled, url, parent, name, rule, isRule, labelCol, trigger, urlLabel, urlValue, options } =
				newFormListItem || {};
			form.setFieldsValue({ span, label, placeholder, disabled, url, parent, name, rule, isRule, labelCol, urlLabel, urlValue, options });

			if (trigger) {
				setStaticPattern(trigger);
			}

			if (type === 'button') {
				setButtonOptions(options as ButtonOptionsParams[]);
			}
			if (type === 'select' || type === 'cascader') {
				setStaticOptions((options?.length ? options : OPTIONS) as Options[]);
			}
		}
	}, [context?.state.selectFormItemKey]);

	// // span
	// useEditFormItemValue('span', form);

	// // label
	// useEditFormItemValue('label', form);

	// // placeholder
	// useEditFormItemValue('placeholder', form);

	// // disabled
	// useEditFormItemValue('disabled', form);

	// // url
	// useEditFormItemValue('url', form);

	// // parent
	// useEditFormItemValue('parent', form);

	// // rule
	// useEditFormItemValue('isRule', form);
	// useEditFormItemValue('isRuleTitle', form);
	// useEditFormItemValue('rule', form);
	// useEditFormItemValue('ruleTitle', form);

	// // name
	// useEditFormItemValue('name', form);

	// // labelCol
	// useEditFormItemValue('labelCol', form);

	// // urlLabel
	// useEditFormItemValue('urlLabel', form);

	// // urlValue
	// useEditFormItemValue('urlValue', form);

	const onValuesChange = (changedValues: keyof FormParams, allValues: FormParams) => {
		if (context?.state.selectFormItemKey) {
			const newFormList = context.state.formList.map((item) => {
				if (context?.state.selectFormItemKey === item.key) {
					return { ...item, ...allValues };
				}
				return item;
			});

			context.dispatch({ type: 'formList', value: newFormList });
		}
	};

	return context?.state.selectFormItemKey ? (
		<div className="rounded-lg p-2 border-2 border-solid" style={{ borderColor: token.colorPrimaryBorder }}>
			<Iform formProps={{ form: form, onValuesChange }} formList={newFormList}></Iform>
		</div>
	) : (
		<></>
	);
});
EditForm.displayName = 'EditForm';

const useFormList = ({
	staticPattern,
	items,
	onChangeStatic,
	staticOptions,
	updateStaticOptions,
	onGetOption,
	formListLabel,
	buttonOptions,
	updateButtonOptions
}: FormListParam) => {
	// 参数
	const formList: FormItemParams[] = [
		{
			type: 'input',
			key: '1',
			span: 24,
			formItemProps: { label: '标签', name: 'label', labelCol: { span: 6 }, wrapperCol: { span: 18 } }
		},
		{
			type: 'input',
			key: '122',
			span: 24,
			formItemProps: { label: 'placeholder', name: 'placeholder', labelCol: { span: 6 }, wrapperCol: { span: 18 } }
		},
		{
			type: 'input',
			key: '2',
			span: 24,
			formItemProps: {
				label: '数据字段',
				name: 'name',
				rules: [
					{ required: true, message: '请输入数据字段' },
					{
						validator: isPassword
					}
				],
				labelCol: { span: 6 },
				wrapperCol: { span: 18 }
			}
		},
		{
			type: 'slider',
			key: '3',
			comConfig: {
				max: 24,
				min: 0
			},
			span: 24,
			formItemProps: { label: 'label宽度', name: 'labelCol', labelCol: { span: 6 }, wrapperCol: { span: 18 } }
		},
		{
			type: 'slider',
			key: '4',
			comConfig: {
				max: 24,
				min: 6
			},
			span: 24,
			formItemProps: { label: '总宽度', name: 'span', labelCol: { span: 6 }, wrapperCol: { span: 18 } }
		},
		{
			type: 'select',
			key: '5',
			comConfig: {
				options: DISABLED_OPTIONS,
				allowClear: false
			},
			span: 24,
			formItemProps: { label: '是否禁用', name: 'disabled', labelCol: { span: 6 }, wrapperCol: { span: 18 } }
		},
		{
			type: 'slot',
			span: 24,
			comConfig: {
				children: (
					<>
						<Tabs activeKey={staticPattern} items={items} onChange={onChangeStatic} />
					</>
				)
			},

			key: '6',
			formItemProps: { name: 'urlType', labelCol: { span: 0 }, wrapperCol: { span: 24 } }
		},
		{
			type: 'slot',
			key: '7777',
			span: 24,
			show: staticPattern === '1',
			comConfig: {
				children: <StaticOptions options={staticOptions} updateOptions={updateStaticOptions} />
			},
			formItemProps: { name: 'staticOptions', labelCol: { span: 0 }, wrapperCol: { span: 24 } }
		},
		{
			type: 'input',
			key: '88',
			comConfig: {
				placeholder: '请输入url'
			},
			span: 12,
			show: staticPattern === '2',
			formItemProps: {
				label: '',
				name: 'url',
				rules: [{ required: true, message: '请输入url' }],
				labelCol: { span: 0 },
				wrapperCol: { span: 24 }
			}
		},
		{
			type: 'input',
			key: '98',
			comConfig: {
				placeholder: 'label'
			},
			span: 6,
			show: staticPattern === '2',
			formItemProps: {
				label: '',
				name: 'urlLabel',
				rules: [{ required: true, message: '请输入label' }],
				labelCol: { span: 0 },
				wrapperCol: { span: 24 }
			}
		},
		{
			type: 'input',
			key: '108',
			comConfig: {
				placeholder: 'value'
			},
			span: 6,
			show: staticPattern === '2',
			formItemProps: {
				label: '',
				name: 'urlValue',
				rules: [{ required: true, message: '请输入value' }],
				labelCol: { span: 0 },
				wrapperCol: { span: 24 }
			}
		},
		{
			type: 'slot',
			key: '11',
			span: 6,
			// show: staticPattern === '1',
			comConfig: {
				children: (
					<div className="flex justify-end">
						<Button type="primary" onClick={onGetOption}>
							发送
						</Button>
					</div>
				)
			},
			formItemProps: { name: 'urlBtn', labelCol: { span: 0 }, wrapperCol: { span: 24 } }
		},
		{
			type: 'select',
			key: '12',
			comConfig: {
				options: formListLabel,
				fieldNames: { label: 'label', value: 'name' }
			},
			span: 24,
			formItemProps: { label: '关联父级', name: 'parent', labelCol: { span: 6 }, wrapperCol: { span: 18 } }
		},
		{
			type: 'radio',
			key: '13',
			span: 24,
			comConfig: {
				options: [
					{
						// icon: 'icon-zhuzhuangtu-dashuju',
						value: 1,
						label: '否'
					},
					{
						// icon: 'icon-drxx91',
						value: 2,
						label: '是'
					}
				],
				optionType: 'button'
			},
			formItemProps: { name: 'isRule', label: '是否必填', rules: [], labelCol: { span: 6 }, wrapperCol: { span: 18 } }
		},
		{
			type: 'textArea',
			key: '14',
			span: 24,
			formItemProps: { label: '是否必填提示语', name: 'isRuleTitle', labelCol: { span: 6 }, wrapperCol: { span: 18 } }
		},
		{
			type: 'textArea',
			key: '15',
			span: 24,
			formItemProps: { label: '校验规则', name: 'rule', labelCol: { span: 6 }, wrapperCol: { span: 18 } }
		},
		{
			type: 'textArea',
			key: '16',
			span: 24,
			formItemProps: { label: '校验规则提示语', name: 'ruleTitle', labelCol: { span: 6 }, wrapperCol: { span: 18 } }
		},
		{
			type: 'slot',
			key: 'button',
			span: 24,
			comConfig: { children: <CreatButton options={buttonOptions} updateOptions={updateButtonOptions} /> },
			formItemProps: { name: 'button', labelCol: { span: 0 }, wrapperCol: { span: 24 } }
		}
	];
	return { formList };
};

export default EditForm;
