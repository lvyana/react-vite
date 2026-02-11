/**
 * @file 选择器
 * @author ly
 * @createDate 2023年1月3日
 */
import React, { isValidElement, ReactNode } from 'react';
import { Select } from 'antd';
import { DefaultOptionType, LabeledValue, SelectProps } from 'antd/es/select';

/**
 * 选择器props
 * @param options 数据化配置选项内容
 */

type Options = Omit<DefaultOptionType, 'label'> & { label?: React.ReactNode };

export type SelectType = {
	options?: Options[];
} & Omit<SelectProps, 'options'>;

const getFilterOption = (input: string, option?: Options, fieldNames?: SelectProps['fieldNames']) => {
	const newOption: { [name: string]: ReactNode } = option || {};
	const { label = 'label' } = fieldNames || {};
	const labelString = newOption[label];
	if (labelString && !isValidElement(labelString)) {
		return (labelString.toString() ?? '').toLowerCase().includes(input.toLowerCase());
	}
	console.warn('搜索不起效，label为ReactNode');
	return true;
};

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const getSelect = (config: SelectType) => {
	const {
		allowClear = true,
		style,
		options,
		optionFilterProp = config.fieldNames?.label,
		filterOption = (input: string, option?: Options) => getFilterOption(input, option, config.fieldNames),
		showSearch = true,
		...rest
	} = config || {};

	return (
		<Select
			allowClear={allowClear}
			showSearch={showSearch}
			options={options as DefaultOptionType[]}
			optionFilterProp={optionFilterProp}
			filterOption={filterOption}
			style={{ width: '100%', ...style }}
			{...rest}></Select>
	);
};

export default getSelect;
