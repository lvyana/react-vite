# 1、useInsertionEffect 基本介绍
useInsertionEffect 是一个专门用于 CSS-in-JS 库的 Hook，它在 DOM 变更之前同步触发，允许在布局效果读取之前插入样式。

&nbsp;

# 2、useInsertionEffect 特点
1. 在所有 DOM 变更之前同步触发
2. 主要用于动态注入样式规则
3. 不能在其中更新状态
4. 执行时机早于 useLayoutEffect

&nbsp;

# 3、代码示例
```javascript
import { useInsertionEffect } from 'react';

function useCSS(rule) {
  useInsertionEffect(() => {
    // 在这里插入 <style> 标签
    const style = document.createElement('style');
    style.textContent = rule;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  });
}

export default function App() {
  useCSS('.my-class { color: red; }');
  return <div className="my-class">Hello World</div>;
}
```

&nbsp;

# 4、注意事项
- 仅在需要动态插入样式时使用
- 不要在其中执行副作用或读取 DOM
- 普通应用开发很少需要使用此 Hook
