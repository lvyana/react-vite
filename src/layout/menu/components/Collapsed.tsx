/**
 * @file 左侧菜单缩放
 * @author ly
 * @createDate 2023年6月17日
 */
import React, { FC, ReactPortal, useEffect, useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useLayout } from '@/store';
import { createPortal } from 'react-dom';
import { MenuLayoutEnum } from '@/layout/useHooks/styleLayoutConfig';

type CollapsedProps = {
	collapsed: boolean;
	onTrigger: () => void;
};

const COLLAPSED_STYLE: React.CSSProperties = {
	width: 48,
	height: 48
};

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const Collapsed: FC<CollapsedProps> = ({ collapsed, onTrigger }) => {
	return (
		<Button type="text" icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} onClick={onTrigger} style={COLLAPSED_STYLE} />
	);
};

export const useCollapsed = () => {
	const { leftMenuCollapsed, setLeftMenuCollapsed, setMenuLayout } = useLayout();

	const onTrigger = () => {
		if (leftMenuCollapsed) {
			setMenuLayout(MenuLayoutEnum.LEFT_MENU);
		} else {
			setMenuLayout(MenuLayoutEnum.LEFT_COLLAPSED_MENU);
		}

		setLeftMenuCollapsed(!leftMenuCollapsed);
	};

	const [collapsedPortal, setCollapsedPortal] = useState<ReactPortal | null>(null);

	useEffect(() => {
		const collapsedDom = document.getElementById('collapsed');
		if (collapsedDom) {
			const collapsedPortalDom = createPortal(<Collapsed collapsed={leftMenuCollapsed} onTrigger={onTrigger}></Collapsed>, collapsedDom);
			setCollapsedPortal(collapsedPortalDom);
		}
	}, [leftMenuCollapsed]);

	return { collapsedPortal, collapsed: leftMenuCollapsed };
};

export default Collapsed;
