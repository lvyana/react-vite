/**
 * @file React相关页面
 * @author ly
 * @createDate 2022年12月11日
 */
import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import suspenseLoad from '../suspenseLoad';

// react use
const UseState = () => import(/* webpackChunkName: "useState" */ '@/views/react/hooks/useState');
const UseEffect = () => import(/* webpackChunkName: "useEffect" */ '@/views/react/hooks/useEffect');
const UseLayoutEffect = () => import(/* webpackChunkName: "useLayoutEffect" */ '@/views/react/hooks/useLayoutEffect');
const UseInsertionEffect = () => import(/* webpackChunkName: "useInsertionEffect" */ '@/views/react/hooks/useInsertionEffect');
const UseReducer = () => import(/* webpackChunkName: "useReducer" */ '@/views/react/hooks/useReducer');
const UseContext = () => import(/* webpackChunkName: "useContext" */ '@/views/react/hooks/useContext');
const UseMemo = () => import(/* webpackChunkName: "useMemo" */ '@/views/react/hooks/useMemo');
const UseCallback = () => import(/* webpackChunkName: "useCallback" */ '@/views/react/hooks/useCallback');
const UseRef = () => import(/* webpackChunkName: "useRef" */ '@/views/react/hooks/useRef');
const Suspense = () => import(/* webpackChunkName: "suspense" */ '@/views/react/reactDom/suspense');
const ForwardRef = () => import(/* webpackChunkName: "forwardRef" */ '@/views/react/hooks/forwardRef');
const UseImperativeHandle = () => import(/* webpackChunkName: "useImperativeHandle" */ '@/views/react/hooks/useImperativeHandle');
const UseTransition = () => import(/* webpackChunkName: "useTransition" */ '@/views/react/hooks/useTransition');
const UseDeferredValue = () => import(/* webpackChunkName: "useDeferredValue" */ '@/views/react/hooks/useDeferredValue');
const UseSyncExternalStore = () => import(/* webpackChunkName: "IuseSyncExternalStore" */ '@/views/react/hooks/useSyncExternalStore');
// reactDom
const CreatePortal = () => import(/* webpackChunkName: "MyCreatePortal" */ '@/views/react/reactDom/createPortal');
const FlushSync = () => import(/* webpackChunkName: "IflushSync" */ '@/views/react/reactDom/flushSync');

const ReduxToolkit = () => import(/* webpackChunkName: "Ireduxtoolkit" */ '@/views/react/reduxtoolkit'); // RTK

// hooks
const reactHooks = [
	{ index: true, element: <Navigate to="useReducer" /> },
	{
		path: 'useState',
		element: suspenseLoad(UseState)
	},
	{
		path: 'useInsertionEffect',
		element: suspenseLoad(UseInsertionEffect)
	},
	{
		path: 'useLayoutEffect',
		element: suspenseLoad(UseLayoutEffect)
	},
	{
		path: 'useEffect',
		element: suspenseLoad(UseEffect)
	},

	{
		path: 'useReducer',
		element: suspenseLoad(UseReducer)
	},
	{
		path: 'useContext',
		element: suspenseLoad(UseContext)
	},
	{
		path: 'useMemo',
		element: suspenseLoad(UseMemo)
	},
	{
		path: 'useCallback',
		element: suspenseLoad(UseCallback)
	},
	{
		path: 'useRef',
		element: suspenseLoad(UseRef)
	},
	{
		path: 'forwardRef',
		element: suspenseLoad(ForwardRef)
	},
	{
		path: 'useImperativeHandle',
		element: suspenseLoad(UseImperativeHandle)
	},
	{
		path: 'useTransition',
		element: suspenseLoad(UseTransition)
	},
	{
		path: 'useDeferredValue',
		element: suspenseLoad(UseDeferredValue)
	},
	{
		path: 'useSyncExternalStore',
		element: suspenseLoad(UseSyncExternalStore)
	}
];

// dom
const reactDom = [
	{ index: true, element: <Navigate to="createPortal" /> },
	{
		path: 'createPortal',
		element: suspenseLoad(CreatePortal)
	},
	{
		path: 'flushSync',
		element: suspenseLoad(FlushSync)
	},
	{
		path: 'suspense',
		element: suspenseLoad(Suspense)
	}
];

const reactCom = [
	{ index: true, element: <Navigate to="hooks" /> },
	{
		path: 'hooks',
		children: [...reactHooks]
	},
	{
		path: 'reactDom',
		children: [...reactDom]
	},
	{ path: 'reduxtoolkit', element: suspenseLoad(ReduxToolkit) }
];

export default reactCom;
