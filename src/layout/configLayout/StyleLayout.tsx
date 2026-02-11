/**
 * @file 布局
 * @author ly
 * @createDate 2023年6月12日
 */
import React, { useEffect } from 'react';
import { Col, Form, RadioChangeEvent, Row } from 'antd';
import layout from '@/assets/images/layout.jpg';
import layout1 from '@/assets/images/layout1.jpg';
import { useLayout } from '@/store';
import style from './index.module.scss';
import Iform, { FormItemParams, FormRadioType } from '@/antdComponents/iForm';
import { FooterLayoutType, MenuLayoutEnum, TabsMainLayoutType } from '../useHooks/styleLayoutConfig';

const TABSMAIN_LAYOUT = [
	{
		value: TabsMainLayoutType.SHOW,
		label: '显示'
	},
	{
		value: TabsMainLayoutType.HIDE,
		label: '隐藏'
	}
];

const FOOTER_LAYOUT = [
	{
		value: FooterLayoutType.SHOW,
		label: '显示'
	},
	{
		value: FooterLayoutType.HIDE,
		label: '隐藏'
	}
];

type FormParam = { tabsMainLayout: TabsMainLayoutType; footerLayout: FooterLayoutType };

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const StyleLayout = () => {
	// 获取菜单初始化数据
	const {
		menuLayout: selectLayout,
		tabsMainLayout,
		footerLayout,
		setMenuLayout,
		setLeftMenuCollapsed,
		setTabsMainLayout,
		setFooterLayout
	} = useLayout();

	const onSelectStyle = (value: MenuLayoutEnum) => {
		setMenuLayout(value);
		setLeftMenuCollapsed(false);
	};

	const getStyle = (value: MenuLayoutEnum[]) => {
		if (value.indexOf(selectLayout) > -1) {
			return style['select-style'];
		}
		return '';
	};

	const onSelectTabsMainLayout = (e: RadioChangeEvent) => {
		setTabsMainLayout(e.target.value);
	};

	const onSelectFooterLayout = (e: RadioChangeEvent) => {
		setFooterLayout(e.target.value);
	};

	const [form] = Form.useForm<FormParam>();

	const formList: FormItemParams[] = [
		{
			type: 'radio',
			key: 0,
			span: 24,
			comConfig: {
				options: TABSMAIN_LAYOUT,
				onChange: onSelectTabsMainLayout
			},
			formItemProps: {
				name: 'tabsMainLayout',
				label: '顶部导航栏',
				labelCol: { span: 6 },
				wrapperCol: { span: 18 }
			}
		},
		{
			type: 'radio',
			key: 1,
			span: 24,
			comConfig: {
				options: FOOTER_LAYOUT,
				onChange: onSelectFooterLayout
			},
			formItemProps: { name: 'footerLayout', label: '底部', labelCol: { span: 6 }, wrapperCol: { span: 18 } }
		}
	];

	useEffect(() => {
		form.setFieldsValue({ tabsMainLayout, footerLayout });
	}, []);

	return (
		<div>
			<h2 className="mb-2 text-base">选择布局</h2>
			<Row gutter={32}>
				<Col className={getStyle([MenuLayoutEnum.CARD_MENU])}>
					<img src={layout} alt="" className={'cursor-pointer '} onClick={() => onSelectStyle(MenuLayoutEnum.CARD_MENU)} />
				</Col>
				<Col className={getStyle([MenuLayoutEnum.LEFT_MENU, MenuLayoutEnum.LEFT_COLLAPSED_MENU])}>
					<img src={layout1} alt="" className={'cursor-pointer '} onClick={() => onSelectStyle(MenuLayoutEnum.LEFT_MENU)} />
				</Col>
			</Row>
			<h2 className="mt-2 mb-2 text-base">组件显示</h2>
			<Iform formProps={{ form: form }} formList={formList}></Iform>
		</div>
	);
};

export default StyleLayout;
