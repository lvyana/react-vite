/**
 * @file 编辑表头
 * @author ly
 * @createDate 2020年4月27日
 */
import React, { FC, ReactNode, useCallback, useState } from 'react';
import { Button, Col, Row } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import IheaderConfig, { CallbackDataType, HeaderType } from '@/antdComponents/iEditHeader';
import Imodal from '../iModal';

/**
 * @param children 子级
 * @param type 表格数据对应的类型
 */
interface HeaderEditProps {
	children?: ReactNode;
	type: HeaderType;
}

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const HeaderEdit: FC<HeaderEditProps> = ({ children, type }) => {
	const [headerOpen, setheaderOpen] = useState(false);
	const editHeader = () => {
		setheaderOpen(true);
	};

	const closeHeader = () => {
		setheaderOpen(false);
	};

	const [confirmLoading, setConfirmLoading] = useState(false);

	const handleOk = async () => {
		// console.log(headerConfigItem);
		// console.log(checkedKeys);
		setConfirmLoading(true);
		// const isFalseArr = headerConfigItem.reduce((pre: Key[], item) => {
		// 	if (checkedKeys.indexOf(item.headerFieldId) === -1) {
		// 		return [...pre, item.headerFieldId];
		// 	} else {
		// 		return pre;
		// 	}
		// }, []);
		try {
			// await updateHeader({ type, headerField: isFalseArr });
			// // 刷新表头
			// dispatch(getHeaderConfig());
			closeHeader();
		} catch (error) {}
		setConfirmLoading(false);
	};
	const handleCancel = () => {
		closeHeader();
	};

	const onCallbackData: CallbackDataType = (newInitData, checkedKeys) => {
		// console.log(newInitData, checkedKeys);
	};
	return (
		<>
			<Row justify="space-between">
				<Col>{children}</Col>
				<Col>
					<Row>
						<Col>
							<Button type="link" icon={<SettingOutlined />} onClick={editHeader}></Button>
						</Col>
					</Row>
				</Col>
			</Row>
			<Imodal title={'编辑表头'} open={headerOpen} onOk={handleOk} onCancel={handleCancel} confirmLoading={confirmLoading}>
				<IheaderConfig type={type} onCallbackData={onCallbackData}></IheaderConfig>{' '}
			</Imodal>
		</>
	);
};

export default HeaderEdit;
