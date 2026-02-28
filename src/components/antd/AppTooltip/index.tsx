/**
 * @file 文字提示
 * @author ly
 * @createDate 2020年4月27日
 */
import React, { CSSProperties, FC, ReactNode } from 'react';
import { Tooltip } from 'antd';
import useThemeHooks from '@/config/antd/theme/useThemeHooks';
import { TooltipPlacement, TooltipProps } from 'antd/es/tooltip';

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const Itooltip: FC<TooltipProps> = ({ ...item }) => {
	const { token } = useThemeHooks();
	const { children, color = token.colorPrimary, ...config } = item;
	return (
		<>
			<Tooltip {...config} color={color}>
				{children}
			</Tooltip>
		</>
	);
};

export default Itooltip;
