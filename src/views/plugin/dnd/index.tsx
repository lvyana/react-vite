/**
 * @file react-dnd 表单拖拽
 * @author ly
 * @createDate 2022年12月17日
 */
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ExamplesList from './ExamplesList';
import GenerateForm from './GenerateForm';
import EditForm from './EditForm';
import DndContext from './context';
import OperationBtns from './components/OperationBtns';
import Icard from '@/antdComponents/iCard';

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const Dnd = () => {
	return (
		<Icard>
			<DndContext>
				<OperationBtns />
				<Row gutter={8}>
					<DndProvider backend={HTML5Backend}>
						<Col flex="0 1 300px">
							<ExamplesList />
						</Col>
						<Col flex="1 1 500px">
							<GenerateForm />
						</Col>
					</DndProvider>
					<Col flex="0 1 500px">
						<EditForm />
					</Col>
				</Row>
			</DndContext>
		</Icard>
	);
};

export default Dnd;
