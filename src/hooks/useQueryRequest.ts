/**
 * @file React Query 请求 hooks
 * @author ly
 * @createDate 2024
 */
import { useQuery, useMutation, useQueryClient, type UseQueryOptions, type UseMutationOptions } from '@tanstack/react-query';

// 通用响应类型
export type ResponseData<T = any> = {
	code: number;
	data: T;
	message: string;
};

// API 函数类型 - 支持直接返回 ResponseData 或 AxiosResponse
export type ApiFunction<TParams = void, TData = any> = (params: TParams) => Promise<ResponseData<TData>>;

/**
 * 通用 Query Hook
 * 用于 GET 请求
 */
export function useQueryRequest<TParams = void, TData = any>(
	queryKey: any[],
	apiFn: ApiFunction<TParams, TData>,
	params: TParams,
	options?: Omit<UseQueryOptions<ResponseData<TData>>, 'queryKey' | 'queryFn'>
) {
	return useQuery({
		queryKey: [...queryKey, params],
		queryFn: async () => {
			const response = await apiFn(params);
			return response;
		},
		...options
	});
}

/**
 * 手动触发的 Query Hook
 * 类似 ahooks 的 useRequest({ manual: true })
 */
export function useManualQuery<TParams = void, TData = any>(
	queryKey: any[],
	apiFn: ApiFunction<TParams, TData>,
	options?: Omit<UseQueryOptions<ResponseData<TData>>, 'queryKey' | 'queryFn'>
) {
	const queryClient = useQueryClient();

	const query = useQuery({
		queryKey,
		queryFn: async () => {
			throw new Error('This query should be triggered manually');
		},
		enabled: false,
		...options
	});

	const run = async (params: TParams) => {
		const response = await apiFn(params);
		queryClient.setQueryData([...queryKey, params], response);
		return response;
	};

	return {
		...query,
		run,
		loading: query.isLoading || query.isFetching
	};
}

/**
 * Mutation Hook
 * 用于 POST/PUT/DELETE 请求或手动触发的请求
 */
export function useMutationRequest<TParams = void, TData = any>(
	apiFn: ApiFunction<TParams, TData>,
	options?: UseMutationOptions<ResponseData<TData>, Error, TParams>
) {
	const mutation = useMutation({
		mutationFn: async (params: TParams) => {
			const response = await apiFn(params);
			return response;
		},
		...options
	});

	return {
		...mutation,
		run: mutation.mutate,
		runAsync: mutation.mutateAsync,
		loading: mutation.isPending
	};
}
