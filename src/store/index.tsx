/**
 * @file Zustand状态管理 - 企业级架构
 * @author ly
 * @createDate 2020年4月27日
 */
import { create } from 'zustand';
import { persist, createJSONStorage, devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { createLayoutSlice, LayoutSlice } from './slices/layoutSlice';
import { createUserSlice, UserSlice } from './slices/userSlice';
import { createLogSlice, LogSlice } from './slices/logSlice';
import { createGlobalConfigSlice, GlobalConfigSlice } from './slices/globalConfigSlice';
import { createKeepAliveSlice, KeepAliveSlice } from './slices/keepAliveSlice';

// 组合所有slice的类型
export type StoreState = LayoutSlice & UserSlice & LogSlice & GlobalConfigSlice & KeepAliveSlice;

// 创建store
export const useStore = create<StoreState>()(
	devtools(
		persist(
			immer((...a) => ({
				...createLayoutSlice(...a),
				...createUserSlice(...a),
				...createLogSlice(...a),
				...createGlobalConfigSlice(...a),
				...createKeepAliveSlice(...a)
			})),
			{
				name: 'app-storage',
				storage: createJSONStorage(() => localStorage),
				partialize: (state) => ({
					// layout
					language: state.language,
					size: state.size,
					color: state.color,
					menuLayout: state.menuLayout,
					tabsMainLayout: state.tabsMainLayout,
					footerLayout: state.footerLayout,
					leftMenuCollapsed: state.leftMenuCollapsed,
					// user
					photo: state.photo,
					token: state.token,
					permiss: state.permiss,
					router: state.router,
					// globalConfig
					headerConfigList: state.headerConfigList,
					// keepAlive
					keepAliveData: state.keepAliveData
				})
			}
		),
		{ name: 'AppStore' }
	)
);

// 导出选择器 hooks
import { useShallow } from 'zustand/react/shallow';

export const useLayout = () =>
	useStore(
		useShallow((state) => ({
			language: state.language,
			size: state.size,
			color: state.color,
			menuLayout: state.menuLayout,
			tabsMainLayout: state.tabsMainLayout,
			footerLayout: state.footerLayout,
			leftMenuCollapsed: state.leftMenuCollapsed,
			setLanguage: state.setLanguage,
			setSize: state.setSize,
			setTheme: state.setTheme,
			setMenuLayout: state.setMenuLayout,
			setTabsMainLayout: state.setTabsMainLayout,
			setFooterLayout: state.setFooterLayout,
			setLeftMenuCollapsed: state.setLeftMenuCollapsed
		}))
	);

export const useUser = () =>
	useStore(
		useShallow((state) => ({
			photo: state.photo,
			token: state.token,
			permiss: state.permiss,
			router: state.router,
			setPhoto: state.setPhoto,
			setToken: state.setToken,
			setPermiss: state.setPermiss,
			setRouter: state.setRouter
		}))
	);

export const useLog = () =>
	useStore(
		useShallow((state) => ({
			list: state.list,
			totals: state.totals,
			setList: state.setList,
			getMovieData: state.getMovieData
		}))
	);

export const useGlobalConfig = () =>
	useStore(
		useShallow((state) => ({
			headerConfigList: state.headerConfigList,
			setHeaderConfig: state.setHeaderConfig,
			getHeaderConfig: state.getHeaderConfig
		}))
	);

export const useKeepAlive = () =>
	useStore(
		useShallow((state) => ({
			keepAliveData: state.keepAliveData,
			setKeepAliveData: state.setKeepAliveData,
			getKeepAliveData: state.getKeepAliveData
		}))
	);
