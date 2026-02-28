# 1、useRef 基本介绍
useRef 是一个 React Hook，返回一个可变的 ref 对象，其 .current 属性被初始化为传入的参数。返回的 ref 对象在组件的整个生命周期内保持不变。

&nbsp;

# 2、useRef 主要用途
1. 访问 DOM 元素
2. 保存任何可变值
3. 不会触发重新渲染
4. 在渲染之间保持数据

&nbsp;

# 3、代码示例
```javascript
import { useRef, useEffect } from 'react';

function TextInput() {
  const inputRef = useRef(null);

  useEffect(() => {
    // 组件挂载后自动聚焦
    inputRef.current.focus();
  }, []);

  return <input ref={inputRef} type="text" />;
}

function Timer() {
  const intervalRef = useRef(null);
  const [count, setCount] = useState(0);

  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
  };

  return (
    <>
      <p>Count: {count}</p>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
    </>
  );
}
```

&nbsp;

# 4、useRef vs useState
- useRef 改变不会触发重新渲染
- useState 改变会触发重新渲染
- useRef 适合存储不影响视图的数据
- useState 适合存储影响视图的数据

&nbsp;

# 5、常见使用场景
- 访问 DOM 节点
- 保存定时器 ID
- 保存上一次的值
- 存储不需要触发渲染的数据
- 与第三方库集成

&nbsp;

# 6、注意事项
- 不要在渲染期间读取或写入 ref.current
- ref 的改变不会触发重新渲染
- 可以存储任何值，不仅限于 DOM 元素
