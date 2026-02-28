/**
 * @file 封装滚动无线加载
 * @author ly
 * @createDate 日期：2020年4月27日
 */
import React, { FC, useState, ReactNode } from 'react';
import { Avatar, Descriptions, Row, Col, Button, message, Skeleton, Divider } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from '@/components/antd/iLoading';
import styles from './index.module.scss';

/**
 * 滚动加载
 * @param current 当前数据长度
 * @param total 总条数
 * @param loading 下面加载效果
 * @param setLoading 控制下面加载效果
 * @param height 盒子高度
 * @param loadMoreDataApi 获取数据方法
 */
interface IinfiniteScrollProps {
	children: ReactNode;
	height: number;
	current: number;
	total: number;
	loading: boolean;
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
	loadMoreDataApi: () => void;
}

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const IinfiniteScroll: FC<IinfiniteScrollProps> = ({ children, current, total, loading, setLoading, height, loadMoreDataApi }) => {
	// 懒加载
	const loadMoreData = () => {
		if (loading) {
			return;
		}
		setLoading(true);
		loadMoreDataApi();
	};
	return (
		<div
			id="scrollableDiv"
			className={styles['Scrollable-Div']}
			style={{
				height: height
			}}>
			<InfiniteScroll
				dataLength={current}
				next={loadMoreData}
				hasMore={current < total}
				loader={<Loading spinning={loading}></Loading>}
				endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
				scrollableTarget="scrollableDiv">
				{children}
			</InfiniteScroll>
		</div>
	);
};

export default IinfiniteScroll;
