import request from '@/api/request';

/**
 * 接口参数(/seachForm/tableData)
 * @param name 姓名
 * @param age 年龄
 * @param height
 * @param status 状态
 * @param pageSize 页数
 * @param pageNum 页码
 */
export interface TableDataParams {
	name?: string[];
	age?: string;
	height?: string;
	status?: '1' | '2';
	pageSize: number;
	pageNum: number;
}

/**
 * 接口返回(/seachForm/tableData)
 * @param name 姓名
 * @param age 年龄
 * @param weight 体重
 * @param height 身高
 * @param remark 备注
 */
export interface TableDataResponse {
	key: string;
	name: string;
	age: number;
	weight: number;
	height: number;
	remark: string;
}

// 查询表格数据
export const tableData = (data: TableDataParams) => {
	return request<TableDataParams, TableDataResponse[]>({
		url: '/seachForm/tableData',
		method: 'post',
		data
	});
};
