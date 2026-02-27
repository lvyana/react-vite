/**
 * @file AI相关页面
 * @author ly
 * @createDate 2026年2月12日
 */
import React from 'react';
import { Navigate } from 'react-router-dom';
import suspenseLoad from '../suspenseLoad';

const DeepSeek = () => import(/* webpackChunkName: "aiDeepseek" */ '@/views/ai/deepseek');
const Qianwen = () => import(/* webpackChunkName: "aiQianwen" */ '@/views/ai/qianwen');
const Doubao = () => import(/* webpackChunkName: "aiDoubao" */ '@/views/ai/doubao');

const aiRoutes = [
	{ index: true, element: <Navigate to="deepseek" /> },
	{
		path: 'deepseek',
		element: suspenseLoad(DeepSeek)
	},
	{
		path: 'qianwen',
		element: suspenseLoad(Qianwen)
	},
	{
		path: 'doubao',
		element: suspenseLoad(Doubao)
	}
];

export default aiRoutes;
