# 1、useEffect 基本介绍
useEffect 是一个 React Hook，用于在函数组件中执行副作用操作，如数据获取、订阅、手动修改 DOM 等。

&nbsp;

# 2、useEffect 执行时机
1. 组件挂载后执行
2. 依赖项变化时执行
3. 组件卸载前执行清理函数
4. 在浏览器绘制后异步执行

&nbsp;

# 3、代码示例
```javascript
import { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // 每次渲染后执行
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  // 仅在挂载和卸载时执行
  useEffect(() => {
    console.log('Component mounted');
    return () => {
      console.log('Component will unmount');
    };
  }, []);

  // 仅在 count 变化时执行
  useEffect(() => {
    console.log('Count changed:', count);
  }, [count]);

  return (
    <button onClick={() => setCount(count + 1)}>
      Click me
    </button>
  );
}
```

&nbsp;

# 4、常见使用场景
- 数据获取（API 调用）
- 订阅外部数据源
- 手动修改 DOM
- 设置定时器
- 添加事件监听器

&nbsp;

# 5、注意事项
- 依赖数组要包含所有使用的外部变量
- 清理函数用于取消订阅、清除定时器等
- 避免在 useEffect 中直接修改状态导致无限循环
- 异步操作需要处理组件卸载的情况
