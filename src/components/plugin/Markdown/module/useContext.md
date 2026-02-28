# 1、useContext 基本介绍
useContext 是一个 React Hook，让你可以读取和订阅组件中的 context，避免通过 props 逐层传递数据。

&nbsp;

# 2、useContext 使用场景
1. 跨多层组件传递数据
2. 主题切换（如深色/浅色模式）
3. 用户认证信息
4. 语言国际化

&nbsp;

# 3、代码示例
```javascript
import { createContext, useContext } from 'react';

// 创建 Context
const ThemeContext = createContext('light');

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar() {
  return <ThemedButton />;
}

function ThemedButton() {
  // 使用 useContext 读取 context
  const theme = useContext(ThemeContext);
  return <button className={theme}>Button</button>;
}
```

&nbsp;

# 4、注意事项
- Context 值改变时，所有使用该 Context 的组件都会重新渲染
- 可以配合 useMemo 优化性能
- 不要过度使用，简单的 props 传递更清晰
