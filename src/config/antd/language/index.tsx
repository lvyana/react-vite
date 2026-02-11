/**
 * @file 语言切换
 * @author ly
 * @createDate 2022年11月19日
 */
import { useMemo } from 'react';
import enUS from 'antd/locale/en_US';
import zhCN from 'antd/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import 'dayjs/locale/en';
import { useLayout } from '@/store';

const useLanguage = () => {
	const { language } = useLayout();

	const locale = useMemo(() => {
		if (language === 'zh') {
			dayjs.locale('zh-cn');
			return zhCN;
		} else if (language === 'en') {
			dayjs.locale('en');
			return enUS;
		}
	}, [language]);

	return { locale };
};

export default useLanguage;
