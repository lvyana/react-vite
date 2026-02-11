/// <reference types="react-scripts" />
declare module 'nprogress';
declare module 'react-lazy-load';
declare module 'react-syntax-highlighter';
declare module 'react-syntax-highlighter/dist/esm/styles/prism';
declare module 'react-copy-to-clipboard';
declare module 'react-grid-layout';
declare module 'react-highlight-words';
declare module 'react-pdf';
declare module 'jsencrypt/bin/jsencrypt.min';
declare module 'react-lazy-load-image-component';
declare module '*.pdf';
declare module '*.md';

declare module '*.scss' {
	const content: { [className: string]: string };
	export default content;
}

interface RequestAuthCodeParam {
	appId: string;
	success: (res: object) => void;
	fail: (err: Error) => void;
}
declare interface Window {
	h5sdk: object;
	tt: {
		requestAuthCode: (param: RequestAuthCodeParam) => void;
	};
}

// 点击事件
declare type OnClick<T, P = unknown> = (type: T, value: P) => void;
