/**
 * @file hoc forwardRef
 * @author ly
 * @createDate 2024年6月24日
 */
import React, { FC, ForwardRefRenderFunction, PropsWithoutRef, Ref, forwardRef } from 'react';

export type ComRef<T> = Ref<T>;

type HocProps<T> = {
	comRef: ComRef<T>;
};

/**
 * 调用 hocForwardRef 时要过滤 comRef 因为 Component 不需要这个 comRef 这个参数
 * Com 组件是需要 comRef 这个参数
 * hocForwardRef<refParam, Omit<Iprops, 'comRef'>>(Preview, 'Preview');
 */
// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const hocForwardRef = <T, P>(Com: FC<HocProps<T> & PropsWithoutRef<P>>, displayName: string) => {
	const Component = forwardRef<T, P>((props, ref) => {
		return <Com {...props} comRef={ref}></Com>;
	});
	Component.displayName = displayName;
	return Component;
};

const forwardRefFunc = <T, P>(func: ForwardRefRenderFunction<T, PropsWithoutRef<P>>, displayName: string) => {
	const Component = forwardRef<T, P>(func);
	Component.displayName = displayName;
	return Component;
};

export { hocForwardRef, forwardRefFunc };
