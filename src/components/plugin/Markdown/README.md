# Markdown 组件使用文档

统一的 Markdown 渲染组件，支持静态文件加载和 AI 流式输出。

## 功能特性

- ✅ 支持加载静态 markdown 文件
- ✅ 支持 AI 流式输出动画
- ✅ 内置代码高亮（基于 Prism）
- ✅ 代码块复制功能
- ✅ 完整的 Markdown 语法支持
- ✅ 自定义样式

## 使用方式

### 1. 静态 Markdown 文件加载

用于展示文档、教程等静态内容：

```tsx
import Markdown from '@/components/plugin/Markdown';

function DocPage() {
  return <Markdown url="useState.md" />;
}
```

### 2. AI 流式输出

用于 AI 对话、实时生成内容：

```tsx
import Markdown from '@/components/plugin/Markdown';

function ChatMessage({ content, isLoading }) {
  return (
    <Markdown 
      initContent={content} 
      streaming={isLoading}
      className="chat-markdown"
    />
  );
}
```

### 3. 直接传入内容

用于展示已有的 markdown 内容：

```tsx
import Markdown from '@/components/plugin/Markdown';

function Preview() {
  const content = `
# 标题
这是一段 **加粗** 的文本。

\`\`\`javascript
console.log('Hello World');
\`\`\`
  `;

  return <Markdown initContent={content} />;
}
```

## Props 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| url | string | '' | markdown 文件路径（相对于 module 目录） |
| initContent | string | '' | 初始内容或直接传入的 markdown 文本 |
| streaming | boolean | false | 是否启用流式输出动画 |
| className | string | '' | 自定义类名 |
| showCopyButton | boolean | true | 是否显示代码复制按钮 |

## 代码高亮

组件内置了代码高亮功能，支持多种编程语言：

\`\`\`typescript
// TypeScript 代码会自动高亮
interface User {
  name: string;
  age: number;
}
\`\`\`

\`\`\`python
# Python 代码也支持
def hello():
    print("Hello World")
\`\`\`

## 样式自定义

可以通过 className 传入自定义样式：

```tsx
<Markdown 
  initContent={content}
  className="my-custom-markdown"
/>
```

然后在你的样式文件中：

```scss
.my-custom-markdown {
  :global {
    h1 {
      color: #1890ff;
    }
  }
}
```

## 完整示例

### React Hooks 文档页面

```tsx
import Markdown from '@/components/plugin/Markdown';
import AppCard from '@/components/antd/AppCard';

function UseStatePage() {
  return (
    <AppCard>
      <Markdown url="useState.md" />
    </AppCard>
  );
}
```

### AI 对话界面

```tsx
import Markdown from '@/components/plugin/Markdown';

function AiMessage({ message, isLoading }) {
  return (
    <div className="ai-message">
      <Markdown 
        initContent={message.content}
        streaming={isLoading}
        className="ai-markdown"
      />
    </div>
  );
}
```

## 注意事项

1. **文件路径**: 使用 `url` 参数时，文件应放在 `src/components/plugin/Markdown/module/` 目录下
2. **流式输出**: 当 `streaming={true}` 时，需要不断更新 `initContent` 来实现流式效果
3. **性能优化**: 对于大量消息的场景，建议使用虚拟滚动
4. **代码复制**: 复制功能依赖浏览器的 Clipboard API

## 技术栈

- @ant-design/x-markdown - Markdown 渲染引擎
- react-syntax-highlighter - 代码高亮
- Prism - 语法高亮主题

## 更新日志

- 2026-02-28: 升级为统一组件，支持静态文件和流式输出
- 2026-02-28: 添加代码高亮和复制功能
- 2026-02-28: 优化样式和用户体验
