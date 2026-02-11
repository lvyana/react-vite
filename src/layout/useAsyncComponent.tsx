/**
 * @file layout鉴权(异步)
 * @author ly
 * @createDate 2022年10月10日
 */
import { Suspense, lazy, FC } from 'react';
import { useUser } from '@/store';
import menuList, { Router } from '@/layout/menu/routerData';
import Iloading from '@/pluginComponents/iLoading';

// 异步路由
const AysncComponentHoc = (Component: React.FC, api: () => Promise<Router[]>, setRedux: (data: Router[]) => void) => {
	const AysncComponentPromise = async (): Promise<{ default: FC }> => {
		try {
			const data = await api();
			setRedux(data);

			return {
				default: () => <Component></Component>
			};
		} catch (error) {
			return {
				default: () => <div>路由没啦....</div>
			};
		}
	};

	return lazy(AysncComponentPromise);
};

const useAysncComponent = (LayoutComponent: React.FC) => {
	const { setRouter } = useUser();

	// 获取路由权限
	const router = () => {
		// 模拟接口
		return new Promise<Router[]>((resolve, reject) => {
			setTimeout(() => {
				resolve(menuList);
			}, 100);
		});
	};

	// 把路由存入zustand
	const setRedux = (data: Router[]) => {
		setRouter(data);
	};

	const LazyComponent = AysncComponentHoc(LayoutComponent, router, setRedux);

	return (
		<Suspense fallback={<Iloading></Iloading>}>
			<LazyComponent></LazyComponent>
		</Suspense>
	);
};

export default useAysncComponent;
