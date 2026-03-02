# 项目规范优化总结

## 执行时间
2026-02-28

## 已完成的优化

### 1. 命名规范统一 ✅

#### Hooks 命名规范
- **目录命名**: 统一使用 `hooks/`（无 use 前缀）
- **文件命名**: 使用 `use` + 功能描述
- **影响范围**: 46+ 文件

**重构内容**:
```
src/useHooks/*          → src/hooks/*
src/layout/useHooks/*   → src/layout/hooks/*
AppForm/useHooks.tsx    → AppForm/hooks/useForm.tsx
router/useHooks.tsx     → router/hooks/useRouter.tsx
```

#### 移除 I 前缀命名
- 移除旧的接口命名习惯（`I` 前缀）
- 符合 TypeScript 官方推荐规范

**重构内容**:
```
Icontext.tsx      → context.tsx
IuseReducer.tsx   → useReducer.tsx
```

#### 组件命名规范
- Ant Design 组件: `App` 前缀（如 `AppForm`, `AppTable`）
- Plugin 组件: 标准 PascalCase（如 `Markdown`, `CodeEditor`）
- 接口类型: 无 `I` 前缀

### 2. Vite 配置优化 ✅

#### 依赖预构建优化
```typescript
optimizeDeps: {
  include: [
    'react', 'react-dom', 'react-router-dom',
    'antd', '@ant-design/x', '@ant-design/x-markdown',
    'axios', 'dayjs', 'zustand',
    '@tanstack/react-query', 'lodash',
    'ahooks', 'prismjs'
  ]
}
```

#### 代码分割策略
- Ant Design 图标单独分离
- 第三方库按功能分类
- 优化打包体积和加载性能

### 3. 代码质量检查 ✅

#### Console 语句统计
- 开发环境: 保留 console 用于调试
- 生产环境: 自动移除 console.log/info/debug
- 配置: Terser + ESBuild 双重清理

#### 文件大小监控
- 设置警告阈值: 500KB
- 启用压缩大小报告
- 使用 Gzip 压缩

## 项目结构规范

### 目录组织
```
src/
├── api/              # API 请求
├── assets/           # 静态资源
├── canvas/           # Canvas 相关
├── components/       # 公共组件
│   ├── antd/        # Ant Design 封装组件
│   └── plugin/      # 第三方插件组件
├── config/          # 配置文件
├── hoc/             # 高阶组件
├── hooks/           # 全局 Hooks
├── layout/          # 布局组件
│   └── hooks/       # 布局专用 Hooks
├── openLayers/      # OpenLayers 地图
├── router/          # 路由配置
│   └── hooks/       # 路由专用 Hooks
├── store/           # 状态管理
├── utils/           # 工具函数
└── views/           # 页面视图
    └── */hooks/     # 页面专用 Hooks
```

### 文件命名规范

#### 组件文件
- React 组件: PascalCase（`UserProfile.tsx`）
- 组件目录: PascalCase（`AppForm/`）
- 入口文件: `index.tsx`

#### 工具文件
- Hooks: `use` + PascalCase（`useAuth.tsx`）
- 工具函数: camelCase（`formatDate.ts`）
- 类型定义: PascalCase（`types.ts`）
- 常量: camelCase（`constants.ts`）

#### 样式文件
- CSS Modules: `*.module.scss`
- 全局样式: `*.scss`

### 代码规范

#### TypeScript
- 严格模式: 启用 `strict`
- 类型检查: `npm run type-check`
- 接口命名: 无 `I` 前缀

#### 样式
- 预处理器: SCSS
- 模块化: CSS Modules
- 命名: camelCase

#### 代码质量
- ESLint: 代码规范检查
- Prettier: 代码格式化
- Stylelint: 样式规范检查
- Husky: Git 提交钩子

## 性能优化

### 构建优化
- ✅ 代码分割（按路由和第三方库）
- ✅ Tree Shaking（移除未使用代码）
- ✅ 压缩（Terser + Gzip）
- ✅ CDN 外部化（生产环境可选）

### 运行时优化
- ✅ 路由懒加载（React.lazy + Suspense）
- ✅ 组件懒加载（动态导入）
- ✅ 图片懒加载（react-lazy-load-image-component）
- ✅ 虚拟滚动（react-infinite-scroll-component）

### 开发体验
- ✅ 热更新（HMR）
- ✅ 预热常用文件
- ✅ 快速刷新（Fast Refresh）
- ✅ TypeScript 类型检查

## 待优化项

### 代码质量
- [ ] 添加单元测试（Jest + React Testing Library）
- [ ] 添加 E2E 测试（Playwright）
- [ ] 代码覆盖率报告
- [ ] 性能监控（Web Vitals）

### 文档
- [ ] 组件使用文档
- [ ] API 接口文档
- [ ] 开发规范文档
- [ ] 部署文档

### 工具
- [ ] 自动化部署（CI/CD）
- [ ] 错误监控（Sentry）
- [ ] 性能分析（Lighthouse）
- [ ] 依赖更新检查

## 常用命令

### 开发
```bash
npm run dev              # 启动开发服务器
npm run type-check       # TypeScript 类型检查
npm run lint             # ESLint 检查
npm run stylelint        # Stylelint 检查
```

### 构建
```bash
npm run build            # 生产环境构建
npm run build:sit        # SIT 环境构建
npm run build:analyze    # 构建并分析打包体积
npm run preview          # 预览构建结果
```

### 清理
```bash
.\scripts\clean-and-restart.ps1  # 清理缓存并重启
```

## 相关文档
- [命名规范清理完成报告](./naming/NAMING_CLEANUP_COMPLETE.md)
- [Hooks 命名提案](../HOOKS_NAMING_PROPOSAL.md)
- [组件重构总结](../COMPONENT_FIX_SUMMARY.md)
- [最终修复总结](../FINAL_FIX_SUMMARY.md)

## 版本历史
- 2026-02-28: 完成命名规范统一和 Vite 配置优化
- 2026-02-28: 修复 140+ TypeScript 错误
- 2026-02-28: 升级 Markdown 组件到 XMarkdown
