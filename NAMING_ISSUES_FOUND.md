# 发现的命名问题和建议

## 🔍 检查结果

经过全面检查，发现以下需要改进的命名问题：

---

## 1. 组件函数名仍使用 `I` 前缀

### 问题描述
虽然文件夹和导入路径已经更新，但很多组件的函数名仍然使用 `I` 前缀。

### 发现的问题

#### React Hooks 示例组件
```typescript
// src/views/react/hooks/useState/index.tsx
const IuseState = () => { ... }

// src/views/react/hooks/useEffect/index.tsx
const IuseEffect = () => { ... }

// src/views/react/hooks/useContext/index.tsx
const IuseContext = () => { ... }

// 其他类似的：
- IuseCallback
- IuseReducer
- IuseMemo
- IuseRef
- IuseLayoutEffect
- IuseInsertionEffect
- IuseImperativeHandle
- IuseDeferredValue
- IuseTransition
- IuseSyncExternalStore
- IforwardRef
```

#### React DOM 示例组件
```typescript
// src/views/react/reactDom/createPortal/index.tsx
const IcreatePortal = () => { ... }

// src/views/react/reactDom/flushSync/index.tsx
const IflushSync = () => { ... }

// src/views/react/reactDom/suspense/index.tsx
const Isuspense = () => { ... }
```

#### Redux 示例组件
```typescript
// src/views/react/reduxtoolkit/index.tsx
const Ireduxtoolkit = () => { ... }

// src/views/react/rtk/index.tsx
const Ireduxtoolkit = () => { ... }
```

#### 其他组件
```typescript
// src/views/react/hooks/useContext/Icontext.tsx
const Icontext: FC<IuseContextComProps> = ({ children }) => { ... }

// src/views/react/hooks/useSyncExternalStore/index.tsx
const Idocment = () => { ... }

// src/views/plugin/gridLayout/index.tsx
const ImgGrid = () => { ... }

// src/views/plugin/logicFlow/index.tsx
const index = () => { ... }  // 小写开头，不符合规范
```

### 建议修改

#### 方案 A：使用描述性名称（推荐）
```typescript
// 修改前
const IuseState = () => { ... }

// 修改后
const UseStateDemo = () => { ... }
// 或
const UseStateExample = () => { ... }
```

#### 方案 B：直接移除 I 前缀
```typescript
// 修改前
const IuseEffect = () => { ... }

// 修改后
const UseEffect = () => { ... }
```

---

## 2. 接口/类型名使用 `I` 前缀

### 问题描述
一些接口和类型定义使用了 `I` 前缀，这在 TypeScript 社区中不是推荐的做法。

### 发现的问题

```typescript
// src/views/react/hooks/useContext/Icontext.tsx
export interface IuseContextComProps { ... }

// src/views/plugin/richTextEdit/index.tsx
export interface ISingleMenuConfig { ... }
export interface IMenuConfig { ... }

// src/views/plugin/richTextEdit/components/PreviewView.tsx
interface Iprops { ... }

// src/views/plugin/richTextEdit/components/PreviewCode.tsx
interface Iprops { ... }

// src/views/plugin/logicFlow/approve.tsx
type IApproveUser = { ... }
```

### 建议修改

```typescript
// 修改前
interface IuseContextComProps { ... }
interface Iprops { ... }
type IApproveUser = { ... }

// 修改后
interface UseContextComProps { ... }
interface PreviewProps { ... }
type ApproveUser = { ... }
```

---

## 3. 文件夹命名不一致

### 问题描述
一些文件夹使用 camelCase，一些使用 PascalCase，缺乏统一性。

### 发现的问题

```
src/layout/
├── configLayout/      ❌ camelCase
├── tabsMain/          ❌ camelCase
├── otherFunctions/    ❌ camelCase
└── useHooks/          ❌ camelCase

src/views/
├── antd/
│   ├── antTable/      ❌ camelCase
│   ├── dynamicform/   ❌ 全小写
│   └── searchForm/    ❌ camelCase
├── messageCenter/     ❌ camelCase
├── myCenter/          ❌ camelCase
├── routerDom/         ❌ camelCase
└── toDay/             ❌ camelCase
```

### 建议修改

#### 选项 1：统一使用 kebab-case（推荐用于页面/视图）
```
src/views/
├── antd/
│   ├── ant-table/
│   ├── dynamic-form/
│   └── search-form/
├── message-center/
├── my-center/
├── router-dom/
└── to-day/
```

#### 选项 2：统一使用 PascalCase（推荐用于组件）
```
src/layout/
├── ConfigLayout/
├── TabsMain/
├── OtherFunctions/
└── UseHooks/
```

---

## 4. 文件命名不一致

