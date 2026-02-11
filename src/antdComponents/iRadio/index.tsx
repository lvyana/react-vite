/**
 * @file 单选框
 * @author ly
 * @createDate 2023年1月3日
 */
import React, { FC, ReactNode } from 'react';
import { Radio, RadioChangeEvent } from 'antd';
import IconFont from '@/utils/iconfont';
import { CheckboxOptionType } from 'antd/lib/checkbox';
import { RadioGroupProps } from 'antd/lib/radio/interface';

export type RadioType = {
	options?: (RadioOptionType | string | number)[];
} & Omit<RadioGroupProps, 'options'>;

export type RadioOptionType = CheckboxOptionType & { icon?: string };
// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const getRadio = (config: RadioType) => {
	const { options, ...rest } = config;
	return <Radio.Group {...rest} options={setOption(options)} />;
};

// 处理icon图标
const setOption = (option?: (RadioOptionType | string | number)[]) => {
	return option?.map((item) => {
		if (typeof item === 'string' || typeof item === 'number') {
			return item;
		}
		if (item.icon) {
			return {
				...item,
				label: (
					<>
						<IconFont type={item.icon} />
						{item.label}
					</>
				)
			};
		}
		return item;
	});
};

export default getRadio;
