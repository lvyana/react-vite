/**
 * @file FormItem
 * @author ly
 * @createDate 2023年10月25日
 */
import React, { FC, memo, useMemo } from 'react';
import { Form } from 'antd';
import FORM_ITEM_MAP from './components/formItemMap';
import type { UploadFile } from 'antd/lib/upload/interface';
import type { FormItemParams } from './type';

export type FormItemProps = {
	item: FormItemParams;
};

/**
 * React Ant Design Upload 组件在Form中使用的警告,如何排除:
 * 警告信息 Warning: [antd: Upload] value is not a valid prop, do you mean fileList?
 *
 * 解决方法:
 * 当您在Form.Item中使用Upload时,可能遇到此类警告,解决该问题只需要在Form.Item组件的属性列表中添加如下两个属性即可:
 * valuePropName="fileList"
 * getValueFromEvent={normFile}
 */

const normFile = (e: { fileList: UploadFile[] }) => {
	if (Array.isArray(e)) {
		return e;
	}
	return e?.fileList;
};

// 输入框 trim 处理
const trimInputValue = (e: React.ChangeEvent<HTMLInputElement>) => e.target.value.trim();

// 额外属性配置映射（避免每次渲染都创建新对象）
const EXTRA_PROPS_MAP = {
	input: {
		getValueFromEvent: trimInputValue,
	},
	upload: {
		valuePropName: 'fileList' as const,
		getValueFromEvent: normFile,
	},
} as const;

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

// 获取 Form.Item 的额外属性配置
const getFormItemExtraProps = (type: FormItemParams['type']) => {
	return EXTRA_PROPS_MAP[type as keyof typeof EXTRA_PROPS_MAP] || {};
};

// 通过 type 处理不同 formItem
const FormItem: FC<FormItemProps> = memo(({ item }) => {
	const extraProps = useMemo(() => getFormItemExtraProps(item.type), [item.type]);

	const formItemComponent = useMemo(() => {
		const comConfig = item.comConfig || {};
		const component = FORM_ITEM_MAP[item.type];

		if (!component) {
			console.error(`[FormItem] Unknown form item type: ${item.type}`);
			return null;
		}

		return component(comConfig as any);
	}, [item.type, item.comConfig]);

	return (
		<Form.Item {...item.formItemProps} {...extraProps}>
			{formItemComponent}
		</Form.Item>
	);
});

FormItem.displayName = 'FormItem';

export default FormItem;
