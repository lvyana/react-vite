/**
 * @file
 * @author ly
 * @createDate
 */
import request from '@/api/request'; // 导入http中创建的axios实例

interface LoginResponse {
	token: string;
}

//
export const searchList = (data: { str: string }) => {
	return request<{ str: string }, LoginResponse>({
		url: `/searchList`,
		method: 'post',
		data
	});
};
