/**
 * @file 排版配置处理后的页面
 * @author ly
 * @createDate 2023年6月13日
 */
import React from 'react';
import { Outlet } from 'react-router-dom';
import Layout, { Content, Footer } from 'antd/es/layout/layout';
import Header from '@/layout/header';
import Logo from './header/logo';
import CradMenu from './menu/CardMenu';
import LeftMenu from './menu/LeftMenu';
import TabsMain from './tabsMain';
import useLayout from './hooks/useLayout';
import { FooterLayoutType, MenuLayoutEnum, TabsMainLayoutType } from './hooks/styleLayoutConfig';

const LayoutStyle = () => {
	const { menuLayout, tabsMainLayout, footerLayout, marginLeft, footerMinHeight } = useLayout();

	const showLeftMenu = menuLayout === MenuLayoutEnum.LEFT_MENU || menuLayout === MenuLayoutEnum.LEFT_COLLAPSED_MENU;
	const showCardMenu = menuLayout === MenuLayoutEnum.CARD_MENU;

	return (
		<>
			{showLeftMenu && <LeftMenu />}

			<Layout style={{ transition: 'all 0.3s' }}>
				<Header>
					{showCardMenu ? (
						<CradMenu>
							<Logo />
						</CradMenu>
					) : (
						<Logo />
					)}
				</Header>

				<Content
					className="p-4"
					style={{
						minHeight: `calc(100vh - 64px - ${footerMinHeight})`,
						marginLeft,
						transition: 'margin-left 0.3s'
					}}>
					{tabsMainLayout === TabsMainLayoutType.SHOW && <TabsMain />}
					<Outlet />
				</Content>

				{footerLayout === FooterLayoutType.SHOW && (
					<Footer style={{ textAlign: 'center', paddingTop: 8 }}>
						<div>react-admin</div>
						<div>react-admin ©2020 Created by ly</div>
					</Footer>
				)}
			</Layout>
		</>
	);
};

export default LayoutStyle;
