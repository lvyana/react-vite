/**
 * @file 评分
 * @author ly
 * @createDate 2023年1月3日
 */
import React from 'react';
import { Rate } from 'antd';
import { RateProps } from 'antd/lib/rate';

/**
 * 评分
 * @param option 自定义每项的提示信息
 */
export type RateType = RateProps;

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const getRate = (config: RateType) => {
	const { style, ...rest } = config;
	return <Rate {...rest} style={{ width: '100%', ...style }} />;
};

export default getRate;
