/**
 * @file 树选择
 * @author ly
 * @createDate 2023年1月3日
 */
import React, { ReactNode } from 'react';
import { TreeSelect } from 'antd';
import { BaseOptionType } from 'antd/es/select';
import { TreeSelectProps } from 'antd/lib/tree-select';

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const getTreeSelect = (config: TreeSelectProps) => {
	const { allowClear = true, style, ...rest } = config;
	return <TreeSelect {...rest} allowClear={allowClear} style={{ width: '100%', ...style }} />;
};

export type { TreeSelectProps };
export default getTreeSelect;
