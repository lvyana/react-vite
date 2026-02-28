# 命名规范清理完成报告

## 执行时间
2026-02-28

## 清理内容

### 1. Hooks 命名统一（第一阶段）
**问题**: 项目中存在 `hooks/`、`useHooks/` 多种目录命名

**解决方案**:
- 统一所有 hooks 目录命名为 `hooks/`（无 use 前缀）
- 合并 `src/useHooks/*` 到 `src/hooks/`
- 重命名所有组件内部的 `useHooks/` 目录

**影响文件**: 46 个文件
- `src/useHooks/*` → `src/hooks/*`
- `src/layout/useHooks/*` → `src/layout/hooks/*`
- `src/views/antd/antTable/useHooks/*` → `src/views/antd/antTable/hooks/*`
- `src/views/antd/searchForm/useHooks/*` → `src/views/antd/searchForm/hooks/*`
- `src/views/plugin/dnd/useHooks/*` → `src/views/plugin/dnd/hooks/*`
- `AppForm/useHooks.tsx` → `AppForm/hooks/useForm.tsx`
- `AppModal/useHooks.tsx` → `AppModal/hooks/useModal.tsx`
- `AppTable/useHooks.tsx` → `AppTable/hooks/useTable.tsx`

**提交**: `ae327d1` - refactor: 统一 hooks 命名规范

### 2. 清理 I 前缀命名（第二阶段）
**问题**: 部分文件使用 `I` 前缀（旧的接口命名习惯）

**解决方案**:
- 移除所有不必要的 `I` 前缀
- 保留合理的命名（如 `IconFont`、`ImportJson`）

**影响文件**: 4 个文件
- `src/views/react/hooks/useContext/Icontext.tsx` → `context.tsx`
- `src/views/react/hooks/useContext/IuseReducer.tsx` → `useReducer.tsx`

**保留文件**（合理命名）:
- `src/utils/iconfont.tsx` - IconFont 组件
- `src/views/plugin/dnd/components/ImportJson.tsx` - Import 动词

### 3. 重构 Router Hooks
**问题**: `src/router/useHooks.tsx` 命名不够具体

**解决方案**:
- 创建 `src/router/hooks/` 目录
- 重命名为 `useRouter.tsx`

**影响文件**: 2 个文件
- `src/router/useHooks.tsx` → `src/router/hooks/useRouter.tsx`
- `src/router/auth.tsx` - 更新导入路径
- `src/layout/menu/LeftMenu.tsx` - 更新导入路径

### 4. 重构 EditPersonnel Hooks
**问题**: `useApiHooks.tsx` 命名冗余

**解决方案**:
- 创建 `hooks/` 子目录
- 重命名为更具体的 `useEditPersonnel.tsx`

**影响文件**: 2 个文件
- `src/views/toDay/components/editPersonnel/useApiHooks.tsx` → `hooks/useEditPersonnel.tsx`
- `src/views/toDay/components/editPersonnel/index.tsx` - 更新导入路径

**提交**: `37dff97` - refactor: 清理剩余命名不规范文件

## 命名规范总结

### Hooks 命名规范
1. **目录命名**: 使用 `hooks/`（无 use 前缀）
2. **文件命名**: 使用 `use` + 功能描述（如 `useForm.tsx`、`useRouter.tsx`）
3. **组织结构**:
   ```
   src/
   ├── hooks/              # 全局 hooks
   ├── components/
   │   └── AppForm/
   │       └── hooks/      # 组件专用 hooks
   └── views/
       └── someView/
           └── hooks/      # 视图专用 hooks
   ```

### 文件命名规范
1. **移除 I 前缀**: 不再使用 `I` 作为接口或文件前缀
2. **组件命名**: 使用 PascalCase（如 `ImportJson.tsx`）
3. **工具文件**: 使用 camelCase（如 `iconfont.tsx`）

## 验证结果
- ✅ TypeScript 类型检查通过
- ✅ 所有导入路径已更新
- ✅ 无编译错误
- ✅ 命名规范统一

## 相关文档
- [Hooks 命名提案](../../HOOKS_NAMING_PROPOSAL.md)
- [组件重构总结](../../COMPONENT_FIX_SUMMARY.md)
- [最终修复总结](../../FINAL_FIX_SUMMARY.md)
