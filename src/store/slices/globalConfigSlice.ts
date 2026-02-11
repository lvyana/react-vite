/**
 * @file GlobalConfig状态切片
 * @author ly
 * @createDate 2022年7月30日
 */
import type { StateCreator } from 'zustand';
import { headerConfig } from '@/api/publicApi';
import type { StoreState } from '../index';

export type HeaderFieldParam = {
	headerFieldId: string;
	headerFieldKey: string;
	headerFieldName: string;
	headerSelected: string;
	key: string;
};

export type HeaderConfigListParam = {
	type: string;
	headerField: HeaderFieldParam[];
};

export interface GlobalConfigSlice {
	// State
	headerConfigList: HeaderConfigListParam[];

	// Actions
	setHeaderConfig: (headerConfigList: HeaderConfigListParam[]) => void;
	getHeaderConfig: () => Promise<void>;
}

export const createGlobalConfigSlice: StateCreator<
	StoreState,
	[['zustand/immer', never], ['zustand/devtools', never], ['zustand/persist', unknown]],
	[],
	GlobalConfigSlice
> = (set) => ({
	// Initial State
	headerConfigList: [],

	// Actions
	setHeaderConfig: (headerConfigList) =>
		set((state) => {
			state.headerConfigList = headerConfigList;
		}),

	getHeaderConfig: async () => {
		try {
			const res = await headerConfig();
			const { data } = res;
			set((state) => {
				state.headerConfigList = data;
			});
		} catch (error) {
			// 静默处理错误，避免控制台噪音
			set((state) => {
				state.headerConfigList = [];
			});
		}
	}
});
