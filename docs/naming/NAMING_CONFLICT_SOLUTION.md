# 命名冲突解决方案

## 🚨 问题分析

你提出了一个非常重要的问题！如果我们将组件重命名为：
```typescript
// ❌ 这样会与 Ant Design 冲突！
import Button from '@/components/antd/Button';
import { Button } from 'antd';  // 命名冲突！
```

这会导致：
1. **导入冲突**：无法同时使用自定义组件和原生组件
2. **类型冲突**：TypeScript 类型定义冲突
3. **代码混淆**：不清楚使用的是哪个组件

---

## ✅ 推荐解决方案

### 方案一：保留前缀，但改进命名（推荐）

使用更有意义的前缀，而不是简单的 `i`：

#### 选项 1A：使用 `App` 前缀
```typescript
// 清晰表明这是应用级的封装组件
import AppButton from '@/components/antd/AppButton';
import AppCard from '@/components/antd/AppCard';
import AppTable from '@/components/antd/AppTable';

// 不会与 Ant Design 冲突
import { Button, Card, Table } from 'antd';
```

#### 选项 1B：使用 `Custom` 前缀
```typescript
import CustomButton from '@/components/antd/CustomButton';
import CustomCard from '@/components/antd/CustomCard';
import CustomTable from '@/components/antd/CustomTable';
```

#### 选项 1C：使用项目名称前缀（如 `Biz` - Business）
```typescript
import BizButton from '@/components/antd/BizButton';
import BizCard from '@/components/antd/BizCard';
import BizTable from '@/components/antd/BizTable';
```

---

### 方案二：使用命名空间导入

保持组件名称简洁，通过导入方式区分：

```typescript
// 使用命名空间
import * as AntdComponents from '@/components/antd';
import { Button, Card } from 'antd';

// 使用时
<AntdComponents.Button />  // 自定义组件
<Button />                  // 原生组件
```

---

### 方案三：使用别名导入

```typescript
// 为自定义组件使用别名
import { Button as AppButton } from '@/components/antd/Button';
import { Button } from 'antd';

// 使用时
<AppButton />  // 自定义组件
<Button />     // 原生组件
```

---

### 方案四：分层命名（最推荐）

根据组件的封装层次使用不同的命名策略：

```
src/components/
├── base/           # 基础组件（完全自定义，不依赖 UI 库）
│   ├── Button/
│   ├── Card/
│   └── Modal/
├── antd/           # Ant Design 封装组件（使用前缀）
│   ├── AppButton/
│   ├── AppCard/
│   └── AppTable/
├── business/       # 业务组件（复合组件）
│   ├── UserCard/
│   ├── DataTable/
│   └── SearchForm/
└── plugin/         # 插件组件
    ├── CodeEditor/
    ├── Markdown/
    └── GridLayout/
```

---

## 🎯 最终推荐方案

综合考虑，我推荐使用 **方案一（选项 1A）+ 方案四** 的组合：

### 新的命名规范

#### 1. Ant Design 封装组件
```
使用 App 前缀（表示应用级封装）
文件夹：PascalCase
文件：PascalCase

src/components/antd/
├── AppButton/
│   ├── AppButton.tsx
│   ├── AppButton.module.scss
│   ├── AppButton.types.ts
│   └── index.ts
├── AppCard/
├── AppTable/
├── AppForm/
└── AppModal/
```

#### 2. Plugin 组件
```
不需要前缀（不会冲突）
文件夹：PascalCase
文件：PascalCase

src/components/plugin/
├── CodeEditor/
├── Markdown/
├── GridLayout/
└── Fullscreen/
```

#### 3. 业务组件
```
使用业务语义命名（不会冲突）
文件夹：PascalCase
文件：PascalCase

src/components/business/
├── UserCard/
├── DataTable/
├── SearchBar/
└── ExportButton/
```

---

## 📋 更新后的重命名计划

