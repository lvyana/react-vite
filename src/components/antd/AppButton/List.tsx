/**
 * @file 按钮集合
 * @author ly
 * @createDate 2020年4月27日
 */
import React, { Fragment } from 'react';
import { Col, Row } from 'antd';
import authButtonPermissionHoc from '@/hoc/authButtonPermissionHoc';
import Ibutton, { IbuttonItemProps } from './index';

/**
 * 按钮集合
 * @param options 集合数据
 * @param loadingName 那个按钮需要加载直接传type
 * @method onClick 点击事件
 * @param style 样式
 */
export interface IbuttonListProps<T = string> {
	options?: ButtonItemParams<T>[];
	loadingName?: T;
	style?: React.CSSProperties;
}

/**
 * 按钮集合item
 * @param tag 类型
 * @param type 按钮类型
 * @param permission 权限标识
 * @param span col的比例
 */
export type ButtonItemParams<T> = {
	tag: T;
	permission?: string;
	span?: number;
	comConfig: IbuttonItemProps;
};

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const IbuttonList = <T = string,>({ options, loadingName, style }: IbuttonListProps<T>) => {
	const buttonListCol = options?.map((item, i) => {
		const { tag, comConfig } = item;
		const loading = loadingName === tag;
		const IbuttonItemCol = (
			<Col span={item.span}>
				<Ibutton {...comConfig} loading={loading} />
			</Col>
		);

		return <Fragment key={i}>{authButtonPermissionHoc(IbuttonItemCol, item.permission)}</Fragment>;
	});

	return <Row style={style}>{buttonListCol}</Row>;
};

IbuttonList.displayName = 'IbuttonList';
export default IbuttonList;

/**
 * 设置禁用、非禁用
 * @param data 数据
 * @param btnList 数组['删除','新增']
 * @param is 设置true禁用 false启用
 * @returns data数据
 */
export type SetDisDataType = <T>(data: ButtonItemParams<T>[], btnList: T[], is: boolean) => ButtonItemParams<T>[];

export const setDisData: SetDisDataType = (data, btnList, is) => {
	return data.map((item) => {
		if (btnList.indexOf(item.tag) > -1) {
			return {
				...item,
				disabled: is
			};
		} else {
			return item;
		}
	});
};
