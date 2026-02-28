/**
 * @file useImperativeHandle
 * @author ly
 * @createDate
 */
import React, { useEffect, useInsertionEffect, useLayoutEffect } from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router';
import Icard from '@/components/antd/AppCard';
import Icollapse from '@/components/antd/AppCollapse';

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const UseInsertionEffect = () => {
	const navigate = useNavigate();

	useInsertionEffect(() => {
		console.log('useInsertionEffect');
	}, []);

	return (
		<Icard>
			<Button type="link" onClick={() => navigate('/react/hooks/useEffect')}>
				useEffect
			</Button>
			<Imarkdown url={'useInsertionEffect.md'}></Imarkdown>
		</Icard>
	);
};

export default UseInsertionEffect;
