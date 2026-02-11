/**
 * @param 左侧有哪些表单类型
 */
import { InputProps } from '@/antdComponents/iInput';
import { Button } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { ButtonOptionsParams } from './EditForm';

// export type ItemTypesParams = 'input' | 'select' | 'textArea' | 'cascader' | 'button';
export enum ItemTypes {
	INPUT = 'input',
	SELECT = 'select',
	TEXTAREA = 'textArea',
	CASCADER = 'cascader',
	BUTTON = 'button'
}
// export const ITEM_TYPES: ItemTypes = {
// 	INPUT: 'input',
// 	SELECT: 'select',
// 	TEXTAREA: 'textArea',
// 	CASCADER: 'cascader',
// 	BUTTON: 'button'
// };

/**
 * @name 左侧item类型
 */
export const FORM_ITEM = 'formItem';

/**
 * @name 中间生成表单中item
 */
export const GENERATE_FORM_ITEM = 'GenerateFormItem';

/**
 * @param value option value
 * @param label option label
 * @param id 唯一key
 */
export interface Options {
	value: string;
	label: string;
	id: string;
}

// button的默认值
export const getButtonDefaultValue = () => {
	return {
		type: 'button' as const,
		name: 'name',
		key: uuidv4(),
		span: 24,
		options: [
			{
				comConfig: { name: '确认', type: 'primary', icon: '' },
				tag: 'ok',
				span: 12,
				permission: ''
				// id: '0'
			}
		] as ButtonOptionsParams[]
	};
};

// input的默认值
export const getInputDefaultValue = () => {
	return {
		type: 'input' as const,
		label: 'label',
		placeholder: '请输入label',
		name: 'name',
		disabled: false,
		key: uuidv4(),
		isRule: 1 as const,
		span: 24,
		labelCol: 6,
		trigger: '1'
		// layout: { labelCol: { span: 6 }, wrapperCol: { span: 18 } }
	};
};

// select的默认值
export const getSelectDefaultValue = () => {
	return {
		type: 'select' as const,
		label: 'label',
		placeholder: '请输入label',
		name: 'name',
		disabled: false,
		key: uuidv4(),
		isRule: 1 as const,
		span: 24,
		labelCol: 6, // layout: { labelCol: { span: 6 }, wrapperCol: { span: 18 } },
		options: []
	};
};

export const getDefaultValue = {
	button: getButtonDefaultValue,
	input: getInputDefaultValue,
	select: getSelectDefaultValue,
	cascader: getSelectDefaultValue,
	radio: getSelectDefaultValue,
	checkbox: getSelectDefaultValue,
	textArea: getInputDefaultValue,
	slot: getInputDefaultValue,
	switch: getInputDefaultValue,
	slider: getInputDefaultValue,
	treeSelect: getSelectDefaultValue,
	datePicker: getInputDefaultValue,
	rangePicker: getInputDefaultValue,
	timeRangePicker: getInputDefaultValue,
	timePicker: getInputDefaultValue,
	inputNumber: getInputDefaultValue,
	upload: getInputDefaultValue,
	checkboxGroup: getSelectDefaultValue,
	rate: getInputDefaultValue
};
