/**
 * @file useImperativeHandle
 * @author ly
 * @createDate
 */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppCard from '@/components/antd/AppCard';
import Markdown from '@/components/plugin/Markdown';
import { Button } from 'antd';

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const UseImperativeHandle = () => {
	const navigate = useNavigate();
	const onToForwardRef = () => {
		navigate('/react/hooks/forwardRef');
	};

	return (
		<AppCard>
			<Button type="link" onClick={onToForwardRef}>
				forwardRef
			</Button>
			<Markdown url={'useImperativeHandle.md'}></Markdown>
		</AppCard>
	);
};

export default UseImperativeHandle;
