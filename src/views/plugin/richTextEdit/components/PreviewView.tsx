import React, { DetailedHTMLProps, FC, HTMLAttributes, ReactNode, useImperativeHandle, useState } from 'react';
import { Row, Col } from 'antd';
import { hocForwardRef, ComRef } from '@/hoc/forwardRefHoc';
import Imodal from '@/antdComponents/iModal';

export type RefParam = {
	onOpen: () => void;
};

interface Iprops {
	content: string;
	comRef: ComRef<RefParam>;
}
// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const Preview: FC<Iprops> = ({ content, comRef }) => {
	const onOpen = () => {
		setOpen(true);
	};
	useImperativeHandle(comRef, () => {
		return {
			onOpen
		};
	});

	// 弹窗
	const [open, setOpen] = useState(false);
	const [confirmLoading, setConfirmLoading] = useState(false);

	const onOk = () => {
		setOpen(false);
	};

	return (
		<Imodal title="预览效果" width="1000px" open={open} confirmLoading={confirmLoading} onOk={onOk} onCancel={onOk}>
			<div
				dangerouslySetInnerHTML={{
					__html: content
				}}></div>
		</Imodal>
	);
};

export default hocForwardRef<RefParam, Omit<Iprops, 'comRef'>>(Preview, 'Preview');
