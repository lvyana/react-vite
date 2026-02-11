/**
 * @file 编辑表头
 * @author ly
 * @createDate 2022年7月30日
 */
import React, { FC, useState, useEffect, Key, memo } from 'react';
import TreeMenu from './TreeMenu';
import { useHeaderConfigItem } from '@/useHooks/useHeaderConfig';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import type { HeaderFieldParam } from '@/store/slices/globalConfigSlice';
import { getCheckbox } from '../iCheckbox';

export type HeaderType = 'seachForm';

/**
 * @param type 判断开关方法类型
 * @param open 开关
 * @param closeHeader 关闭表头
 */
interface IheaderConfigProps {
	type: HeaderType;
	onCallbackData: CallbackDataType;
}

export type CallbackDataType = (data: HeaderFieldParam[], checkedKeys: Key[]) => void;
/**
 * @param type 无选中0 半选1 全选2
 */
export type SelectAllParam = '0' | '1' | '2';

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const IheaderConfig: FC<IheaderConfigProps> = ({ type, onCallbackData }) => {
	// 初始化数据
	const { headerConfigItem: initHeaderConfigItem, checkedKeys: initCheckedKeys } = useHeaderConfigItem(type);

	useEffect(() => {
		setHeaderConfigItem(initHeaderConfigItem);
		setCheckedKeys(initCheckedKeys);
	}, [initHeaderConfigItem, initCheckedKeys]);

	const [headerConfigItem, setHeaderConfigItem] = useState<HeaderFieldParam[]>([]);
	const [checkedKeys, setCheckedKeys] = useState<Key[]>([]);
	// 更新数据
	const updateInitData = (newInitData: HeaderFieldParam[]) => {
		setHeaderConfigItem(newInitData);
		onCallbackData(newInitData, checkedKeys);
	};

	// 全选
	const [indeterminate, setIndeterminate] = useState(false);
	// 半选时为true
	const [checkAll, setCheckAll] = useState(false);

	const onCheckAllChange = (e: CheckboxChangeEvent) => {
		setIndeterminate(false);
		setCheckAll(e.target.checked);
		if (e.target.checked) {
			// 全选
			const allKeys = headerConfigItem.reduce((pre: Key[], item) => {
				return [...pre, item.headerFieldId as Key];
			}, []);
			setCheckedKeys(allKeys);
		} else {
			// 取消
			setCheckedKeys([]);
		}
	};

	// 选中数据
	// const [checkedKeys, setCheckedKeys] = useState<Key[]>([]);

	const updateCheckedKeys = (checkedKeysValue: Key[]) => {
		setCheckedKeys(checkedKeysValue);
	};
	// 监听checkedKeys变化 是否全部选中
	useEffect(() => {
		if (checkedKeys.length === 0) {
			// 一个都没选中
			onSelectAll('0');
		} else if (headerConfigItem.length === checkedKeys.length) {
			// 全选
			onSelectAll('2');
		} else {
			// 半选
			onSelectAll('1');
		}
	}, [checkedKeys]);

	// TreeMenu 全选状态
	const onSelectAll = (type: SelectAllParam) => {
		if (type === '0') {
			setIndeterminate(false);
			setCheckAll(false);
		} else if (type === '1') {
			setIndeterminate(true);
			setCheckAll(false);
		} else if (type === '2') {
			setIndeterminate(false);
			setCheckAll(true);
		}
	};

	return (
		<>
			{getCheckbox({ indeterminate, checked: checkAll, onChange: onCheckAllChange })}
			<TreeMenu
				initData={headerConfigItem}
				checkedKeys={checkedKeys}
				updateInitData={updateInitData}
				updateCheckedKeys={updateCheckedKeys}></TreeMenu>
		</>
	);
};

export default memo(IheaderConfig);
