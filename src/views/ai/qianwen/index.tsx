/**
 * @file 通义千问风格 AI 对话界面 - 精确还原版
 * @author ly
 * @createDate 2026年2月27日
 * @description 按照通义千问官网精确还原的 AI 对话界面
 */
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { XMarkdown } from '@ant-design/x-markdown';
import type { ComponentProps } from '@ant-design/x-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import {
	UserOutlined,
	EditOutlined,
	CopyOutlined,
	RedoOutlined,
	LikeOutlined,
	DislikeOutlined,
	DeleteOutlined,
	MoreOutlined,
	SearchOutlined,
	AudioOutlined,
	GlobalOutlined,
	AppstoreOutlined
} from '@ant-design/icons';
import { Tooltip, message, Dropdown, Modal, Input } from 'antd';
import type { MenuProps } from 'antd';
import dayjs from 'dayjs';
import './index.scss';

// ---- 类型 ----
interface Message {
	id: string;
	role: 'user' | 'assistant';
	content: string;
	status?: 'loading' | 'success' | 'error';
	timestamp: number;
	feedback?: 'like' | 'dislike';
}
interface Conversation {
	key: string;
	label: string;
	messages: Message[];
	createdAt: number;
	updatedAt: number;
}

// ---- 千问 Logo ----
const QianwenLogo: React.FC<{ size?: number; className?: string }> = ({ size = 32, className = '' }) => (
	<div className={`qw-avatar ${className}`} data-size={size}>
		<img
			src="https://img.alicdn.com/imgextra/i1/O1CN01AKUdEM1oPxOKjKhOQ_!!6000000005218-2-tps-160-160.png"
			alt="千问"
			onError={(e) => {
				(e.target as HTMLImageElement).style.display = 'none';
				(e.target as HTMLImageElement).parentElement!.classList.add('fallback');
			}}
		/>
	</div>
);

// ---- 模拟响应 ----
const generateResponse = (input: string): string => {
	const t = [
		`关于"${input}"，让我为你分析：\n\n## 核心观点\n\n这是一个很有价值的问题。\n\n### 1. 理论基础\n通过系统化的方法来解决问题。\n\n### 2. 实践应用\n- 分析现状，明确目标\n- 制定可行的实施方案\n- 持续迭代优化\n\n### 3. 注意事项\n- 避免常见陷阱\n- 注重细节把控\n\n> 💡 实践是检验真理的唯一标准。\n\n希望对你有帮助！`,
		`让我解答"${input}"：\n\n## 方案概述\n\n### 推荐做法\n\n1. **采用最佳实践** - 遵循行业标准\n2. **注重代码质量** - 编写可维护的代码\n\n### 示例代码\n\n\`\`\`typescript\nconst solution = async (input: string) => {\n  try {\n    const result = await processData(input);\n    return { success: true, data: result };\n  } catch (error) {\n    return { success: false };\n  }\n};\n\`\`\`\n\n希望这个方案对你有帮助！`
	];
	return t[Math.floor(Math.random() * t.length)];
};

const groupByDate = (list: Conversation[]) => {
	const g: Record<string, Conversation[]> = {};
	list.forEach((c) => {
		const d = dayjs(c.updatedAt);
		const today = dayjs();
		const key = d.isSame(today, 'day') ? '今天' : d.isSame(today.subtract(1, 'day'), 'day') ? '昨天' : d.format('YYYY-MM');
		(g[key] ??= []).push(c);
	});
	return g;
};

// ---- 代码块高亮组件 ----
const CodeBlock: React.FC<ComponentProps> = ({ lang, block, children }) => {
	const codeStr = String(children).replace(/\n$/, '');
	if (!block) return <code className="qw-inline-code">{children}</code>;
	const language = lang || 'text';
	return (
		<div className="qw-code-block">
			<div className="qw-code-header">
				<span className="qw-code-lang">{language}</span>
				<button type="button" className="qw-code-copy" onClick={() => navigator.clipboard.writeText(codeStr)}>
					<CopyOutlined /> <span>复制</span>
				</button>
			</div>
			<SyntaxHighlighter
				language={language}
				style={oneDark}
				customStyle={{ margin: 0, borderRadius: '0 0 12px 12px', padding: '16px', fontSize: '14px', lineHeight: '1.6' }}
				wrapLongLines>
				{codeStr}
			</SyntaxHighlighter>
		</div>
	);
};

