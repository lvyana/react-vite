/**
 * @name 上方按钮操作
 * @user ly
 * @date 2022年12月30日
 */
import React, { useContext, useState } from 'react';
import { Form } from 'antd';
import Ibutton, { ButtonItemParams } from '@/antdComponents/iButton/List';
import JsonView from './JsonView';
import ImportJson from './ImportJson';
import { Context } from '../context';
import type { ImportJsonForm } from './ImportJson';
import TemplateForm from './TemplateForm';
import GeneratCode from './GeneratCode';
import useModal from '@/antdComponents/iModal/useHooks';

type ButtonType = 'JSON' | 'import' | 'template' | 'generatCode';

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const OperationBtns = () => {
	const context = useContext(Context);

	//jsonView
	const {
		open: jsonViewOpen,
		loading: jsonViewLoading,
		onOpen: jsonViewonOpen,
		onCancel: jsonViewModalCancel,
		onOk: jsonViewModalOk
	} = useModal();

	//ImportJson
	const [importJsonForm] = Form.useForm<ImportJsonForm>();

	const {
		open: importJsonOpen,
		loading: importJsonLoading,
		onOpen: importJsononOpen,
		onCancel: importJsonModalCancel,
		onOk: importJsonModalOk
	} = useModal({
		onOkCallback: async (res, rej) => {
			const formListStr = importJsonForm.getFieldValue('json');
			if (!formListStr) {
				rej();
			}
			try {
				const values = await importJsonForm.validateFields();
				context?.dispatch({ type: 'formList', value: JSON.parse(formListStr) });
				importJsonForm.resetFields();
				res();
			} catch (error) {
				rej();
			}
		},
		onCancelCallback: (res) => {
			importJsonForm.resetFields();
			res();
		}
	});

	// TemplateForm
	const [templateFormForm] = Form.useForm<ImportJsonForm>();

	const {
		open: templateFormOpen,
		loading: templateFormLoading,
		onOpen: templateFormModalOnOpen,
		onCancel: templateFormModalCancel,
		onOk: templateFormModalOk
	} = useModal();

	// generatCode
	const {
		open: generatCodeOpen,
		loading: generatCodeLoading,
		onOpen: generatCodeModalOnOpen,
		onCancel: generatCodeModalCancel,
		onOk: generatCodeModalOk
	} = useModal();

	const buttonList: ButtonItemParams<ButtonType>[] = [
		{
			comConfig: {
				name: '生成示例',
				type: 'primary',
				onClick: templateFormModalOnOpen
			},
			tag: 'template'
		},
		{
			comConfig: {
				name: '生成JSON',
				type: 'primary',
				className: 'ml-1',
				onClick: jsonViewonOpen
			},
			tag: 'JSON'
		},
		{
			comConfig: {
				name: '导入JSON',
				type: 'primary',
				className: 'ml-1',
				onClick: importJsononOpen
			},
			tag: 'import'
		},
		{
			comConfig: {
				name: '生成代码',
				type: 'primary',
				className: 'ml-1',
				onClick: generatCodeModalOnOpen
			},
			tag: 'generatCode'
		}
	];

	return (
		<div className="mb-2">
			<Ibutton options={buttonList}></Ibutton>
			<JsonView open={jsonViewOpen} onOk={jsonViewModalOk} onCancel={jsonViewModalCancel} confirmLoading={jsonViewLoading} />
			<ImportJson
				open={importJsonOpen}
				onOk={importJsonModalOk}
				onCancel={importJsonModalCancel}
				confirmLoading={importJsonLoading}
				form={importJsonForm}
			/>
			<TemplateForm
				open={templateFormOpen}
				onOk={templateFormModalOk}
				onCancel={templateFormModalCancel}
				confirmLoading={templateFormLoading}
				form={templateFormForm}></TemplateForm>
			<GeneratCode
				open={generatCodeOpen}
				onOk={generatCodeModalOk}
				onCancel={generatCodeModalCancel}
				confirmLoading={generatCodeLoading}></GeneratCode>
		</div>
	);
};

export default OperationBtns;
