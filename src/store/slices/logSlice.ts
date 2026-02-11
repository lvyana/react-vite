/**
 * @file Log状态切片
 * @author ly
 * @createDate 2020年4月27日
 */
import type { StateCreator } from 'zustand';
import type { StoreState } from '../index';

export interface LogSlice {
	// State
	list: { name: string }[];
	totals: number;

	// Actions
	setList: (list: { name: string }[]) => void;
	getMovieData: () => Promise<void>;
}

const getMovieListApi = () =>
	fetch('https://pcw-api.iqiyi.com/search/recommend/list?channel_id=1&data_type=1&mode=24&page_id=1&ret_num=48').then((res) => res.json());

export const createLogSlice: StateCreator<
	StoreState,
	[['zustand/immer', never], ['zustand/devtools', never], ['zustand/persist', unknown]],
	[],
	LogSlice
> = (set) => ({
	// Initial State
	list: [],
	totals: 0,

	// Actions
	setList: (list) =>
		set((state) => {
			state.list = list;
		}),

	getMovieData: async () => {
		try {
			const res = await getMovieListApi();
			set((state) => {
				state.list = res.data.list;
				state.totals = res.data.list.length;
			});
		} catch (error) {
			// 静默处理错误
		}
	}
});
