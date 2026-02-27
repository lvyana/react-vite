/**
 * @file 豆包风格 AI 对话界面 - 精确还原版
 * @author ly
 * @createDate 2026年2月27日
 * @description 按照豆包官网精确还原的 AI 对话界面
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
	PaperClipOutlined,
	DeleteOutlined,
	MoreOutlined,
	AudioOutlined,
	ThunderboltOutlined,
	PictureOutlined,
	FormOutlined,
	TranslationOutlined,
	CodeOutlined,
	SearchOutlined,
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

// ---- 豆包 Logo ----
const DoubaoLogo: React.FC<{ size?: number; className?: string }> = ({ size = 32, className = '' }) => (
	<div className={`doubao-avatar ${className}`} data-size={size}>
		<img
			src="https://lf-flow-web-cdn.doubao.com/obj/flow-doubao/samantha/logo-icon-white-bg.png"
			alt="豆包"
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
	if (!block) {
		return <code className="db-inline-code">{children}</code>;
	}
	const language = lang || 'text';
	return (
		<div className="db-code-block">
			<div className="db-code-header">
				<span className="db-code-lang">{language}</span>
				<button
					type="button"
					className="db-code-copy"
					onClick={() => {
						navigator.clipboard.writeText(codeStr);
					}}>
					<CopyOutlined />
					<span>复制</span>
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
	<div className="db-message db-message--user">
		<div className="db-user-bubble">{msg.content}</div>
		<div className="db-user-avatar">
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
	<div className="db-message db-message--ai">
		<div className="db-ai-avatar">
			<DoubaoLogo size={32} />
		</div>
		<div className="db-ai-body">
			{msg.status === 'loading' && !msg.content ? (
				<div className="db-typing">
					<span />
					<span />
					<span />
				</div>
			) : (
				<div className="db-ai-content">
					<XMarkdown
						className="db-markdown"
						paragraphTag="div"
						components={{ code: CodeBlock }}
						streaming={msg.status === 'loading' ? { hasNextChunk: true, enableAnimation: true } : undefined}>
						{msg.content}
					</XMarkdown>
				</div>
			)}
			{msg.status !== 'loading' && (
				<div className="db-ai-actions">
					<Tooltip title="复制">
						<button type="button" className="db-action-icon" onClick={() => onCopy(msg.content)} aria-label="复制">
							<CopyOutlined />
						</button>
					</Tooltip>
					<Tooltip title="重新生成">
						<button type="button" className="db-action-icon" onClick={onRegen} aria-label="重新生成">
							<RedoOutlined />
						</button>
					</Tooltip>
					<Tooltip title="有帮助">
						<button
							type="button"
							className={`db-action-icon ${msg.feedback === 'like' ? 'active' : ''}`}
							onClick={() => onFeedback(msg.id, 'like')}
							aria-label="有帮助">
							<LikeOutlined />
						</button>
					</Tooltip>
					<Tooltip title="没帮助">
						<button
							type="button"
							className={`db-action-icon ${msg.feedback === 'dislike' ? 'active' : ''}`}
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

// ---- 推荐问题（3行x3列） ----
const suggestionRows = [
	['生成可爱涂鸦作品', '鸡蛋黄颜色越深越有营养吗？', '一年中几月份最好找工作？'],
	['如何判断一家外卖是不是预制菜？', '分享一些冬季主题的小手工创意', '为什么国宴多用淮扬菜？'],
	['生成可爱猫咪头像', '哪些习惯能提升睡眠质量？', '冰箱冷藏层有灯，冷冻层为什么没有？']
];

// ---- 技能按钮 ----
const skillButtons = [
	{ icon: <ThunderboltOutlined />, label: '快速', tag: '新' },
	{ icon: <PictureOutlined />, label: '图像生成' },
	{ icon: <FormOutlined />, label: '帮我写作' },
	{ icon: <TranslationOutlined />, label: '翻译' },
	{ icon: <CodeOutlined />, label: '编程' },
	{ icon: <SearchOutlined />, label: '深入研究' },
	{ icon: <AppstoreOutlined />, label: '更多' }
];

// ---- 主组件 ----
const DoubaoChat: React.FC = () => {
	const [messageApi, contextHolder] = message.useMessage();
	const [inputValue, setInputValue] = useState('');
	const [showSidebar, setShowSidebar] = useState(true);
	const [loading, setLoading] = useState(false);
	const [renameModal, setRenameModal] = useState({ open: false, key: '', value: '' });
	const [showRecentChats, setShowRecentChats] = useState(true);

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
		<div className="db-input-box">
			<textarea
				ref={taRef}
				className="db-input-textarea"
				placeholder='发消息或输入"/"选择技能'
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
			<div className="db-input-toolbar">
				<div className="db-toolbar-left">
					<Tooltip title="上传文件">
						<button type="button" className="db-toolbar-icon" aria-label="附件">
							<PaperClipOutlined />
						</button>
					</Tooltip>
					<div className="db-toolbar-divider" />
					{skillButtons.map((skill, i) => (
						<button type="button" className="db-skill-btn" key={i}>
							{skill.icon}
							<span>{skill.label}</span>
							{skill.tag && <span className="db-skill-tag">{skill.tag}</span>}
						</button>
					))}
				</div>
				<div className="db-toolbar-right">
					{loading ? (
						<Tooltip title="停止生成">
							<button
								type="button"
								className="db-send-btn stop"
								onClick={() => {
									abortRef.current = true;
								}}
								aria-label="停止">
								<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
									<rect x="3" y="3" width="10" height="10" rx="1.5" />
								</svg>
							</button>
						</Tooltip>
					) : (
						<Tooltip title="语音输入">
							<button type="button" className="db-voice-btn" aria-label="语音">
								<AudioOutlined />
							</button>
						</Tooltip>
					)}
				</div>
			</div>
		</div>
	);

	return (
		<div className={`doubao-chat ${showSidebar ? 'sidebar-open' : 'sidebar-closed'}`}>
			{contextHolder}

			{/* 侧边栏 */}
			<div className="db-sidebar">
				<div className="db-sidebar-header">
					<div className="db-logo">
						<DoubaoLogo size={36} />
						<span>豆包</span>
					</div>
					<button type="button" className="db-sidebar-toggle" onClick={() => setShowSidebar(false)} aria-label="收起侧边栏">
						<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
							<rect x="3" y="3" width="7" height="18" rx="2" />
							<rect x="14" y="3" width="7" height="18" rx="2" />
						</svg>
					</button>
				</div>

				<div className="db-new-chat" onClick={newChat}>
					<EditOutlined />
					<span>新对话</span>
					<span className="db-shortcut">Ctrl K</span>
				</div>

				<div className="db-sidebar-menu">
					<div className="db-menu-item">
						<PictureOutlined />
						<span>AI 创作</span>
						<span className="db-menu-badge">Seedance 2.0</span>
					</div>
					<div className="db-menu-item">
						<AppstoreOutlined />
						<span>更多</span>
						<span className="db-menu-arrow">›</span>
					</div>
				</div>

				<div className="db-recent-section">
					<div className="db-recent-header" onClick={() => setShowRecentChats(!showRecentChats)}>
						<div className="db-recent-label">
							<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" opacity="0.5">
								<path d="M2 4h12v1.5H2V4zm0 3.25h12v1.5H2v-1.5zm0 3.25h12V12H2v-1.5z" />
							</svg>
							<span>最近对话</span>
						</div>
						<span className={`db-recent-toggle ${showRecentChats ? 'open' : ''}`}>
							<svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
								<path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
							</svg>
						</span>
					</div>
					{showRecentChats && (
						<div className="db-conversations-list">
							{Object.entries(grouped).map(([group, convs]) => (
								<div key={group}>
									{convs.map((conv) => (
										<Dropdown key={conv.key} menu={{ items: menuItems(conv) }} trigger={['contextMenu']}>
											<div className={`db-conv-item ${conv.key === activeKey ? 'active' : ''}`} onClick={() => setActiveKey(conv.key)}>
												<span className="db-conv-label">{conv.label}</span>
												<Dropdown menu={{ items: menuItems(conv) }} trigger={['click']}>
													<button type="button" className="db-conv-more" onClick={(e) => e.stopPropagation()} aria-label="更多">
														<MoreOutlined />
													</button>
												</Dropdown>
											</div>
										</Dropdown>
									))}
								</div>
							))}
						</div>
					)}
				</div>

				<div className="db-sidebar-footer">
					<div className="db-footer-item">
						<span>ⓘ 关于豆包</span>
					</div>
				</div>
			</div>

			{/* 主区域 */}
			<div className="db-main">
				{!showSidebar && (
					<div className="db-topbar">
						<button type="button" className="db-topbar-btn" onClick={() => setShowSidebar(true)} aria-label="打开侧边栏">
							<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
								<rect x="3" y="3" width="7" height="18" rx="2" />
								<rect x="14" y="3" width="7" height="18" rx="2" />
							</svg>
						</button>
					</div>
				)}

				<div className="db-content">
					{messages.length > 0 ? (
						<div className="db-messages-scroll" ref={scrollRef}>
							<div className="db-messages-inner">
								{messages.map((m, idx) =>
									m.role === 'user' ? (
										<UserMessage key={m.id} msg={m} />
									) : (
										<AiMessage key={m.id} msg={m} onCopy={handleCopy} onRegen={() => handleRegen(idx)} onFeedback={handleFeedback} />
									)
								)}
							</div>
							<div className="db-conv-input-area">{renderInputBox()}</div>
						</div>
					) : (
						<div className="db-welcome">
							<div className="db-welcome-inner">
								<h1 className="db-welcome-title">你好，我是豆包</h1>
								<div className="db-suggestions">
									{suggestionRows.map((row, ri) => (
										<div key={ri} className="db-suggestion-row">
											{row.map((s, ci) => (
												<div key={ci} className="db-suggestion-pill" onClick={() => onSubmit(s)}>
													{s}
												</div>
											))}
										</div>
									))}
								</div>
							</div>
							<div className="db-bottom-input">{renderInputBox()}</div>
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

export default DoubaoChat;
