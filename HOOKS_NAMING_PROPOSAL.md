# Hooks 命名统一方案

## 当前问题

项目中存在多种 hooks 相关的命名方式，不够统一：

### 1. 目录命名混乱
- ✅ `src/hooks/` - 标准命名（推荐）
- ❌ `src/useHooks/` - 不规范（use 前缀应该用于 hook 函数，不是目录）
- ❌ `src/layout/useHooks/` - 不规范
- ❌ `src/views/antd/antTable/useHooks/` - 不规范
- ❌ `src/views/antd/searchForm/useHooks/` - 不规范
- ❌ `src/views/plugin/dnd/useHooks/` - 不规范

### 2. 文件命名混乱
- ✅ `useThemeHooks.tsx` - 可以接受（虽然有点冗余）
- ✅ `useHooks.tsx` - 可以接受
- ❌ `useHooksApi.tsx` - 不规范（应该是 useApi.tsx 或放在 hooks 目录）

## 推荐的命名规范

### 原则
1. **目录名**: 使用 `hooks`（复数，不带 use 前缀）
2. **文件名**: 使用 `use` 前缀 + 功能描述（驼峰命名）
3. **函数名**: 必须以 `use` 开头（React 规范）

### 目录结构建议

```
src/
├── hooks/                          # 全局通用 hooks
│   ├── useQueryRequest.ts
│   ├── useApi.tsx                  # 从 useHooks/useApi.tsx 移动
│   ├── useResize.tsx               # 从 useHooks/useResize.tsx 移动
│   └── ...
├── layout/
│   └── hooks/                      # 布局相关 hooks（不是 useHooks）
│       └── index.tsx
├── views/
│   ├── antd/
│   │   ├── antTable/
│   │   │   └── hooks/              # 页面级 hooks（不是 useHooks）
│   │   │       └── useTable.tsx
│   │   └── searchForm/
│   │       └── hooks/
│   │           ├── useTable.tsx
│   │           └── useApi.tsx      # 从 useHooksApi.tsx 重命名
│   └── plugin/
│       └── dnd/
│           └── hooks/
│               └── index.tsx
└── components/
    └── antd/
        ├── AppForm/
        │   └── hooks/              # 组件级 hooks（不是 useHooks.tsx）
        │       └── useForm.tsx
        └── AppTable/
            └── hooks/
                └── useTable.tsx
```

## 具体重构步骤

### 第一步：合并全局 hooks 目录

```bash
# 将 src/useHooks/ 的内容移动到 src/hooks/
src/useHooks/useApi.tsx          → src/hooks/useApi.tsx
src/useHooks/useResize.tsx       → src/hooks/useResize.tsx
src/useHooks/useCardGutter.tsx   → src/hooks/useCardGutter.tsx
# ... 其他文件
```

### 第二步：重命名目录

```bash
# 重命名所有 useHooks 目录为 hooks
src/layout/useHooks/             → src/layout/hooks/
src/views/antd/antTable/useHooks/    → src/views/antd/antTable/hooks/
src/views/antd/searchForm/useHooks/  → src/views/antd/searchForm/hooks/
src/views/plugin/dnd/useHooks/       → src/views/plugin/dnd/hooks/
```

### 第三步：重命名文件

```bash
# 组件级 hooks 文件
src/components/antd/AppForm/useHooks.tsx      → src/components/antd/AppForm/hooks/useForm.tsx
src/components/antd/AppModal/useHooks.tsx     → src/components/antd/AppModal/hooks/useModal.tsx
src/components/antd/AppTable/useHooks.tsx     → src/components/antd/AppTable/hooks/useTable.tsx

# 页面级 hooks 文件
src/views/antd/searchForm/useHooksApi.tsx     → src/views/antd/searchForm/hooks/useApi.tsx
```

### 第四步：更新所有导入路径

需要更新所有引用这些 hooks 的文件中的 import 语句。

## 命名规范总结

### ✅ 正确的命名

**目录**:
- `src/hooks/` - 全局 hooks
- `src/layout/hooks/` - 布局 hooks
- `src/views/xxx/hooks/` - 页面 hooks
- `src/components/xxx/hooks/` - 组件 hooks

**文件**:
- `useApi.tsx` - API 相关 hook
- `useTable.tsx` - 表格相关 hook
- `useForm.tsx` - 表单相关 hook
- `useResize.tsx` - 窗口大小 hook

**函数**:
```typescript
// ✅ 正确
export const useApi = () => { ... }
export const useTable = () => { ... }

// ❌ 错误
export const apiHook = () => { ... }
export const tableHook = () => { ... }
```

### ❌ 错误的命名

**目录**:
- `src/useHooks/` - ❌ 目录不应该有 use 前缀
- `src/layout/useHooks/` - ❌ 同上

**文件**:
- `useHooks.tsx` - ❌ 太泛化，应该具体描述功能
- `useHooksApi.tsx` - ❌ 冗余，应该是 useApi.tsx
- `hooks.tsx` - ❌ 文件名应该有 use 前缀

## 优先级建议

### 高优先级（影响代码可读性）
1. ✅ 合并 `src/useHooks/` 到 `src/hooks/`
2. ✅ 重命名 `useHooksApi.tsx` 为 `useApi.tsx`

### 中优先级（统一规范）
3. 重命名所有 `useHooks/` 目录为 `hooks/`
4. 将单文件 `useHooks.tsx` 改为 `hooks/` 目录结构

### 低优先级（可选优化）
5. 重命名 `useThemeHooks.tsx` 为 `useTheme.tsx`（去掉冗余的 Hooks 后缀）

## 实施建议

### 方案 A：一次性重构（推荐）
- 优点：彻底解决问题，代码更规范
- 缺点：改动较大，需要仔细测试
- 适用：有充足时间进行测试

### 方案 B：渐进式重构
- 优点：风险较小，可以逐步进行
- 缺点：过渡期会有新旧两种命名共存
- 适用：项目正在活跃开发中

### 方案 C：仅修复最明显的问题
- 优点：改动最小，风险最低
- 缺点：不能彻底解决问题
- 适用：时间紧迫，只想快速改进

## 建议采用方案

**推荐方案 A（一次性重构）**，因为：
1. 项目刚完成了大规模的组件命名重构，现在是统一 hooks 命名的好时机
2. 改动虽大但逻辑清晰，容易执行
3. 可以使用脚本自动化处理大部分工作
4. 一次性解决，避免技术债务累积

## 自动化脚本

可以编写 PowerShell 脚本来自动化大部分重命名工作：

```powershell
# 1. 移动文件
Move-Item "src/useHooks/*" "src/hooks/"

# 2. 重命名目录
Rename-Item "src/layout/useHooks" "hooks"
# ... 其他目录

# 3. 批量更新导入路径
# 使用正则表达式替换所有文件中的导入语句
```

---

**创建日期**: 2026-02-28  
**状态**: 提案待讨论  
**影响范围**: 约 30-40 个文件
