# 文件命名规范文档

## 📋 当前项目命名问题分析

### 🔴 发现的主要问题

#### 1. 命名风格不统一
- ❌ **PascalCase**: `List.tsx`, `Wrapper.tsx`, `Modal.tsx`, `TreeMenu.tsx`
- ❌ **camelCase**: `seachForm`, `antTable`, `dynamicform`
- ❌ **kebab-case**: 部分文件夹使用
- ❌ **混合使用**: 同一目录下存在不同命名风格

#### 2. 拼写错误
- ❌ `SeachForm.tsx` → 应该是 `SearchForm.tsx`
- ❌ `SeachStyle.tsx` → 应该是 `SearchStyle.tsx`
- ❌ `headSeach` → 应该是 `headSearch`
- ❌ `seachForm` → 应该是 `searchForm`

#### 3. 组件命名不规范
- ❌ `iButton`, `iCard`, `iTable` 等使用 `i` 前缀（不符合React规范）
- ❌ `Ibutton`, `Icollapse` 等首字母大写不一致
- ❌ `notFound` 应该是 `NotFound`

#### 4. 文件夹命名不统一
- ❌ `antdComponents` vs `pluginComponents` (应统一为 `components`)
- ❌ `useHooks` vs `hooks` (重复概念)
- ❌ `compoment` 拼写错误，应该是 `components`

#### 5. 文件后缀混乱
- ❌ `.tsx` 和 `.ts` 混用（部分工具文件使用 `.tsx`）
- ❌ `.module.scss` 和 `.scss` 混用

#### 6. 临时文件未清理
- ❌ `index copy.tsx` (fullscreen目录下)
- ❌ 数字命名的图片 `11.png`, `22.png` 等

---

## ✅ 统一命名规范

### 1. 文件命名规则

#### 1.1 React 组件文件
```
规则：PascalCase（大驼峰）
扩展名：.tsx

✅ 正确示例：
- Button.tsx
- UserProfile.tsx
- SearchForm.tsx
- DataTable.tsx

❌ 错误示例：
- button.tsx
- userProfile.tsx
- search-form.tsx
- iButton.tsx
```

#### 1.2 TypeScript 工具/配置文件
```
规则：camelCase（小驼峰）或 kebab-case（短横线）
扩展名：.ts

✅ 正确示例：
- request.ts
- errorCode.ts
- auth-service.ts
- api-client.ts

❌ 错误示例：
- Request.ts
- error_code.ts
- AuthService.ts
```

#### 1.3 Hooks 文件
```
规则：camelCase，以 use 开头
扩展名：.ts 或 .tsx（如果包含JSX）

✅ 正确示例：
- useAuth.ts
- useTableData.tsx
- usePermission.ts
- useDebounce.ts

❌ 错误示例：
- UseAuth.ts
- use-auth.ts
- authHook.ts
- theme.tsx (应该是 useTheme.tsx)
```

#### 1.4 样式文件
```
规则：与组件同名 或 kebab-case
扩展名：.module.scss（CSS Modules）或 .scss（全局样式）

✅ 正确示例：
- Button.module.scss (对应 Button.tsx)
- index.module.scss (对应 index.tsx)
- global.scss
- theme.scss

❌ 错误示例：
- button.scss (应该是 Button.module.scss)
- Index.module.scss
- STYLE.scss
```

#### 1.5 类型定义文件
```
规则：camelCase 或 与组件同名
扩展名：.ts 或 .d.ts

✅ 正确示例：
- types.ts
- Button.types.ts
- global.d.ts
- api.types.ts

❌ 错误示例：
- Types.ts
- button-types.ts
- type.ts (太通用)
```

#### 1.6 常量文件
```
规则：camelCase 或 UPPER_CASE
扩展名：.ts

✅ 正确示例：
- constants.ts
- API_CONSTANTS.ts
- config.ts

❌ 错误示例：
- Constant.ts
- CONSTANTS.ts (如果内容不全是常量)
```

#### 1.7 服务/API 文件
```
规则：camelCase，以 service 或 api 结尾
扩展名：.ts

✅ 正确示例：
- userService.ts
- authApi.ts
- request.ts

❌ 错误示例：
- UserService.ts
- service.ts (太通用)
- api.ts (太通用)
```

### 2. 文件夹命名规则

