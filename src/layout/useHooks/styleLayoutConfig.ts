/**
 * @file 布局样式配置
 * @author ly
 * @createDate 2020年4月27日
 */

/** 菜单布局类型：cardMenu-卡片菜单 | leftMenu-左侧展开 | leftCollapsedMenu-左侧收起 */
export enum MenuLayoutEnum {
	CARD_MENU = 'cardMenu',
	LEFT_MENU = 'leftMenu',
	LEFT_COLLAPSED_MENU = 'leftCollapsedMenu'
}

/** tabsMain 显示/隐藏 */
export enum TabsMainLayoutType {
	SHOW = 'show',
	HIDE = 'hide'
}

/** footer 显示/隐藏 */
export enum FooterLayoutType {
	SHOW = 'show',
	HIDE = 'hide'
}

// 菜单布局 → 左侧偏移量
const MENU_MARGIN_LEFT: Record<MenuLayoutEnum, number> = {
	[MenuLayoutEnum.CARD_MENU]: 0,
	[MenuLayoutEnum.LEFT_MENU]: 200,
	[MenuLayoutEnum.LEFT_COLLAPSED_MENU]: 80
};

// footer 高度
const FOOTER_HEIGHT: Record<FooterLayoutType, string> = {
	[FooterLayoutType.SHOW]: '70px',
	[FooterLayoutType.HIDE]: '0px'
};

/** 根据菜单类型获取 Content 的 marginLeft */
export const getMenuMarginLeft = (layout: MenuLayoutEnum) => MENU_MARGIN_LEFT[layout];

/** 根据 footer 类型获取最小高度 */
export const getFooterMinHeight = (layout: FooterLayoutType) => FOOTER_HEIGHT[layout];
