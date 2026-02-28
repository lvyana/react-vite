# 快速修复建议

## 1. 修复缺失的 errorCode.ts 文件

创建 `src/utils/errorCode.ts`：

```typescript
/**
 * @file 错误码和错误处理
 * @author ly
 * @createDate 2026-02-28
 */
import { message } from 'antd';

// 错误码映射
export const errorCode: Record<number, string> = {
  400: '请求参数错误',
  401: '未授权，请重新登录',
  403: '拒绝访问',
  404: '请求的资源不存在',
  408: '请求超时',
  500: '服务器内部错误',
  501: '服务未实现',
  502: '网关错误',
  503: '服务不可用',
  504: '网关超时',
};

// 错误消息
export const messages = {
  networkError: '网络连接失败，请检查网络设置',
  timeout: '请求超时，请稍后重试',
  serverError: '服务器错误，请联系管理员',
  unauthorized: '登录已过期，请重新登录',
  forbidden: '您没有权限执行此操作',
  notFound: '请求的资源不存在',
};

// 登录失败处理
export const logonFailure = () => {
  message.error(messages.unauthorized);
  // 清除本地存储
  localStorage.clear();
  sessionStorage.clear();
  // 跳转到登录页
  setTimeout(() => {
    window.location.href = '/login';
  }, 1000);
};

// 错误处理函数
export const handleError = (error: any) => {
  if (error.response) {
    const { status, data } = error.response;
    const errorMessage = errorCode[status] || data?.message || messages.serverError;
    message.error(errorMessage);
    
    // 401 未授权
    if (status === 401) {
      logonFailure();
    }
  } else if (error.request) {
    // 请求已发出但没有收到响应
    message.error(messages.networkError);
  } else {
    // 其他错误
    message.error(error.message || messages.serverError);
  }
};
```

---

## 2. 优化 React Query 配置

修改 `src/config/reactQuery.tsx`：

```typescript
/**
 * @file React Query 配置优化
 * @author ly
 * @createDate 2024
 */
import { QueryClient } from '@tanstack/react-query';

// 根据数据类型设置不同的缓存策略
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 数据在5分钟内视为新鲜（根据业务调整）
      staleTime: 5 * 60 * 1000,
      // 缓存时间10分钟
      gcTime: 10 * 60 * 1000,
      // 失败后重试1次
      retry: 1,
      // 重试延迟
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      // 窗口重新获得焦点时不重新获取数据
      refetchOnWindowFocus: false,
      // 网络重新连接时重新获取数据
      refetchOnReconnect: true,
      // 组件挂载时不自动重新获取（如果数据已存在）
      refetchOnMount: false,
    },
    mutations: {
      // mutation 失败后不重试
      retry: 0,
      // mutation 错误处理
      onError: (error) => {
        console.error('Mutation error:', error);
      },
    },
  },
});

// 针对不同类型数据的查询配置
export const queryConfig = {
  // 静态数据（字典、配置等）- 长时间缓存
  static: {
    staleTime: 30 * 60 * 1000, // 30分钟
    gcTime: 60 * 60 * 1000,    // 1小时
  },
  // 用户数据 - 中等缓存
  user: {
    staleTime: 10 * 60 * 1000, // 10分钟
    gcTime: 20 * 60 * 1000,    // 20分钟
  },
  // 实时数据 - 短时间缓存
  realtime: {
    staleTime: 0,              // 立即过期
    gcTime: 1 * 60 * 1000,     // 1分钟
    refetchInterval: 30000,    // 30秒自动刷新
  },
  // 列表数据 - 标准缓存
  list: {
    staleTime: 5 * 60 * 1000,  // 5分钟
    gcTime: 10 * 60 * 1000,    // 10分钟
  },
};
```

---

## 3. 创建 ErrorBoundary 组件

创建 `src/components/ErrorBoundary/index.tsx`：

```typescript
/**
 * @file 错误边界组件
 * @author ly
 * @createDate 2026-02-28
 */
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Result, Button } from 'antd';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // 错误日志上报
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // 调用自定义错误处理
    this.props.onError?.(error, errorInfo);
    
    // TODO: 发送错误到日志服务
    // logErrorToService(error, errorInfo);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render() {
    if (this.state.hasError) {
      // 自定义错误UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // 默认错误UI
      return (
        <Result
          status="error"
          title="页面出错了"
          subTitle={
            import.meta.env.DEV
              ? this.state.error?.message
              : '抱歉，页面遇到了一些问题，请稍后重试'
          }
          extra={[
            <Button type="primary" key="home" onClick={() => (window.location.href = '/')}>
              返回首页
            </Button>,
            <Button key="retry" onClick={this.handleReset}>
              重试
            </Button>,
          ]}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```

