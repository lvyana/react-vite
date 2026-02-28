/**
 * @file 获取布局配置参数
 * @author ly
 * @createDate 2023年6月13日
 */
import { useLayout as useLayoutStore } from '@/store';
import { getMenuMarginLeft, getFooterMinHeight } from './styleLayoutConfig';

const useLayout = () => {
	const { menuLayout, tabsMainLayout, footerLayout } = useLayoutStore();

	const marginLeft = getMenuMarginLeft(menuLayout);
	const footerMinHeight = getFooterMinHeight(footerLayout);

	return { menuLayout, tabsMainLayout, footerLayout, marginLeft, footerMinHeight };
};

export default useLayout;
