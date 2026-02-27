/**
 * @file DeepSeek 风格 AI 对话界面 - 精确还原版
 * @author ly
 * @createDate 2026年2月27日
 * @description 完全按照 DeepSeek 官网精确还原的 AI 对话界面
 */
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { XMarkdown } from '@ant-design/x-markdown';
import type { ComponentProps } from '@ant-design/x-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import {
	UserOutlined,
	PlusOutlined,
	CopyOutlined,
	RedoOutlined,
	LikeOutlined,
	DislikeOutlined,
	ThunderboltOutlined,
	GlobalOutlined,
	MoreOutlined,
	DeleteOutlined,
	EditOutlined,
	PaperClipOutlined,
	ShareAltOutlined
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

// ---- DeepSeek SVG Logo ----
const DeepSeekLogo: React.FC<{ size?: number }> = ({ size = 28 }) => (
	<svg width={size} height={size} viewBox="0 0 28 28" fill="none">
		<path d="M14 0C6.268 0 0 6.268 0 14s6.268 14 14 14 14-6.268 14-14S21.732 0 14 0z" fill="#4D6BFE" />
		<path
			d="M8.4 18.2c1.2 1.6 3.2 2.8 5.6 2.8 3.6 0 6.4-2.4 6.4-5.6 0-2-1.2-3.6-2.8-4.4.4-.8.8-1.6.8-2.4 0-2.4-2-4.4-4.4-4.4-1.6 0-3.2.8-4 2.4"
			stroke="#fff"
			strokeWidth="1.6"
			strokeLinecap="round"
			fill="none"
		/>
	</svg>
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
		return <code className="ds-inline-code">{children}</code>;
	}
	const language = lang || 'text';
	return (
		<div className="ds-code-block">
			<div className="ds-code-header">
				<span className="ds-code-lang">{language}</span>
				<button
					type="button"
					className="ds-code-copy"
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
				customStyle={{
					margin: 0,
					borderRadius: '0 0 12px 12px',
					padding: '16px',
					fontSize: '14px',
					lineHeight: '1.6'
				}}
				wrapLongLines>
				{codeStr}
			</SyntaxHighlighter>
		</div>
	);
};

// ---- 用户消息组件 ----
const UserMessage: React.FC<{ msg: Message; onCopy: (c: string) => void }> = ({ msg, onCopy }) => (
	<div className="ds-message ds-message--user">
		<div className="ds-message-actions">
			<Tooltip title="复制">
				<button type="button" className="ds-action-icon" onClick={() => onCopy(msg.content)} aria-label="复制">
					<CopyOutlined />
				</button>
			</Tooltip>
			<Tooltip title="编辑">
				<button type="button" className="ds-action-icon" aria-label="编辑">
					<EditOutlined />
				</button>
			</Tooltip>
		</div>
		<div className="ds-user-bubble">{msg.content}</div>
	</div>
);

// ---- AI 消息组件 ----
const AiMessage: React.FC<{
	msg: Message;
	onCopy: (c: string) => void;
	onRegen: () => void;
	onFeedback: (id: string, fb: 'like' | 'dislike') => void;
}> = ({ msg, onCopy, onRegen, onFeedback }) => (
	<div className="ds-message ds-message--ai">
		{msg.status === 'loading' && !msg.content ? (
			<div className="ds-typing">
				<span />
				<span />
				<span />
			</div>
		) : (
			<div className="ds-ai-content">
				<XMarkdown
					className="ds-markdown"
					paragraphTag="div"
					components={{ code: CodeBlock }}
					streaming={msg.status === 'loading' ? { hasNextChunk: true, enableAnimation: true } : undefined}>
					{msg.content}
				</XMarkdown>
			</div>
		)}
		{msg.status !== 'loading' && (
			<div className="ds-ai-actions">
				<div className="ds-ai-actions-left">
					<Tooltip title="复制">
						<button type="button" className="ds-action-icon" onClick={() => onCopy(msg.content)} aria-label="复制">
							<CopyOutlined />
						</button>
					</Tooltip>
					<Tooltip title="重新生成">
						<button type="button" className="ds-action-icon" onClick={onRegen} aria-label="重新生成">
							<RedoOutlined />
						</button>
					</Tooltip>
					<Tooltip title="有帮助">
						<button
							type="button"
							className={`ds-action-icon ${msg.feedback === 'like' ? 'active' : ''}`}
							onClick={() => onFeedback(msg.id, 'like')}
							aria-label="有帮助">
							<LikeOutlined />
						</button>
					</Tooltip>
					<Tooltip title="没帮助">
						<button
							type="button"
							className={`ds-action-icon ${msg.feedback === 'dislike' ? 'active' : ''}`}
							onClick={() => onFeedback(msg.id, 'dislike')}
							aria-label="没帮助">
							<DislikeOutlined />
						</button>
					</Tooltip>
					<Tooltip title="分享">
						<button type="button" className="ds-action-icon" aria-label="分享">
							<ShareAltOutlined />
						</button>
					</Tooltip>
				</div>
			</div>
		)}
	</div>
);

