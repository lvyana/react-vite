/**
 * @file 消息中心列表
 * @author ly
 * @createDate 2020年4月27日
 */
import React, { useState, useEffect } from 'react';
import { List, Skeleton } from 'antd';
import { useRequest } from 'ahooks';
import useThemeHooks from '@/config/antd/theme/useThemeHooks';
import { messgeCenter } from '../../service';

/**
 * @param title 标题
 * @param isRead 是否已读
 */
export interface MessageCenterParams {
	title: string;
	isRead: boolean;
}

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const Lists = () => {
	const { token } = useThemeHooks();

	useEffect(() => {
		run();
	}, []);

	const [messageCenterData, setMessageCenterData] = useState<MessageCenterParams[]>([]);
	const { run, loading } = useRequest(messgeCenter, {
		manual: true,
		onSuccess: (res) => {
			const { data } = res;
			setMessageCenterData(data);
		}
	});

	const getListItemClassName = (item: MessageCenterParams) => {
		if (item.isRead) {
			return 'bg-gray-400';
		}
		return 'cursor-pointer hover:text-blue-600';
	};

	return loading ? (
		<Skeleton className="mt-4" />
	) : (
		<List
			bordered
			dataSource={messageCenterData}
			renderItem={(item) => <List.Item className={getListItemClassName(item)}>{item.title}</List.Item>}
		/>
	);
};

export default Lists;
