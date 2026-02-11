/**
 * @file antd组件相关页面
 * @author ly
 * @createDate 2022年12月11日
 */
import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import suspenseLoad from '../suspenseLoad';

const SeachForm = () => import(/* webpackChunkName: "seachForm" */ '@/views/antd/seachForm');
const AntTable = () => import(/* webpackChunkName: "antTable" */ '@/views/antd/antTable'); //antTabled表格封装
const Dynamicform = () => import(/* webpackChunkName: "dynamicform" */ '@/views/antd/dynamicform'); //动态表单

// antd组件封装
const antdCom = [
	{ index: true, element: <Navigate to="seachForm" /> },
	{
		path: 'seachForm',
		element: suspenseLoad(SeachForm)
	},
	{
		path: 'antdTable',
		element: suspenseLoad(AntTable)
	},
	{
		path: 'dynamicform',
		element: suspenseLoad(Dynamicform)
	}
];

export default antdCom;
