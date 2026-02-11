/**
 * @file form hooks
 * @author ly
 * @createDate 2023年1月3日
 */
import { useContext, useEffect } from 'react';
import { Form } from 'antd';
import { useRequest } from 'ahooks';
import type { FormInstance } from 'antd/es/form';
import type { ButtonOptionsParams, FormParams } from '../EditForm';
import { Context } from '../context';
import { anyOptions } from '../service';
import { Rule } from 'antd/es/form';
import { FormItemParams } from '@/antdComponents/iForm/type';

// 监听绑定表单的变化 修改GenerateForm
export const useEditFormItemValue = (key: keyof FormParams, form: FormInstance<FormParams>) => {
	const context = useContext(Context);

	const nameValue = Form.useWatch(key, form);

	useEffect(() => {
		if (context?.state.selectFormItemKey) {
			const newFormList = context.state.formList.map((item) => {
				if (context?.state.selectFormItemKey === item.key) {
					return { ...item, [key]: nameValue };
				}
				return item;
			});

			context.dispatch({ type: 'formList', value: newFormList });
		}
	}, [nameValue]);
};

// 监听没有绑定表单的变化 修改GenerateForm
export const useEditItemValue = () => {
	const context = useContext(Context);
	//
	const editItemValue = (params: Partial<FormParams>) => {
		if (context?.state.selectFormItemKey) {
			const newFormList = context.state.formList.map((item) => {
				if (context?.state.selectFormItemKey === item.key) {
					return { ...item, ...params };
				}
				return item;
			});

			context.dispatch({ type: 'formList', value: newFormList });
		}
	};

	return { editItemValue };
};

// 请求url 修改GenerateForm
export const useWatchUrl = () => {
	const context = useContext(Context);

	const { run: getAnyOptions } = useRequest(anyOptions, {
		manual: true,
		onSuccess: (res) => {
			const { data } = res;

			const newFormList =
				context?.state.formList.map((item) => {
					if (item.key === context.state.selectFormItemKey) {
						return { ...item, option: data };
					}
					return item;
				}) || [];

			context?.dispatch({ type: 'formList', value: newFormList });
		}
	});

	return [getAnyOptions];
};

// 拖拽数据转成标准表单数据
export const useFormData = () => {
	const getFormData = (dndFormData: FormParams): FormItemParams => {
		const { type, key, span, label, isRule, isRuleTitle, rule, ruleTitle, name, labelCol } = dndFormData;
		let newFormList: FormItemParams = {
			type,
			key,
			span,
			formItemProps: {
				name,
				label,
				labelCol: { span: labelCol },
				wrapperCol: { span: 24 - (labelCol || 0) },
				rules: [
					{ required: isRule === 2, message: isRuleTitle },
					{
						validator: (_: Rule, value) => {
							if (rule) {
								const reg = rule && new RegExp(rule.substring(1, rule.length - 1));
								// /^((0\d{2,3}-\d{7,8})|(1[34578]\d{9}))$/;
								if (value === '' || value === undefined || value === null) {
									return Promise.resolve();
								} else {
									if (reg !== '' && !reg?.test(value) && value !== '') {
										return Promise.reject(new Error(ruleTitle));
									} else {
										return Promise.resolve();
									}
								}
							}
							return Promise.resolve();
						}
					}
				]
			},
			comConfig: {}
		};
		if (newFormList.type === 'button') {
			const { options } = dndFormData as FormParams<'button'>;
			return {
				...newFormList,
				comConfig: { options: options }
			};
		}

		if (newFormList.type === 'select') {
			const { options, disabled, placeholder } = dndFormData as FormParams<'select'>;
			return {
				...newFormList,
				comConfig: { options: options, disabled, placeholder }
			};
		}

		if (newFormList.type === 'cascader') {
			const { options, disabled, placeholder } = dndFormData as FormParams<'cascader'>;
			return {
				...newFormList,
				comConfig: { disabled, options: options, placeholder }
			};
		}

		if (newFormList.type === 'input') {
			const { disabled, placeholder } = dndFormData;
			return {
				...newFormList,
				comConfig: { disabled, placeholder }
			};
		}

		if (newFormList.type === 'textArea') {
			const { disabled, placeholder } = dndFormData;
			return {
				...newFormList,
				comConfig: { disabled, placeholder }
			};
		}
		return newFormList;
	};
	return { getFormData };
};
