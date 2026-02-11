# React Query 迁移指南

## 已完成的迁移

### 1. 基础设置
- ✅ 安装 `@tanstack/react-query` 和 `@tanstack/react-query-devtools`
- ✅ 创建 QueryClient 配置 (`src/config/reactQuery.tsx`)
- ✅ 在 `src/index.tsx` 中添加 QueryClientProvider
- ✅ 创建通用 hooks (`src/hooks/useQueryRequest.ts`)

### 2. 已迁移的组件
- ✅ `src/views/messageCenter/index.tsx` - 简单的自动请求
- ✅ `src/views/toDay/components/dateAndPersonnel/Date.tsx` - 手动触发的请求

## 迁移模式

### 模式 1: 自动请求（原 useRequest 无 manual）
```typescript
// 之前 (ahooks)
const { data, loading } = useRequest(apiFunction, {
  onSuccess: (res) => {
    // 处理数据
  }
});

// 之后 (React Query)
const { data, isLoading } = useQuery({
  queryKey: ['uniqueKey'],
  queryFn: async () => {
    const res = await apiFunction();
    return res.data;
  },
  select: (data) => data.data
});
```

### 模式 2: 手动触发请求（原 useRequest with manual: true）
```typescript
// 之前 (ahooks)
const { run, loading } = useRequest(apiFunction, {
  manual: true,
  onSuccess: (res) => {
    // 处理数据
  }
});

// 之后 (React Query)
const { mutate: run, isPending: loading } = useMutation({
  mutationFn: apiFunction,
  onSuccess: (res) => {
    // 处理数据
  }
});
```

### 模式 3: 带防抖的请求（保留自定义 hooks）
```typescript
// 保持使用自定义的 useApi 和 useTableApi
// 这些 hooks 有特殊的防抖逻辑，暂不迁移
import useRequest from '@/useHooks/useApi';
```

## 待迁移的文件

### 高优先级（简单迁移）
- [ ] `src/views/toDay/components/dateAndPersonnel/TeamMembers.tsx`
- [ ] `src/views/toDay/components/dateAndPersonnel/index.tsx`
- [ ] `src/views/toDay/components/editPersonnel/useApiHooks.tsx`
- [ ] `src/views/plugin/dnd/useHooks/index.tsx`

### 低优先级（保留自定义 hooks）
- 保留 `src/useHooks/useApi.tsx` - 有防抖逻辑
- 保留 `src/useHooks/useTableApi.tsx` - 有表格特殊逻辑
- 保留 `src/views/antd/seachForm/useHooksApi.tsx` - 使用自定义 useApi

## React Query 优势

1. **自动缓存** - 相同的请求会自动使用缓存
2. **后台更新** - 数据过期后自动重新获取
3. **请求去重** - 多个组件请求相同数据时只发一次请求
4. **DevTools** - 强大的开发工具，可视化查看所有请求状态
5. **乐观更新** - 支持乐观更新 UI
6. **无限滚动** - 内置无限滚动支持

## 注意事项

1. `useQuery` 用于 GET 请求（自动执行）
2. `useMutation` 用于 POST/PUT/DELETE 或手动触发的请求
3. `queryKey` 必须唯一，用于缓存标识
4. 可以通过 `enabled` 选项控制是否自动执行
5. 使用 `select` 选项可以转换数据格式

## 迁移检查清单

- [ ] 所有 `useRequest` from 'ahooks' 已迁移
- [ ] 测试所有迁移的组件功能正常
- [ ] 检查 DevTools 中的请求状态
- [ ] 验证缓存策略是否符合预期
- [ ] 性能测试（网络请求次数是否减少）
