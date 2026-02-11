/**
 * @file antd组件定制
 * @author ly
 * @createDate 2022年11月19日
 */
import React, { FC } from 'react';
import { ConfigProvider } from 'antd';
import useAntdSize from './size';
import useTheme from './theme';
import useLanguage from './language';
import { useTheme as useHooksTheme } from '@/useHooks/theme';

// 全局注入antd组件调用方法
import ContextMethod from './context';

interface ThemeProps {
	children: React.ReactNode;
}

// ----------------------------------------------------------------

const AntdConfig: FC<ThemeProps> = ({ children }) => {
	const { size } = useAntdSize();
	const { themeConfig } = useTheme();
	const { locale } = useLanguage();
	useHooksTheme();
	return (
		// antd全局配置
		<ConfigProvider locale={locale} theme={themeConfig} componentSize={size}>
			{/* 自定义注入方法 */}
			<ContextMethod>{children}</ContextMethod>
		</ConfigProvider>
	);
};

export default AntdConfig;
