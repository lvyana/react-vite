/**
 * @file Layout状态切片
 * @author ly
 * @createDate 2020年4月27日
 */
import type { StateCreator } from 'zustand';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import { FooterLayoutType, MenuLayoutEnum, TabsMainLayoutType } from '@/layout/useHooks/styleLayoutConfig';
import type { StoreState } from '../index';

export enum ThemeType {
	LIGHT = 'light',
	DARK = 'dark'
}

export type LanguageType = 'zh' | 'en';

export interface LayoutSlice {
	// State
	language: LanguageType;
	size: SizeType;
	color: ThemeType;
	menuLayout: MenuLayoutEnum;
	tabsMainLayout: TabsMainLayoutType;
	footerLayout: FooterLayoutType;
	leftMenuCollapsed: boolean;

	// Actions
	setLanguage: (language: LanguageType) => void;
	setSize: (size: SizeType) => void;
	setTheme: (color: ThemeType) => void;
	setMenuLayout: (menuLayout: MenuLayoutEnum) => void;
	setTabsMainLayout: (tabsMainLayout: TabsMainLayoutType) => void;
	setFooterLayout: (footerLayout: FooterLayoutType) => void;
	setLeftMenuCollapsed: (collapsed: boolean) => void;
}

const language = (localStorage.getItem('language') as LanguageType) || 'zh';

export const createLayoutSlice: StateCreator<
	StoreState,
	[['zustand/immer', never], ['zustand/devtools', never], ['zustand/persist', unknown]],
	[],
	LayoutSlice
> = (set) => ({
	// Initial State
	language,
	size: 'middle',
	color: ThemeType.LIGHT,
	menuLayout: MenuLayoutEnum.CARD_MENU,
	tabsMainLayout: TabsMainLayoutType.SHOW,
	footerLayout: FooterLayoutType.SHOW,
	leftMenuCollapsed: false,

	// Actions
	setLanguage: (language) =>
		set((state) => {
			state.language = language;
		}),

	setSize: (size) =>
		set((state) => {
			state.size = size;
		}),

	setTheme: (color) =>
		set((state) => {
			state.color = color;
		}),

	setMenuLayout: (menuLayout) =>
		set((state) => {
			state.menuLayout = menuLayout;
		}),

	setTabsMainLayout: (tabsMainLayout) =>
		set((state) => {
			state.tabsMainLayout = tabsMainLayout;
		}),

	setFooterLayout: (footerLayout) =>
		set((state) => {
			state.footerLayout = footerLayout;
		}),

	setLeftMenuCollapsed: (collapsed) =>
		set((state) => {
			state.leftMenuCollapsed = collapsed;
		})
});