#### 2.1 组件文件夹
```
规则：PascalCase（与组件名一致）

✅ 正确示例：
src/components/
  ├── Button/
  │   ├── Button.tsx
  │   ├── Button.module.scss
  │   ├── Button.types.ts
  │   └── index.ts
  ├── UserProfile/
  └── SearchForm/

❌ 错误示例：
src/components/
  ├── button/
  ├── iButton/
  └── user-profile/
```

#### 2.2 功能模块文件夹
```
规则：camelCase 或 kebab-case

✅ 正确示例：
src/
  ├── components/
  ├── hooks/
  ├── utils/
  ├── services/
  ├── store/
  ├── types/
  ├── constants/
  └── config/

❌ 错误示例：
src/
  ├── Components/
  ├── useHooks/ (重复概念)
  ├── Utils/
  └── antdComponents/ (应该是 components/antd/)
```

#### 2.3 页面文件夹
```
规则：kebab-case 或 camelCase

✅ 正确示例：
src/views/
  ├── user-management/
  ├── login/
  ├── home/
  └── system-settings/

❌ 错误示例：
src/views/
  ├── UserManagement/
  ├── Login/
  └── toDay/ (应该是 today/)
```

### 3. 特殊文件命名

#### 3.1 入口文件
```
✅ 统一使用：
- index.tsx (组件入口)
- index.ts (模块入口)
- main.tsx (应用入口，Vite项目)
- App.tsx (根组件)
```

#### 3.2 配置文件
```
✅ 正确示例：
- vite.config.ts
- tsconfig.json
- .eslintrc.js
- .prettierrc.cjs

❌ 错误示例：
- viteConfig.ts
- Vite.config.ts
```

#### 3.3 测试文件
```
规则：与被测试文件同名，添加 .test 或 .spec

✅ 正确示例：
- Button.test.tsx
- utils.spec.ts
- useAuth.test.ts

❌ 错误示例：
- ButtonTest.tsx
- test-utils.ts
```

---

## 🔄 项目重命名计划

### 阶段一：修复拼写错误（高优先级）

```bash
# 1. 修复 Seach → Search
src/antdComponents/iTable/components/headSeach/ → headSearch/
src/antdComponents/iTable/components/headSeach/SeachStyle.tsx → SearchStyle.tsx
src/views/antd/seachForm/ → searchForm/
src/views/antd/antTable/components/SeachForm.tsx → SearchForm.tsx
src/views/antd/seachForm/components/SeachForm.tsx → SearchForm.tsx

# 2. 修复 compoment → components
src/layout/header/messageCenter/compoment/ → components/

# 3. 删除临时文件
src/layout/header/fullscreen/index copy.tsx → 删除
```

### 阶段二：统一组件命名（中优先级）

```bash
# 1. 重命名 antdComponents 为 components/antd
src/antdComponents/ → src/components/antd/

# 2. 移除 i 前缀，统一使用 PascalCase
src/components/antd/iButton/ → Button/
src/components/antd/iCard/ → Card/
src/components/antd/iTable/ → Table/
src/components/antd/iForm/ → Form/
src/components/antd/iModal/ → Modal/
# ... 其他组件同理

# 3. 重命名 pluginComponents 为 components/plugin
src/pluginComponents/ → src/components/plugin/

# 4. 移除 i 前缀
src/components/plugin/iCodeEditor/ → CodeEditor/
src/components/plugin/iMarkdown/ → Markdown/
src/components/plugin/iGridLayout/ → GridLayout/
# ... 其他组件同理
```

### 阶段三：统一 Hooks 命名（中优先级）

```bash
# 1. 合并 hooks 和 useHooks
src/useHooks/ → src/hooks/

# 2. 确保所有 hooks 以 use 开头
src/hooks/theme.tsx → useTheme.tsx
src/hooks/useApi.tsx → ✅ 已正确
src/hooks/useTableApi.tsx → ✅ 已正确
```

### 阶段四：统一页面命名（低优先级）

```bash
# 1. 统一使用 kebab-case
src/views/toDay/ → today/
src/views/myCenter/ → my-center/
src/views/messageCenter/ → message-center/
src/views/routerDom/ → router-dom/

# 2. 统一组件文件名为 PascalCase
src/views/login/account.tsx → Account.tsx
src/views/login/phone.tsx → Phone.tsx
src/views/login/Feishu.tsx → ✅ 已正确
```

