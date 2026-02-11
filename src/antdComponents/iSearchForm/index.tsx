/**
 * @file 响应式表单
 * @author ly
 * @createDate 2020年4月27日
 */
import React from 'react';
import Iform, { FormItemParams, FormProps } from '@/antdComponents/iForm';
import AnimateComponent from '@/pluginComponents/iAnimateComponent';
import { IresponsiveMin, IresponsiveMax } from '@/pluginComponents/iResponsive';
import Icard from '@/antdComponents/iCard';

/**
 * 响应式表单props
 * @param form 表单实例
 * @param formList 表单集合类型
 */
interface IsearchFormProps<P> {
	formProps: FormProps<P>;
	formList: FormItemParams[];
}

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const IsearchForm = <P extends object>({ formProps, formList }: IsearchFormProps<P>) => {
	return (
		<>
			<IresponsiveMax maxWidth={1540}>
				<AnimateComponent>
					<Iform formProps={formProps} formList={formList}></Iform>
				</AnimateComponent>
			</IresponsiveMax>

			<IresponsiveMin minWidth={1540}>
				<Icard styles={{ body: { paddingBottom: 0 } }}>
					<Iform formProps={formProps} formList={formList}></Iform>
				</Icard>
			</IresponsiveMin>
		</>
	);
};

export default IsearchForm;
