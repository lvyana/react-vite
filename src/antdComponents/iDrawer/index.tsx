/**
 * @file 抽屉
 * @author ly
 * @createDate 2020年11月15日
 */
import React, { FC } from 'react';
import { Drawer } from 'antd';
import { DrawerProps } from 'antd/lib/drawer';

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const Idrawer: FC<DrawerProps> = ({ ...config }) => {
	const { children, width = 378, maskClosable = false, ...rest } = config;
	return (
		<Drawer width={width} maskClosable={maskClosable} {...rest}>
			{children}
		</Drawer>
	);
};

export default Idrawer;
