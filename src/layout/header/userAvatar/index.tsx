/**
 * @file 头像
 * @author ly
 * @createDate 2020年4月27日
 */
import React from 'react';
import { Avatar, Button } from 'antd';
import { useUser } from '@/store';
import Idropdown from '@/antdComponents/iDropdown';
import IconFont from '@/utils/iconfont';
import { clearTokens } from '@/utils/cookie';
import { useNavigate } from 'react-router-dom';
import { MenuProps } from 'antd/lib/menu';

type ButtonType = '0' | '1';
// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const UserAvatar = () => {
	const navigate = useNavigate();

	const { photo } = useUser();

	const onClick: MenuProps['onClick'] = (info) => {
		if (info.key === '1') {
			clearTokens();
			navigate('/login');
		}

		if (info.key === '2') {
			navigate('/mycenter');
		}
	};

	const option: MenuProps['items'] = [
		{
			label: <div>退出登录</div>,
			key: '1',
			icon: <IconFont type="icon-tuichu"></IconFont>
		},
		{
			label: <div>个人中心</div>,
			key: '2',
			icon: <IconFont type="icon-gerenzhongxin"></IconFont>
		}
	];

	// const onLogOut = () => {
	// 	clearToken();
	// 	navigate('/login');
	// };
	return (
		<div style={{ lineHeight: '32px' }}>
			<Idropdown menu={{ items: option, onClick: onClick }} overlayStyle={{ lineHeight: '32px' }}>
				<Button type="text" style={{ paddingLeft: 0, paddingRight: 0 }}>
					<span className="absolute left-0 bottom-0">
						<Avatar
							className="unctionality "
							alt="头像"
							src={photo as string}
							style={{ backgroundColor: '#fde3cf', scale: '0.7' }}></Avatar>
					</span>
					<span className="ml-8 mr-2">admin</span>
				</Button>
			</Idropdown>
		</div>
	);
};

export default UserAvatar;
