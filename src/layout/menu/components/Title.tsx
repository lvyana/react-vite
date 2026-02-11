/**
 * @file 模板
 * @author 姓名
 * @createDate
 */
import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Col, Row } from 'antd';
import IconFont from '@/utils/iconfont';
import { clearTokens } from '@/utils/cookie';
import { Router } from '../routerData';

export type TitleProps = {
	menuTitle: Router | null;
	onBack: () => void;
};

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const Title: FC<TitleProps> = ({ menuTitle, onBack }) => {
	const navigate = useNavigate();

	const onLogOut = () => {
		clearTokens();
		navigate('/login');
	};
	return (
		<>
			<Row justify="space-between">
				<Col>
					<Button
						type="link"
						icon={<IconFont type={menuTitle?.path === '/' ? ' ' : 'icon-fanhui'}></IconFont>}
						className="mb-2"
						onClick={onBack}>
						{menuTitle?.title}
					</Button>
				</Col>
				<Col>
					{/* <Button danger type="link" onClick={onLogOut} icon={<IconFont type="icon-tuichu"></IconFont>}>
						退出
					</Button> */}
				</Col>
			</Row>
		</>
	);
};

export default Title;
