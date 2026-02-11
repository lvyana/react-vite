/**
 * @file 左侧示例表单组件
 * @author ly
 * @createDate 2022年12月17日
 */
import React, { FC, useContext, useMemo, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Col, Row } from 'antd';
import { useDrag } from 'react-dnd';
import { ItemTypes, FORM_ITEM, getDefaultValue } from './type';
import { Context } from './context';
import useThemeHooks from '@/config/antd/theme/useThemeHooks';
import hoverEvenHoc from '@/hoc/hoverEvenHoc';
import { FormItemMapType } from '@/antdComponents/iForm';

export const FORM_TYPE_LIST = [
	{
		name: '输入框',
		type: ItemTypes.INPUT
	},
	{
		name: '文本框',
		type: ItemTypes.TEXTAREA
	},
	{
		name: '下拉框',
		type: ItemTypes.SELECT
	},
	{
		name: '联级框',
		type: ItemTypes.CASCADER
	},
	{
		name: '按钮集合',
		type: ItemTypes.BUTTON
	}
];

/**
 * @param name 表单名称
 * @param type 表单类型
 */

interface ExamplesItemProps {
	name: string;
	type: FormItemMapType;
}

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const ExamplesList = () => {
	const { token } = useThemeHooks();

	return (
		<div className="rounded-lg p-2 border-2 border-solid" style={{ borderColor: token.colorPrimaryBorder }}>
			<Row gutter={16}>
				{FORM_TYPE_LIST.map((item) => {
					return <ExamplesItem name={item.name} type={item.type} key={item.type}></ExamplesItem>;
				})}
			</Row>
		</div>
	);
};

const ExamplesItem: FC<ExamplesItemProps> = ({ name, type }) => {
	const { token } = useThemeHooks();

	const context = useContext(Context);
	const formList = context?.state.formList;

	const [{ isDragging }, drag] = useDrag(
		() => ({
			type: FORM_ITEM,
			item: { name: type },
			end: (item, monitor) => {
				const dropResult = monitor.getDropResult();
				if (item && dropResult) {
					// 放入目标
					const { name: type } = item;
					// 生成formItem
					let newFormList = formList || [];
					newFormList.push(getDefaultValue[type]());

					// const newFormList = [...(formList || []), {}];
					context?.dispatch({ type: 'formList', value: newFormList });
				}
			},
			collect: (monitor) => ({
				isDragging: monitor.isDragging(),
				handlerId: monitor.getHandlerId()
			})
		}),
		[formList]
	);

	return (
		<>
			<Col span={12}>
				{useMemo(
					() =>
						hoverEvenHoc(
							<div
								ref={drag}
								data-testid={`formItem`}
								className="rounded-lg p-2 mb-2 border border-solid cursor-pointer"
								style={{ borderColor: token.colorPrimaryBorder }}>
								{name}
							</div>
						),
					[token]
				)}
			</Col>
		</>
	);
};

export default ExamplesList;
