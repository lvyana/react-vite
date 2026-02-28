/**
 * @file useLayoutEffect
 * @author ly
 * @createDate 2023年1月3日
 */
import React, { useState, useLayoutEffect, useEffect } from 'react';
import Icard from '@/components/antd/AppCard';
import Icollapse from '@/components/antd/AppCollapse';
import { Button } from 'antd';
import { useNavigate } from 'react-router';
// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const UseLayoutEffect = () => {
	const navigate = useNavigate();

	useLayoutEffect(() => {
		console.log('useLayoutEffect');
	}, []);

	return (
		<Icard>
			<Button type="link" onClick={() => navigate('/react/hooks/useEffect')}>
				useEffect
			</Button>
			<Imarkdown url={'useLayoutEffect.md'}></Imarkdown>
		</Icard>
	);
};

export default UseLayoutEffect;
