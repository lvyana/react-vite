/**
 * @file 所有布局的样式
 * @author ly
 * @createDate 日期：2020年4月27日
 */

// #----------- 菜单样式配置 -----------

// 卡片配置参数
const CARD_MENU = {
	main: {
		transition: 'margin-left 0.3s'
	}
};

// 左侧菜单配置参数
const LEFT_MENU = {
	main: {
		marginLeft: 200,
		transition: 'margin-left 0.3s'
	}
};

// 左侧收起菜单配置参数
const LEFT_COLLAPSED_MENU = {
	main: {
		marginLeft: 80,
		transition: 'margin-left 0.3s'
	}
};

const menuStyle = {
	cardMenu: CARD_MENU,
	leftMenu: LEFT_MENU,
	leftCollapsedMenu: LEFT_COLLAPSED_MENU
};

const SHOW_FOOTER = {
	main: { minHeight: '69px' }
	// marginLeft: 200
};

const HIDDEN_FOOTER = {
	main: { minHeight: '0px' }
};

const footerStyle = {
	hide: HIDDEN_FOOTER,
	show: SHOW_FOOTER
};

// #----------- 所有布局的样式 -----------
const styleLayoutConfig = {
	menuStyle,
	footerStyle
};

export type MenuLayout = typeof CARD_MENU | typeof LEFT_MENU;
export type FooterLayout = typeof SHOW_FOOTER | typeof HIDDEN_FOOTER;

export type StyleLayoutConfig = {
	menuStyle: MenuLayout;
	footerStyle: FooterLayout;
};

/**
 * @type cardMenu-卡片菜单   leftMenu-左侧菜单展开    leftCollapsedMenu-左侧菜单收起
 */
export enum MenuLayoutEnum {
	CARD_MENU = 'cardMenu',
	LEFT_MENU = 'leftMenu',
	LEFT_COLLAPSED_MENU = 'leftCollapsedMenu'
}

/**
 * @type tabsMainLayout 1-显示   2-隐藏
 */
export enum TabsMainLayoutType {
	SHOW = 'show',
	HIDE = 'hide'
}

/**
 * @type footerLayout 1-显示   2-隐藏
 */
export enum FooterLayoutType {
	SHOW = 'show',
	HIDE = 'hide'
}

export default styleLayoutConfig;
