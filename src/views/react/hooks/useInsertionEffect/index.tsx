/**
 * @file useImperativeHandle
 * @author ly
 * @createDate
 */
import React, { useEffect, useInsertionEffect, useLayoutEffect } from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router';
import AppCard from '@/components/antd/AppCard';
import Markdown from '@/components/plugin/Markdown';
import AppCollapse from '@/components/antd/AppCollapse';

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const UseInsertionEffect = () => {
	const navigate = useNavigate();

	useInsertionEffect(() => {
		console.log('useInsertionEffect');
	}, []);

	return (
		<AppCard>
			<Button type="link" onClick={() => navigate('/react/hooks/useEffect')}>
				useEffect
			</Button>
			<Markdown url={'useInsertionEffect.md'}></Markdown>
		</AppCard>
	);
};

export default UseInsertionEffect;
