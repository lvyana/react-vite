/**
 * @file useEffect
 * @author ly
 * @createDate 2023年1月3日
 */
import React, { FC, useState, useEffect } from 'react';
import { Button } from 'antd';
import Icard from '@/components/antd/AppCard';
import Icollapse from '@/components/antd/AppCollapse';
import IcodeEditor from '@/components/plugin/CodeEditor';

type SonProps = {
	value: number;
};

const initCode = `//闭包陷阱
function Counter() {
	const [count, setCount] = useState(0);
  
	useEffect(() => {
	  const id = setInterval(() => {
		setCount(count + 1);
	  }, 1000);
	  return () => clearInterval(id);
	}, []);
  
	return <h1>{count}</h1>;
  }

  // 解决方案1
  useEffect(() => {
	const id = setInterval(() => {
	  setCount(count + 1);
	}, 1000);
	return () => clearInterval(id);
  }, [count]);
  //缺陷
  // 计时器不准了，因为每次 count 变化时都会销毁并重新计时。
  // 频繁 生成/销毁 定时器带来了一定性能负担。

  // 完美解决方案
  useEffect(() => {
	const id = setInterval(() => {
	  setCount(c => c + 1);
	}, 1000);
	return () => clearInterval(id);
  }, []);
  
  `;

const list = [
	{
		label: '执行机制',
		children: '浏览器渲染之后执行,不会阻塞渲染',
		key: '0'
	},
	{
		label: '无参数',
		children: '每次 reader 都会执行',
		key: '1'
	},
	{
		label: '空数组 []',
		children: '组件初始化执行一次',
		key: '2'
	},
	{
		label: '数组并且有参数 [a,b]',
		children: '数组内数据变化就会执行',
		key: '3'
	},
	{
		label: '回调函数中 return 作用',
		children: (
			<div>
				<div>1、清理上一次事件绑定,不清理会导致事件多次绑定</div>
				<div>2、组件初始化不执行,组件销毁时执行,数据更新时先执行 return 函数</div>
			</div>
		),
		key: '4'
	},
	{
		label: '示例代码',
		children: (
			<>
				<IcodeEditor initCode={initCode}></IcodeEditor>
			</>
		),
		key: '5'
	}
];

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const UseEffect = () => {
	const [value, setValue] = useState(0);

	const [first, setfirst] = useState(0);

	const [second, setsecond] = useState(0);

	const [third, setthird] = useState(0);

	const [fourth, setfourth] = useState(0);

	const [fifth, setfifth] = useState(0);

	const [sixth, setsixth] = useState(0);

	const [seventh, setseventh] = useState(0);

	const [eighth, seteighth] = useState(0);

	const [ninth, setninth] = useState(0);

	const [tenth, settenth] = useState(0);

	const [eleventh, seteleventh] = useState(0);

	const [twelfth, settwelfth] = useState(0);

	const [thirteenth, setthirteenth] = useState(0);

	const [fourteenth, setfourteenth] = useState(0);

	const [fifteenth, setfifteenth] = useState(0);

	const [sixteenth, setsixteenth] = useState(0);

	const [seventeenth, setseventeenth] = useState(0);

	const [eighteenth, seteighteenth] = useState(0);

	const [nineteenth, setnineteenth] = useState(0);

	const [twentieth, settwentieth] = useState(0);

	const [twentyfirst, settwentyfirst] = useState(0);

	const [twentysecond, settwentysecond] = useState(0);

	const [twentythird, settwentythird] = useState(0);

	const [twentyfourth, settwentyfourth] = useState(0);

	const [twentyfifth, settwentyfifth] = useState(0);

	const [twentysixth, settwentysixth] = useState(0);

	const [twentyseventh, settwentyseventh] = useState(0);

	const [twentyeighth, settwentyeighth] = useState(0);

	const [twentyninth, settwentyninth] = useState(0);

	const [thirtieth, setthirtieth] = useState(0);

	const [thirtyfirst, setthirtyfirst] = useState(0);

	const [thirtysecond, setthirtysecond] = useState(0);

	const [thirtythird, setthirtythird] = useState(0);

	const [thirtyfourth, setthirtyfourth] = useState(0);

	const [thirtyfifth, setthirtyfifth] = useState(0);

	const [thirtysixth, setthirtysixth] = useState(0);

	const [thirtyseventh, setthirtyseventh] = useState(0);

	const [thirtyeighth, setthirtyeighth] = useState(0);

	const [thirtyninth, setthirtyninth] = useState(0);

	const [fortieth, setfortieth] = useState(0);

	const [fortyfirst, setfortyfirst] = useState(0);

	const [fortysecond, setfortysecond] = useState(0);

	const [fortythird, setfortythird] = useState(0);

	const [fortyfourth, setfortyfourth] = useState(0);

	const [fortyfifth, setfortyfifth] = useState(0);

	const [fortysixth, setfortysixth] = useState(0);

	const [fortyseventh, setfortyseventh] = useState(0);

	const [fortyeighth, setfortyeighth] = useState(0);

	const [fortyninth, setfortyninth] = useState(0);

	const [fiftieth, setfiftieth] = useState(0);

	const add = () => {
		setValue(value + 1);
	};

	useEffect(() => {
		console.log('useEffect');
	});

	useEffect(() => {
		console.log('useEffect1');
	}, []);

	useEffect(() => {
		console.log('useEffect2');
	}, [value]);

	useEffect(() => {
		console.log('useEffect3');
		return () => {
			console.log('useEffect3 return');
		};
	}, [value]);

	const list = [
		{
			label: 'useEffect在组件式编程里的基本用处',
			children: <div>useEffect 是一个组件定义副作用,所谓"副作用",就是该组件任意时刻都存放的各种数据</div>,
			key: '0'
		},
		{
			label: 'useEffect更新',
			children: (
				<>
					<div>1、当组件更新state时,会触发组件的重新渲染,可以认为发生了局部刷新</div>
					<div>2、在函数内多次更新,会合并处理</div>
					<div>3、18之前手动合并处理unstable_batchedUpdates,18之后自动合并处理就不需要了</div>
				</>
			),
			key: '1'
		},
		{
			label: '代码示例',
			children: (
				<>
					<IcodeEditor initCode={initCode}></IcodeEditor>
				</>
			),
			key: '2'
		}
	];

	return (
		<Icard>
			<Button type="link" onClick={add}>
				+1
			</Button>
			{value}
			<Icollapse styleConfig="1" defaultActiveKey={['0']} items={list}></Icollapse>
			<Imarkdown url={'useEffect.md'}></Imarkdown>
		</Icard>
	);
};

export default UseEffect;

const Son: FC<SonProps> = ({ value }) => {
	useEffect(() => {
		// console.log('son effect');
		return () => {
			// console.log('son effect return');
		};
	});
	return <>{value}</>;
};
