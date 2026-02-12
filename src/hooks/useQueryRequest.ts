/**
 * @file React Query 请求 hooks 封装
 * @description 封装 @tanstack/react-query 的常用请求模式，提供统一的 API 调用接口
 * @author ly
 * @createDate 2024
 */
import { useQuery, useMutation, useQueryClient, type UseQueryOptions, type UseMutationOptions } from '@tanstack/react-query';

// #----------- 上: 类型定义 ----------- 分割线 ----------- 下: Hooks 实现 -----------

/**
 * 通用响应数据类型
 * @template T 响应数据的类型
 * @property {number} code - 响应状态码
 * @property {T} data - 响应数据
 * @property {string} message - 响应消息
 */
export type ResponseData<T = any> = {
	code: number;
	data: T;
	message: string;
};

/**
 * API 函数类型定义
 * @template TParams 请求参数类型，默认为 void（无参数）
 * @template TData 响应数据类型，默认为 any
 * @description 定义 API 函数的标准签名，接收参数并返回 Promise<ResponseData>
 */
export type ApiFunction<TParams = void, TData = any> = (params: TParams) => Promise<ResponseData<TData>>;

/**
 * 通用 Query Hook - 用于自动执行的 GET 请求
 *
 * @template TParams 请求参数类型
 * @template TData 响应数据类型
 *
 * @param {any[]} queryKey - React Query 的查询键，用于缓存标识和失效控制
 * @param {ApiFunction<TParams, TData>} apiFn - API 请求函数
 * @param {TParams} params - 请求参数
 * @param {UseQueryOptions} options - React Query 的配置选项（可选）
 *
 * @returns {UseQueryResult} React Query 的查询结果对象
 *
 * @example
 * // 基础用法
 * const { data, isLoading, error } = useQueryRequest(
 *   ['users', 'list'],
 *   getUserList,
 *   { page: 1, size: 10 }
 * );
 *
 * @example
 * // 带配置选项
 * const { data } = useQueryRequest(
 *   ['users', userId],
 *   getUserDetail,
 *   userId,
 *   {
 *     staleTime: 5 * 60 * 1000, // 5分钟内数据不过期
 *     enabled: !!userId // 只有 userId 存在时才执行
 *   }
 * );
 */
export function useQueryRequest<TParams = void, TData = any>(
	queryKey: any[],
	apiFn: ApiFunction<TParams, TData>,
	params: TParams,
	options?: Omit<UseQueryOptions<ResponseData<TData>>, 'queryKey' | 'queryFn'>
) {
	return useQuery({
		// 将参数合并到 queryKey 中，确保参数变化时重新请求
		queryKey: [...queryKey, params],
		// 查询函数：调用 API 并返回响应数据
		queryFn: async () => {
			const response = await apiFn(params);
			return response;
		},
		// 合并用户传入的其他配置选项
		...options
	});
}

/**
 * 手动触发的 Query Hook - 类似 ahooks 的 useRequest({ manual: true })
 *
 * @template TParams 请求参数类型
 * @template TData 响应数据类型
 *
 * @param {any[]} queryKey - React Query 的查询键
 * @param {ApiFunction<TParams, TData>} apiFn - API 请求函数
 * @param {UseQueryOptions} options - React Query 的配置选项（可选）
 *
 * @returns {Object} 返回对象
 * @returns {Function} run - 手动触发请求的函数
 * @returns {boolean} loading - 加载状态
 * @returns {*} 其他 useQuery 返回的属性
 *
 * @description
 * 该 Hook 不会自动执行请求，需要手动调用 run 方法触发
 * 适用于需要用户交互后才执行的请求场景
 *
 * @example
 * const { run, loading, data } = useManualQuery(
 *   ['search'],
 *   searchApi
 * );
 *
 * // 在事件处理函数中手动触发
 * const handleSearch = async () => {
 *   const result = await run({ keyword: 'react' });
 *   console.log(result);
 * };
 */