### 问题描述
一些文件使用 PascalCase，一些使用 camelCase。

### 发现的问题

```
src/layout/menu/
├── CradMenu.tsx       ✅ PascalCase
├── LeftMenu.tsx       ✅ PascalCase
└── routerData.ts      ❌ camelCase（应该是 RouterData.ts 或 router-data.ts）

src/layout/
├── LayoutStyle.tsx    ✅ PascalCase
└── useAsyncComponent.tsx  ❌ camelCase（Hook 文件）
```

### 建议修改

```
// 组件文件：PascalCase
CradMenu.tsx
LeftMenu.tsx
LayoutStyle.tsx

// 工具/配置文件：camelCase 或 kebab-case
routerData.ts 或 router-data.ts

// Hook 文件：camelCase（保持现状）
useAsyncComponent.tsx
```

---

## 5. HOC 文件夹命名

### 问题描述
HOC 文件夹使用 camelCase + Hoc 后缀，不够统一。

### 发现的问题

```
src/hoc/
├── authButtonPermissionHoc/   ❌ camelCase + Hoc
├── errorBoundaryHoc/          ❌ camelCase + Hoc
├── forwardRefHoc/             ❌ camelCase + Hoc
└── hoverEvenHoc/              ❌ camelCase + Hoc
```

### 建议修改

#### 选项 1：移除 Hoc 后缀（推荐）
```
src/hoc/
├── AuthButtonPermission/
├── ErrorBoundary/
├── ForwardRef/
└── HoverEven/
```

#### 选项 2：统一使用 PascalCase + Hoc
```
src/hoc/
├── AuthButtonPermissionHoc/
├── ErrorBoundaryHoc/
├── ForwardRefHoc/
└── HoverEvenHoc/
```

---

## 6. 拼写错误

### 发现的问题

```typescript
// src/layout/menu/CradMenu.tsx
CradMenu  // 应该是 CardMenu？

// src/views/react/hooks/useSyncExternalStore/index.tsx
const Idocment = () => { ... }  // 应该是 Document

// src/hoc/hoverEvenHoc/
hoverEvenHoc  // 应该是 hoverEventHoc？
```

---

## 📊 优先级建议

### 🔴 高优先级（影响代码可读性和规范性）
1. **移除组件函数名的 `I` 前缀**（约 20+ 个组件）
2. **移除接口/类型的 `I` 前缀**（约 10+ 个接口）
3. **修复拼写错误**（3 处）

### 🟡 中优先级（提升一致性）
4. **统一文件夹命名规范**（views 和 layout 文件夹）
5. **统一 HOC 命名规范**

### 🟢 低优先级（可选）
6. **统一文件命名规范**（非组件文件）

---

## 🎯 推荐的命名规范

### 组件
- **文件夹**: PascalCase（如 `UserProfile/`）
- **文件**: PascalCase（如 `UserProfile.tsx`）
- **组件名**: PascalCase（如 `const UserProfile = () => {}`）

### 页面/视图
- **文件夹**: kebab-case 或 camelCase（如 `user-profile/` 或 `userProfile/`）
- **文件**: PascalCase（如 `index.tsx`）
- **组件名**: PascalCase（如 `const UserProfile = () => {}`）

### 接口/类型
- **不使用 `I` 前缀**（TypeScript 官方不推荐）
- **使用 PascalCase**（如 `interface UserProps {}`）
- **Props 接口**: 组件名 + Props（如 `UserProfileProps`）

### Hooks
- **文件**: camelCase（如 `useUserData.ts`）
- **函数名**: camelCase（如 `const useUserData = () => {}`）

### HOC
- **文件夹**: PascalCase（如 `WithAuth/`）
- **文件**: PascalCase（如 `WithAuth.tsx`）
- **函数名**: with + PascalCase（如 `const withAuth = () => {}`）

### 工具/配置
- **文件**: camelCase 或 kebab-case（如 `routerData.ts` 或 `router-data.ts`）

---

## 💡 下一步行动

### 建议执行顺序

1. **第一步**: 移除组件函数名的 `I` 前缀（高优先级）
2. **第二步**: 移除接口/类型的 `I` 前缀（高优先级）
3. **第三步**: 修复拼写错误（高优先级）
4. **第四步**: 统一文件夹命名（中优先级，可选）
5. **第五步**: 统一 HOC 命名（中优先级，可选）

### 预估工作量

- **高优先级任务**: 约 30-40 个文件需要修改，预计 1-2 小时
- **中优先级任务**: 约 20-30 个文件夹需要重命名，预计 1-2 小时
- **总计**: 2-4 小时

---

**是否需要我继续执行这些改进？请告诉我你想先处理哪些问题。**
