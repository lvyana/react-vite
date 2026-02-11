/**
 * @file 模板
 * @author 姓名
 * @createDate
 */
import React, {
	FC,
	ReactPortal,
	useEffect,
	useImperativeHandle,
	useMemo,
	useRef,
	useState,
	useSyncExternalStore,
	useCallback
} from 'react';
import todosStore from './store';
import Ibutton from '@/antdComponents/iButton';
import { forwardRefFunc } from '@/hoc/forwardRefHoc';
import { createPortal } from 'react-dom';
import { useSearchParams } from 'react-router-dom';
import './styles.css';

// 常量配置
const BALL_CONFIG = {
	dimensions: {
		width: 50,
		height: 50
	},
	movement: {
		speed: 1 as number,
		interval: 10
	}
};

// 类型定义
interface Position {
	x: number;
	y: number;
}

interface BallRef {
	onStop: () => void;
	onStart: () => void;
}

interface BallProps {
	containerRef: React.RefObject<HTMLDivElement>;
}
// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

// 数据共享环境组件
const DataSharingEnvironment: React.FC = () => {
	const todos = useSyncExternalStore(todosStore.subscribe, todosStore.getSnapshot);
	const [SearchParams] = useSearchParams();
	const a = SearchParams.get('a');

	const onStop = () => {
		ref.current?.onStop();
	};
	const onStart = () => {
		ref.current?.onStart();
	};

	const clearBall = () => {
		todosStore.updateLocalStorage('position', '');

		onStop();
		setCom(null);
	};

	useEffect(() => {
		if (a === '2') {
			if (todos && JSON.parse(todos)) {
				if (containerRef.current) {
					setCom(createPortal(<Ball2 containerRef={containerRef}></Ball2>, containerRef.current));
				}
			} else {
				setCom(null);
			}
		}

		if (a === '1') {
			if (todos && JSON.parse(todos)) {
				createBall();
			}
		}
	}, []);

	const containerRef = useRef<HTMLDivElement>(null);
	const [com, setCom] = useState<ReactPortal | null>(null);

	const ref = useRef<BallRef>(null);
	const createBall = () => {
		todosStore.updateLocalStorage('position', JSON.stringify({ x: 0, y: 0 }));
		if (containerRef.current) {
			setCom(createPortal(<Ball containerRef={containerRef} ref={ref}></Ball>, containerRef.current));
		}
	};
	return (
		<div>
			<>
				{a === '1' ? (
					<>
						<Ibutton onClick={createBall} name="初始化小球" disabled={!!com}></Ibutton>
						<Ibutton onClick={clearBall} name="删除小球" disabled={!com}></Ibutton>
						<Ibutton onClick={onStop} name="停止"></Ibutton>

						<Ibutton onClick={onStart} name="开始" disabled={!com}></Ibutton>
					</>
				) : null}
			</>

			{com}
			<div ref={containerRef} className="ball-container"></div>
		</div>
	);
};

// 可控制的小球组件
const Ball = forwardRefFunc<BallRef, BallProps>((props, ref) => {
	const { containerRef } = props;
	useImperativeHandle(ref, () => {
		return {
			onStart,
			onStop
		};
	});

	const todos = useSyncExternalStore(todosStore.subscribe, todosStore.getSnapshot);

	const position = useRef<Position>(getLocalstrorage(todos) || (todosStore.initialValue as Position));

	// 更新位置状态
	useEffect(() => {
		position.current = todos ? JSON.parse(todos) || todosStore.initialValue : todosStore.initialValue;
	}, [todos]);

	// 运动状态管理
	type Direction = 'right' | 'left' | 'top' | 'bottom';
	const movementState = useRef({
		speedX: BALL_CONFIG.movement.speed,
		speedY: BALL_CONFIG.movement.speed,
		directionX: 'right' as Direction,
		directionY: 'bottom' as Direction
	});

	// const containerRef = useRef<HTMLDivElement>(null);

	// useEffect(() => {
	const moveBall = useCallback(() => {
		const nextPosition = {
			x: position.current.x,
			y: position.current.y
		};

		const containerWidth = containerRef.current?.offsetWidth || 0;
		const containerHeight = containerRef.current?.offsetHeight || 0;

		// 边界检测和方向更新
		if (nextPosition.x <= 0 && movementState.current.directionX === 'left') {
			movementState.current.directionX = 'right';
			movementState.current.speedX = BALL_CONFIG.movement.speed;
		} else if (nextPosition.x + BALL_CONFIG.dimensions.width >= containerWidth * 2 && movementState.current.directionX === 'right') {
			movementState.current.directionX = 'left';
			movementState.current.speedX = -BALL_CONFIG.movement.speed;
		}

		if (nextPosition.y <= 0 && movementState.current.directionY === 'top') {
			movementState.current.directionY = 'bottom';
			movementState.current.speedY = BALL_CONFIG.movement.speed;
		} else if (nextPosition.y + BALL_CONFIG.dimensions.height >= containerHeight && movementState.current.directionY === 'bottom') {
			movementState.current.directionY = 'top';
			movementState.current.speedY = -BALL_CONFIG.movement.speed;
		}

		// 更新位置
		nextPosition.x += movementState.current.speedX;
		nextPosition.y += movementState.current.speedY;

		todosStore.updateLocalStorage('position', JSON.stringify(nextPosition));
	}, []);

	const intervalId = useRef<NodeJS.Timeout | string | number | undefined>(undefined);

	const onStart = useCallback(() => {
		clearInterval(intervalId.current);
		intervalId.current = setInterval(moveBall, BALL_CONFIG.movement.interval);
	}, [moveBall]);

	const onStop = useCallback(() => {
		clearInterval(intervalId.current);
	}, []);

	useEffect(() => {
		return () => {
			clearInterval(intervalId.current);
		};
	}, []);

	return (
		<div
			className="ball"
			style={{
				left: position.current.x,
				top: position.current.y,
				width: BALL_CONFIG.dimensions.width,
				height: BALL_CONFIG.dimensions.height
			}}
		/>
	);
}, 'ball');

// 跟随小球组件
const Ball2: FC<BallProps> = ({ containerRef }) => {
	const todos = useSyncExternalStore(todosStore.subscribe, todosStore.getSnapshot);

	const position = useMemo<{ x: number; y: number }>(
		() => getLocalstrorage(todos) || (todosStore.initialValue as { x: number; y: number }),
		[todos]
	);
	return (
		<div
			className="ball"
			style={{
				left: position.x - (containerRef.current?.offsetHeight || 0),
				top: position.y,
				width: BALL_CONFIG.dimensions.width,
				height: BALL_CONFIG.dimensions.height
			}}
		/>
	);
};

export default DataSharingEnvironment;

const getLocalstrorage = (todos: string | null) => {
	if (todos && JSON.parse(todos)) return JSON.parse(todos);
	return null;
};
