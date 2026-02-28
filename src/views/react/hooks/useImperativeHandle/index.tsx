/**
 * @file useImperativeHandle
 * @author ly
 * @createDate
 */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icard from '@/components/antd/AppCard';
import { Button } from 'antd';

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const UseImperativeHandle = () => {
	const navigate = useNavigate();
	const onToForwardRef = () => {
		navigate('/react/hooks/forwardRef');
	};

	return (
		<Icard>
			<Button type="link" onClick={onToForwardRef}>
				forwardRef
			</Button>
			<Imarkdown url={'useImperativeHandle.md'}></Imarkdown>
		</Icard>
	);
};

export default UseImperativeHandle;
