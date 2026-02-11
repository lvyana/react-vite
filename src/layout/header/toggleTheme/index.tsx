/**
 * @file 切换颜色主题
 * @author ly
 * @createDate 2022年11月19日
 */
import { useMemo } from 'react';
import { Button } from 'antd';
import { useLayout } from '@/store';
import { ThemeType } from '@/store/slices/layoutSlice';
import IconFont from '@/utils/iconfont';

const ToggleTheme = () => {
	const { color: theme, setTheme } = useLayout();

	const handleSizeChange = () => {
		if (theme === ThemeType.DARK) {
			setTheme(ThemeType.LIGHT);
		} else if (theme === ThemeType.LIGHT) {
			setTheme(ThemeType.DARK);
		}
	};

	const themeMenu = [
		{ label: 'icon-taiyang', key: ThemeType.DARK },
		{ label: 'icon-ClearNight-qing-yewan', key: ThemeType.LIGHT }
	];

	const iconStr = useMemo(() => themeMenu.find((item) => item.key === theme)?.label, [theme]);

	return (
		<Button
			aria-label="ToggleTheme"
			type="text"
			icon={<IconFont type={iconStr || 'icon-taiyang'} style={{ transform: 'scale(1.4)' }} />}
			onClick={handleSizeChange}
		/>
	);
};

export default ToggleTheme;
