/**
 * @file KeepAlive状态切片
 * @author ly
 * @createDate 2023年3月31日
 */
import type { StateCreator } from 'zustand';
import type { StoreState } from '../index';

export type KeepAliveDataItem<T = object> = {
	key: string;
	value: T;
};

export interface KeepAliveSlice {
	// State
	keepAliveData: Record<string, KeepAliveDataItem>;

	// Actions
	setKeepAliveData: <T = object>(payload: KeepAliveDataItem<T>) => void;
	getKeepAliveData: <T = object>(key: string) => T;
}

export const createKeepAliveSlice: StateCreator<
	StoreState,
	[['zustand/immer', never], ['zustand/devtools', never], ['zustand/persist', unknown]],
	[],
	KeepAliveSlice
> = (set, get) => ({
	// Initial State
	keepAliveData: {},

	// Actions
	setKeepAliveData: (payload) =>
		set((state) => {
			state.keepAliveData[payload.key] = payload as KeepAliveDataItem<object>;
		}),

	getKeepAliveData: <T = object>(key: string): T => {
		const data = get().keepAliveData[key];
		return (data?.value || {}) as T;
	}
});
