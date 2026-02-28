/**
 * @file 表单组件type
 * @author ly
 * @createDate 2023年12月27日
 */
import React, { ReactNode } from 'react';
import type { DatePickerProps, RangePickerProps } from '../iPicker';
import type { RadioType } from '../iRadio';
import type { InputNumberProps, InputProps, TextAreaProps } from '../iInput';
import type { SelectType } from '../iSelect';
import type { CascaderType } from '../iCascader';
import type { SwitchProps } from '../iSwitch';
import type { IbuttonListProps } from '../iButton/List';
import type { CheckboxGroupProps, CheckboxProps } from '../iCheckbox';
import type { RateType } from '../iRate';
import type { SliderSingleProps, SliderRangeProps } from '../iSlider';
import type { DraggerProps } from '../iUpload';
import type { TimePickerProps, TimeRangePickerProps } from 'antd/lib/time-picker';
import type { FormItemProps } from 'antd/lib/form';
import type { TreeSelectProps } from '../iTreeSelect';

/**
 * 表单item参数
 * @param show 是否显示
 * @param type 表单类型
 * @param span 宽度
 * @param key 唯一标识
 * @param formItemProps formItem参数
 * @param comConfig formItem内部组件参数
 */
export type FormItemParams =
	| FormInputType
	| FormSelectType
	| FormTreeselectType
	| FormCascaderType
	| FormAlonePicker
	| FormBothPicker
	| FormTimePicker
	| FormTimeRangePicker
	| FormInputNumberType
	| FormSwitchType
	| FormButtonType
	| FormRadioType
	| FormCheckboxType
	| FormCheckboxGroupType
	| FormRateType
	| FormTextAreaType
	| FormSliderType
	| FormUploadType
	| FormSlotType;

// input
export type FormInputType = {
	type: 'input';
	span?: number;
	key: string | number;
	show?: boolean;
	comConfig?: InputProps;
	formItemProps?: FormItemProps;
};

// select
export type FormSelectType = {
	type: 'select';
	span?: number;
	key: string | number;
	show?: boolean;
	comConfig?: SelectType;
	formItemProps?: FormItemProps;
};

// treeSelect
export type FormTreeselectType = {
	type: 'treeSelect';
	span?: number;
	key: string | number;
	show?: boolean;
	comConfig?: TreeSelectProps;
	formItemProps?: FormItemProps;
};

// cascader
export type FormCascaderType = {
	type: 'cascader';
	span?: number;
	key: string | number;
	show?: boolean;
	comConfig?: CascaderType;
	formItemProps?: FormItemProps;
};

// DatePicker
export type FormAlonePicker = {
	type: 'datePicker';
	span?: number;
	key: string | number;
	show?: boolean;
	comConfig?: DatePickerProps;
	formItemProps?: FormItemProps;
};

// RangePicker
export type FormBothPicker = {
	type: 'rangePicker';
	span?: number;
	key: string | number;
	show?: boolean;
	comConfig?: RangePickerProps;
	formItemProps?: FormItemProps;
};

// TimePicker
export type FormTimePicker = {
	type: 'timePicker';
	span?: number;
	key: string | number;
	show?: boolean;
	comConfig?: TimePickerProps;
	formItemProps?: FormItemProps;
};

// TimeRangePicker
export type FormTimeRangePicker = {
	type: 'timeRangePicker';
	span?: number;
	key: string | number;
	show?: boolean;
	comConfig?: TimeRangePickerProps;
	formItemProps?: FormItemProps;
};

// inputNumber
export type FormInputNumberType = {
	type: 'inputNumber';
	span?: number;
	key: string | number;
	show?: boolean;
	comConfig?: InputNumberProps;
	formItemProps?: FormItemProps;
};

// switch
export type FormSwitchType = {
	type: 'switch';
	span?: number;
	key: string | number;
	show?: boolean;
	comConfig?: SwitchProps;
	formItemProps?: FormItemProps;
};

// button
export type FormButtonType = {
	type: 'button';
	span?: number;
	key: string | number;
	show?: boolean;
	comConfig?: IbuttonListProps;
	formItemProps?: FormItemProps;
};

// radio
export type FormRadioType = {
	type: 'radio';
	span?: number;
	key: string | number;
	show?: boolean;
	comConfig?: RadioType;
	formItemProps?: FormItemProps;
};

// checkboxGroup
export type FormCheckboxGroupType = {
	type: 'checkboxGroup';
	span?: number;
	key: string | number;
	show?: boolean;
	comConfig?: CheckboxGroupProps;
	formItemProps?: FormItemProps;
};

// checkbox
export type FormCheckboxType = {
	type: 'checkbox';
	span?: number;
	key: string | number;
	show?: boolean;
	comConfig?: CheckboxProps;
	formItemProps?: FormItemProps;
};

// rate
export type FormRateType = {
	type: 'rate';
	span?: number;
	key: string | number;
	show?: boolean;
	comConfig?: RateType;
	formItemProps?: FormItemProps;
};

// textArea
export type FormTextAreaType = {
	type: 'textArea';
	span?: number;
	key: string | number;
	show?: boolean;
	comConfig?: TextAreaProps;
	formItemProps?: FormItemProps;
};

// slider
export type FormSliderType = {
	type: 'slider';
	span?: number;
	key: string | number;
	show?: boolean;
	comConfig?: SliderSingleProps | SliderRangeProps;
	formItemProps?: FormItemProps;
};

// upload
export type FormUploadType = {
	type: 'upload';
	span?: number;
	key: string | number;
	show?: boolean;
	comConfig?: DraggerProps;
	formItemProps?: FormItemProps;
};

// slot
export type SlotType = {
	children?: ReactNode;
};

export type FormSlotType = {
	type: 'slot';
	span?: number;
	key: string | number;
	show?: boolean;
	comConfig?: SlotType;
	formItemProps?: FormItemProps;
};

export interface FormItemMap {
	input: (item: InputProps) => JSX.Element;
	select: (item: SelectType) => JSX.Element;
	treeSelect: (item: TreeSelectProps) => JSX.Element;
	cascader: (item: CascaderType) => JSX.Element;
	datePicker: (item: DatePickerProps) => JSX.Element;
	rangePicker: (item: RangePickerProps) => JSX.Element;
	timePicker: (item: TimePickerProps) => JSX.Element;
	timeRangePicker: (item: TimeRangePickerProps) => JSX.Element;
	inputNumber: (item: InputNumberProps) => JSX.Element;
	switch: (item: SwitchProps) => JSX.Element;
	button: (item: IbuttonListProps) => JSX.Element;
	radio: (item: RadioType) => JSX.Element;
	checkboxGroup: (item: CheckboxGroupProps) => JSX.Element;
	checkbox: (item: CheckboxProps) => JSX.Element;
	rate: (item: RateType) => JSX.Element;
	textArea: (item: TextAreaProps) => JSX.Element;
	slider: (item: SliderSingleProps | SliderRangeProps) => JSX.Element;
	upload: (item: DraggerProps) => JSX.Element;
	slot: (item: SlotType) => JSX.Element;
}
export type FormItemMapType = keyof FormItemMap;

/**
 * @method 处理表单显示隐藏
 * @param data 表单数据
 * @param nameList[] 需要处理的字段集合
 * @param show 是否显示
 */
export const setIsShowFormItem = <T extends { name: string }>(data: T[], nameList: string[], show: boolean): T[] => {
	return data.map((item) => {
		if (nameList.indexOf(item.name) > -1) {
			return { ...item, show: show };
		} else {
			return { ...item, show: !show };
		}
	});
};
