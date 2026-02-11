import { defineConfig, loadEnv } from 'vite';
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

	// CDN 配置 - 可以根据需要启用
	const useCDN = false; // 设置为 true 启用 CDN

	return {
		plugins: [
			react(),
			// HTML 插件 - 注入环境变量和 CDN
			createHtmlPlugin({
				minify: isProd,
				inject: {
					data: {
						title: 'React Admin',
						injectScript: useCDN && isProd ? '' : ''
					}
				}
			}),
			// CDN 外部化 (可选，生产环境启用)
			useCDN &&
				isProd &&
				importToCDN({
					modules: [
						{
							name: 'react',
							var: 'React',
							path: 'https://unpkg.com/react@18.3.1/umd/react.production.min.js'
						},
						{
							name: 'react-dom',
							var: 'ReactDOM',
							path: 'https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js'
						}
						// 可以添加更多 CDN 资源
						// {
						// 	name: 'antd',
						// 	var: 'antd',
						// 	path: 'https://unpkg.com/antd@5.12.5/dist/antd.min.js',
						// 	css: 'https://unpkg.com/antd@5.12.5/dist/reset.css'
						// }
					]
				}),
			// gzip 压缩 (仅生产环境)
			isProd &&
				viteCompression({
					verbose: true,
					disable: false,
					threshold: 10240, // 10KB 以上才压缩
					algorithm: 'gzip',
					ext: '.gz'
				}),
			// 打包分析 (仅生产环境)
			isProd &&
				visualizer({
					open: false,
					gzipSize: true,
					brotliSize: true,
					filename: 'dist/stats.html'
				})
		].filter(Boolean),
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
			// 警告阈值
			chunkSizeWarningLimit: 1500,
			// Rollup 配置
			rollupOptions: {
				output: {
					// 静态资源分类打包
					chunkFileNames: 'static/js/[name]-[hash].js',
					entryFileNames: 'static/js/[name]-[hash].js',
					assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
					// 代码分割
					manualChunks: (id) => {
						// CDN 外部化的包不打包
						if (useCDN && isProd) {
							if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
								return;
							}
						}

						// 第三方库分类
						if (id.includes('node_modules')) {
							// React 核心
							if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
								return 'react-vendor';
							}
							// Ant Design
							if (id.includes('antd') || id.includes('@ant-design')) {
								return 'antd-vendor';
							}
							// 图表库
							if (id.includes('@antv/g2plot')) {
								return 'chart-vendor';
							}
							// 编辑器
							if (id.includes('@wangeditor')) {
								return 'editor-vendor';
							}
							// 工具库
							if (id.includes('axios') || id.includes('dayjs') || id.includes('lodash')) {
								return 'utils-vendor';
							}
							// LogicFlow
							if (id.includes('@logicflow')) {
								return 'logic-vendor';
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
					drop_debugger: isProd
				}
			},
			// CSS 代码拆分
			cssCodeSplit: true,
			// 构建后是否生成 source map 文件
			reportCompressedSize: true,
			// 启用/禁用 brotli 压缩大小报告
			brotliSize: false
		},
		// 根据不同环境设置 base
		base: mode === 'production-github' ? '/admin/' : '/',
		// 优化依赖预构建
		optimizeDeps: {
			include: ['react', 'react-dom', 'react-router-dom', 'antd', '@ant-design/happy-work-theme', 'axios', 'dayjs', 'zustand'],
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