export function useManualQuery<TParams = void, TData = any>(
	queryKey: any[],
	apiFn: ApiFunction<TParams, TData>,
	options?: Omit<UseQueryOptions<ResponseData<TData>>, 'queryKey' | 'queryFn'>
) {
	const queryClient = useQueryClient();

	// 创建一个禁用的 query，不会自动执行
	const query = useQuery({
		queryKey,
		queryFn: async () => {
			// 抛出错误，因为这个 query 应该通过 run 方法手动触发
			throw new Error('This query should be triggered manually');
		},
		enabled: false, // 禁用自动执行
		...options
	});

	/**
	 * 手动触发请求的函数
	 * @param {TParams} params - 请求参数
	 * @returns {Promise<ResponseData<TData>>} 返回响应数据
	 */
	const run = async (params: TParams) => {
		const response = await apiFn(params);
		// 手动更新缓存
		queryClient.setQueryData([...queryKey, params], response);
		return response;
	};

	return {
		...query,
		run,
		// 统一的 loading 状态，包含 isLoading 和 isFetching
		loading: query.isLoading || query.isFetching
	};
}

/**
 * Mutation Hook - 用于 POST/PUT/DELETE 请求或手动触发的请求
 *
 * @template TParams 请求参数类型
 * @template TData 响应数据类型
 *
 * @param {ApiFunction<TParams, TData>} apiFn - API 请求函数
 * @param {UseMutationOptions} options - React Query Mutation 的配置选项（可选）
 *
 * @returns {Object} 返回对象
 * @returns {Function} run - 触发 mutation 的函数（同步）
 * @returns {Function} runAsync - 触发 mutation 的函数（异步，返回 Promise）
 * @returns {boolean} loading - 加载状态
 * @returns {*} 其他 useMutation 返回的属性
 *
 * @description
 * 适用场景：
 * 1. POST/PUT/DELETE 等修改数据的请求
 * 2. 需要手动触发的 GET 请求
 * 3. 不需要缓存的请求
 *
 * @example
 * // 基础用法
 * const { run, loading } = useMutationRequest(createUser, {
 *   onSuccess: (data) => {
 *     message.success('创建成功');
 *   },
 *   onError: (error) => {
 *     message.error('创建失败');
 *   }
 * });
 *
 * // 触发请求
 * run({ name: 'John', age: 25 });
 *
 * @example
 * // 使用 async/await
 * const { runAsync } = useMutationRequest(updateUser);
 *
 * const handleUpdate = async () => {
 *   try {
 *     const result = await runAsync({ id: 1, name: 'Jane' });
 *     console.log('更新成功', result);
 *   } catch (error) {
 *     console.error('更新失败', error);
 *   }
 * };
 *
 * @example
 * // 配合 React Query 的乐观更新
 * const { run } = useMutationRequest(deleteUser, {
 *   onMutate: async (userId) => {
 *     // 取消相关查询
 *     await queryClient.cancelQueries({ queryKey: ['users'] });
 *
 *     // 保存当前数据快照
 *     const previousUsers = queryClient.getQueryData(['users']);
 *
 *     // 乐观更新 UI
 *     queryClient.setQueryData(['users'], (old) =>
 *       old.filter(user => user.id !== userId)
 *     );
 *
 *     return { previousUsers };
 *   },
 *   onError: (err, variables, context) => {
 *     // 发生错误时回滚
 *     queryClient.setQueryData(['users'], context.previousUsers);
 *   },
 *   onSettled: () => {
 *     // 无论成功失败都重新获取数据
 *     queryClient.invalidateQueries({ queryKey: ['users'] });
 *   }
 * });
 */
export function useMutationRequest<TParams = void, TData = any>(
	apiFn: ApiFunction<TParams, TData>,
	options?: UseMutationOptions<ResponseData<TData>, Error, TParams>
) {
	const mutation = useMutation({
		// Mutation 函数：调用 API 并返回响应数据
		mutationFn: async (params: TParams) => {
			const response = await apiFn(params);
			return response;
		},
		// 合并用户传入的配置选项
		...options
	});

	return {
		// 展开所有 mutation 的属性和方法
		...mutation,
		// 提供统一的 run 方法（同步触发）
		run: mutation.mutate,
		// 提供统一的 runAsync 方法（异步触发，返回 Promise）
		runAsync: mutation.mutateAsync,
		// 提供统一的 loading 状态
		loading: mutation.isPending
	};
}
