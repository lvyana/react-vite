/**
 * @file axios封装 请求拦截、响应拦截、错误统一处理（双token机制）
 * @author ly
 * @createDate 2023年2月3日
 */
import axios, { InternalAxiosRequestConfig } from 'axios';
import type { AxiosRequestConfig, AxiosError, Method } from 'axios';
import abortController from './abortController';
import { errorCode, messages, logonFailure } from '@/utils/errorCode';
import { getAccessToken, getRefreshToken, setTokens, clearTokens, hasValidAccessToken, hasRefreshToken } from '@/utils/cookie';
import { refreshAccessToken } from './auth';

// 请求拦截器 引入加载圈
export const baseURL = import.meta.env.VITE_API_BASE_URL; //服务
console.log(import.meta.env.VITE_APP_ENV);

const config: AxiosRequestConfig = {
	baseURL,
	timeout: 1000 * 12,
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json;charset=utf-8'
	}
};

// 创建axios实例
let instance = axios.create(config);

// Token刷新状态管理
let isRefreshing = false;
let failedQueue: Array<{
	resolve: (value?: any) => void;
	reject: (reason?: any) => void;
}> = [];

// 处理队列中的请求
const processQueue = (error: any, token: string | null = null) => {
	failedQueue.forEach(({ resolve, reject }) => {
		if (error) {
			reject(error);
		} else {
			resolve(token);
		}
	});

	failedQueue = [];
};

// 处理token刷新逻辑
const handleTokenRefresh = async (originalRequest: InternalAxiosRequestConfig & { _retry?: boolean }, error: AxiosRequestConfig) => {
	// 如果正在刷新token，将请求加入队列
	if (isRefreshing) {
		return new Promise((resolve, reject) => {
			failedQueue.push({ resolve, reject });
		}).then((token) => {
			if (originalRequest.headers) {
				originalRequest.headers.Authorization = `Bearer ${token}`;
			}
			return instance(originalRequest);
		});
	}

	originalRequest._retry = true;
	isRefreshing = true;

	// 尝试刷新token
	if (!hasRefreshToken()) {
		clearTokens();
		logonFailure();
		return Promise.reject(new Error('No refresh token available'));
	}

	try {
		const refreshResponse = await refreshAccessToken();

		if (refreshResponse?.code !== 200) {
			throw new Error('Token refresh failed');
		}

		// 保存新的token
		setTokens({
			accessToken: refreshResponse.data.accessToken,
			refreshToken: refreshResponse.data.refreshToken
		});

		// 更新请求头
		if (originalRequest.headers) {
			originalRequest.headers.Authorization = `Bearer ${refreshResponse.data.accessToken}`;
		}

		// 处理队列中的请求
		processQueue(null, refreshResponse.data.accessToken);

		// 重试原始请求
		return instance(originalRequest);
	} catch (refreshError) {
		// 刷新失败，清除所有token并跳转登录
		processQueue(refreshError, null);
		clearTokens();
		logonFailure();
		return Promise.reject(refreshError);
	} finally {
		isRefreshing = false;
	}
};

// 处理其他错误
const handleOtherErrors = (error: AxiosError) => {
	let { message } = error;

	if (message.includes('Network Error')) {
		message = '后端接口连接异常';
	} else if (message.includes('timeout')) {
		message = '系统接口请求超时';
	} else if (message.includes('Request failed with status code')) {
		message = '系统接口' + message.substring(message.length - 3) + '异常';
	} else if (message.includes('canceled')) {
		return Promise.reject(error);
	}

	messages('error', message);
	return Promise.reject(error);
};

/**
 * 请求拦截器 - 双token机制
 * 每次请求前，检查并携带有效的access token
 */
instance.interceptors.request.use(
	async (config: InternalAxiosRequestConfig) => {
		abortController.addPending(config);

		// 获取access token
		const accessToken = getAccessToken();

		if (accessToken && config.headers) {
			config.headers.Authorization = `Bearer ${accessToken}`;
		}

		return config;
	},
	(error: AxiosError) => Promise.reject(error)
);

// 响应拦截器 - 双token机制
instance.interceptors.response.use(
	// 请求成功
	(res: AxiosRequestConfig) => {
		// 未设置状态码则默认成功状态
		const code = res.data.code;

		// 获取错误信息
		const msg = errorCode(code) || res.data.msg || errorCode('default');

		// 文件类型Blob
		if (res.data instanceof Blob) {
			return Promise.resolve(res);
		}

		if (code === 200) {
			return res.data;
		} else if (code === 500) {
			messages('error', msg);
			return Promise.reject(new Error(msg));
		} else if (code === 401) {
			const originalRequest = res as InternalAxiosRequestConfig & { _retry?: boolean };
			if (originalRequest._retry) return Promise.reject('error');
			// 处理401未授权错误（access token过期）
			return handleTokenRefresh(originalRequest, res);
		}

		messages('error', msg);
		return Promise.reject('error');
	},

	// 请求失败 - 包含token刷新逻辑
	async (error: AxiosError) => {
		return handleOtherErrors(error);
	}
);

// 通用下载方法get
export function downloadGet(url: string, filename: string) {
	return instance
		.get(url, {
			responseType: 'blob'
		})
		.then((data) => {
			const content: BlobPart = data.data as unknown as BlobPart;
			const blob = new Blob([content]);
			if ('download' in document.createElement('a')) {
				const elink = document.createElement('a');
				elink.download = filename;
				elink.style.display = 'none';
				elink.href = URL.createObjectURL(blob);
				document.body.appendChild(elink);
				elink.click();
				URL.revokeObjectURL(elink.href);
				document.body.removeChild(elink);
			} else {
				(navigator as unknown as { msSaveBlob: (blob: Blob, filename: string) => void }).msSaveBlob(blob, filename);
			}
		})
		.catch((r) => {});
}

/**
 * 请求配置
 * @param url 路径
 * @param method 请求类型
 * @param data 请求参数
 * @param config 参数配置
 */
interface RequestParams<R> {
	url: string;
	method: Method;
	data?: R;
	config?: AxiosRequestConfig;
}
/**
 * 响应参数
 * @param code 状态码
 * @param message 提示语
 * @param data 响应数据
 * @param total 条数
 */
export type ResponseData<T> = {
	code: number;
	message: string;
	data: T;
	total: number;
};

/**
 * @method
 * @param RequestParams 请求配置
 * @returns instance 返回实例
 */
const request = <T, R>({ url, method, data, config }: RequestParams<T>) => {
	return instance.request<R, ResponseData<R>>({
		url,
		method,
		[method.toLowerCase() === 'get' ? 'params' : 'data']: data,
		...config
	});
};

export default request;
