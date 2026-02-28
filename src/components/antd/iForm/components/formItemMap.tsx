/**
 * @file form对象
 * @author ly
 * @createDate 2023年1月3日
 */
import React from 'react';
import { FormItemMap } from '../type';
import getCascader from '../../iCascader';
import { getCheckbox, getCheckboxGroup } from '../../iCheckbox';
import { getDatePicker, getRangePicker, getTimePicker, getTimeRangePicker } from '../../iPicker';
import { getInput, getTextArea, getNumber } from '../../iInput';
import getRadio from '../../iRadio';
import getRate from '../../iRate';
import getSelect from '../../iSelect';
import getSwitch from '../../iSwitch';
import getTreeSelect from '../../iTreeSelect';
import getSlider from '../../iSlider';
import setSlot from './Slot';
import getUpload from '../../iUpload';
import IbuttonList from '@/components/antd/iButton/List';

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