// ---- 用户消息 ----
const UserMessage: React.FC<{ msg: Message }> = ({ msg }) => (
	<div className="qw-message qw-message--user">
		<div className="qw-user-bubble">{msg.content}</div>
		<div className="qw-user-avatar">
			<UserOutlined />
		</div>
	</div>
);

// ---- AI 消息 ----
const AiMessage: React.FC<{
	msg: Message;
	onCopy: (c: string) => void;
	onRegen: () => void;
	onFeedback: (id: string, fb: 'like' | 'dislike') => void;
}> = ({ msg, onCopy, onRegen, onFeedback }) => (
	<div className="qw-message qw-message--ai">
		<div className="qw-ai-avatar">
			<QianwenLogo size={32} />
		</div>
		<div className="qw-ai-body">
			{msg.status === 'loading' && !msg.content ? (
				<div className="qw-typing">
					<span />
					<span />
					<span />
				</div>
			) : (
				<div className="qw-ai-content">
					<XMarkdown
						className="qw-markdown"
						paragraphTag="div"
						components={{ code: CodeBlock }}
						streaming={msg.status === 'loading' ? { hasNextChunk: true, enableAnimation: true } : undefined}>
						{msg.content}
					</XMarkdown>
				</div>
			)}
			{msg.status !== 'loading' && (
				<div className="qw-ai-actions">
					<Tooltip title="复制">
						<button type="button" className="qw-action-icon" onClick={() => onCopy(msg.content)} aria-label="复制">
							<CopyOutlined />
						</button>
					</Tooltip>
					<Tooltip title="重新生成">
						<button type="button" className="qw-action-icon" onClick={onRegen} aria-label="重新生成">
							<RedoOutlined />
						</button>
					</Tooltip>
					<Tooltip title="有帮助">
						<button
							type="button"
							className={`qw-action-icon ${msg.feedback === 'like' ? 'active' : ''}`}
							onClick={() => onFeedback(msg.id, 'like')}
							aria-label="有帮助">
							<LikeOutlined />
						</button>
					</Tooltip>
					<Tooltip title="没帮助">
						<button
							type="button"
							className={`qw-action-icon ${msg.feedback === 'dislike' ? 'active' : ''}`}
							onClick={() => onFeedback(msg.id, 'dislike')}
							aria-label="没帮助">
							<DislikeOutlined />
						</button>
					</Tooltip>
				</div>
			)}
		</div>
	</div>
);

// ---- 技能按钮 ----
const skillButtons = [
	{ icon: <AppstoreOutlined />, label: '任务助理' },
	{ icon: <SearchOutlined />, label: '深度思考' },
	{ icon: <SearchOutlined />, label: '深度研究' },
	{ icon: <EditOutlined />, label: '代码' },
	{ icon: <AppstoreOutlined />, label: '图像' },
	{ icon: <MoreOutlined />, label: '更多' }
];

// ---- 底部功能入口 ----
const featureItems = [
	{ icon: <AudioOutlined />, label: '录音', colorClass: 'teal' },
	{ icon: <AppstoreOutlined />, label: 'PPT', colorClass: 'indigo' },
	{ icon: <AppstoreOutlined />, label: '音视频', colorClass: 'cyan' },
	{ icon: <EditOutlined />, label: '文档', colorClass: 'cyan' },
	{ icon: <AppstoreOutlined />, label: '发现', colorClass: 'purple' }
];

