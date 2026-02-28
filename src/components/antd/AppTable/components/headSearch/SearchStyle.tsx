/**
 * @file 表头搜索
 * @author ly
 * @createDate 2023年4月9日
 */
import React, { FC } from 'react';
import { Button, Col, Row, TreeSelect } from 'antd';

type SeachStyleProps = {
	children: React.ReactNode;
	onSubmit: () => void;
	onClose: () => void;
};
// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const SeachStyle: FC<SeachStyleProps> = ({ children, onSubmit, onClose }) => {
	return (
		<div className="p-2 w-64">
			<div className="mb-2">{children}</div>
			<Row justify="space-between">
				<Col>
					<Button type="default" onClick={onClose}>
						清空
					</Button>
				</Col>
				<Col>
					<Button type="primary" onClick={onSubmit}>
						确定
					</Button>
				</Col>
			</Row>
		</div>
	);
};

export default SeachStyle;
