/**
 * @file 顶部功能api
 * @author ly
 * @createDate 2022年12月9日
 */
import request from '@/api/request';
import type { MessageCenterParams } from './messageCenter/compoment/Lists';

// 消息中心列表
export const messgeCenter = () => {
	return request<never, MessageCenterParams[]>({
		url: '/messgeCenter',
		method: 'get'
	});
};
