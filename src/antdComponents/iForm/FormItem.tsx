/**
 * @file FormItem
 * @author ly
 * @createDate 2023年10月25日
 */
import React, { FC } from 'react';
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

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

// 通过type处理不同formItem
const FormItem: FC<FormItemProps> = ({ item }) => {
	if (item.type === 'input') {
		return (
			<Form.Item {...item.formItemProps} getValueFromEvent={(e) => e.target.value.replace(/(^\s*)|(\s*$)/g, '')}>
				{getFormItemCom(item)}
			</Form.Item>
		);
	}

	if (item.type === 'upload') {
		return (
			<Form.Item {...item.formItemProps} valuePropName="fileList" getValueFromEvent={normFile}>
				{getFormItemCom(item)}
			</Form.Item>
		);
	}

	return <Form.Item {...item.formItemProps}>{getFormItemCom(item)}</Form.Item>;
};

// 获取对应的formItem 子组件
const getFormItemCom = (item: FormItemParams) => {
	if (item.type === 'input') {
		const comConfig = item.comConfig || {};
		return FORM_ITEM_MAP[item.type](comConfig);
	}

	if (item.type === 'select') {
		const comConfig = item.comConfig || {};
		return FORM_ITEM_MAP[item.type](comConfig);
	}

	if (item.type === 'treeSelect') {
		const comConfig = item.comConfig || {};
		return FORM_ITEM_MAP[item.type](comConfig);
	}

	if (item.type === 'cascader') {
		const comConfig = item.comConfig || {};
		return FORM_ITEM_MAP[item.type](comConfig);
	}

	if (item.type === 'datePicker') {
		const comConfig = item.comConfig || {};
		return FORM_ITEM_MAP[item.type](comConfig);
	}

	if (item.type === 'rangePicker') {
		const comConfig = item.comConfig || {};
		return FORM_ITEM_MAP[item.type](comConfig);
	}

	if (item.type === 'timePicker') {
		const comConfig = item.comConfig || {};
		return FORM_ITEM_MAP[item.type](comConfig);
	}

	if (item.type === 'timeRangePicker') {
		const comConfig = item.comConfig || {};
		return FORM_ITEM_MAP[item.type](comConfig);
	}

	if (item.type === 'inputNumber') {
		const comConfig = item.comConfig || {};
		return FORM_ITEM_MAP[item.type](comConfig);
	}

	if (item.type === 'switch') {
		const comConfig = item.comConfig || {};
		return FORM_ITEM_MAP[item.type](comConfig);
	}

	if (item.type === 'button') {
		const comConfig = item.comConfig || {};
		return FORM_ITEM_MAP[item.type](comConfig);
	}

	if (item.type === 'radio') {
		const comConfig = item.comConfig || {};
		return FORM_ITEM_MAP[item.type](comConfig);
	}

	if (item.type === 'checkboxGroup') {
		const comConfig = item.comConfig || {};
		return FORM_ITEM_MAP[item.type](comConfig);
	}

	if (item.type === 'checkbox') {
		const comConfig = item.comConfig || {};
		return FORM_ITEM_MAP[item.type](comConfig);
	}

	if (item.type === 'rate') {
		const comConfig = item.comConfig || {};
		return FORM_ITEM_MAP[item.type](comConfig);
	}

	if (item.type === 'textArea') {
		const comConfig = item.comConfig || {};
		return FORM_ITEM_MAP[item.type](comConfig);
	}

	if (item.type === 'slider') {
		const comConfig = item.comConfig || {};
		return FORM_ITEM_MAP[item.type](comConfig);
	}

	if (item.type === 'upload') {
		const comConfig = item.comConfig || {};
		return FORM_ITEM_MAP[item.type](comConfig);
	}

	if (item.type === 'slot') {
		const comConfig = item.comConfig || {};
		return FORM_ITEM_MAP[item.type](comConfig);
	}
};

export default FormItem;