---

## 4. 创建 Skeleton 骨架屏组件

创建 `src/components/Skeleton/index.tsx`：

```typescript
/**
 * @file 骨架屏组件
 * @author ly
 * @createDate 2026-02-28
 */
import React from 'react';
import { Skeleton, Card, Space } from 'antd';

// 表格骨架屏
export const TableSkeleton: React.FC<{ rows?: number }> = ({ rows = 5 }) => {
  return (
    <Space direction="vertical" style={{ width: '100%' }} size="middle">
      {Array.from({ length: rows }).map((_, index) => (
        <Skeleton key={index} active paragraph={{ rows: 1 }} />
      ))}
    </Space>
  );
};

// 表单骨架屏
export const FormSkeleton: React.FC<{ fields?: number }> = ({ fields = 4 }) => {
  return (
    <Space direction="vertical" style={{ width: '100%' }} size="large">
      {Array.from({ length: fields }).map((_, index) => (
        <Skeleton key={index} active paragraph={{ rows: 1 }} />
      ))}
    </Space>
  );
};

// 卡片骨架屏
export const CardSkeleton: React.FC<{ count?: number }> = ({ count = 3 }) => {
  return (
    <Space direction="horizontal" style={{ width: '100%' }} size="middle" wrap>
      {Array.from({ length: count }).map((_, index) => (
        <Card key={index} style={{ width: 300 }}>
          <Skeleton active />
        </Card>
      ))}
    </Space>
  );
};

// 详情页骨架屏
export const DetailSkeleton: React.FC = () => {
  return (
    <Card>
      <Skeleton active avatar paragraph={{ rows: 4 }} />
    </Card>
  );
};

export default {
  Table: TableSkeleton,
  Form: FormSkeleton,
  Card: CardSkeleton,
  Detail: DetailSkeleton,
};
```

---

## 5. 创建 NetworkStatus 网络状态组件

创建 `src/components/NetworkStatus/index.tsx`：

```typescript
/**
 * @file 网络状态监听组件
 * @author ly
 * @createDate 2026-02-28
 */
import React, { useEffect, useState } from 'react';
import { message } from 'antd';

const NetworkStatus: React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      message.success('网络已连接');
    };

    const handleOffline = () => {
      setIsOnline(false);
      message.error('网络已断开，请检查网络连接');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // 不渲染任何UI，只监听网络状态
  return null;
};

export default NetworkStatus;

// 自定义 Hook
export const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
};
```

---

## 6. 优化路由懒加载

修改 `src/router/index.tsx`：

```typescript
// ❌ 不推荐：直接导入
import Login from '@/views/login';
import ToDay from '@/views/toDay';

// ✅ 推荐：使用懒加载
const Login = lazy(() => import('@/views/login'));
const ToDay = lazy(() => import('@/views/toDay'));
const AsyncLayout = lazy(() => import('@/layout'));
```

---

## 7. 在 App 中使用 ErrorBoundary 和 NetworkStatus

修改 `src/index.tsx`：

```typescript
import ErrorBoundary from '@/components/ErrorBoundary';
import NetworkStatus from '@/components/NetworkStatus';

function render() {
  const container = document.querySelector('#root') as Element;
  const root = ReactDOM.createRoot(container);
  
  root.render(
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AntdConfig>
          <NetworkStatus />
          <RouterProvider router={router} />
        </AntdConfig>
        {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
```

---

## 8. 类型优化示例

修改 `src/api/request.ts`：

```typescript
// ❌ 避免使用 any
const processQueue = (error: any, token: string | null = null) => {
  // ...
};

// ✅ 使用具体类型
interface QueueItem {
  resolve: (value?: string | null) => void;
  reject: (reason?: Error) => void;
}

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }: QueueItem) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });
  failedQueue = [];
};
```

---

## 实施顺序

1. ✅ 创建 `errorCode.ts` 文件（立即）
2. ✅ 创建 `ErrorBoundary` 组件（立即）
3. ✅ 创建 `NetworkStatus` 组件（立即）
4. ✅ 优化 React Query 配置（立即）
5. ✅ 创建 Skeleton 组件（本周）
6. ✅ 优化路由懒加载（本周）
7. ✅ 类型优化（逐步进行）

这些修复可以立即提升项目的稳定性和用户体验！
