/**
 * @file 把组件转成slot
 * @author 姓名
 * @createDate
 */
import React from 'react';
import { FormItemMap, FormItemParams, FormSlotType, SlotType } from './type';

/**
 * @method 回调处理formItem comConfig数据
 * @param name 表单唯一值
 * @param comConfig 表单内组件参数
 */
export type SetChildrenDom = (name: keyof FormItemMap, comConfig?: FormItemParams['comConfig']) => FormSlotType['comConfig'];

type FilterArr = (keyof FormItemMap)[];

/**
 * @method formItem type类型转换成slot
 * @param item formItem数据
 * @param setChildrenDom 回调处理formItem comConfig数据
 */
type SetFormItemTitle = (item: FormItemParams, setChildrenDom?: SetChildrenDom) => FormSlotType;

/**
 * @method 处理 formList 数据
 * @param formList 表单数据
 * @param filterArr 过滤的组件
 */
type SetFormListTitle = (formList: FormItemParams[], filterArr?: FilterArr) => FormSlotType[];
// 初始化过滤 button
const FILTER_ARR: FilterArr = ['button'];
// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

// 把所有组件处理成slot
const useFormTitle = (setChildrenDom?: SetChildrenDom, filterArr = FILTER_ARR) => {
	const initFilterArr = filterArr;
	const setFormItemTitle: SetFormItemTitle = (item, setChildrenDom) => {
		const { type, formItemProps, comConfig, ...config } = item;
		const { name, ...formItemPropsConfig } = formItemProps || {};

		return {
			type: 'slot',
			formItemProps: formItemPropsConfig,
			comConfig: setChildrenDom ? setChildrenDom(name, comConfig) : (comConfig as FormSlotType['comConfig']),
			...config
		};
	};

	const setFormListTitle: SetFormListTitle = (formList, filterArr) => {
		const filterArrParma = filterArr || initFilterArr;
		return formList.filter((v) => filterArrParma.indexOf(v.type) === -1).map((v) => setFormItemTitle(v, setChildrenDom));
	};

	return { setFormItemTitle, setFormListTitle };
};

export { useFormTitle };
