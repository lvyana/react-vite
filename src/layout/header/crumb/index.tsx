/**
 * @file 面包屑
 * @author ly
 * @createDate 2020年4月27日
 */
import React, { useState, useEffect } from 'react';
import { Breadcrumb } from 'antd';
import { ItemType } from 'antd/es/breadcrumb/Breadcrumb';
import { useLocation, Link } from 'react-router-dom';
import type { Router } from '@/layout/menu/routerData';
import { useUser } from '@/store';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const Crumb = () => {
	const location = useLocation();
	let { t, i18n } = useTranslation();

	const { router: menuList } = useUser();

	const [currentRouter, SetcurrentRouter] = useState<ItemType[]>([]);

	useEffect(() => {
		let routerArr: Router[] = [];
		location.pathname.split('/').map((item, i) => {
			if (i === 0) {
				routerArr[0] = { path: '/', title: '系统', children: menuList };
			} else {
				let is = routerArr[i - 1]?.children?.find((val) => {
					return val.path.indexOf(item) !== -1;
				});
				if (is) routerArr[i] = is;
			}
		});

		SetcurrentRouter(getCrumbList(routerArr, t));
	}, [location.pathname, i18n.language]);

	return <Breadcrumb items={currentRouter}></Breadcrumb>;
};

export default Crumb;

const getCrumbList = (routerArr: Router[], t: TFunction<'translation', undefined, 'translation'>): ItemType[] => {
	return routerArr.map((item) => {
		if (item.children) {
			return {
				title: t(item.title),
				menu: {
					items: item.children?.map((r) => {
						return {
							key: r.path,
							label: <Link to={r.path}>{t(r.title)}</Link>
						};
					})
				},
				dropdownProps: { placement: 'bottomRight' }
			};
		}
		return {
			key: item.path,
			title: t(item.title),
			dropdownProps: { placement: 'bottomRight' }
		};
	});
};
