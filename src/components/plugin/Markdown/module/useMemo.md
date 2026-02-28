# 1、useMemo 基本介绍
useMemo 是一个 React Hook，用于缓存计算结果，只有在依赖项改变时才重新计算，避免每次渲染都执行昂贵的计算。

&nbsp;

# 2、useMemo 使用场景
1. 昂贵的计算操作
2. 避免子组件不必要的重新渲染
3. 引用相等性优化
4. 复杂数据转换

&nbsp;

# 3、代码示例
```javascript
import { useMemo, useState } from 'react';

function TodoList({ todos, filter }) {
  // 缓存过滤后的列表
  const filteredTodos = useMemo(() => {
    console.log('Filtering todos...');
    return todos.filter(todo => {
      if (filter === 'all') return true;
      if (filter === 'active') return !todo.completed;
      if (filter === 'completed') return todo.completed;
    });
  }, [todos, filter]);

  return (
    <ul>
      {filteredTodos.map(todo => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');

  return <TodoList todos={todos} filter={filter} />;
}
```

&nbsp;

# 4、useMemo vs useCallback
- useMemo 缓存计算结果（值）
- useCallback 缓存函数本身
- useCallback(fn, deps) 等价于 useMemo(() => fn, deps)

&nbsp;

# 5、注意事项
- 不要过度使用，简单计算不需要缓存
- 依赖数组要包含所有使用的变量
- 缓存本身也有开销
- 主要用于性能优化
