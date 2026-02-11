/**
 * @file 日历和团�? * @author ly
 * @createDate 2020�?�?7�? */
import React, { useState, useContext, useEffect, useMemo, FC } from 'react';
import { useMutationRequest } from '@/hooks/useQueryRequest';
import TeamMembers from './TeamMembers';
import Date from './Date';
import dayjs, { Dayjs } from 'dayjs';
import { taskList } from '../../service';
import { toDayContext } from '../../context';
import DateAndPersonnelHoc from './AsyncDateAndPersonnel';
export interface DateAndPersonnelProps {
	oldUserId?: string;
	oldDate?: string;
}

const DateAndPersonnel: FC<DateAndPersonnelProps> = ({ oldUserId, oldDate }) => {
	// console.log(oldUserId, oldDate);

	const toDay = useContext(toDayContext);

	// 用户列表
	const [userId, setUserId] = useState<string>();

	const onAvatar = (key: string) => {
		setUserId(key);
		fetchTaskList();
	};

	// 日期
	const [dateValue, setDateValue] = useState<Dayjs>(() => {
		return dayjs();
	});

	const onchangeDate = (value: Dayjs) => {
		setDateValue(value);
		fetchTaskList();
	};

	// 获取任务列表数据
	const { run: fetchTaskList, runAsync: fetchTaskListAsync, loading } = useMutationRequest(taskList, { onSuccess: (res) => { toDay?.dispatch({ type: 'taskListData', value: res.data }); } });

	useEffect(() => {
		fetchTaskList();
	}, []);

	useEffect(() => {
		toDay?.dispatch({ type: 'taskListLoading', value: loading });
	}, [loading]);

	return (
		<div className="p-2">
			<TeamMembers userId={userId} onAvatar={onAvatar}></TeamMembers>
			<Date dateValue={dateValue} userId={userId} onchangeDate={onchangeDate}></Date>
		</div>
	);
};

export default () => DateAndPersonnelHoc(DateAndPersonnel);

