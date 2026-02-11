/**
 * @file 表单
 * @author ly
 * @createDate 2020年4月27日
 */
import React, { Fragment } from 'react';
import { Form, Row, Col, FormInstance, FormProps } from 'antd';
import type { FormItemParams } from './type';
import FormItem, { FormItemProps } from './FormItem';
export * from './type';

export type OnValuesChange<F> = (changedValues: F, values: F) => void;

type LayoutParams = {
	formItem: React.FC<FormItemProps>;
	formList: FormItemParams[];
};

/**
 * 表单参数
 * @param T 表单渲染数据
 * @param F 表单对象
 * @param formList 表单json
 * @param form 表单实例
 * @param onValuesChange 表单发生变化
 * @param formLayout 表单格式
 */
interface IformProps<F> {
	formList: FormItemParams[];
	formProps: FormProps<F>;
	mode?: {
		type?: 'default' | 'custom' | 'row';
		self?: boolean;
		setCustom?: (config: LayoutParams) => React.ReactNode;
	};
}

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const Iform = <F extends object>({ formList, mode, formProps }: IformProps<F>) => {
	// 默认用row 也可以自定义样式
	const getFormLayout = () => {
		const { type = 'row', setCustom, self } = mode || {};
		if (type === 'custom') {
			return setCustom && setCustom({ formItem: FormItem, formList });
		} else if (type === 'row') {
			return setRow(FormItem, formList, self);
		} else if (type === 'default') {
			return getFormItemList(FormItem, formList);
		}
	};

	return (
		<>
			<Form {...formProps}>{getFormLayout()}</Form>
		</>
	);
};

// 表单默认样式
const getFormItemList = (FormItem: React.FC<FormItemProps>, formList: FormItemParams[]) => {
	return (
		<>
			{formList &&
				formList.map((item) => {
					if (item.show === false) return <Fragment key={item.key}></Fragment>;
					return <FormItem item={item} key={item.key}></FormItem>;
				})}
		</>
	);
};

// 设置表单样式
const setRow = (FormItem: React.FC<FormItemProps>, formList: FormItemParams[], self = false) => {
	const getSelf = (span?: number) => {
		if (self) {
			return { xxl: { span: span }, xl: { span: 6 }, lg: { span: 8 }, md: { span: 12 }, xs: { span: 24 } };
		}
		return { lg: { span: span }, md: { span: span }, xs: { span: 24 } };
	};

	return (
		<Row>
			{formList &&
				formList.map((item) => {
					if (item.show === false) return <Fragment key={item.key}></Fragment>;
					return (
						<Col {...getSelf(item.span)} key={item.key}>
							<FormItem item={item}></FormItem>
						</Col>
					);
				})}
		</Row>
	);
};
export type { FormProps };
export default Iform;
