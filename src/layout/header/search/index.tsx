/**
 * @file 搜索
 * @author ly
 * @createDate 2020年4月27日
 */
import React, { useState, useRef, useEffect, ChangeEvent, FC } from 'react';
import Highlighter from 'react-highlight-words';
import { Input, Button, Dropdown, InputRef, Empty, Skeleton } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Imodal from '@/antdComponents/iModal';
import { getInput } from '@/antdComponents/iInput';
import Icard from '@/antdComponents/iCard';
import { useRequest } from 'ahooks';

/**
 * 原理是事件触发顺序的不同 onmousedown => onblur=> onclick
 */

type OnMouseDownMenuItem = (path: string) => void;

type SearchListProps = {
	searchValue: string;
	searchList: SearchListParams[];
	onToRouter: OnMouseDownMenuItem;
};

type SearchListParams = {
	key: string;
	label: string;
	url: string;
};

const suffix = (
	<SearchOutlined
		style={{
			fontSize: 16
		}}
	/>
);

async function getSearchList(search?: string): Promise<SearchListParams[]> {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve([
				{
					key: '1',
					label: 'go to useState',
					url: '/react/hooks/useState'
				},
				{
					key: '2',
					label: 'go to useEffect',
					url: '/react/hooks/useEffect'
				},
				{
					key: '3',
					label: 'go to useLayoutEffect',
					url: '/react/hooks/useLayoutEffect'
				}
			]);
		}, 500);
	});
}

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const HeaderSearch = () => {
	const navigate = useNavigate();

	// input值
	const [searchValue, setSearchValue] = useState('');
	// 搜索框开关
	const [searchOpen, setSearchOpen] = useState(false);
	// 下拉数据集合
	const [searchList, setSearchList] = useState<SearchListParams[]>([]);

	const onSearchOpen = () => {
		setSearchList([]);
		setSearchOpen(true);
	};

	const onOk = () => {
		setSearchValue('');
		setSearchOpen(false);
	};

	const onToRouter: OnMouseDownMenuItem = (path) => {
		setSearchValue('');
		setSearchOpen(false);
		navigate(path);
	};

	const { data, loading, run } = useRequest(getSearchList, {
		debounceWait: 500,
		manual: true,
		onSuccess(data, params) {
			setSearchList(data);
		}
	});

	const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.value === searchValue) return;
		setSearchValue(e.target.value);
		run(e.target.value);
	};
	return (
		<>
			<Button
				type="text"
				// className="absolute left-36 top-4"
				// style={{ position: 'absolute', left: 156, top: 17, zIndex: 1 }}
				onClick={onSearchOpen}
				icon={suffix}></Button>

			<Imodal open={searchOpen} onOk={onOk} onCancel={onOk} footer={null} maskClosable={true} closeIcon={null}>
				{getInput({
					value: searchValue,
					prefix: suffix,
					placeholder: '搜索',
					onChange: onInputChange
				})}
				{loading ? (
					<Skeleton active className="mt-6" />
				) : (
					<div className="mt-4">
						<SearchList searchValue={searchValue} searchList={searchList} onToRouter={onToRouter}></SearchList>
					</div>
				)}
			</Imodal>
		</>
	);
};

export default HeaderSearch;

const SearchList: FC<SearchListProps> = ({ searchValue, searchList, onToRouter }) => {
	return (
		<>
			{searchList.length ? (
				searchList?.map((item) => {
					return (
						<Icard key={item.key} onClick={() => onToRouter(item.url)} className="mt-2" hoverable={true}>
							<div>
								<Highlighter
									highlightClassName="YourHighlightClass"
									searchWords={[searchValue]}
									autoEscape={true}
									textToHighlight={item.label}
								/>
							</div>
						</Icard>
					);
				})
			) : (
				<Empty description={'暂无搜索结果'} image={Empty.PRESENTED_IMAGE_SIMPLE} />
			)}
		</>
	);
};
