/**
 * @file 排版配置处理后的页面
 * @author ly
 * @createDate 2023年6月13日
 */
import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Layout, { Content, Footer } from 'antd/es/layout/layout';
import Header from '@/layout/header';
import Logo from './header/logo';
import CradMenu from './menu/CradMenu';
import LeftMenu from './menu/LeftMenu';
import useLayout from './useHooks/useLayout';
import { useLayout as useLayoutStore } from '@/store';
import { FooterLayoutType, MenuLayoutEnum, TabsMainLayoutType } from './useHooks/styleLayoutConfig';
import TabsMain from './tabsMain';

/**
 * @param menuLayoutStyle 菜单布局样式
 * @param footerLayoutStyle 底部布局样式
 * @param tabsMain 顶部导航栏
 * @param CradMenu 卡片菜单
 * @param leftMenu 左侧菜单
 * @param footer 底部
 */
type LayoutsProps = {
	menuLayoutStyle: any;
	footerLayoutStyle: any;
	tabsMain: React.ReactNode;
	cardMenu: React.ReactNode;
	leftMenu: React.ReactNode;
	footer: React.ReactNode;
};

type TabsMainComProps = {
	tabsMainLayout: TabsMainLayoutType;
};

type CradMenuComProps = {
	menuLayout: MenuLayoutEnum;
};

type FooterComProps = {
	footerLayout: FooterLayoutType;
};

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const LayoutStyle = () => {
	const { menuLayoutStyle, tabsMainLayoutStyle, footerLayoutStyle } = useLayout();
	const { menuLayout, tabsMainLayout, footerLayout } = useLayoutStore();

	return (
		<LayoutCom
			menuLayoutStyle={menuLayoutStyle}
			footerLayoutStyle={footerLayoutStyle}
			tabsMain={<TabsMainCom tabsMainLayout={tabsMainLayoutStyle}></TabsMainCom>}
			cardMenu={<CradMenuCom menuLayout={menuLayout}></CradMenuCom>}
			leftMenu={<LeftMenuCom menuLayout={menuLayout}></LeftMenuCom>}
			footer={<FooterCom footerLayout={footerLayout}></FooterCom>}></LayoutCom>
	);
};

// 布局
const LayoutCom: FC<LayoutsProps> = ({ menuLayoutStyle, footerLayoutStyle, leftMenu, tabsMain, cardMenu, footer }) => {
	return (
		<>
			{/* 左侧卡片 */}
			{leftMenu}
			<Layout style={{ transition: 'all 0.3s' }}>
				{/* 顶部栏 */}
				<Header>{cardMenu}</Header>

				{/* 内容 */}
				<Content className="p-4" style={{ minHeight: `calc(100vh - 64px - ${footerLayoutStyle.main.minHeight})`, ...menuLayoutStyle.main }}>
					{/* 导航栏 */}
					{tabsMain}
					{/* 内容 */}
					<Outlet />
				</Content>

				{/* 底部 */}
				{footer}
			</Layout>
		</>
	);
};

// 标签页是否显示
const TabsMainCom: FC<TabsMainComProps> = ({ tabsMainLayout }) => {
	if (tabsMainLayout === TabsMainLayoutType.HIDE) {
		return <></>;
	} else {
		return <TabsMain></TabsMain>;
	}
};

// logo是否显示卡片菜单
const CradMenuCom: FC<CradMenuComProps> = ({ menuLayout }) => {
	if (menuLayout === MenuLayoutEnum.CARD_MENU) {
		return (
			<CradMenu>
				<Logo></Logo>
			</CradMenu>
		);
	} else {
		return <Logo></Logo>;
	}
};

// 左侧菜单是否显示
const LeftMenuCom: FC<CradMenuComProps> = ({ menuLayout }) => {
	if ([MenuLayoutEnum.LEFT_MENU, MenuLayoutEnum.LEFT_COLLAPSED_MENU].indexOf(menuLayout) > -1) {
		return <LeftMenu></LeftMenu>;
	} else {
		return <></>;
	}
};

// 底部表现是否显示
const FooterCom: FC<FooterComProps> = ({ footerLayout }) => {
	if (footerLayout === FooterLayoutType.SHOW) {
		return (
			<Footer style={{ textAlign: 'center', paddingTop: 8 }}>
				<div>react-admin</div>
				<div>react-admin ©2020 Created by ly</div>
			</Footer>
		);
	} else {
		return <></>;
	}
};

export default LayoutStyle;
