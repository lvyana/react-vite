# 1、useImperativeHandle 基本介绍
useImperativeHandle 是一个 React Hook，可以自定义通过 ref 暴露给父组件的实例值，通常与 forwardRef 一起使用。

&nbsp;

# 2、useImperativeHandle 使用场景
1. 限制父组件对子组件的访问
2. 只暴露特定的方法给父组件
3. 封装复杂的 DOM 操作
4. 提供更清晰的组件 API

&nbsp;

# 3、代码示例
```javascript
import { useRef, useImperativeHandle, forwardRef } from 'react';

const FancyInput = forwardRef((props, ref) => {
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    // 只暴露 focus 方法
    focus: () => {
      inputRef.current.focus();
    },
    // 自定义方法
    scrollIntoView: () => {
      inputRef.current.scrollIntoView();
    }
  }));

  return <input ref={inputRef} />;
});

function Parent() {
  const inputRef = useRef();

  return (
    <>
      <FancyInput ref={inputRef} />
      <button onClick={() => inputRef.current.focus()}>
        Focus input
      </button>
    </>
  );
}
```

&nbsp;

# 4、注意事项
- 尽量避免使用 ref，优先使用 props
- 只在必要时暴露命令式方法
- 配合 forwardRef 使用
- 可以用于封装第三方库组件
