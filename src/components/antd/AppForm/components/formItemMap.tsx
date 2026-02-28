/**
 * @file form对象
 * @author ly
 * @createDate 2023年1月3日
 */
import React from 'react';
import { FormItemMap } from '../type';
import getCascader from '../../AppCascader';
import { getCheckbox, getCheckboxGroup } from '../../AppCheckbox';
import { getDatePicker, getRangePicker, getTimePicker, getTimeRangePicker } from '../../AppPicker';
import { getInput, getTextArea, getNumber } from '../../AppInput';
import getRadio from '../../AppRadio';
import getRate from '../../AppRate';
import getSelect from '../../AppSelect';
import getSwitch from '../../AppSwitch';
import getTreeSelect from '../../AppTreeSelect';
import getSlider from '../../AppSlider';
import setSlot from './Slot';
import getUpload from '../../AppUpload';
import IbuttonList from '@/components/antd/AppButton/List';

// 策略模式
const FORM_ITEM_MAP: FormItemMap = {
	input: getInput,
	select: getSelect,
	treeSelect: getTreeSelect,
	cascader: getCascader,
	datePicker: getDatePicker,
	rangePicker: getRangePicker,
	timePicker: getTimePicker,
	timeRangePicker: getTimeRangePicker,
	inputNumber: getNumber,
	switch: getSwitch,
	button: (item) => <IbuttonList {...item} />,
	radio: getRadio,
	checkboxGroup: getCheckboxGroup,
	checkbox: getCheckbox,
	rate: getRate,
	textArea: getTextArea,
	slider: getSlider,
	upload: getUpload,
	slot: setSlot,
};

export default FORM_ITEM_MAP;
