/**
 * @file 新增任务
 * @author ly
 * @createDate 2022年12月3日
 */
import React, { useState } from 'react';
import { FloatButton } from 'antd';
import { AppstoreAddOutlined } from '@ant-design/icons';
import AppModal from '@/components/antd/AppModal';

const AddTask = () => {
	const onOpenTask = () => {
		setAddTaskOpen(true);
	};
	// taskt弹框
	const [addTaskOpen, setAddTaskOpen] = useState(false);

	const [addTaskLoading, setAddTaskLoading] = useState(false);

	const onOkOrCancelTask = () => {
		// if (type === 'ok') {
		// }
		setAddTaskOpen(false);
	};
	return (
		<div>
			<FloatButton icon={<AppstoreAddOutlined />} onClick={onOpenTask}></FloatButton>
			<AppModal title="新增任务" open={addTaskOpen} confirmLoading={addTaskLoading} onOk={onOkOrCancelTask} onCancel={onOkOrCancelTask}>
				123
			</AppModal>
		</div>
	);
};

export default AddTask;
