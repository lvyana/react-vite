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
			// 数据过期时间（5分钟）
			staleTime: 5 * 60 * 1000,
			// 缓存时间（10分钟）
			gcTime: 10 * 60 * 1000,
			// 失败后重试次数
			retry: 1,
			// 窗口重新获得焦点时重新获取数据
			refetchOnWindowFocus: false,
			// 网络重新连接时重新获取数据
			refetchOnReconnect: true
		},
		mutations: {
			// mutation 失败后重试次数
			retry: 0
		}
	}
});
