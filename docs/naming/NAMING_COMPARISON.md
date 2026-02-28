# 命名方案对比

## 📊 三种方案对比

### 方案对比表

| 方案 | 示例 | 优点 | 缺点 | 是否采用 |
|------|------|------|------|----------|
| **原方案（i前缀）** | `iButton`, `iCard` | 简短 | ❌ 不符合规范<br>❌ 语义不明 | ❌ 不推荐 |
| **直接移除前缀** | `Button`, `Card` | 简洁 | ❌ 与 Ant Design 冲突<br>❌ 无法共存 | ❌ 不可行 |
| **App前缀（推荐）** | `AppButton`, `AppCard` | ✅ 无冲突<br>✅ 语义清晰<br>✅ 易于理解 | 名称稍长 | ✅ **推荐** |

---

## 🔄 命名变化详解

### Ant Design 封装组件

#### 变化前（当前）
```typescript
// ❌ 使用 i 前缀（不规范）
import Ibutton from '@/antdComponents/iButton';
import Icard from '@/antdComponents/iCard';
import Itable from '@/antdComponents/iTable';
import Iform from '@/antdComponents/iForm';

// 使用
<Ibutton type="primary">提交</Ibutton>
<Icard title="标题">内容</Icard>
```

#### 变化后（推荐）
```typescript
// ✅ 使用 App 前缀（清晰、无冲突）
import AppButton from '@/components/antd/AppButton';
import AppCard from '@/components/antd/AppCard';
import AppTable from '@/components/antd/AppTable';
import AppForm from '@/components/antd/AppForm';

// 使用
<AppButton type="primary">提交</AppButton>
<AppCard title="标题">内容</AppCard>
```

#### 如果使用直接移除前缀（不推荐）
```typescript
// ❌ 会与 Ant Design 冲突！
import Button from '@/components/antd/Button';
import { Button } from 'antd';  // 命名冲突！

// 无法同时使用两个 Button
<Button />  // 这是哪个 Button？
```

---

## 💡 为什么选择 App 前缀？

### 1. 避免命名冲突

```typescript
// ✅ 使用 App 前缀 - 清晰无冲突
import AppButton from '@/components/antd/AppButton';
import AppCard from '@/components/antd/AppCard';
import { Button, Card, Form, Table } from 'antd';

// 可以同时使用自定义组件和原生组件
<AppButton permission="user:add">新增</AppButton>  // 自定义封装
<Button>取消</Button>                              // 原生组件
```

### 2. 语义清晰

```typescript
// App 前缀明确表示：这是应用级的封装组件
AppButton    // 应用的按钮组件（可能包含权限控制等）
AppTable     // 应用的表格组件（可能包含分页、搜索等）
AppForm      // 应用的表单组件（可能包含统一校验等）
```

### 3. 易于搜索和自动补全

```typescript
// 在 IDE 中输入 "App" 就能看到所有自定义组件
App...
  ├── AppButton
  ├── AppCard
  ├── AppTable
  ├── AppForm
  └── ...
```

---

## 📋 完整重命名对照表

### Ant Design 组件（28个）

| 序号 | 原名称 | 新名称 | 说明 |
|------|--------|--------|------|
| 1 | `iButton` | `AppButton` | 按钮组件 |
| 2 | `iCard` | `AppCard` | 卡片组件 |
| 3 | `iTable` | `AppTable` | 表格组件 |
| 4 | `iForm` | `AppForm` | 表单组件 |
| 5 | `iModal` | `AppModal` | 模态框组件 |
| 6 | `iInput` | `AppInput` | 输入框组件 |
| 7 | `iSelect` | `AppSelect` | 选择器组件 |
| 8 | `iPagination` | `AppPagination` | 分页组件 |
| 9 | `iUpload` | `AppUpload` | 上传组件 |
| 10 | `iDrawer` | `AppDrawer` | 抽屉组件 |
| 11 | `iDropdown` | `AppDropdown` | 下拉菜单组件 |
| 12 | `iCascader` | `AppCascader` | 级联选择组件 |
| 13 | `iCheckbox` | `AppCheckbox` | 复选框组件 |
| 14 | `iCollapse` | `AppCollapse` | 折叠面板组件 |
| 15 | `iEditHeader` | `AppEditHeader` | 编辑头部组件 |
| 16 | `iLoading` | `AppLoading` | 加载组件 |
| 17 | `iPicker` | `AppPicker` | 选择器组件 |
| 18 | `iRadio` | `AppRadio` | 单选框组件 |
| 19 | `iRate` | `AppRate` | 评分组件 |
| 20 | `iSearchForm` | `AppSearchForm` | 搜索表单组件 |
| 21 | `iSearchTag` | `AppSearchTag` | 搜索标签组件 |
| 22 | `iSlider` | `AppSlider` | 滑动输入条组件 |
| 23 | `iSwitch` | `AppSwitch` | 开关组件 |
| 24 | `iTooltip` | `AppTooltip` | 文字提示组件 |
| 25 | `iTour` | `AppTour` | 漫游式引导组件 |
| 26 | `iTree` | `AppTree` | 树形控件组件 |
| 27 | `iTreeSelect` | `AppTreeSelect` | 树选择组件 |
| 28 | `notFound` | `NotFound` | 404页面组件 |

### Plugin 组件（12个）

