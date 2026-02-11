/**
 * @file 开关
 * @author ly
 * @createDate 2023年1月3日
 */
import React, { FC, ReactNode } from 'react';
import { Switch } from 'antd';
import { SwitchChangeEventHandler, SwitchProps } from 'antd/es/switch';

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const getSwitch = (config?: SwitchProps) => {
	return <Switch {...config} />;
};

export type { SwitchProps };
export default getSwitch;
