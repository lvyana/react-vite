import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import viteCompression from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');

	return {
		plugins: [
			react(),
			// gzip 压缩
			viteCompression({
				verbose: true,
				disable: false,
				threshold: 10240,
				algorithm: 'gzip',
				ext: '.gz'
			})
		],
		resolve: {
			alias: {
				'@': path.resolve(__dirname, './src')
			}
		},
		css: {
			preprocessorOptions: {
				scss: {
					// 移除全局导入，避免循环依赖
					api: 'modern-compiler'
				}
			}
		},
		server: {
			port: 3003,
			open: true,
			cors: true,
			proxy: {
				'/api': {
					target: env.VITE_API_BASE_URL || 'http://localhost:8080',
					changeOrigin: true,
					rewrite: (path) => path.replace(/^\/api/, '')
				}
			}
		},
		build: {
			outDir: 'dist',
			sourcemap: false,
			chunkSizeWarningLimit: 1500,
			rollupOptions: {
				output: {
					manualChunks: {
						'react-vendor': ['react', 'react-dom', 'react-router-dom'],
						'antd-vendor': ['antd', '@ant-design/happy-work-theme'],
						'chart-vendor': ['@antv/g2plot'],
						'editor-vendor': ['@wangeditor/editor', '@wangeditor/editor-for-react']
					}
				}
			}
		},
		base: mode === 'production-github' ? '/admin/' : '/'
	};
});