// ---- 主组件 ----
const IndependentChat: React.FC = () => {
	const [messageApi, contextHolder] = message.useMessage();
	const [inputValue, setInputValue] = useState('');
	const [showSidebar, setShowSidebar] = useState(true);
	const [loading, setLoading] = useState(false);
	const [deepThink, setDeepThink] = useState(false);
	const [smartSearch, setSmartSearch] = useState(false);
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
		if (loading) return; // 流式输出期间不从 conversations 同步，避免覆盖
		const c = conversations.find((x) => x.key === activeKey);
		if (c) setMessages(c.messages);
	}, [activeKey, conversations, loading]);

	useEffect(() => {
		if (scrollRef.current) {
			scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
		}
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
				if (!list.length) {
					newChat();
				} else {
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
	const activeConv = conversations.find((c) => c.key === activeKey);

	// ---- 输入框组件 ----
	const renderInputBox = () => (
		<div className="input-box">
			<textarea
				ref={taRef}
				className="input-textarea"
				placeholder="给 DeepSeek 发送消息"
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
			<div className="input-bottom-bar">
				<div className="bottom-left">
					<button type="button" className={`toggle-btn ${deepThink ? 'active' : ''}`} onClick={() => setDeepThink(!deepThink)}>
						<ThunderboltOutlined />
						<span>深度思考</span>
					</button>
					<button type="button" className={`toggle-btn ${smartSearch ? 'active' : ''}`} onClick={() => setSmartSearch(!smartSearch)}>
						<GlobalOutlined />
						<span>智能搜索</span>
					</button>
				</div>
				<div className="bottom-right">
					<Tooltip title="上传文件">
						<button type="button" className="attach-btn" aria-label="附件">
							<PaperClipOutlined />
						</button>
					</Tooltip>
					{loading ? (
						<Tooltip title="停止生成">
							<button
								type="button"
								className="send-btn stop"
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
						<Tooltip title="发送">
							<button
								type="button"
								className={`send-btn ${inputValue.trim() ? '' : 'disabled'}`}
								disabled={!inputValue.trim()}
								onClick={() => onSubmit(inputValue)}
								aria-label="发送">
								<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
									<path
										d="M8.3125 0.9816C8.6677 1.0545 8.979 1.2056 9.2627 1.4337C9.4872 1.6144 9.7303 1.8593 9.9795 2.1085L14.707 6.8361L13.293 8.2501L9 3.9572V15.0431H7V3.9572L2.707 8.2501L1.293 6.8361L6.0205 2.1085C6.2697 1.8593 6.5128 1.6144 6.7373 1.4337C6.9766 1.2413 7.2845 1.0454 7.6875 0.9816C7.8973 0.9484 8.1031 0.9566 8.3125 0.9816Z"
										fill="currentColor"
									/>
								</svg>
							</button>
						</Tooltip>
					)}
				</div>
			</div>
		</div>
	);

	return (
		<div className={`deepseek-chat ${showSidebar ? 'sidebar-open' : 'sidebar-closed'}`}>
			{contextHolder}

			{/* 侧边栏 */}
			<div className="chat-sidebar">
				<div className="sidebar-header">
					<div className="logo">
						<DeepSeekLogo size={24} />
						<span>deepseek</span>
					</div>
					<button type="button" className="sidebar-collapse-btn" onClick={() => setShowSidebar(false)} aria-label="收起侧边栏">
						<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
							<rect x="2" y="2" width="5" height="12" rx="1" stroke="currentColor" strokeWidth="1.2" fill="none" />
							<rect x="9" y="2" width="5" height="12" rx="1" stroke="currentColor" strokeWidth="1.2" fill="none" />
						</svg>
					</button>
				</div>

				<button type="button" className="new-chat-btn" onClick={newChat}>
					<PlusOutlined />
					<span>开启新对话</span>
				</button>

				<div className="conversations-list">
					{Object.entries(grouped).map(([group, convs]) => (
						<div key={group} className="conversation-group">
							<div className="group-title">{group}</div>
							{convs.map((conv) => (
								<Dropdown key={conv.key} menu={{ items: menuItems(conv) }} trigger={['contextMenu']}>
									<div className={`conversation-item ${conv.key === activeKey ? 'active' : ''}`} onClick={() => setActiveKey(conv.key)}>
										<span className="conversation-label">{conv.label}</span>
										<Dropdown menu={{ items: menuItems(conv) }} trigger={['click']}>
											<button type="button" className="conversation-more" aria-label="更多" onClick={(e) => e.stopPropagation()}>
												<MoreOutlined />
											</button>
										</Dropdown>
									</div>
								</Dropdown>
							))}
						</div>
					))}
				</div>

				<div className="sidebar-footer">
					<div className="user-info">
						<div className="user-avatar-small">
							<UserOutlined />
						</div>
						<span className="user-name">Lǚyán</span>
						<button type="button" className="user-more" aria-label="设置">
							<MoreOutlined />
						</button>
					</div>
				</div>
			</div>

			{/* 主区域 */}
			<div className="chat-main">
				{/* 顶部栏 */}
				<div className="top-bar">
					<div className="top-bar-left">
						{!showSidebar && (
							<>
								<DeepSeekLogo size={28} />
								<button type="button" className="top-icon-btn" onClick={() => setShowSidebar(true)} aria-label="打开侧边栏">
									<svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
										<rect x="2" y="2" width="5" height="12" rx="1" stroke="currentColor" strokeWidth="1.2" fill="none" />
										<rect x="9" y="2" width="5" height="12" rx="1" stroke="currentColor" strokeWidth="1.2" fill="none" />
									</svg>
								</button>
								<button type="button" className="top-icon-btn" onClick={newChat} aria-label="新对话">
									<PlusOutlined />
								</button>
							</>
						)}
					</div>
					{messages.length > 0 && (
						<>
							<div className="top-bar-center">
								<span className="conv-title">{activeConv?.label || ''}</span>
							</div>
							<div className="top-bar-right">
								<button type="button" className="top-icon-btn" aria-label="分享">
									<ShareAltOutlined />
								</button>
							</div>
						</>
					)}
				</div>

				<div className="chat-content">
					{messages.length > 0 ? (
						<div className="messages-scroll" ref={scrollRef}>
							<div className="messages-inner">
								{messages.map((m, idx) =>
									m.role === 'user' ? (
										<UserMessage key={m.id} msg={m} onCopy={handleCopy} />
									) : (
										<AiMessage key={m.id} msg={m} onCopy={handleCopy} onRegen={() => handleRegen(idx)} onFeedback={handleFeedback} />
									)
								)}
							</div>
							{/* 底部输入区域（在滚动流内） */}
							<div className="conv-input-area">
								{renderInputBox()}
								<div className="disclaimer">内容由 AI 生成，请仔细甄别</div>
							</div>
						</div>
					) : (
						<div className="welcome-container">
							<div className="welcome-content">
								<div className="welcome-header">
									<DeepSeekLogo size={36} />
									<h1 className="welcome-title">今天有什么可以帮到你？</h1>
								</div>
								{renderInputBox()}
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

export default IndependentChat;
