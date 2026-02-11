/**
 * @file 个人中心
 * @author ly
 * @createDate 2022年12月11日
 */
import React, { FC, useState } from 'react';
import Icard from '@/antdComponents/iCard';
import { useUser } from '@/store';
import { Avatar } from 'antd';
import { AntDesignOutlined } from '@ant-design/icons';
import EditPhoto from './components/EditPhoto';
import ResetPassword from './components/ResetPassword';
import Imodal from '@/antdComponents/iModal';

const MyCenter: FC = () => {
	const { photo, setPhoto } = useUser();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [confirmLoading, setConfirmLoading] = useState(false);
	const initImg = photo;

	// 修改完的图片传入
	const [photoFinish, setPhotoFinish] = useState(initImg as string);

	const openPhoto = () => {
		setPhotoFinish(initImg as string);
		setIsModalOpen(true);
	};

	const handleOk = () => {
		setConfirmLoading(true);
		setTimeout(() => {
			setPhoto(photoFinish);
			setIsModalOpen(false);
			setConfirmLoading(false);
		}, 1000);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	return (
		<Icard>
			<div>
				<div style={{ marginBottom: '20px', textAlign: 'center' }}>
					<span onClick={openPhoto}>
						<Avatar src={initImg as string} size={200} icon={<AntDesignOutlined />} />
					</span>
				</div>
				<ResetPassword></ResetPassword>
			</div>
			<Imodal title="修改头像" open={isModalOpen} confirmLoading={confirmLoading} onOk={handleOk} onCancel={handleCancel} width={800}>
				<EditPhoto photoFinish={photoFinish} setPhotoFinish={setPhotoFinish}></EditPhoto>
			</Imodal>
		</Icard>
	);
};

export default MyCenter;
