/**
 * @file 评论
 * @author ly
 * @createDate 2020年11月10日
 */
import React, { FC } from 'react';
import Imodal from '@/antdComponents/iModal';

interface CommentProps {
	openComment: boolean;
	loadingComment: boolean;
	onOk: () => void;
	onCancel: () => void;
}
// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const Comment: FC<CommentProps> = ({ openComment, loadingComment, onOk, onCancel }) => {
	return (
		<Imodal open={openComment} title={'评论'} confirmLoading={loadingComment} onOk={onOk} onCancel={onCancel}>
			Comment
		</Imodal>
	);
};

export default Comment;
