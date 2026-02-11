/**
 * @file 滑动输入条
 * @author ly
 * @createDate 2023年1月3日
 */
import React, { FC } from 'react';
import { Slider } from 'antd';
import { SliderRangeProps, SliderSingleProps } from 'antd/es/slider';

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const getSlider = (config: SliderSingleProps | SliderRangeProps) => {
	return <Slider {...config} />;
};

export type { SliderSingleProps, SliderRangeProps };
export default getSlider;
