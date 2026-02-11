/**
 * @file 团队人员
 * @author ly
 * @createDate 2020年4月27日
 */
import { Avatar, Badge, Form, Tooltip } from 'antd';
import React, { FC, useContext, useEffect, useMemo, useState } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { useMutationRequest } from '@/hooks/useQueryRequest';
import AddPersonnel, { FormParams } from './AddPersonnel';
import EditPersonnel from '../editPersonnel';
import { teamMembers } from '../../service';

export interface TeamMembersDataParams {
	name: string;
	photo: string;
	key: string;
}

interface TeamMembersProps {
	userId?: string;
	onAvatar: (key: string) => void;
}
// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const TeamMembers: FC<TeamMembersProps> = ({ userId, onAvatar }) => {
	const [teamMembersData, setTeamMembersData] = useState<TeamMembersDataParams[]>([]);

	// 使用封装的 useMutationRequest
	const { run: fetchTeamMembers } = useMutationRequest(teamMembers, {
		onSuccess: (res) => {
			setTeamMembersData(res.data);
		}
	});

	useEffect(() => {
		fetchTeamMembers();
	}, []);

	// 新增人员
	const [AddPersonnelForm] = Form.useForm<FormParams>();

	const [addPersonnelOpen, setAddPersonnelOpen] = useState(false);

	const [addPersonnelLoading, setAddPersonnelLoading] = useState(false);

	const addPersonnel = () => {
		setAddPersonnelOpen(true);
	};

	const onAddOk = () => {
		setAddPersonnelLoading(true);
		setTimeout(() => {
			setAddPersonnelLoading(false);
			setAddPersonnelOpen(false);
		}, 1000);

		AddPersonnelForm.resetFields();
	};

	const onAddCancel = () => {
		setAddPersonnelOpen(false);

		AddPersonnelForm.resetFields();
	};

	// 调整团队
	const [editPersonnelOpen, setEditPersonnelOpen] = useState(false);

	const onEditPersonnelClose = () => {
		setEditPersonnelOpen(false);
	};

	const onEditPersonnelOpen = () => {
		setEditPersonnelOpen(true);
	};
	return (
		<Badge.Ribbon text="team" color="green">
			<div className="my-4 p-4 border-2 border-blue-100 shadow-xl">
				<></>
				{teamMembersData.map((item, i) => {
					return (
						<Tooltip placement="bottom" title={item.name} key={item.key}>
							<Avatar
								src={item.photo}
								className={`${
									userId === item.key ? 'border-blue-400 border-2' : ''
								} mr-2 hover:border-blue-300 hover:border-2 cursor-pointer`}
								onClick={() => onAvatar(item.key)}
							/>
						</Tooltip>
					);
				})}
				<Avatar className="cursor-pointer mr-2 hover:bg-blue-300 " onClick={addPersonnel}>
					+
				</Avatar>
				<Avatar className="cursor-pointer  hover:bg-blue-300 " onClick={onEditPersonnelOpen}>
					<EditOutlined />
				</Avatar>
				{/* 新增人员 */}
				<AddPersonnel
					form={AddPersonnelForm}
					addPersonnelOpen={addPersonnelOpen}
					addPersonnelLoading={addPersonnelLoading}
					onOk={onAddOk}
					onCancel={onAddCancel}></AddPersonnel>

				{/* 调整团队 */}
				<EditPersonnel open={editPersonnelOpen} onClose={onEditPersonnelClose}></EditPersonnel>
			</div>
		</Badge.Ribbon>
	);
};

export default TeamMembers;