| 序号 | 原名称 | 新名称 | 说明 |
|------|--------|--------|------|
| 1 | `iAnimateComponent` | `AnimateComponent` | 动画组件 |
| 2 | `iCodeEditor` | `CodeEditor` | 代码编辑器 |
| 3 | `iCopy` | `Copy` | 复制组件 |
| 4 | `iEasyTyper` | `EasyTyper` | 打字机效果 |
| 5 | `iFullscreen` | `Fullscreen` | 全屏组件 |
| 6 | `iGridLayout` | `GridLayout` | 网格布局 |
| 7 | `iInfiniteScroll` | `InfiniteScroll` | 无限滚动 |
| 8 | `iInnerHTML` | `InnerHTML` | HTML渲染 |
| 9 | `iLoading` | `Loading` | 加载组件 |
| 10 | `iMarkdown` | `Markdown` | Markdown渲染 |
| 11 | `iResponsive` | `Responsive` | 响应式组件 |
| 12 | `iTransition` | `Transition` | 过渡动画 |

---

## 🔍 实际使用示例

### 示例 1：表单页面

#### 变化前
```typescript
import React from 'react';
import Iform from '@/antdComponents/iForm';
import Ibutton from '@/antdComponents/iButton';
import Iinput from '@/antdComponents/iInput';
import Iselect from '@/antdComponents/iSelect';

const UserForm = () => {
  return (
    <Iform>
      <Iinput placeholder="用户名" />
      <Iselect options={[]} />
      <Ibutton type="primary">提交</Ibutton>
    </Iform>
  );
};
```

#### 变化后
```typescript
import React from 'react';
import AppForm from '@/components/antd/AppForm';
import AppButton from '@/components/antd/AppButton';
import AppInput from '@/components/antd/AppInput';
import AppSelect from '@/components/antd/AppSelect';

const UserForm = () => {
  return (
    <AppForm>
      <AppInput placeholder="用户名" />
      <AppSelect options={[]} />
      <AppButton type="primary">提交</AppButton>
    </AppForm>
  );
};
```

---

### 示例 2：混合使用自定义和原生组件

```typescript
import React from 'react';
// 自定义封装组件（带权限控制）
import AppButton from '@/components/antd/AppButton';
import AppTable from '@/components/antd/AppTable';
// 原生 Ant Design 组件
import { Button, Space, Tag } from 'antd';

const UserList = () => {
  return (
    <div>
      {/* 使用自定义封装的按钮（带权限控制） */}
      <Space>
        <AppButton permission="user:add" type="primary">
          新增用户
        </AppButton>
        <AppButton permission="user:export">
          导出数据
        </AppButton>
        {/* 使用原生按钮（不需要权限控制） */}
        <Button>刷新</Button>
      </Space>

      {/* 使用自定义封装的表格（带分页、搜索等） */}
      <AppTable 
        columns={columns} 
        dataSource={data}
        pagination={true}
      />
    </div>
  );
};
```

---

### 示例 3：统一导入

```typescript
// ✅ 推荐：使用统一导出
import { 
  AppButton, 
  AppCard, 
  AppTable, 
  AppForm 
} from '@/components/antd';

// 或者单独导入
import AppButton from '@/components/antd/AppButton';
```

---

## 📁 目录结构变化

### 变化前
```
src/
├── antdComponents/          ❌ 命名不规范
│   ├── iButton/            ❌ i 前缀不规范
│   ├── iCard/
│   └── iTable/
├── pluginComponents/        ❌ 命名不规范
│   ├── iCodeEditor/        ❌ i 前缀不规范
│   └── iMarkdown/
└── ...
```

### 变化后
```
src/
├── components/              ✅ 统一的组件目录
│   ├── antd/               ✅ Ant Design 封装
│   │   ├── AppButton/      ✅ App 前缀，无冲突
│   │   ├── AppCard/
│   │   ├── AppTable/
│   │   └── index.ts        ✅ 统一导出
│   ├── plugin/             ✅ 插件组件
│   │   ├── CodeEditor/     ✅ 无前缀，不冲突
│   │   ├── Markdown/
│   │   └── index.ts
│   ├── business/           ✅ 业务组件（可选）
│   │   ├── UserCard/
│   │   └── DataTable/
│   └── common/             ✅ 通用组件（可选）
│       ├── ErrorBoundary/
│       └── Loading/
└── ...
```

---

## ⚡ 迁移步骤

### 步骤 1：运行检查脚本
```powershell
powershell -ExecutionPolicy Bypass -File scripts/check-naming.ps1
```

### 步骤 2：执行阶段一（修复拼写错误）
```powershell
powershell -ExecutionPolicy Bypass -File scripts/rename-phase1.ps1
```

### 步骤 3：执行阶段二（使用 App 前缀）
```powershell
powershell -ExecutionPolicy Bypass -File scripts/rename-phase2-safe.ps1
```

### 步骤 4：测试和验证
```bash
npm run dev
npm run lint
```

---

## 🎯 关键要点

### ✅ 推荐做法
1. 使用 `App` 前缀封装 Ant Design 组件
2. Plugin 组件直接使用语义化命名（不会冲突）
3. 业务组件使用业务语义命名
4. 统一使用 PascalCase 命名组件

### ❌ 避免做法
1. 不要直接使用 `Button`、`Card` 等与 Ant Design 冲突的名称
2. 不要使用无意义的前缀（如 `i`、`my`）
3. 不要混合使用不同的命名风格
4. 不要在同一文件中导入同名组件

---

## 📚 相关文档

- [NAMING_CONFLICT_SOLUTION.md](./NAMING_CONFLICT_SOLUTION.md) - 详细的冲突解决方案
- [FILE_NAMING_STANDARDS.md](./FILE_NAMING_STANDARDS.md) - 完整的命名规范
- [scripts/README.md](./scripts/README.md) - 脚本使用指南

---

**总结**：使用 `App` 前缀是最安全、最清晰的方案，既避免了与第三方库的命名冲突，又保持了代码的可读性和可维护性。

**创建时间**: 2026-02-28
