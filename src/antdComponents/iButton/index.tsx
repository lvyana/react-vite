/**
 * @file 按钮
 * @author ly
 * @createDate 2023年10月25日
 */
import React, { FC, ReactElement } from 'react';
import { Button } from 'antd';
import IconFont from '../../utils/iconfont';
import Wrapper, { WaveType } from './Wrapper';
import { ButtonProps } from 'antd/lib/button';

/**
 * @interface
 * @param {IbuttonItemProps} config 单个按钮
 * @param {boolean} loading 动画
 * @method onClick 点击事件
 */
export type IbuttonItemProps = {
	name?: string;
	waveType?: WaveType;
	icon?: string | ReactElement;
} & Omit<ButtonProps, 'icon'>;

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const Ibutton: FC<IbuttonItemProps> = ({ ...config }) => {
	const { waveType, icon, name, onClick, ...rest } = config;

	return (
		<Wrapper waveType={waveType}>
			<Button {...rest} onClick={onClick} icon={getIconNode(icon)}>
				{name}
			</Button>
		</Wrapper>
	);
};

const getIconNode = (iconFont?: React.ReactNode) => {
	if (iconFont) {
		if (React.isValidElement(iconFont)) {
			return <>{iconFont}</>;
		} else if (typeof iconFont === 'string') {
			return <IconFont type={iconFont}></IconFont>;
		}
	}
};

export default Ibutton;
