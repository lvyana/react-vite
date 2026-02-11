/**
 *	@file 表格、表单组件大小
 *	@author ly
 *  @createDate 2020年4月27日
 */
import { Button, Dropdown } from 'antd';
import { FontSizeOutlined } from '@ant-design/icons';
import { useLayout } from '@/store';
import type { SizeType } from 'antd/es/config-provider/SizeContext';

const ComponentSize = () => {
	const { size, setSize } = useLayout();

	const handleSizeChange = ({ key }: { key: string }) => {
		setSize(key as SizeType);
	};

	const sizeMenu = [
		{ key: 'small', label: 'small', disabled: size === 'small' },
		{ key: 'middle', label: 'middle', disabled: size === 'middle' },
		{ key: 'large', label: 'large', disabled: size === 'large' }
	];

	return (
		<Dropdown
			arrow={{ pointAtCenter: true }}
			getPopupContainer={() => document.getElementById('header-icon-function') as HTMLElement}
			menu={{ items: sizeMenu, onClick: handleSizeChange }}
			placement="bottom"
			trigger={['click']}>
			<Button type="text" icon={<FontSizeOutlined />} />
		</Dropdown>
	);
};

export default ComponentSize;
