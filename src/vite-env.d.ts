/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_API_BASE_URL: string;
	readonly VITE_APP_TITLE?: string;
	// 添加其他环境变量类型
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
	readonly VITE_APP_ENV: string;
	readonly VITE_API_BASE_URL: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
