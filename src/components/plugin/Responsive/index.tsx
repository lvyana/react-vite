/**
 * @file 响应式
 * @author ly
 * @createDate 2020年4月27日
 */
import React, { FC, ReactElement } from 'react';
import { useMediaQuery } from 'react-responsive';

/**
 * @param MaxWidth 最大宽度
 * @return 响应式 大于最大宽度 隐藏
 */
interface ResponsiveMaxProps {
	children: ReactElement;
	maxWidth: number;
}

/**
 * @param MinWidth 最大宽度
 * @return 响应式 小于最小宽度 隐藏
 */
interface ResponsiveMinProps {
	children: ReactElement;
	minWidth: number;
}

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const ResponsiveMax: FC<ResponsiveMaxProps> = ({ children, maxWidth }) => {
	const isShow = useMediaQuery({ query: `(max-width: ${maxWidth}px)` });
	return isShow ? children : null;
};

const ResponsiveMin: FC<ResponsiveMinProps> = ({ children, minWidth }) => {
	const isShow = useMediaQuery({ query: `(min-width: ${minWidth}px)` });
	return isShow ? children : null;
};

/**
 * @param MaxWidth 最大宽度
 * @return 响应式 大于最大宽度 隐藏
 */
const useResponsiveMax = (MaxWidth: number) => {
	const isShow = useMediaQuery({ query: `(max-width: ${MaxWidth}px)` });
	return { isShow };
};

/**
 * @param MinWidth 最大宽度
 * @return 响应式 小于最小宽度 隐藏
 */
const useResponsiveMin = (MinWidth: number) => {
	const isShow = useMediaQuery({ query: `(max-width: ${MinWidth}px)` });
	return { isShow };
};

export { ResponsiveMax, useResponsiveMax, ResponsiveMin, useResponsiveMin };

// Keep legacy names for backward compatibility
export { ResponsiveMax as IresponsiveMax, ResponsiveMin as IresponsiveMin };
