/**
 * @file 折叠面板
 * @author ly
 * @createDate 2023年4月5日
 */
import React, { FC, ReactNode } from 'react';
import { Collapse, CollapseProps } from 'antd';
import useStyleHooks from './useStyleHooks';

export type IcollapseProps = {
	styleConfig?: '1';
} & CollapseProps;

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const Icollapse: FC<IcollapseProps> = ({ ...config }) => {
	const { items, styleConfig, style, bordered, ...rest } = config;
	// 折叠面板样式配置
	const styleConfigParams = useStyleHooks({ items, styleConfig, style, bordered });

	return (
		<Collapse {...rest} bordered={styleConfigParams.bordered} style={styleConfigParams.style} items={styleConfigParams.list}></Collapse>
	);
};

export default Icollapse;
