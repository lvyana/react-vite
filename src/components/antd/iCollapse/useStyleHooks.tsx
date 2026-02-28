/**
 * @file 折叠面板主题样式配置
 * @author ly
 * @createDate 2023年5月12日
 */
import React from 'react';
import type { IcollapseProps } from './index';
import useThemeHooks from '@/config/antd/theme/useThemeHooks';

type UseStyleHooksProps = Pick<IcollapseProps, 'items' | 'styleConfig' | 'style' | 'bordered'>;

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const useStyleHooks = ({ items, styleConfig, style, bordered }: UseStyleHooksProps) => {
	const { token } = useThemeHooks();

	const ListStyle = {
		marginBottom: 24,
		background: token.colorFillAlter,
		borderRadius: token.borderRadiusLG,
		border: 'none'
	};

	if (styleConfig === '1') {
		const newList = items?.map((item) => {
			return {
				...item,
				style: ListStyle
			};
		});

		return { list: newList, style: { background: token.colorBgContainer }, bordered: false };
	}

	// 默认配置
	return { items, styleConfig, style, bordered };
};

export default useStyleHooks;
