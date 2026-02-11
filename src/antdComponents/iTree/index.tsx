/**
 * @file Itree
 * @author ly
 * @createDate 2024年2月5日
 */
import React, { FC } from 'react';
import { Tree } from 'antd';
import { TreeProps } from 'antd/lib/tree/Tree';

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const Itree: FC<TreeProps> = ({ ...config }) => {
	return <Tree {...config}></Tree>;
};

export default Itree;
