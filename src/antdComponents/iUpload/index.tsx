/**
 * @file 上传
 * @author ly
 * @createDate 2023年1月1日
 */
import React, { FC, ReactNode } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import { DraggerProps } from 'antd/es/upload';

const { Dragger } = Upload;

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const getUpload = (config: DraggerProps) => {
	const { children, ...rest } = config;
	return (
		<Dragger {...rest}>
			<p className="ant-upload-drag-icon">
				<InboxOutlined />
			</p>
			{children}
		</Dragger>
	);
};

export type { DraggerProps };
export default getUpload;
