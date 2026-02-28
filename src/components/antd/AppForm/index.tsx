/**
 * @file 表单
 * @author ly
 * @createDate 2020年4月27日
 */
import React, { useMemo } from 'react';
import { Form, Row, Col, FormProps as AntdFormProps } from 'antd';
import type { FormItemParams } from './type';
import FormItem, { FormItemProps } from './FormItem';
export * from './type';

export type OnValuesChange<F> = (changedValues: Partial<F>, values: F) => void;

type LayoutParams = {
	formItem: React.FC<FormItemProps>;
	formList: FormItemParams[];
};

type LayoutMode =
	| { type?: 'default' | 'row'; self?: boolean }
	| {
			type: 'custom';
			setCustom: (config: LayoutParams) => React.ReactNode;
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
export interface AppFormProps<F = any> {
	formList: FormItemParams[];
	formProps: AntdFormProps<F>;
	mode?: LayoutMode;
}

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

// 响应式配置常量
const RESPONSIVE_CONFIG = {
	self: { xxl: 6, xl: 6, lg: 8, md: 12, xs: 24 },
	normal: (span: number) => ({ lg: span, md: span, xs: 24 })
};

const getResponsiveProps = (span: number = 6, self: boolean = false) => {
	if (self) {
		return RESPONSIVE_CONFIG.self;
	}
	return RESPONSIVE_CONFIG.normal(span);
};

// 默认布局
const DefaultLayout: React.FC<{ formList: FormItemParams[] }> = ({ formList }) => (
	<>
		{formList.map((item) => (
			<FormItem item={item} key={item.key} />
		))}
	</>
);

// Row布局
const RowLayout: React.FC<{ formList: FormItemParams[]; self?: boolean }> = ({ formList, self = false }) => (
	<Row>
		{formList.map((item) => (
			<Col {...getResponsiveProps(item.span, self)} key={item.key}>
				<FormItem item={item} />
			</Col>
		))}
	</Row>
);

const AppForm = <F = any,>({ formList, mode, formProps }: AppFormProps<F>) => {
	// 过滤掉不显示的项
	const visibleFormList = useMemo(() => formList.filter((item: FormItemParams) => item.show !== false), [formList]);

	const formLayout = useMemo(() => {
		if (mode?.type === 'default') {
			return <DefaultLayout formList={visibleFormList} />;
		}

		if (mode?.type === 'custom') {
			return mode.setCustom({ formItem: FormItem, formList: visibleFormList });
		}

		// type === 'row' or undefined
		return <RowLayout formList={visibleFormList} self={mode?.self} />;
	}, [mode, visibleFormList]);

	return <Form {...formProps}>{formLayout}</Form>;
};

export type { AppFormProps as FormProps };
export default AppForm;
