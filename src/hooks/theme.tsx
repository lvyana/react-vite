import { useLayout } from '@/store';
import { ThemeType } from '@/store/slices/layoutSlice';
import { useEffect } from 'react';

const useTheme = () => {
	const { color: theme } = useLayout();
	useEffect(() => {
		// console.log('theme', theme);
		document.body.classList.toggle('light-theme', theme === ThemeType.LIGHT);
		document.body.classList.toggle('dark-theme', theme === ThemeType.DARK);
	}, [theme]);
};

export { useTheme };
