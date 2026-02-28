/**
 * @file 联级
 * @author ly
 * @createDate 2023年1月3日
 */
import React from 'react';
import { Cascader, CascaderProps } from 'antd';
import { BaseOptionType } from 'antd/es/select';

// 使用 any 类型替代 rc-cascader 的类型
type SingleValueType = any;

/**
 * 联级选择
 * @param multiple 多选
 * @param value 值
 * @param option 可选项数据源
 * @method onChange 选择完成后的回调
 */
export type CascaderType = {
	multiple?: false;
	value?: SingleValueType;
} & Omit<CascaderProps<BaseOptionType>, 'multiple' | 'value'>;

export type CascaderMultipleType = {
	multiple: true;
	value?: SingleValueType[];
} & Omit<CascaderProps<BaseOptionType>, 'multiple' | 'value'>;

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const getCascader = (config: CascaderType | CascaderMultipleType) => {
	const { allowClear = true, ...rest } = config;
	return <Cascader {...rest} allowClear={allowClear} />;
};

export default getCascader;
