/**
 * @file Loading
 * @author ly
 * @createDate 2020年4月27日
 */
import React, { ReactNode, FC } from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import styles from './index.module.scss';
import { SpinProps } from 'antd/lib/spin';

export const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

/**
 * @param loading 状态
 * @param children 子集内容
 */
interface LoadingProps {
	loading?: boolean;
	children?: ReactNode | null;
}

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const Iloading: FC<SpinProps> = ({ ...config }) => {
	const { spinning, children, delay = 200, ...rest } = config;
	if (typeof spinning === 'boolean') {
		return (
			<Spin indicator={antIcon} spinning={spinning} delay={delay} {...rest}>
				{children}
			</Spin>
		);
	} else {
		return (
			<div className={styles['loading-example']}>
				<Spin indicator={antIcon} delay={delay} {...rest}></Spin>
			</div>
		);
	}
};

export default Iloading;
