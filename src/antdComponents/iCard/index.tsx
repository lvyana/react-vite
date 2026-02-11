/**
 * @file 封装card
 * @author ly
 * @createDate 日期：2020年4月27日
 */
import React, { FC, ReactNode } from 'react';
import { Card } from 'antd';
import { CardProps } from 'antd/lib/card';

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const Icard: FC<CardProps> = ({ ...config }) => {
	const { bordered = false, hoverable = false, styles, children, ...rest } = config;
	const { body } = styles || {};

	return (
		<>
			<Card hoverable={hoverable} bordered={bordered} styles={{ ...styles, ...{ body: { padding: '16px', ...body } } }} {...rest}>
				{children}
			</Card>
		</>
	);
};

export default Icard;
