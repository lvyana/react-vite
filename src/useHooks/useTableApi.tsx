/**
 * @file usehooks 表格、表单、分页
 * @author ly
 * @createDate
 */
import React, { useRef, useState } from 'react';
import { FormInstance, PaginationProps } from 'antd';
import { ResponseData } from '@/api/request';
/**
 * @method service 请求方法
 * @param {P & Page} data 分页和表单
 * @param {P} P 表单
 * @param {R} R 表格数据
 */
type Api<P, R> = (data: P & Page) => Promise<ResponseData<R>>;

/**
 * @param {*} form 表单实例
 * @param {*} defaultPageSize 默认每页条数
 * @param {*} defaultPageNum 默认页码
 * @param {*} callback 请求成功回调
 * @param {*} errorCallback 请求失败回调
 */
type UseRequestParams<P, R, E> = {
	form: FormInstance<P>;
	extraParams?: E;
	defaultPageSize?: number;
	defaultPageNum?: number;
	callback?: (data: ResponseData<R>) => void;
	errorCallback?: (data: unknown) => void;
};

/**
 * @param {*} loading 加载状态
 * @param {*} dataSource 表格数据
 * @param {*} total 总条数
 * @param {*} page 页码和每页条数
 * @param {*} onPaginationChange 页码和每页条数改变时的回调
 * @param {*} search 搜索操作
 */
type UseRequestReturn<P, R> = {
	loading: boolean;
	dataSource: R | undefined;
	total: number;
	page: Page;
	onPaginationChange: PaginationProps['onChange'];
	search: {
		submit: () => void;
		reset: () => void;
	};
};

/**
 * @param {*} pageSize 每页条数
 * @param {*} pageNum 页码
 */
type Page = {
	pageSize: number;
	pageNum: number;
};

/**
 * lodash 文档
 * https://www.lodashjs.com/docs/lodash.debounce#throttle
 */
// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const useFusionTable = <P, R, E>(api: Api<P, R>, params?: UseRequestParams<P, R, E>): UseRequestReturn<P, R> => {
	const { form, extraParams, defaultPageSize, defaultPageNum, callback, errorCallback } = params || {};

	const [loading, setLoading] = useState(false);
	const [total, setTotal] = useState(0);
	const [dataSource, setDataSource] = useState<R>();

	const page = useRef({
		pageSize: defaultPageSize || 10,
		pageNum: defaultPageNum || 1
	});

	const onPaginationChange = (pageNum: number, pageSize: number) => {
		page.current = {
			pageNum: pageNum,
			pageSize: pageSize
		};
		const formParams = form?.getFieldsValue();
		run(formParams as P);
	};

	/**
	 * 在您的代码中，每次调用useRequest时都会创建一个新的debounced函数实例，
	 * 这样会导致每个debounced函数实例之间相互独立，无法共享状态，从而导致重复调用的问题。
	 * 为了解决这个问题，您可以使用React的useRef钩子来存储debounced函数的引用，
	 * 并确保在每次调用useRequest时共享同一个debounced函数实例。以下是修改后的代码示例：
	 */
	const run = async (params: P) => {
		try {
			setLoading(true);
			const res = await api({ ...params, ...page.current, ...extraParams });
			const { data, total } = res;
			setDataSource(data);
			setTotal(total);
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
	};

	const submit = () => {
		const formParams = form?.getFieldsValue();
		page.current = {
			pageSize: defaultPageSize || 10,
			pageNum: defaultPageNum || 1
		};
		if (formParams) {
			run(formParams);
		}
	};

	const reset = () => {
		form?.resetFields();
		submit();
	};

	const search = { submit, reset };
	return {
		loading,
		dataSource,
		page: {
			pageSize: page.current.pageSize,
			pageNum: page.current.pageNum
		},
		total,
		onPaginationChange,
		search
	};
};

export default useFusionTable;
