/**
 * @file 按钮权限
 * @author ly
 * @createDate 2020年4月27日
 */
import React from 'react';
import { useUser } from '@/store';

const useHasPermiss = () => {
	const { permiss: permissList } = useUser();

	const hasPermiss = (hasPermiss?: string) => {
		if (!hasPermiss || permissList.indexOf('*:*:*') > -1) return true;
		if (permissList.indexOf(hasPermiss) > -1) {
			return true;
		} else {
			return false;
		}
	};
	return {
		hasPermiss
	};
};
export default useHasPermiss;
