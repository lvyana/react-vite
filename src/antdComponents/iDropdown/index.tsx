/**
 * @file 下拉按钮
 * @author ly
 * @createDate 2020年4月27日
 */
import React, { createElement, FC, isValidElement, Key } from 'react';
import type { MenuProps } from 'antd';
import { Dropdown, Button } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import Ibutton from '@/antdComponents/iButton';
import { DropdownProps } from 'antd/lib';

const defaultButton = <Ibutton {...{ type: 'link', icon: <EllipsisOutlined /> }} />;

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const Idropdown: FC<DropdownProps> = ({ ...config }) => {
	const { children = defaultButton, placement = 'bottom', arrow = true, trigger = ['click'], ...rest } = config;

	return (
		<Dropdown {...rest} arrow={arrow} placement={placement} trigger={trigger}>
			{/* <EllipsisOutlined /> */}
			<div>{children}</div>
		</Dropdown>
	);
};
export type { DropdownProps, MenuProps };
export default Idropdown;
