# 1、useReducer 基本介绍
useReducer 是一个 React Hook，用于管理复杂的状态逻辑，是 useState 的替代方案，特别适合状态逻辑复杂或下一个状态依赖于之前状态的场景。

&nbsp;

# 2、useReducer vs useState
1. useState 适合简单状态
2. useReducer 适合复杂状态逻辑
3. useReducer 可以更好地测试
4. useReducer 状态更新逻辑集中管理

&nbsp;

# 3、代码示例
```javascript
import { useReducer } from 'react';

// 定义 reducer 函数
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return { count: 0 };
    default:
      throw new Error('Unknown action type');
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>
        +
      </button>
      <button onClick={() => dispatch({ type: 'decrement' })}>
        -
      </button>
      <button onClick={() => dispatch({ type: 'reset' })}>
        Reset
      </button>
    </>
  );
}
```

&nbsp;

# 4、使用场景
- 状态逻辑复杂
- 多个子值的状态对象
- 下一个状态依赖于之前的状态
- 需要触发深层组件更新

&nbsp;

# 5、最佳实践
- Reducer 函数应该是纯函数
- 使用 action type 常量避免拼写错误
- 可以配合 useContext 实现状态管理
- 类似 Redux 的状态管理模式
