import React, { DetailedHTMLProps, FC, ForwardRefRenderFunction, HTMLAttributes, ReactNode, useImperativeHandle, useState } from 'react';
import { Row, Col } from 'antd';
import { hocForwardRef, ComRef, forwardRefFunc } from '@/hoc/forwardRefHoc';
import Imodal from '@/antdComponents/iModal';

export type RefParam = {
	onOpen: () => void;
};
// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

interface Iprops {
	content: string;
}
const Preview: ForwardRefRenderFunction<RefParam, Iprops> = ({ content }, ref) => {
	const onOpen = () => {
		setOpen(true);
	};
	useImperativeHandle(ref, () => {
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
		<Imodal title="预览代码" width="1000px" open={open} confirmLoading={confirmLoading} onOk={onOk} onCancel={onOk}>
			<div>{content}</div>
		</Imodal>
	);
};

export default forwardRefFunc(Preview, 'Preview');
