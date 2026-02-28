# 1、useDeferredValue 基本介绍
useDeferredValue 是一个 React Hook，可以让你延迟更新 UI 的某些部分，优先处理更重要的更新。

&nbsp;

# 2、useDeferredValue 特点
1. 延迟更新非关键 UI 部分
2. 在后台准备新内容时显示旧内容
3. 自动适应用户设备性能
4. 不会阻塞用户输入

&nbsp;

# 3、代码示例
```javascript
import { useState, useDeferredValue } from 'react';

function SearchPage() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);

  return (
    <>
      <input 
        value={query} 
        onChange={e => setQuery(e.target.value)} 
      />
      <SearchResults query={deferredQuery} />
    </>
  );
}

function SearchResults({ query }) {
  // 使用延迟的 query 进行搜索
  // 输入时不会阻塞，搜索结果延迟更新
  return <div>Results for: {query}</div>;
}
```

&nbsp;

# 4、使用场景
- 搜索框实时搜索
- 大列表过滤
- 复杂计算结果展示
- 需要保持输入流畅的场景

&nbsp;

# 5、与 debounce 的区别
- useDeferredValue 是 React 内置的，会自动适应设备性能
- debounce 需要手动设置延迟时间
- useDeferredValue 不会丢弃任何更新
