
import { useMutationRequest } from '@/hooks/useQueryRequest';
import { useDebounce } from 'ahooks';
import { editPersonnelTableDataApi } from '../../service';

// 获取编辑团队表格信息
export const useEditPersonnelTable = () => {
	const { data, loading, mutate } = useMutationRequest(editPersonnelTableDataApi);

	// 使用 ahooks �?useDebounce 来实现防�?	const debouncedMutate = useDebounce(mutate, { wait: 1000 });

	return {
		editPersonnelTableData: data?.data || [],
		editPersonnelTableLoading: loading,
		run: debouncedMutate
	};
};

