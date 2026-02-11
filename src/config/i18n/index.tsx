/**
 * @file 封装多种语言
 * @author ly
 * @createDate 2023年2月5日
 * https://react.i18next.com/guides/the-drawbacks-of-other-i18n-solutions
 */
import LanguageDetector from 'i18next-browser-languagedetector';
import i18n from 'i18next';
import enUsTrans from './locales/en-us.json';
import zhCnTrans from './locales/zh-cn.json';
import { initReactI18next } from 'react-i18next';

const initialLng = localStorage.getItem('i18nextLng') || 'zh';

i18n
	.use(LanguageDetector) // 使用语言检测器插件
	.use(initReactI18next) // 初始化 react-i18next 插件
	.init({
		//引入资源文件
		resources: {
			en: {
				translation: enUsTrans
			},
			zh: {
				translation: zhCnTrans
			}
		},
		lng: initialLng,
		//选择默认语言，选择内容为上述配置中的key，即en/zh
		fallbackLng: 'zh',
		// 生产环境中关闭调试模式
		debug: false,
		interpolation: {
			// React已经避免了XSS
			escapeValue: false // not needed for react as it escapes by default
		}
	});

export default i18n;
