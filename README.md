# React Admin - Vite 版本

这是从 Create React App 迁移到 Vite 的版本。

## 主要变化

### 1. 构建工具
- ✅ 从 CRA (Create React App) 迁移到 Vite
- ✅ 更快的开发服务器启动速度
- ✅ 更快的热更新 (HMR)
- ✅ 更快的生产构建

### 2. 环境变量
- CRA: `process.env.REACT_APP_*`
- Vite: `import.meta.env.VITE_*`

环境变量文件：
- `.env.development` - 开发环境
- `.env.production` - 生产环境
- `.env.sit` - SIT 环境
- `.env.production-github` - GitHub Pages 部署

### 3. 配置文件
- ✅ `vite.config.ts` - Vite 配置
- ✅ `tsconfig.json` - TypeScript 配置（更新为 Vite 模式）
- ✅ 移除 `craco.config.js`
- ✅ 移除 `react-scripts` 依赖

### 4. 入口文件
- CRA: `public/index.html` 引用 `%PUBLIC_URL%`
- Vite: 根目录 `index.html` 引用 `/src/index.tsx`

## 安装依赖

```bash
yarn install
# 或
npm install
```

## 开发

```bash
yarn dev
# 或
npm run dev
```

服务器将在 http://localhost:3003 启动

## 类型检查

```bash
yarn type-check
```

## 构建

```bash
# 生产环境构建
yarn build

# SIT 环境构建
yarn build:sit

# GitHub Pages 构建
yarn build:github

# 构建并查看分析报告
yarn build:analyze
```

## 预览构建结果

```bash
yarn preview
```

## 性能对比

### 开发服务器启动
- CRA: ~30-60 秒
- Vite: ~2-5 秒 ⚡

### 热更新 (HMR)
- CRA: ~1-3 秒
- Vite: ~100-300 毫秒 ⚡

### 生产构建
- CRA: ~60-120 秒
- Vite: ~30-60 秒 ⚡

## 技术栈

- React 18.3.1
- TypeScript 5.7.3
- Vite 6.0.11
- React Query 5.90.21 (数据请求)
- Zustand 5.0.11 (状态管理)
- Ant Design 5.22.6
- React Router 6.29.0
- Tailwind CSS 3.3.2
- Sass 1.89.2

## 项目结构

```
react-pc-vite/
├── public/              # 静态资源
├── src/
│   ├── api/            # API 接口
│   ├── assets/         # 资源文件
│   ├── components/     # 公共组件
│   ├── config/         # 配置文件
│   ├── layout/         # 布局组件
│   ├── router/         # 路由配置
│   ├── store/          # Zustand 状态管理
│   ├── styles/         # 全局样式
│   ├── utils/          # 工具函数
│   ├── views/          # 页面组件
│   └── index.tsx       # 入口文件
├── index.html          # HTML 模板
├── vite.config.ts      # Vite 配置
├── tsconfig.json       # TypeScript 配置
└── package.json        # 项目依赖
```

## 注意事项

1. **环境变量前缀**：所有环境变量必须以 `VITE_` 开头才能在客户端代码中访问
2. **静态资源**：使用 `/` 开头的绝对路径引用 public 目录下的文件
3. **动态导入**：Vite 原生支持 ES 模块，动态导入更加高效
4. **CSS 预处理器**：Sass/SCSS 开箱即用，无需额外配置

## 迁移指南

如果你要从 CRA 版本迁移到 Vite 版本：

1. 更新环境变量：`REACT_APP_*` → `VITE_*`
2. 更新环境变量访问：`process.env.*` → `import.meta.env.*`
3. 移动 `public/index.html` 到根目录
4. 更新 HTML 中的变量：`%PUBLIC_URL%` → `/`
5. 安装 Vite 相关依赖
6. 更新构建脚本

## License

MIT
