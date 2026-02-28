/**
 * @file 对话框
 * @author ly
 * @createDate 日期：2020年4月27日
 */
import React, { FC, ReactNode } from 'react';
import { Modal } from 'antd';
import { ModalProps } from 'antd/lib/modal';

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const Imodal: FC<ModalProps> = ({ ...config }) => {
	const { width = '500px', maskClosable = false, destroyOnHidden = true, children, ...rest } = config;

	return (
		<>
			<Modal {...rest} width={width} maskClosable={maskClosable} destroyOnHidden={destroyOnHidden}>
				{children}
			</Modal>
		</>
	);
};

export type { ModalProps };
export default Imodal;
