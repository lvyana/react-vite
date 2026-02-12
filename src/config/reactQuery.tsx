/**
 * @file React Query 配置
 * @author ly
 * @createDate 2024
 */
import { QueryClient } from '@tanstack/react-query';

// 创建 QueryClient 实例
export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			// 数据立即过期，但保留缓存 1 分钟以减少重复请求
			staleTime: 0,
			// 缓存时间 1 分钟，避免频繁请求
			gcTime: 60 * 1000,
			// 失败后重试次数
			retry: 1,
			// 窗口重新获得焦点时不重新获取数据
			refetchOnWindowFocus: false,
			// 网络重新连接时重新获取数据
			refetchOnReconnect: true,
			// 组件挂载时不自动重新获取（如果数据已存在）
			refetchOnMount: false
		},
		mutations: {
			// mutation 失败后重试次数
			retry: 0
		}
	}
});
