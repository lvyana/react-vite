/**
 * @file 响应式表单
 * @author ly
 * @createDate 2020年4月27日
 */
import React from 'react';
import AppForm, { FormItemParams, AppFormProps } from '@/components/antd/AppForm';
import AnimateComponent from '@/components/plugin/AnimateComponent';
import { IresponsiveMin, IresponsiveMax } from '@/components/plugin/Responsive';
import AppCard from '@/components/antd/AppCard';

/**
 * 响应式表单props
 * @param form 表单实例
 * @param formList 表单集合类型
 */
interface SearchFormProps<P> {
	formProps: AppFormProps<P>['formProps'];
	formList: FormItemParams[];
}

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const AppSearchForm = <P extends object>({ formProps, formList }: SearchFormProps<P>) => {
	return (
		<>
			<IresponsiveMax maxWidth={1540}>
				<AnimateComponent>
					<AppForm formProps={formProps} formList={formList}></AppForm>
				</AnimateComponent>
			</IresponsiveMax>

			<IresponsiveMin minWidth={1540}>
				<AppCard styles={{ body: { paddingBottom: 0 } }}>
					<AppForm formProps={formProps} formList={formList}></AppForm>
				</AppCard>
			</IresponsiveMin>
		</>
	);
};

export default AppSearchForm;
