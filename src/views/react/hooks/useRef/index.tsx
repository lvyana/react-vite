/**
 * @file useRef tips: useRef.current的值修改不会重新渲染组件
 * @author ly
 * @createDate 2020年4月27日
 */
import React, { FC, LegacyRef, useEffect, useRef, useState } from 'react';
import { Button } from 'antd';
import Icard from '@/components/antd/AppCard';

interface SonProps {
	sonRef: LegacyRef<HTMLDivElement>;
}

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const UseRef = () => {
	const sonRef = useRef<HTMLDivElement | null>(null);
	useEffect(() => {
		console.log(sonRef.current);
	}, []);

	return (
		<Icard>
			<div ref={sonRef}>son</div>
			<Imarkdown url={'useRef.md'}></Imarkdown>
		</Icard>
	);
};

const Son: FC<SonProps> = ({ sonRef }) => {
	return <div ref={sonRef}>son</div>;
};
export default UseRef;