### 阶段一：修复拼写错误（不变）

保持原计划，修复拼写错误。

---

### 阶段二：统一组件命名（修改）

#### 2.1 目录重组
```bash
src/antdComponents/ → src/components/antd/
src/pluginComponents/ → src/components/plugin/
```

#### 2.2 Ant Design 组件重命名（使用 App 前缀）
```
原名称              → 新名称
─────────────────────────────────────
iButton/           → AppButton/
iCard/             → AppCard/
iTable/            → AppTable/
iForm/             → AppForm/
iModal/            → AppModal/
iInput/            → AppInput/
iSelect/           → AppSelect/
iPagination/       → AppPagination/
iUpload/           → AppUpload/
iDrawer/           → AppDrawer/
iDropdown/         → AppDropdown/
iCascader/         → AppCascader/
iCheckbox/         → AppCheckbox/
iCollapse/         → AppCollapse/
iEditHeader/       → AppEditHeader/
iLoading/          → AppLoading/
iPicker/           → AppPicker/
iRadio/            → AppRadio/
iRate/             → AppRate/
iSearchForm/       → AppSearchForm/
iSearchTag/        → AppSearchTag/
iSlider/           → AppSlider/
iSwitch/           → AppSwitch/
iTooltip/          → AppTooltip/
iTour/             → AppTour/
iTree/             → AppTree/
iTreeSelect/       → AppTreeSelect/
notFound/          → NotFound/  (特殊页面组件)
```

#### 2.3 Plugin 组件重命名（移除 i 前缀）
```
原名称                  → 新名称
─────────────────────────────────────
iAnimateComponent/    → AnimateComponent/
iCodeEditor/          → CodeEditor/
iCopy/                → Copy/
iEasyTyper/           → EasyTyper/
iFullscreen/          → Fullscreen/
iGridLayout/          → GridLayout/
iInfiniteScroll/      → InfiniteScroll/
iInnerHTML/           → InnerHTML/
iLoading/             → Loading/
iMarkdown/            → Markdown/
iResponsive/          → Responsive/
iTransition/          → Transition/
```

---

## 💻 代码示例

### 使用 App 前缀后的导入

```typescript
// ✅ 清晰，无冲突
import AppButton from '@/components/antd/AppButton';
import AppCard from '@/components/antd/AppCard';
import AppTable from '@/components/antd/AppTable';
import { Button, Card, Table, Form } from 'antd';

// 使用自定义封装组件
<AppButton type="primary">提交</AppButton>
<AppCard title="用户信息">...</AppCard>
<AppTable columns={columns} dataSource={data} />

// 使用原生 Ant Design 组件
<Button>取消</Button>
<Card>...</Card>
<Table />
```

### 组件内部实现

```typescript
// src/components/antd/AppButton/AppButton.tsx
import React from 'react';
import { Button, ButtonProps } from 'antd';

interface AppButtonProps extends ButtonProps {
  // 扩展属性
  loading?: boolean;
  permission?: string;
}

const AppButton: React.FC<AppButtonProps> = ({ 
  permission, 
  ...props 
}) => {
  // 自定义逻辑：权限控制
  if (permission && !hasPermission(permission)) {
    return null;
  }

  // 使用原生 Button
  return <Button {...props} />;
};

export default AppButton;
```

---

## 🔄 更新重命名脚本

需要修改 `rename-phase2.ps1` 脚本：

```powershell
# 修改后的组件映射
$antdComponents = @(
    @{old="iButton"; new="AppButton"},
    @{old="iCard"; new="AppCard"},
    @{old="iTable"; new="AppTable"},
    @{old="iForm"; new="AppForm"},
    @{old="iModal"; new="AppModal"},
    # ... 其他组件
)
```

---

## 📊 方案对比

