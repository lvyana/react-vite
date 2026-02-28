/**
 * @file input
 * @author ly
 * @createDate 2023年1月3日
 */
import React from 'react';
import { Input, InputNumber } from 'antd';
import type { InputProps } from 'antd/lib/input';
import type { TextAreaProps } from 'antd/es/input/TextArea';
import { InputNumberProps } from 'antd/lib/input-number';

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

export const getInput = (config: InputProps) => {
	const { allowClear = true, style, ...rest } = config;
	return <Input {...rest} allowClear={allowClear} style={{ width: '100%', ...style }} />;
};

export const getTextArea = (config: TextAreaProps) => {
	const { allowClear = true, style, maxLength, ...rest } = config;
	return <Input.TextArea {...rest} showCount={!!maxLength} allowClear={allowClear} style={{ width: '100%', ...style }} />;
};

export const getNumber = (config: InputNumberProps) => {
	return <InputNumber {...config} />;
};

export type { InputProps, TextAreaProps, InputNumberProps };
