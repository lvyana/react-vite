/**
 * @file User状态切片
 * @author ly
 * @createDate 2020年4月27日
 */
import type { StateCreator } from 'zustand';
import menuLogo from '@/assets/images/menu.png';
import type { Router } from '@/layout/menu/routerData';
import type { StoreState } from '../index';

export interface UserSlice {
	// State
	photo: string;
	token: string;
	permiss: string[];
	router: Router[];

	// Actions
	setPhoto: (photo: string) => void;
	setToken: (token: string) => void;
	setPermiss: (permiss: string[]) => void;
	setRouter: (router: Router[]) => void;
}

export const createUserSlice: StateCreator<
	StoreState,
	[['zustand/immer', never], ['zustand/devtools', never], ['zustand/persist', unknown]],
	[],
	UserSlice
> = (set) => ({
	// Initial State
	photo: menuLogo,
	token: '',
	permiss: ['*:*:*'],
	router: [],

	// Actions
	setPhoto: (photo) =>
		set((state) => {
			state.photo = photo;
		}),

	setToken: (token) =>
		set((state) => {
			state.token = token;
		}),

	setPermiss: (permiss) =>
		set((state) => {
			state.permiss = permiss;
		}),

	setRouter: (router) =>
		set((state) => {
			state.router = router;
		})
});
