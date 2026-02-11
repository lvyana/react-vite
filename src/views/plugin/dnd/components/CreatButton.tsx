/**
 * @file 创建按钮
 * @author ly
 * @createDate 2023年2月25日
 */
import React, { FC, useState } from 'react';
import { Button, Col, Form, Input, Row, Space } from 'antd';
import Ibutton from '@/antdComponents/iButton';
import { getInput, getNumber } from '@/antdComponents/iInput';
import getSelect, { SelectType } from '@/antdComponents/iSelect';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';
import type { ButtonOptionsParams } from '../EditForm';

/**
 * @param options 集合
 * @param key 对应key值
 * @param value 修改内容
 * @param id 唯一id
 */
type GetNewOptionsParams = {
	options: ButtonOptionsParams[];
	key: 'name' | 'tag' | 'type' | 'span' | 'permission' | 'icon';
	value: number | string | null;
	tag: string;
};

/**
 * @param options 静态数据
 * @param updateOptions 更新回调
 */
interface CreatButtonProps {
	options: ButtonOptionsParams[];
	updateOptions: (data: ButtonOptionsParams[]) => void;
}

const BUTTON_TYPE_OPTIONS = [
	{ type: 'primary', value: 'primary' },
	{ type: 'ghost', value: 'ghost' },
	{ type: 'dashed', value: 'dashed' },
	{ type: 'link', value: 'link' },
	{ type: 'text', value: 'text' },
	{ type: 'default', value: 'default' }
];
// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const CreatButton: FC<CreatButtonProps> = ({ options, updateOptions }) => {
	// 添加表单行
	const add = (tag: string) => {
		const addOption = options.find((option) => option.tag === tag);
		if (addOption) {
			updateOptions([...options, { ...addOption, tag: uuidv4() }]);
		}
	};

	// 删除表单行
	const subtract = (tag: string) => {
		if (options.length === 1) return;
		const subtractOption = options.filter((option) => option.tag !== tag);
		updateOptions(subtractOption);
	};

	const onChange = (value: React.ChangeEvent<HTMLInputElement>, key: GetNewOptionsParams['key'], tag: string) => {
		const newOptions = getNewOptions({ options, key, value: value.target.value, tag });

		updateOptions(newOptions);
	};

	const onInputNumberChange = (value: number | string | null, key: GetNewOptionsParams['key'], tag: string) => {
		const newOptions = getNewOptions({ options, key, value: value, tag });
		updateOptions(newOptions);
	};

	const onSelectChange = (value: SelectType['value'], key: GetNewOptionsParams['key'], tag: string) => {
		const newOptions = getNewOptions({ options, key, value: value, tag });
		updateOptions(newOptions);
	};

	const getNewOptions = ({ options, key, value, tag }: GetNewOptionsParams) => {
		return options.map((option) => {
			if (option.tag === tag) {
				if (['permission', 'tag', 'span'].indexOf(key) > -1) {
					return { ...option, [key]: value };
				} else {
					return { ...option, comConfig: { ...option.comConfig, [key]: value } };
				}
			}

			return option;
		});
	};
	return (
		<>
			{options.map((option, i) => {
				return (
					<Row key={i} className="m-4" gutter={16}>
						<Col span={12}>
							{getInput({
								placeholder: '名字',
								value: option.comConfig.name,
								onChange: (value) => onChange(value, 'name', option.tag)
							})}
						</Col>
						<Col span={12}>
							{getInput({
								placeholder: '标识类型',
								value: option.tag,
								onChange: (value) => onChange(value, 'tag', option.tag)
							})}
						</Col>
						<Col span={12}>
							{getSelect({
								placeholder: '组件类型',
								value: option.comConfig.type,
								options: BUTTON_TYPE_OPTIONS,
								fieldNames: {
									label: 'type',
									value: 'value'
								},
								onChange: (value) => onSelectChange(value, 'type', option.tag)
							})}
						</Col>
						<Col span={12}>
							{getInput({
								placeholder: '权限标识',
								value: option.permission,
								onChange: (value) => onChange(value, 'permission', option.tag)
							})}
						</Col>
						<Col span={12}>
							{getInput({
								placeholder: '图标',
								value: option.comConfig.icon as string,
								onChange: (value) => onChange(value, 'icon', option.tag)
							})}
						</Col>
						<Col span={12}>
							{getNumber({ placeholder: 'span', value: option.span, onChange: (value) => onInputNumberChange(value, 'span', option.tag) })}
						</Col>
						<Col span={12}>
							<Ibutton
								{...{
									name: '',
									block: true,
									type: 'dashed',
									icon: <PlusOutlined />,
									onClick: () => {
										add(option.tag);
									}
								}}></Ibutton>

							{/* <Button type="dashed" block icon={<PlusOutlined />}></Button> */}
						</Col>
						<Col span={12}>
							<Ibutton
								{...{
									name: '',
									block: true,
									type: 'dashed',
									icon: <MinusOutlined />,
									onClick: () => {
										subtract(option.tag);
									}
								}}></Ibutton>

							{/* <Button type="dashed" onClick={() => subtract(option.id)} block icon={<MinusOutlined />}></Button> */}
						</Col>
					</Row>
				);
			})}
		</>
	);
};

export default CreatButton;