| 方案 | 优点 | 缺点 | 推荐度 |
|------|------|------|--------|
| **App 前缀** | ✅ 清晰表明应用级封装<br>✅ 无冲突<br>✅ 易于理解 | ⚠️ 名称稍长 | ⭐⭐⭐⭐⭐ |
| **Custom 前缀** | ✅ 明确表示自定义<br>✅ 无冲突 | ⚠️ 不够简洁 | ⭐⭐⭐⭐ |
| **Biz 前缀** | ✅ 简短<br>✅ 无冲突 | ⚠️ 语义不够明确 | ⭐⭐⭐ |
| **命名空间** | ✅ 保持组件名简洁 | ❌ 导入复杂<br>❌ 不够直观 | ⭐⭐ |
| **别名导入** | ✅ 灵活 | ❌ 每次都要写别名<br>❌ 不统一 | ⭐⭐ |
| **无前缀** | ✅ 简洁 | ❌ 会冲突<br>❌ 混淆 | ❌ |

---

## 🎨 其他命名建议

### 1. 如果你的项目有特定名称
假设项目叫 "AdminPro"：
```typescript
import ProButton from '@/components/antd/ProButton';
import ProCard from '@/components/antd/ProCard';
```

### 2. 如果强调是"增强版"
```typescript
import EnhancedButton from '@/components/antd/EnhancedButton';
import EnhancedCard from '@/components/antd/EnhancedCard';
```

### 3. 如果强调是"包装器"
```typescript
import ButtonWrapper from '@/components/antd/ButtonWrapper';
import CardWrapper from '@/components/antd/CardWrapper';
```

---

## ✅ 最终建议

### 推荐使用 `App` 前缀，原因：

1. **语义清晰**：明确表示这是应用级的封装组件
2. **简洁易记**：只有3个字母，不会太长
3. **行业惯例**：很多项目使用类似命名（如 Ant Design Pro）
4. **无冲突**：完全避免与第三方库冲突
5. **易于搜索**：在 IDE 中输入 `App` 就能找到所有自定义组件

### 目录结构
```
src/components/
├── antd/              # Ant Design 封装（使用 App 前缀）
│   ├── AppButton/
│   ├── AppCard/
│   └── AppTable/
├── plugin/            # 插件组件（无前缀，不冲突）
│   ├── CodeEditor/
│   ├── Markdown/
│   └── GridLayout/
├── business/          # 业务组件（语义命名，不冲突）
│   ├── UserCard/
│   ├── DataTable/
│   └── SearchBar/
└── common/            # 通用组件
    ├── ErrorBoundary/
    ├── Loading/
    └── Empty/
```

---

## 🔧 需要更新的文件

我会创建新的重命名脚本：
1. `rename-phase2-safe.ps1` - 使用 App 前缀的安全重命名
2. 更新 `FILE_NAMING_STANDARDS.md`
3. 更新 `NAMING_REFACTOR_SUMMARY.md`

---

## 💡 额外建议

### 1. 创建统一的导出文件
```typescript
// src/components/antd/index.ts
export { default as AppButton } from './AppButton';
export { default as AppCard } from './AppCard';
export { default as AppTable } from './AppTable';
// ...

// 使用时
import { AppButton, AppCard, AppTable } from '@/components/antd';
```

### 2. 添加 TypeScript 类型导出
```typescript
// src/components/antd/index.ts
export type { AppButtonProps } from './AppButton';
export type { AppCardProps } from './AppCard';
```

### 3. 创建组件文档
```typescript
// src/components/antd/AppButton/README.md
# AppButton 组件

基于 Ant Design Button 的封装，增加了权限控制等功能。

## 使用示例
\`\`\`tsx
import AppButton from '@/components/antd/AppButton';

<AppButton permission="user:add">新增用户</AppButton>
\`\`\`
```

---

**结论**：使用 `App` 前缀是最安全、最清晰的方案，既避免了命名冲突，又保持了代码的可读性。

你觉得这个方案如何？需要我创建更新后的重命名脚本吗？
