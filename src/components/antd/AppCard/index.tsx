/**
 * @file 封装card
 * @author ly
 * @createDate 日期：2020年4月27日
 */
import React, { FC, ReactNode } from 'react';
import { Card } from 'antd';
import { CardProps } from 'antd/lib/card';

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const AppCard: FC<CardProps> = ({ ...config }) => {
	const { variant = 'borderless', hoverable = false, styles, children, ...rest } = config;

	return (
		<>
			<Card hoverable={hoverable} variant={variant} styles={styles} {...rest}>
				{children}
			</Card>
		</>
	);
};

export default AppCard;
