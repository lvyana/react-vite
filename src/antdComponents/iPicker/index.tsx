/**
 * @file 日期
 * @author ly
 * @createDate 2023年1月3日
 */
import React from 'react';
import { DatePicker, TimePicker } from 'antd';
import { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';
import { TimePickerProps, TimeRangePickerProps } from 'antd/lib/time-picker';

const { RangePicker } = DatePicker;

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

export const getDatePicker = (config: DatePickerProps) => {
	const { style, ...rest } = config;
	return <DatePicker {...rest} style={{ width: '100%', ...style }} />;
};

export const getRangePicker = (config: RangePickerProps) => {
	const { style, ...rest } = config;
	return <RangePicker {...rest} style={{ width: '100%', ...style }} />;
};

export const getTimePicker = (config: TimePickerProps) => {
	const { format = 'HH:mm', minuteStep = 15, ...rest } = config;
	return <TimePicker {...rest} minuteStep={minuteStep} format={format} />;
};

export const getTimeRangePicker = (config: TimeRangePickerProps) => {
	const { format = 'HH:mm', minuteStep = 15, ...rest } = config;
	return <TimePicker.RangePicker {...rest} minuteStep={minuteStep} format={format} />;
};

export type { DatePickerProps, RangePickerProps, TimePickerProps, TimeRangePickerProps };
