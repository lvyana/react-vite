/**
 * @file 分页
 * @author ly
 * @createDate 2020年4月27日
 */
import React, { FC } from 'react';
import { Pagination } from 'antd';
import { PaginationProps } from 'antd/lib/pagination';

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const Ipaginations: FC<PaginationProps> = ({ ...config }) => {
	const { style, showTotal = true, ...rest } = config;

	return (
		<Pagination
			{...rest}
			style={{ float: 'right', ...style }}
			// pageSizeOptions=[10, 20, 50, 100]
			showTotal={(total) => {
				if (showTotal) {
					return `总 ${total} 条`;
				}
			}}
		/>
	);
};

export type { PaginationProps };
export default Ipaginations;
