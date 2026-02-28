/**
 * @file 生成代码
 * @author ly
 * @createDate 2023年3月13日
 */
import React, { FC, useContext } from 'react';
import AppModal from '@/components/antd/AppModal';
import { Context } from '../context';
import AppCard from '@/components/antd/AppCard';
import { useFormData } from '../hooks';

type GeneratCodeProps = {
	open: boolean;
	onOk: () => void;
	onCancel: () => void;
	confirmLoading: boolean;
};
// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const GeneratCode: FC<GeneratCodeProps> = ({ open, onOk, onCancel, confirmLoading }) => {
	const context = useContext(Context);

	const { getFormData } = useFormData();

	return (
		<AppModal width={1000} title={'导入dnd-json'} open={open} onOk={onOk} onCancel={onCancel} confirmLoading={confirmLoading}>
			<AppCard variant="outlined">
				<div>{`import React, {FC} from 'react';`}</div>
				<div className="mb-2">{`import AppForm from '@/components/antd/AppForm';`}</div>

				<div className="mb-1 whitespace-pre">{`const SeachForm: FC<Iprops> = ({ form, onFinish }) => {`}</div>
				<div style={{ whiteSpace: 'pre-line' }} className="mb-1 whitespace-pre">
					{'  const formList = ' +
						JSON.stringify(
							context?.state.formList.map((item) => {
								return getFormData(item);
							}) || [],
							null,
							2
						)}
				</div>
				<div className="mb-1 whitespace-pre">{`  return <AppForm form={form} formList={formList}></AppForm>;`}</div>
				<div className="mb-1 whitespace-pre">{`};`}</div>
			</AppCard>
		</AppModal>
	);
};

export default GeneratCode;
