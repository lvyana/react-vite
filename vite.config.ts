import { defineConfig, loadEnv, type PluginOption } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import viteCompression from 'vite-plugin-compression';
import { visualizer } from 'rollup-plugin-visualizer';
import { createHtmlPlugin } from 'vite-plugin-html';
import { Plugin as importToCDN } from 'vite-plugin-cdn-import';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');
	const isDev = mode === 'development';
	const isProd = mode === 'production' || mode === 'production-github';

	// CDN 配置 - 启用 CDN 减少打包体积
	const useCDN = isProd; // 生产环境启用 CDN

	const plugins: PluginOption[] = [react()];

	// HTML 插件 - 注入环境变量和 CDN
	plugins.push(
		createHtmlPlugin({
			minify: isProd,
			inject: {
				data: {
					title: 'React Admin',
					injectScript: useCDN && isProd ? '' : ''
				}
			}
		})
	);

	// CDN 外部化 (可选，生产环境启用)
	if (useCDN && isProd) {
		plugins.push(
			importToCDN({
				modules: [
					{
						name: 'react',
						var: 'React',
						path: 'https://cdn.jsdelivr.net/npm/react@18.3.1/umd/react.production.min.js'
					},
					{
						name: 'react-dom',
						var: 'ReactDOM',
						path: 'https://cdn.jsdelivr.net/npm/react-dom@18.3.1/umd/react-dom.production.min.js'
					},
					{
						name: 'react-router-dom',
						var: 'ReactRouterDOM',
						path: 'https://cdn.jsdelivr.net/npm/react-router-dom@6.30.3/dist/umd/react-router-dom.production.min.js'
					},
					{
						name: 'axios',
						var: 'axios',
						path: 'https://cdn.jsdelivr.net/npm/axios@1.4.0/dist/axios.min.js'
					},
					{
						name: 'dayjs',
						var: 'dayjs',
						path: 'https://cdn.jsdelivr.net/npm/dayjs@1.11.8/dayjs.min.js'
					}
				]
			})
		);
	}

	// 压缩配置 (仅生产环境)
	if (isProd) {
		// 只使用 Gzip 压缩（避免并发问题）
		plugins.push(
			viteCompression({
				verbose: true,
				disable: false,
				threshold: 10240, // 10KB 以上才压缩
				algorithm: 'gzip',
				ext: '.gz',
				deleteOriginFile: false
			})
		);

		// 打包分析
		plugins.push(
			visualizer({
				open: false,
				gzipSize: true,
				brotliSize: true,
				filename: 'dist/stats.html'
			})
		);
	}

	return {
		plugins,
		resolve: {
			alias: {
				'@': path.resolve(__dirname, './src')
			},
			extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.scss']
		},
		css: {
			preprocessorOptions: {
				scss: {
					// 使用现代编译器
					api: 'modern-compiler',
					// 可以在这里添加全局变量
					additionalData: `$injectedColor: orange;`
				}
			},
			// CSS 模块化配置
			modules: {
				localsConvention: 'camelCase'
			}
		},
		server: {
			port: 3003,
			open: true,
			cors: true,
			// 开发服务器代理配置
			proxy: {
				'/api': {
					target: env.VITE_API_BASE_URL || 'http://127.0.0.1:4523',
					changeOrigin: true,
					rewrite: (path) => path.replace(/^\/api/, '/m1/544622-0-default')
				}
			},
			// 预热常用文件
			warmup: {
				clientFiles: ['./src/index.tsx', './src/App.tsx']
			}
		},
		build: {
			outDir: 'dist',
			// 生产环境关闭 sourcemap，开发调试时可以开启
			sourcemap: mode === 'development' ? true : false,
			// 警告阈值（调整为 500KB）
			chunkSizeWarningLimit: 500,
			// Rollup 配置
			rollupOptions: {
				output: {
					// 静态资源分类打包
					chunkFileNames: 'static/js/[name]-[hash].js',
					entryFileNames: 'static/js/[name]-[hash].js',
					assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
					// 代码分割
					manualChunks: (id) => {
						// 第三方库分类（顺序很重要！）
						if (id.includes('node_modules')) {
							// Ant Design 图标（单独分离，通常很大）
							if (id.includes('@ant-design/icons')) {
								return 'antd-icons';
							}
							// Ant Design 核心组件
							if (id.includes('antd/es')) {
								return 'antd-core';
							}
							// Ant Design 其他工具
							if (id.includes('@ant-design')) {
								return 'antd-utils';
							}
							// React 核心（如果没有使用 CDN）
							if (!useCDN) {
								if (id.includes('/react/') && !id.includes('react-router') && !id.includes('react-dom')) {
									return 'react-core';
								}
								if (id.includes('/react-dom/')) {
									return 'react-dom';
								}
								if (id.includes('react-router')) {
									return 'react-router';
								}
							}
							// AntV 图表库（拆分更细）
							if (id.includes('@antv/g2')) {
								return 'antv-g2';
							}
							if (id.includes('@antv/g2plot')) {
								return 'antv-g2plot';
							}
							if (id.includes('@antv/')) {
								return 'antv-other';
							}
							// OpenLayers 地图库（通常很大）
							if (id.includes('ol/')) {
								return 'openlayers';
							}
							// 编辑器
							if (id.includes('@wangeditor')) {
								return 'editor-vendor';
							}
							// React Query
							if (id.includes('@tanstack/react-query')) {
								return 'query-vendor';
							}
							// 工具库（如果没有使用 CDN）
							if (!useCDN) {
								if (id.includes('axios')) {
									return 'axios';
								}
								if (id.includes('dayjs')) {
									return 'dayjs';
								}
							}
							// Lodash
							if (id.includes('lodash')) {
								return 'lodash';
							}
							// LogicFlow
							if (id.includes('@logicflow')) {
								return 'logic-vendor';
							}
							// Zustand
							if (id.includes('zustand')) {
								return 'zustand';
							}
							// i18next
							if (id.includes('i18next') || id.includes('react-i18next')) {
								return 'i18n-vendor';
							}
							// Prismjs 代码高亮
							if (id.includes('prismjs')) {
								return 'prism-vendor';
							}
							// html2canvas 截图库
							if (id.includes('html2canvas')) {
								return 'html2canvas';
							}
							// PDF 相关
							if (id.includes('react-pdf') || id.includes('pdfjs')) {
								return 'pdf-vendor';
							}
							// Framer Motion 动画库
							if (id.includes('framer-motion')) {
								return 'framer-motion';
							}
							// 其他第三方库
							return 'vendor';
						}
					}
				}
			},
			// 压缩配置
			minify: 'terser',
			terserOptions: {
				compress: {
					// 生产环境移除 console
					drop_console: isProd,
					drop_debugger: isProd,
					// 移除无用代码
					pure_funcs: isProd ? ['console.log', 'console.info', 'console.debug'] : []
				}
			},
			// CSS 代码拆分
			cssCodeSplit: true,
			// 构建后是否生成 source map 文件
			reportCompressedSize: true,
			// 启用/禁用 brotli 压缩大小报告
			brotliSize: false,
			// 启用 CSS 压缩
			cssMinify: true
		},
		// 根据不同环境设置 base
		base: mode === 'production-github' ? '/admin/' : '/',
		// 优化依赖预构建
		optimizeDeps: {
			include: [
				'react',
				'react-dom',
				'react-router-dom',
				'antd',
				'@ant-design/happy-work-theme',
				'axios',
				'dayjs',
				'zustand',
				'@tanstack/react-query',
				'lodash'
			],
			exclude: ['@logicflow/core', '@logicflow/extension']
		},
		// 定义全局常量替换
		define: {
			__DEV__: isDev,
			__PROD__: isProd
		},
		// Esbuild 配置
		esbuild: {
			// 移除生产环境的 console 和 debugger
			drop: isProd ? ['console', 'debugger'] : []
		}
	};
});
