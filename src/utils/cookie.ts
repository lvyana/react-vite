/**
 * @file cookie
 * @author ly
 * @createDate 2020年4月27日
 */

const ACCESS_TOKEN = 'access_token';
const REFRESH_TOKEN = 'refresh_token';

// Token接口定义
export interface TokenPair {
	accessToken: string;
	refreshToken: string;
}

/**
 * @method 存储双token
 * @param tokens 包含access_token和refresh_token的对象
 */
export const setTokens = (tokens: TokenPair): void => {
	// 简化版本 - 移除过期时间和SameSite，确保cookie可见
	document.cookie = `${ACCESS_TOKEN}=${tokens.accessToken}; path=/`;
	document.cookie = `${REFRESH_TOKEN}=${tokens.refreshToken}; path=/`;

	// 调试信息
	console.log('设置Cookie:', {
		accessToken: tokens.accessToken,
		refreshToken: tokens.refreshToken
	});
	console.log('当前Cookie字符串:', document.cookie);
};

/**
 * @method 存储访问token
 * @param val access token
 */
export const setAccessToken = (val: string): void => {
	const expires = new Date();
	expires.setTime(expires.getTime() + 2 * 60 * 60 * 1000); // 2小时过期
	document.cookie = `${ACCESS_TOKEN}=${val}; path=/; expires=${expires.toUTCString()}; SameSite=Lax`;
};

/**
 * @method 获取访问token
 */
export const getAccessToken = (): string | null => {
	return getCookie(ACCESS_TOKEN);
};

/**
 * @method 获取刷新token
 */
export const getRefreshToken = (): string | null => {
	return getCookie(REFRESH_TOKEN);
};

/**
 * @method 获取指定名称的cookie
 */
const getCookie = (name: string): string | null => {
	const cookies = document.cookie.split('; ');
	for (let i = 0; i < cookies.length; i++) {
		const cookie = cookies[i].split('=');
		if (cookie[0] === name) {
			return cookie[1];
		}
	}
	return null;
};

/**
 * @method 检查access token是否存在且有效
 */
export const hasValidAccessToken = (): boolean => {
	const token = getAccessToken();
	return token !== null && token !== '';
};

/**
 * @method 检查refresh token是否存在
 */
export const hasRefreshToken = (): boolean => {
	const token = getRefreshToken();
	return token !== null && token !== '';
};

/**
 * @method 清空所有token
 */
export const clearTokens = (): void => {
	document.cookie = `${ACCESS_TOKEN}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
	document.cookie = `${REFRESH_TOKEN}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};
