/**
 * @file 认证相关API
 * @author ly
 * @createDate 2024年1月1日
 */
import axios from 'axios';
import { getRefreshToken } from '@/utils/cookie';

// 单独的axios实例用于刷新token，避免循环调用
const refreshInstance = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL,
	timeout: 1000 * 10,
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json;charset=utf-8'
	}
});

// 刷新token响应类型
export interface RefreshTokenResponse {
	code: number;
	message: string;
	data: {
		accessToken: string;
		refreshToken: string;
		expiresIn: number;
	};
}

/**
 * @method 刷新访问token
 * @returns Promise<RefreshTokenResponse>
 */
export const refreshAccessToken = async (): Promise<RefreshTokenResponse | undefined> => {
	const refreshToken = getRefreshToken();

	if (!refreshToken) {
		throw new Error('No refresh token available');
	}

	try {
		const response = await refreshInstance.post<RefreshTokenResponse>('/auth/refresh', {
			refreshToken
		});

		return response.data;
	} catch (error) {
		// 刷新失败，清除所有token
		console.log(error);
	}
};

/**
 * @method 登录接口
 * @param credentials 登录凭据
 */
export interface LoginCredentials {
	username: string;
	password: string;
}

export interface LoginResponse {
	code: number;
	message: string;
	data: {
		accessToken: string;
		refreshToken: string;
		expiresIn: number;
		user: {
			id: string;
			username: string;
			email: string;
		};
	};
}

export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
	const response = await refreshInstance.post<LoginResponse>('/auth/login', credentials);
	return response.data;
};

/**
 * @method 登出接口
 */
export const logout = async (): Promise<void> => {
	const refreshToken = getRefreshToken();

	if (refreshToken) {
		try {
			await refreshInstance.post('/auth/logout', { refreshToken });
		} catch (error) {
			console.warn('Logout request failed:', error);
		}
	}
};
