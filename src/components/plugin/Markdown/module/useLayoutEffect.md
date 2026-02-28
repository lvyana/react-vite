# 1、useLayoutEffect 基本介绍
useLayoutEffect 是 useEffect 的一个版本，在浏览器重新绘制屏幕之前触发，用于需要同步测量或修改 DOM 的场景。

&nbsp;

# 2、useLayoutEffect vs useEffect
1. useLayoutEffect 在 DOM 更新后同步执行，阻塞浏览器绘制
2. useEffect 在浏览器绘制后异步执行，不阻塞绘制
3. useLayoutEffect 适合需要读取 DOM 布局并同步重新渲染的场景
4. 大多数情况下应该使用 useEffect

&nbsp;

# 3、代码示例
```javascript
import { useLayoutEffect, useRef, useState } from 'react';

export default function Tooltip() {
  const ref = useRef(null);
  const [tooltipHeight, setTooltipHeight] = useState(0);

  useLayoutEffect(() => {
    // 在浏览器绘制前测量 DOM
    const { height } = ref.current.getBoundingClientRect();
    setTooltipHeight(height);
  }, []);

  return (
    <div ref={ref} style={{ position: 'absolute', top: -tooltipHeight }}>
      Tooltip content
    </div>
  );
}
```

&nbsp;

# 4、使用场景
- 测量 DOM 元素尺寸或位置
- 在渲染前同步更新 DOM
- 避免闪烁（如 tooltip 定位）
- 需要在浏览器绘制前执行的操作

&nbsp;

# 5、注意事项
- 会阻塞浏览器绘制，影响性能
- 服务端渲染时会有警告
- 优先考虑使用 useEffect
