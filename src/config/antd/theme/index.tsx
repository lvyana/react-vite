/**
 * @file antd 定制主题
 * @author ly
 * @createDate 2022年11月19日
 */
import { useMemo } from 'react';
import { useLayout } from '@/store';
import { ThemeType } from '@/store/slices/layoutSlice';
import theme1 from './module/white';
import theme2 from './module/dark';
import { ThemeConfig } from 'antd';

const useTheme = () => {
	const { color: theme } = useLayout();

	const themeConfig: ThemeConfig | undefined = useMemo(() => {
		if (theme === ThemeType.LIGHT) {
			return theme1;
		} else if (theme === ThemeType.DARK) {
			return theme2;
		}
	}, [theme]);

	return { themeConfig, theme };
};

export default useTheme;