### 阶段五：优化资源文件命名（低优先级）

```bash
# 1. 图片文件使用语义化命名
src/assets/images/11.png → icon-feature-1.png
src/assets/images/22.png → icon-feature-2.png
# ... 其他图片同理

# 2. 统一图标文件夹
src/assets/log/ → icons/
src/assets/svg/ → icons/svg/
```

---

## 📝 新文件命名检查清单

创建新文件时，请检查以下项：

### React 组件
- [ ] 文件名使用 PascalCase
- [ ] 文件扩展名为 .tsx
- [ ] 组件名与文件名一致
- [ ] 样式文件使用 .module.scss
- [ ] 类型文件命名为 ComponentName.types.ts

### Hooks
- [ ] 文件名以 use 开头
- [ ] 使用 camelCase
- [ ] 文件扩展名为 .ts 或 .tsx

### 工具函数
- [ ] 文件名使用 camelCase
- [ ] 文件扩展名为 .ts
- [ ] 避免使用过于通用的名称（如 utils.ts）

### 样式文件
- [ ] 组件样式使用 .module.scss
- [ ] 全局样式使用 .scss
- [ ] 文件名与组件名一致

### 类型定义
- [ ] 使用 .ts 或 .d.ts 扩展名
- [ ] 文件名使用 camelCase 或与组件同名

---

## 🛠️ 自动化工具建议

### 1. ESLint 规则
```javascript
// .eslintrc.js
module.exports = {
  rules: {
    // 强制组件名使用 PascalCase
    'react/jsx-pascal-case': ['error', {
      allowAllCaps: false,
      ignore: []
    }],
    // 强制文件名与组件名一致
    'react/jsx-filename-extension': ['error', {
      extensions: ['.tsx']
    }]
  }
};
```

### 2. 文件命名 Lint
```json
// .filenaming.json
{
  "rules": {
    "src/components/**/*.tsx": "PascalCase",
    "src/hooks/**/*.ts": "camelCase",
    "src/utils/**/*.ts": "camelCase",
    "src/types/**/*.ts": "camelCase",
    "src/views/**/*": "kebab-case"
  }
}
```

### 3. Git Hooks
```bash
# .husky/pre-commit
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

# 检查文件命名规范
npm run check:naming
```

---

## 📚 命名规范参考

### React 官方建议
- 组件使用 PascalCase
- 文件名与组件名一致
- 一个文件一个组件

### Airbnb React 规范
- 组件文件使用 .jsx 或 .tsx 扩展名
- 文件名使用 PascalCase
- 实例使用 camelCase

### Google TypeScript 规范
- 文件名使用 kebab-case 或 camelCase
- 类名使用 PascalCase
- 常量使用 UPPER_CASE

---

## 🎯 实施建议

### 立即执行（本周）
1. ✅ 修复所有拼写错误（Seach → Search）
2. ✅ 删除临时文件（index copy.tsx）
3. ✅ 修复 compoment → components

### 近期执行（2周内）
1. 🔶 重命名 antdComponents → components/antd
2. 🔶 移除组件 i 前缀
3. 🔶 合并 useHooks → hooks

### 长期优化（1个月内）
1. 🔷 统一页面文件夹命名
2. 🔷 优化资源文件命名
3. 🔷 添加自动化检查工具

---

## ⚠️ 重命名注意事项

### 1. 使用 Git 重命名
```bash
# ✅ 正确方式（保留 Git 历史）
git mv src/antdComponents/iButton src/components/antd/Button

# ❌ 错误方式（丢失 Git 历史）
mv src/antdComponents/iButton src/components/antd/Button
```

### 2. 批量重命名脚本
```bash
# 创建重命名脚本
# scripts/rename-files.sh
#!/bin/bash

# 重命名所有 Seach 为 Search
find src -type f -name "*Seach*" | while read file; do
  newfile=$(echo "$file" | sed 's/Seach/Search/g')
  git mv "$file" "$newfile"
done
```

### 3. 更新导入路径
```typescript
// ❌ 重命名前
import Ibutton from '@/antdComponents/iButton';

// ✅ 重命名后
import Button from '@/components/antd/Button';
```

### 4. 使用 IDE 重构功能
- VS Code: F2 重命名符号
- WebStorm: Shift + F6 重命名
- 自动更新所有引用

---

**生成时间**: 2026-02-28
**文档版本**: 1.0.0
