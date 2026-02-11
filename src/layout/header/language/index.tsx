/**
 * @file 语言切换
 * @author ly
 * @createDate 2022年11月19日
 */
import { useMemo } from 'react';
import { Button } from 'antd';
import { useLayout } from '@/store';
import IconFont from '@/utils/iconfont';
import { useTranslation } from 'react-i18next';

const Language = () => {
	const { t, i18n } = useTranslation();
	const { language, setLanguage } = useLayout();

	const handleSizeChange = () => {
		if (language === 'zh') {
			setLanguage('en');
			i18n.changeLanguage('en');
		} else if (language === 'en') {
			setLanguage('zh');
			i18n.changeLanguage('zh');
		}
	};

	const themeMenu = [
		{ label: 'icon-zhongyingwenqiehuan-zhongwen', key: 'zh' },
		{ label: 'icon-zhongyingwenqiehuan-yingwen', key: 'en' }
	];

	const languageStr = useMemo(() => themeMenu.find((item) => item.key === language)?.label, [language]);

	return (
		<Button
			aria-label="ToggleLanguage"
			type="text"
			icon={<IconFont type={languageStr || 'icon-zhongyingwenqiehuan-zhongwen'} style={{ transform: 'scale(1.2)' }} />}
			onClick={handleSizeChange}
		/>
	);
};

export default Language;
