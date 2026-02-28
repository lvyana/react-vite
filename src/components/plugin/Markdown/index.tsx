/**
 * @file Markdown 渲染组件 - 支持静态文件和流式输出
 * @author ly
 * @createDate
 */
import React, { FC, useEffect, useState } from 'react';
import { XMarkdown } from '@ant-design/x-markdown';
import type { ComponentProps } from '@ant-design/x-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CopyOutlined } from '@ant-design/icons';
import { message } from 'antd';
import style from './index.module.scss';

type MarkdownProps = {
	/** markdown 文件 URL（用于静态文件加载） */
	url?: string;
	/** 初始内容或直接传入的 markdown 内容 */
	initContent?: string;
	/** 是否启用流式输出动画 */
	streaming?: boolean;
	/** 自定义类名 */
	className?: string;
	/** 是否显示代码复制按钮 */
	showCopyButton?: boolean;
};

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

/** 代码块高亮组件 */
const CodeBlock: FC<ComponentProps & { showCopyButton?: boolean }> = ({ lang, block, children, showCopyButton = true }) => {
	const [messageApi, contextHolder] = message.useMessage();
	const codeStr = String(children).replace(/\n$/, '');

	// 行内代码
	if (!block) {
		return <code className="inline-code">{children}</code>;
	}

	const language = lang || 'text';

	const handleCopy = () => {
		navigator.clipboard.writeText(codeStr);
		messageApi.success('代码已复制');
	};

	return (
		<>
			{contextHolder}
			<div className="code-block-wrapper">
				<div className="code-block-header">
					<span className="code-language">{language}</span>
					{showCopyButton && (
						<button type="button" className="code-copy-btn" onClick={handleCopy}>
							<CopyOutlined />
							<span>复制</span>
						</button>
					)}
				</div>
				<SyntaxHighlighter
					language={language}
					style={oneDark}
					customStyle={{
						margin: 0,
						borderRadius: '0 0 8px 8px',
						padding: '16px',
						fontSize: '14px',
						lineHeight: '1.6'
					}}
					wrapLongLines>
					{codeStr}
				</SyntaxHighlighter>
			</div>
		</>
	);
};

const Markdown: FC<MarkdownProps> = ({ url = '', initContent = '', streaming = false, className = '', showCopyButton = true }) => {
	const [content, setContent] = useState(initContent);

	useEffect(() => {
		if (url) {
			getContent();
		}
	}, [url]);

	// 当 initContent 变化时更新内容（用于流式输出）
	useEffect(() => {
		if (!url) {
			setContent(initContent);
		}
	}, [initContent, url]);

	const getContent = () => {
		try {
			// 直接使用 fetch 获取 markdown 文件内容
			fetch(`/src/components/plugin/Markdown/module/${url}`)
				.then((res) => {
					if (!res.ok) {
						throw new Error(`Failed to load ${url}`);
					}
					return res.text();
				})
				.then((text) => {
					setContent(text);
				})
				.catch((error) => {
					console.error('Failed to load markdown:', error);
				});
		} catch (error) {
			console.error('Error loading markdown:', error);
		}
	};

	return (
		<div className={`${style.codeStyle} ${className}`}>
			<XMarkdown
				paragraphTag="div"
				components={{ code: (props) => <CodeBlock {...props} showCopyButton={showCopyButton} /> }}
				streaming={streaming ? { hasNextChunk: true, enableAnimation: true } : undefined}>
				{content}
			</XMarkdown>
		</div>
	);
};

export default Markdown;
