
import { useMutationRequest } from '@/hooks/useQueryRequest';
import { useDebounceFn } from 'ahooks';
import { editPersonnelTableDataApi } from '../../service';

// 获取编辑团队表格信息
export const useEditPersonnelTable = () => {
	const { data, loading, mutate } = useMutationRequest(editPersonnelTableDataApi);

	// 使用 ahooks 的 useDebounceFn 来实现防抖
	const { run: debouncedMutate } = useDebounceFn(mutate, { wait: 1000 });

	return {
		editPersonnelTableData: data?.data || [],
		editPersonnelTableLoading: loading,
		run: debouncedMutate
	};
};

