/**
 * @file usehooks 标准接口
 * @author ly
 * @createDate
 */
import React, { useRef, useState } from 'react';
import { DebouncedFunc, debounce } from 'lodash';
import { ResponseData } from '@/api/request';
/**
 * @method service 请求方法
 * @param {P} data 分页和表单
 * @param {P} P 参数
 * @param {R} R 返回数据
 */
type Api<P, R> = (data: P) => Promise<ResponseData<R>>;
/**
 * @param {number} wait 需要延迟的毫秒数
 * @param {boolean} leading 指定在延迟开始前调用 默认false
 * @param {boolean} trailing 指定在延迟开始后调用 默认true
 * @param {function} callback 延迟执行的回调函数
 * @param {function} errorCallback 延迟执行的回调函数
 */
type UseRequestParams<P, R> = {
	wait?: number;
	leading?: boolean;
	trailing?: boolean;
	callback?: (data: ResponseData<R>) => void;
	errorCallback?: (data: unknown) => void;
};

/**
 * @param {boolean} loading 加载状态
 * @param {ResponseData<R> | undefined} data 返回数据
 * @param {function} run 请求方法
 */
type UseRequestReturn<P, R> = {
	loading: boolean;
	data: ResponseData<R> | undefined;
	run: DebouncedFunc<(params: P) => Promise<void>>;
};

/**
 * lodash 文档
 * https://www.lodashjs.com/docs/lodash.debounce#throttle
 */
// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const useRequest = <P, R>(api: Api<P, R>, params?: UseRequestParams<P, R>): UseRequestReturn<P, R> => {
	const { wait, leading, trailing, callback, errorCallback } = params || {};

	const [loading, setLoading] = useState(false);
	const [data, setData] = useState<ResponseData<R>>();

	/**
	 * 在您的代码中，每次调用useRequest时都会创建一个新的debounced函数实例，
	 * 这样会导致每个debounced函数实例之间相互独立，无法共享状态，从而导致重复调用的问题。
	 * 为了解决这个问题，您可以使用React的useRef钩子来存储debounced函数的引用，
	 * 并确保在每次调用useRequest时共享同一个debounced函数实例。以下是修改后的代码示例：
	 */
	const runRef = useRef<DebouncedFunc<(params: P) => Promise<void>>>();
	if (!runRef.current) {
		runRef.current = debounce(
			async (params: P) => {
				try {
					setLoading(true);
					const res = await api(params);
					setData(res);
					setLoading(false);
					if (callback) {
						return callback(res);
					}
				} catch (err) {
					setLoading(false);
					if (errorCallback) {
						return errorCallback(err);
					}
				}
			},
			wait,
			{ leading, trailing }
		);
	}

	return { loading, data, run: runRef.current };
};

export default useRequest;
