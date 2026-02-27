/**
 * @file 多选框
 * @author ly
 * @createDate 2023年1月3日
 */
import React from 'react';
import { Checkbox } from 'antd';
import { CheckboxProps } from 'antd/lib/checkbox';
import { CheckboxGroupProps } from 'antd/es/checkbox/Group';

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

export const getCheckboxGroup = (config: CheckboxGroupProps) => {
	return <Checkbox.Group {...config} />;
};

export const getCheckbox = (config: CheckboxProps) => {
	return <Checkbox {...config} />;
};

export type { CheckboxProps, CheckboxGroupProps };