// ---- 主组件 ----
const QianwenChat: React.FC = () => {
	const [messageApi, contextHolder] = message.useMessage();
	const [inputValue, setInputValue] = useState('');
	const [showSidebar, setShowSidebar] = useState(true);
	const [loading, setLoading] = useState(false);
	const [renameModal, setRenameModal] = useState({ open: false, key: '', value: '' });

	const [conversations, setConversations] = useState<Conversation[]>([
		{ key: 'default-0', label: '新对话', messages: [], createdAt: Date.now(), updatedAt: Date.now() }
	]);
	const [activeKey, setActiveKey] = useState('default-0');
	const [messages, setMessages] = useState<Message[]>([]);

	const scrollRef = useRef<HTMLDivElement>(null);
	const taRef = useRef<HTMLTextAreaElement>(null);
	const abortRef = useRef(false);

	useEffect(() => {
		if (loading) return;
		const c = conversations.find((x) => x.key === activeKey);
		if (c) setMessages(c.messages);
	}, [activeKey, conversations, loading]);

	useEffect(() => {
		if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
	}, [messages]);

	const autoResize = useCallback(() => {
		const el = taRef.current;
		if (el) {
			el.style.height = 'auto';
			el.style.height = Math.min(el.scrollHeight, 200) + 'px';
		}
	}, []);

	useEffect(() => autoResize(), [inputValue, autoResize]);

	const onSubmit = async (val: string) => {
		if (!val.trim() || loading) return;
		abortRef.current = false;
		const userMsg: Message = { id: `u-${Date.now()}`, role: 'user', content: val, timestamp: Date.now(), status: 'success' };
		const newMsgs = [...messages, userMsg];
		setMessages(newMsgs);
		setLoading(true);
		setInputValue('');

		if (messages.length === 0) {
			const title = val.slice(0, 30) + (val.length > 30 ? '...' : '');
			setConversations((p) => p.map((c) => (c.key === activeKey ? { ...c, label: title, updatedAt: Date.now() } : c)));
		}

		const aiId = `a-${Date.now()}`;
		setMessages((p) => [...p, { id: aiId, role: 'assistant', content: '', status: 'loading', timestamp: Date.now() }]);

		const resp = generateResponse(val);
		let cur = '';
		for (const ch of resp) {
			if (abortRef.current) break;
			cur += ch;
			await new Promise((r) => setTimeout(r, 15));
			setMessages((p) => p.map((m) => (m.id === aiId ? { ...m, content: cur } : m)));
		}

		const final = newMsgs.concat({ id: aiId, role: 'assistant', content: cur, status: 'success', timestamp: Date.now() });
		setMessages(final);
		setLoading(false);
		setConversations((p) => p.map((c) => (c.key === activeKey ? { ...c, messages: final, updatedAt: Date.now() } : c)));
	};

	const newChat = () => {
		const k = Date.now().toString();
		setConversations((p) => [{ key: k, label: '新对话', messages: [], createdAt: Date.now(), updatedAt: Date.now() }, ...p]);
		setActiveKey(k);
		setMessages([]);
	};

	const delChat = (key: string) => {
		Modal.confirm({
			title: '删除对话',
			content: '确定删除？',
			okText: '删除',
			okButtonProps: { danger: true },
			cancelText: '取消',
			centered: true,
			onOk: () => {
				const list = conversations.filter((c) => c.key !== key);
				if (!list.length) newChat();
				else {
					setConversations(list);
					if (key === activeKey) setActiveKey(list[0].key);
				}
				messageApi.success('已删除');
			}
		});
	};

	const renameChat = () => {
		if (!renameModal.value.trim()) return;
		setConversations((p) => p.map((c) => (c.key === renameModal.key ? { ...c, label: renameModal.value } : c)));
		setRenameModal({ open: false, key: '', value: '' });
	};

	const menuItems = (conv: Conversation): MenuProps['items'] => [
		{
			key: 'rename',
			label: '重命名',
			icon: <EditOutlined />,
			onClick: () => setRenameModal({ open: true, key: conv.key, value: conv.label })
		},
		{ type: 'divider' },
		{ key: 'delete', label: '删除', icon: <DeleteOutlined />, danger: true, onClick: () => delChat(conv.key) }
	];

	const handleCopy = (c: string) => {
		navigator.clipboard.writeText(c);
		messageApi.success('已复制');
	};
	const handleRegen = (idx: number) => {
		const u = messages[idx - 1];
		if (u?.role === 'user') {
			setMessages(messages.slice(0, idx));
			setTimeout(() => onSubmit(u.content), 100);
		}
	};
	const handleFeedback = (id: string, fb: 'like' | 'dislike') => {
		setMessages((p) => p.map((m) => (m.id === id ? { ...m, feedback: fb } : m)));
		messageApi.success('感谢反馈');
	};

	const grouped = groupByDate(conversations);

	// ---- 输入框 ----
	const renderInputBox = () => (
		<div className="qw-input-box">
			<textarea
				ref={taRef}
				className="qw-input-textarea"
				placeholder="向千问提问"
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
				onKeyDown={(e) => {
					if (e.key === 'Enter' && !e.shiftKey) {
						e.preventDefault();
						onSubmit(inputValue);
					}
				}}
				rows={1}
				disabled={loading}
			/>
			<div className="qw-input-toolbar">
				<div className="qw-toolbar-left">
					{skillButtons.map((skill, i) => (
						<button type="button" className="qw-skill-btn" key={i}>
							{skill.icon} <span>{skill.label}</span>
						</button>
					))}
				</div>
				<div className="qw-toolbar-right">
					<Tooltip title="联网搜索">
						<button type="button" className="qw-toolbar-icon" aria-label="联网">
							<GlobalOutlined />
						</button>
					</Tooltip>
					<Tooltip title="语音输入">
						<button type="button" className="qw-toolbar-icon" aria-label="语音">
							<AudioOutlined />
						</button>
					</Tooltip>
					{loading ? (
						<button
							type="button"
							className="qw-send-btn stop"
							onClick={() => {
								abortRef.current = true;
							}}
							aria-label="停止">
							<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
								<rect x="3" y="3" width="10" height="10" rx="1.5" />
							</svg>
						</button>
					) : (
						<button
							type="button"
							className={`qw-send-btn ${inputValue.trim() ? 'active' : ''}`}
							onClick={() => onSubmit(inputValue)}
							aria-label="发送">
							<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
								<path d="M3 13V9.5L7 8L3 6.5V3L14 8L3 13Z" />
							</svg>
						</button>
					)}
				</div>
			</div>
		</div>
	);

	return (
		<div className={`qianwen-chat ${showSidebar ? 'sidebar-open' : 'sidebar-closed'}`}>
			{contextHolder}

			{/* 侧边栏 */}
			<div className="qw-sidebar">
				<div className="qw-sidebar-header">
					<div className="qw-logo">
						<QianwenLogo size={24} />
						<span>千问</span>
					</div>
					<div className="qw-header-actions">
						<Tooltip title="搜索">
							<button type="button" className="qw-header-icon" aria-label="搜索">
								<SearchOutlined />
							</button>
						</Tooltip>
						<Tooltip title="收起侧边栏">
							<button type="button" className="qw-header-icon" onClick={() => setShowSidebar(false)} aria-label="收起">
								<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
									<rect x="2" y="2" width="5" height="12" rx="1.5" />
									<rect x="9" y="2" width="5" height="12" rx="1.5" />
								</svg>
							</button>
						</Tooltip>
					</div>
				</div>

				<button type="button" className="qw-new-chat" onClick={newChat}>
					<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
						<path d="M3 8h10M8 3v10" />
					</svg>
					<span>新对话</span>
				</button>

				<div className="qw-conversations">
					{Object.entries(grouped).map(([group, convs]) => (
						<div key={group} className="qw-conv-group">
							<div className="qw-conv-group-label">{group}</div>
							{convs.map((conv) => (
								<Dropdown key={conv.key} menu={{ items: menuItems(conv) }} trigger={['contextMenu']}>
									<div className={`qw-conv-item ${conv.key === activeKey ? 'active' : ''}`} onClick={() => setActiveKey(conv.key)}>
										<span className="qw-conv-label">{conv.label}</span>
										<Dropdown menu={{ items: menuItems(conv) }} trigger={['click']}>
											<button type="button" className="qw-conv-more" onClick={(e) => e.stopPropagation()} aria-label="更多">
												<MoreOutlined />
											</button>
										</Dropdown>
									</div>
								</Dropdown>
							))}
						</div>
					))}
				</div>

				<div className="qw-sidebar-footer">
					<button type="button" className="qw-footer-item">
						<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
							<rect x="2" y="2" width="12" height="12" rx="2" />
							<path d="M6 6h4M6 8h4M6 10h2" />
						</svg>
						<span>我的空间</span>
					</button>
				</div>
			</div>

			{/* 主区域 */}
			<div className="qw-main">
				{/* 顶栏 */}
				<div className="qw-topbar">
					<div className="qw-topbar-left">
						{!showSidebar && (
							<>
								<button type="button" className="qw-topbar-icon" onClick={() => setShowSidebar(true)} aria-label="打开侧边栏">
									<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
										<rect x="3" y="3" width="7" height="18" rx="2" />
										<rect x="14" y="3" width="7" height="18" rx="2" />
									</svg>
								</button>
								<button type="button" className="qw-topbar-icon" onClick={newChat} aria-label="新对话">
									<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
										<path d="M5 12h14M12 5v14" />
									</svg>
								</button>
							</>
						)}
					</div>
					<div className="qw-topbar-center">
						<button type="button" className="qw-model-selector">
							<span>Qwen3.5-Plus</span>
							<svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
								<path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
							</svg>
						</button>
					</div>
					<div className="qw-topbar-right">
						<button type="button" className="qw-topbar-text-btn">
							API 服务
						</button>
						<button type="button" className="qw-topbar-icon" aria-label="主题">
							<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
								<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
							</svg>
						</button>
						<button type="button" className="qw-login-btn">
							登录
						</button>
					</div>
				</div>

				<div className="qw-content">
					{messages.length > 0 ? (
						<div className="qw-messages-scroll" ref={scrollRef}>
							<div className="qw-messages-inner">
								{messages.map((m, idx) =>
									m.role === 'user' ? (
										<UserMessage key={m.id} msg={m} />
									) : (
										<AiMessage key={m.id} msg={m} onCopy={handleCopy} onRegen={() => handleRegen(idx)} onFeedback={handleFeedback} />
									)
								)}
							</div>
							<div className="qw-conv-input-area">{renderInputBox()}</div>
						</div>
					) : (
						<div className="qw-welcome">
							<div className="qw-welcome-inner">
								<h1 className="qw-welcome-title">你好，我是千问</h1>
								<div className="qw-welcome-input">{renderInputBox()}</div>
								<div className="qw-features">
									{featureItems.map((item, i) => (
										<div key={i} className="qw-feature-item">
											<div className={`qw-feature-icon ${item.colorClass}`}>{item.icon}</div>
											<span className="qw-feature-label">{item.label}</span>
										</div>
									))}
								</div>
							</div>
						</div>
					)}
				</div>
			</div>

			<Modal
				title="重命名"
				open={renameModal.open}
				onOk={renameChat}
				onCancel={() => setRenameModal({ open: false, key: '', value: '' })}
				okText="确定"
				cancelText="取消"
				centered
				width={400}>
				<Input
					value={renameModal.value}
					onChange={(e) => setRenameModal((p) => ({ ...p, value: e.target.value }))}
					onPressEnter={renameChat}
					placeholder="输入新名称"
					maxLength={50}
					style={{ marginTop: 12 }}
				/>
			</Modal>
		</div>
	);
};

export default QianwenChat;
