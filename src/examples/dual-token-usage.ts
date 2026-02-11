/**
 * @file 双token机制使用示例
 * @author ly
 * @createDate 2024年1月1日
 */
import { setTokens, clearTokens, getAccessToken, getRefreshToken, hasValidAccessToken } from '@/utils/cookie';
import { login, logout, LoginCredentials } from '@/api/auth';
import request from '@/api/request';

// 示例：用户登录
export const handleLogin = async (credentials: LoginCredentials) => {
	const response = await login(credentials);

	if (response.code === 200) {
		// 保存双token
		setTokens({
			accessToken: response.data.accessToken,
			refreshToken: response.data.refreshToken
		});

		return response.data.user;
	} else {
		throw new Error(response.message || '登录失败');
	}
};

// 示例：用户登出
export const handleLogout = async () => {
	try {
		// 调用后端登出接口
		await logout();
	} catch (error) {
		// 登出接口调用失败，但仍要清除本地token
	} finally {
		// 无论如何都要清除本地token
		clearTokens();

		// 跳转到登录页
		window.location.href = '/login';
	}
};

// 示例：检查用户登录状态
export const checkAuthStatus = () => {
	const hasAccessToken = hasValidAccessToken();
	const hasRefreshToken = getRefreshToken() !== null;

	if (!hasAccessToken && !hasRefreshToken) {
		// 完全未登录
		return 'not_logged_in';
	} else if (!hasAccessToken && hasRefreshToken) {
		// access token过期，但有refresh token
		return 'token_expired';
	} else {
		// 已登录
		return 'logged_in';
	}
};

// 示例：受保护的API调用
export const fetchUserProfile = async () => {
	try {
		// 使用配置好的request实例，会自动处理token刷新
		const response = await request({
			url: '/user/profile',
			method: 'GET'
		});

		return response.data;
	} catch (error) {
		console.error('获取用户信息失败:', error);
		throw error;
	}
};

// 示例：发送需要认证的POST请求
export const updateUserProfile = async (userData: any) => {
	try {
		const response = await request({
			url: '/user/profile',
			method: 'PUT',
			data: userData
		});

		return response.data;
	} catch (error) {
		console.error('更新用户信息失败:', error);
		throw error;
	}
};

// 示例：在React组件中的使用
export const AuthContext = {
	// 初始化检查
	init: () => {
		const status = checkAuthStatus();

		if (status === 'not_logged_in') {
			// 跳转到登录页
			window.location.href = '/login';
		}
	},

	// 组件中使用的登录方法
	login: handleLogin,

	// 组件中使用的登出方法
	logout: handleLogout,

	// 获取当前访问token（用于调试）
	getDebugInfo: () => ({
		accessToken: getAccessToken(),
		refreshToken: getRefreshToken() ? '***已设置***' : null,
		status: checkAuthStatus()
	})
};
