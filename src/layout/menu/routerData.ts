/**
 * @file 路由数据
 * @author ly
 * @createDate 2022年10月10日
 */
/**
 * @param title 标题
 * @param path 路径
 * @param icon 图标
 * @param show 显示、隐藏
 * @param children 子级
 */
export interface Router {
	title: string;
	path: string;
	icon?: string;
	show?: boolean;
	children?: Router[];
}

const menuList: Router[] = [
	{
		title: 'menu.home',
		path: '/home',
		icon: 'icon-shouyexuanzhong'
	},
	{
		title: 'menu.antd',
		path: '/antd',
		icon: 'icon-antdesign',
		children: [
			{
				title: 'menu.seachForm',
				path: '/antd/seachForm',
				icon: 'icon-yinle'
			},
			{
				title: 'menu.antdTable',
				path: '/antd/antdTable',
				icon: 'icon-yinle'
			},
			{
				title: 'menu.dynamicform',
				path: '/antd/dynamicform',
				icon: 'icon-chongzhizhongxin'
			}
		]
	},

	{
		title: 'menu.react',
		path: '/react',
		icon: 'icon-React',
		children: [
			{
				title: 'menu.hooks',
				path: '/react/hooks',
				icon: 'icon-qianbao',
				children: [
					{
						title: 'menu.useState',
						path: '/react/hooks/useState',
						icon: 'icon-kongjian'
					},
					{
						title: 'menu.useInsertionEffect',
						path: '/react/hooks/useInsertionEffect',
						icon: 'icon-wodemaidan'
					},
					{
						title: 'menu.useLayoutEffect',
						path: '/react/hooks/useLayoutEffect',
						icon: 'icon-wodemaidan'
					},
					{
						title: 'menu.useEffect',
						path: '/react/hooks/useEffect',
						icon: 'icon-fenxiangerweima'
					},

					{
						title: 'menu.useReducer',
						path: '/react/hooks/useReducer',
						icon: 'icon-gouwu'
					},
					{
						title: 'menu.useContext',
						path: '/react/hooks/useContext',
						icon: 'icon-gouwu'
					},
					{
						title: 'menu.useMemo',
						path: '/react/hooks/useMemo',
						icon: 'icon-zuji'
					},
					{
						title: 'menu.useCallback',
						path: '/react/hooks/useCallback',
						icon: 'icon-ditu'
					},
					{
						title: 'menu.useRef',
						path: '/react/hooks/useRef',
						icon: 'icon-youhuiquan'
					},

					{
						title: 'menu.forwardRef',
						path: '/react/hooks/forwardRef',
						icon: 'icon-paimai'
					},
					{
						title: 'menu.useImperativeHandle',
						path: '/react/hooks/useImperativeHandle',
						icon: 'icon-paimai'
					},
					{
						title: 'menu.useTransition',
						path: '/react/hooks/useTransition',
						icon: 'icon-paimai'
					},
					{
						title: 'menu.useDeferredValue',
						path: '/react/hooks/useDeferredValue',
						icon: 'icon-paimai'
					},
					{
						title: 'menu.useSyncExternalStore',
						path: '/react/hooks/useSyncExternalStore',
						icon: 'icon-paimai'
					}
				]
			},
			{
				title: 'menu.reactDom',
				path: '/react/reactDom',
				icon: 'icon-xinpin',
				children: [
					{
						title: 'menu.createPortal',
						path: '/react/reactDom/createPortal',
						icon: 'icon-xinpin'
					},
					{
						title: 'menu.flushSync',
						path: '/react/reactDom/flushSync',
						icon: 'icon-xinpin'
					},
					{
						title: 'menu.Suspense',
						path: '/react/reactDom/suspense',
						icon: 'icon-dingdan'
					}
				]
			},
			{
				title: 'menu.reduxtoolkit',
				path: '/react/reduxtoolkit',
				icon: 'icon-xinpin'
			}
		]
	},
	{
		title: 'menu.router',
		path: '/router',
		icon: 'icon-icon_luyouqi',
		children: [
			{
				title: 'menu.routerDemo',
				path: '/router/routerDemo',
				icon: 'icon-qiche'
			},
			{
				title: 'menu.routerInfo',
				path: '/router/routerInfo',
				icon: 'icon-shangou'
			}
		]
	},
	{
		title: 'menu.plugin',
		path: '/plugin',
		icon: 'icon-plugin',
		children: [
			{
				title: 'menu.richtextedit',
				path: '/plugin/richtextedit',
				icon: 'icon-huodong'
			},
			{
				title: 'menu.pdf',
				path: '/plugin/pdf',
				icon: 'icon-biaoshu'
			},

			{
				title: 'menu.player',
				path: '/plugin/player',
				icon: 'icon-shangcheng'
			},
			{
				title: 'menu.gridLayout',
				path: '/plugin/gridLayout',
				icon: 'icon-jiaoyu'
			},
			{
				title: 'menu.responsive',
				path: '/plugin/responsive',
				icon: 'icon-shenghuo'
			},
			{
				title: 'menu.i18n',
				path: '/plugin/i18n',
				icon: 'icon-xinpin'
			},
			{
				title: 'menu.dnd',
				path: '/plugin/dnd',
				icon: 'icon-xinpin'
			},
			{
				title: 'menu.burst',
				path: '/plugin/burst',
				icon: 'icon-xinpin'
			},
			{
				title: 'menu.easyTyper',
				path: '/plugin/easyTyper',
				icon: 'icon-xinpin'
			},
			{
				title: 'menu.videoCall',
				path: '/plugin/videoCall',
				icon: 'icon-xinpin'
			},
			{
				title: 'menu.dataSharingEnvironment',
				path: '/plugin/dataSharingEnvironment',
				icon: 'icon-xinpin'
			},
			{
				title: 'menu.logicFlow',
				path: '/plugin/logicFlow',
				icon: 'icon-xinpin'
			},
			{
				title: 'menu.openLayers',
				path: '/plugin/openLayers',
				icon: 'icon-xinpin'
			},
			{
				title: 'menu.canvas',
				path: '/plugin/canvas',
				icon: 'icon-xinpin'
			},
			{
				title: 'menu.dashboard',
				path: '/plugin/dashboard',
				icon: 'icon-xinpin'
			}
		]
	},
	{
		title: 'menu.document',
		path: '/document',
		icon: 'icon-wenbenwendang-txt',
		children: [
			{
				title: 'menu.volta',
				path: '/document/volta',
				icon: 'icon-qiche'
			},
			{
				title: 'menu.createReactApp',
				path: '/document/createReactApp',
				icon: 'icon-qiche'
			},
			{
				title: 'menu.markdown',
				path: '/document/markdown',
				icon: 'icon-xinpin'
			}
		]
	},
	// 不显示在菜单中中
	{
		title: 'menu.mycenter',
		path: '/mycenter',
		icon: 'icon-gerenzhongxin',
		show: false
	},
	{
		title: 'menu.messgeCenter',
		path: '/messgeCenter',
		show: false
	}
];

export default menuList;
