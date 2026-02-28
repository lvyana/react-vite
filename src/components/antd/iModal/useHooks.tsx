/**
 * @name 弹框hokks
 * @user ly
 * @date 2024年9月11日
 */
import { useState } from 'react';

export type UseModalParams = {
	onOpenCallback?: (resolve: (value?: unknown) => void, reject: (reason?: unknown) => void) => void;
	onCancelCallback?: (resolve: (value?: unknown) => void, reject: (reason?: unknown) => void) => void;
	onOkCallback?: (resolve: (value?: unknown) => void, reject: (reason?: unknown) => void) => void;
};

type UseModalReturn = {
	open: boolean;
	loading: boolean;
	onOpen: () => void;
	onCancel: () => void;
	onOk: () => void;
};
export type UseModalFn = (params?: UseModalParams) => UseModalReturn;
// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const useModal: UseModalFn = (config) => {
	const { onOpenCallback, onCancelCallback, onOkCallback } = config || {};

	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	// 打开
	const onOpen = async () => {
		try {
			if (onOpenCallback) {
				await new Promise(onOpenCallback);
			}
			setOpen(true);
		} catch (error) {}
	};

	// 取消
	const onCancel = async () => {
		try {
			if (onCancelCallback) {
				await new Promise(onCancelCallback);
			}
			setOpen(false);
		} catch (error) {}
	};

	// 确定
	const onOk = async () => {
		try {
			if (onOkCallback) {
				setLoading(true);
				await new Promise(onOkCallback);
				setLoading(false);
			}
			setOpen(false);
		} catch (error) {
			setLoading(false);
		}
	};
	return { open, loading, onOpen, onCancel, onOk };
};

export default useModal;
