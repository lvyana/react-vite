/**
 * @file 获取排版配置参数
 * @author ly
 * @createDate 2023年6月13日
 */
import { useLayout as useLayoutStore } from '@/store';
import styleLayoutConfig, { StyleLayoutConfig } from './styleLayoutConfig';

const useLayout = () => {
	const { menuLayout, tabsMainLayout, footerLayout } = useLayoutStore();

	// 所有布局的样式
	const { menuStyle, footerStyle } = styleLayoutConfig;

	// 菜单布局对应的样式
	const menuLayoutStyle = menuStyle[menuLayout];

	// tabs布局对应的样式
	const tabsMainLayoutStyle = tabsMainLayout;

	// footer布局对应的样式
	const footerLayoutStyle = footerStyle[footerLayout];

	return { menuLayoutStyle, tabsMainLayoutStyle, footerLayoutStyle };
};

export default useLayout;
