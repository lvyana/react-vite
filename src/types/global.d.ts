// 全局类型声明

// 缺少类型定义的第三方库（使用 any 绕过类型检查）
declare module 'jsencrypt/bin/jsencrypt.min' {
	const content: any;
	export default content;
}

declare module 'react-pdf' {
	export const Document: any;
	export const Page: any;
	export const pdfjs: any;
}

declare module 'react-grid-layout' {
	const GridLayout: any;
	export default GridLayout;
	export type Layout = any;
}

declare module 'react-highlight-words' {
	const content: any;
	export default content;
}

declare module 'react-copy-to-clipboard' {
	export const CopyToClipboard: any;
}

declare module 'react-lazy-load-image-component' {
	export const LazyLoadImage: any;
}

declare module 'react-syntax-highlighter' {
	export const Prism: any;
	const content: any;
	export default content;
}

declare module 'react-syntax-highlighter/dist/esm/styles/prism' {
	export const dark: any;
	export const light: any;
}

// 飞书 SDK
interface Window {
	h5sdk?: any;
	tt?: any;
}
