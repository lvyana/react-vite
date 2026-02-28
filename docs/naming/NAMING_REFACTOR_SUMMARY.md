# 文件命名规范化总结

## 📊 项目现状分析

### 发现的主要问题

#### 1. 拼写错误（高优先级）
- ❌ `Seach` → 应该是 `Search`（出现在 5+ 个文件中）
- ❌ `compoment` → 应该是 `components`
- ❌ 临时文件：`index copy.tsx`

#### 2. 命名风格不统一（高优先级）
- ❌ 组件使用 `i` 前缀：`iButton`, `iCard`, `iTable` 等（43个组件）
- ❌ 混合使用 PascalCase 和 camelCase
- ❌ 文件夹命名不一致

#### 3. 目录结构问题（中优先级）
- ❌ `antdComponents` 和 `pluginComponents` 应该统一到 `components` 下
- ❌ `hooks` 和 `useHooks` 重复概念
- ❌ 组件分类不清晰

#### 4. 其他问题（低优先级）
- ❌ 图片文件使用数字命名：`11.png`, `22.png`
- ❌ 部分工具文件使用 `.tsx` 扩展名（应该用 `.ts`）

---

## 📋 已创建的文档和工具

### 1. 规范文档
✅ **FILE_NAMING_STANDARDS.md** - 完整的文件命名规范
- 详细的命名规则
- 正确和错误示例
- 分阶段重命名计划
- 实施建议和注意事项

### 2. 自动化脚本
✅ **scripts/check-naming.ps1** - 命名检查脚本
- 检查拼写错误
- 检查 i 前缀组件
- 检查临时文件
- 检查命名规范
- 检查重复文件夹

✅ **scripts/rename-phase1.ps1** - 阶段一重命名脚本
- 修复拼写错误
- 删除临时文件
- 自动更新导入路径

✅ **scripts/rename-phase2.ps1** - 阶段二重命名脚本
- 重组目录结构
- 移除 i 前缀
- 统一组件命名
- 自动更新导入路径

✅ **scripts/README.md** - 脚本使用指南
- 详细的使用步骤
- 重命名对照表
- 故障排除
- 执行建议

---

## 🎯 统一命名规范

### React 组件
```
规则：PascalCase
扩展名：.tsx

✅ Button.tsx
✅ UserProfile.tsx
✅ SearchForm.tsx
```

### TypeScript 工具文件
```
规则：camelCase
扩展名：.ts

✅ request.ts
✅ errorCode.ts
✅ authService.ts
```

### Hooks
```
规则：camelCase，以 use 开头
扩展名：.ts 或 .tsx

✅ useAuth.ts
✅ useTableData.tsx
✅ usePermission.ts
```

### 样式文件
```
规则：与组件同名
扩展名：.module.scss

✅ Button.module.scss
✅ SearchForm.module.scss
```

### 文件夹
```
组件：PascalCase
功能模块：camelCase 或 kebab-case

✅ src/components/Button/
✅ src/hooks/
✅ src/utils/
✅ src/views/user-management/
```

---

## 🔄 重命名计划

### 阶段一：修复拼写错误（立即执行）

**影响范围**：约 10 个文件

| 原名称 | 新名称 | 类型 |
|--------|--------|------|
| `headSeach/` | `headSearch/` | 文件夹 |
| `SeachForm.tsx` | `SearchForm.tsx` | 文件 |
| `SeachStyle.tsx` | `SearchStyle.tsx` | 文件 |
| `seachForm/` | `searchForm/` | 文件夹 |
| `compoment/` | `components/` | 文件夹 |
| `index copy.tsx` | 删除 | 文件 |

**执行方式**：
```powershell
powershell -ExecutionPolicy Bypass -File scripts/rename-phase1.ps1
```

**预计时间**：30分钟 - 1小时

---

### 阶段二：统一组件命名（近期执行）

**影响范围**：约 60+ 个组件文件夹

#### 2.1 目录重组
```
src/antdComponents/ → src/components/antd/
src/pluginComponents/ → src/components/plugin/
src/useHooks/ → src/hooks/
```

#### 2.2 移除 i 前缀（43个 Antd 组件）
```
iButton/ → Button/
iCard/ → Card/
iTable/ → Table/
iForm/ → Form/
iModal/ → Modal/
iInput/ → Input/
iSelect/ → Select/
iPagination/ → Pagination/
iUpload/ → Upload/
iDrawer/ → Drawer/
iDropdown/ → Dropdown/
iCascader/ → Cascader/
iCheckbox/ → Checkbox/
iCollapse/ → Collapse/
iEditHeader/ → EditHeader/
iLoading/ → Loading/
iPicker/ → Picker/
iRadio/ → Radio/
iRate/ → Rate/
iSearchForm/ → SearchForm/
iSearchTag/ → SearchTag/
iSlider/ → Slider/
iSwitch/ → Switch/
iTooltip/ → Tooltip/
iTour/ → Tour/
iTree/ → Tree/
iTreeSelect/ → TreeSelect/
notFound/ → NotFound/
```

#### 2.3 移除 i 前缀（12个 Plugin 组件）
```
iAnimateComponent/ → AnimateComponent/
iCodeEditor/ → CodeEditor/
iCopy/ → Copy/
iEasyTyper/ → EasyTyper/
iFullscreen/ → Fullscreen/
iGridLayout/ → GridLayout/
iInfiniteScroll/ → InfiniteScroll/
iInnerHTML/ → InnerHTML/
iLoading/ → Loading/
iMarkdown/ → Markdown/
iResponsive/ → Responsive/
iTransition/ → Transition/
```

**执行方式**：
```powershell
powershell -ExecutionPolicy Bypass -File scripts/rename-phase2.ps1
```

**预计时间**：2-3小时

---

### 阶段三：优化页面命名（长期优化）

**影响范围**：约 15 个页面文件夹

```
src/views/toDay/ → today/
src/views/myCenter/ → my-center/
src/views/messageCenter/ → message-center/
src/views/routerDom/ → router-dom/
src/views/antd/antTable/ → ant-table/
src/views/antd/seachForm/ → search-form/
src/views/antd/dynamicform/ → dynamic-form/
```

**执行方式**：手动重命名（需要更新路由配置）

**预计时间**：1-2小时

---

### 阶段四：优化资源文件（长期优化）

**影响范围**：约 20 个图片文件

```
11.png → icon-feature-1.png
22.png → icon-feature-2.png
33.png → icon-feature-3.png
...
```

**执行方式**：手动重命名

**预计时间**：30分钟

---

## 📈 导入路径变化示例

### 阶段一后
```typescript
// ❌ 旧的导入
import SearchForm from '@/antdComponents/iTable/components/headSeach/SeachForm';
import Lists from '@/layout/header/messageCenter/compoment/Lists';

// ✅ 新的导入
import SearchForm from '@/antdComponents/iTable/components/headSearch/SearchForm';
import Lists from '@/layout/header/messageCenter/components/Lists';
```

### 阶段二后
```typescript
// ❌ 旧的导入
import Ibutton from '@/antdComponents/iButton';
import Icard from '@/antdComponents/iCard';
import Itable from '@/antdComponents/iTable';
import IcodeEditor from '@/pluginComponents/iCodeEditor';
import Imarkdown from '@/pluginComponents/iMarkdown';

// ✅ 新的导入
import Button from '@/components/antd/Button';
import Card from '@/components/antd/Card';
import Table from '@/components/antd/Table';
import CodeEditor from '@/components/plugin/CodeEditor';
import Markdown from '@/components/plugin/Markdown';
```

### 阶段三后
```typescript
// ❌ 旧的导入
import ToDay from '@/views/toDay';
import MyCenter from '@/views/myCenter';

// ✅ 新的导入
import Today from '@/views/today';
import MyCenter from '@/views/my-center';
```

---

## ✅ 执行检查清单

### 执行前
- [ ] 阅读 `FILE_NAMING_STANDARDS.md`
- [ ] 阅读 `scripts/README.md`
- [ ] 创建新分支：`git checkout -b refactor/file-naming`
- [ ] 确保所有更改已提交：`git status`
- [ ] 通知团队成员

### 阶段一执行
- [ ] 运行检查脚本：`scripts/check-naming.ps1`
- [ ] 运行重命名脚本：`scripts/rename-phase1.ps1`
- [ ] 测试项目：`npm run dev`
- [ ] 检查代码规范：`npm run lint`
- [ ] 提交更改：`git commit -m "refactor: fix spelling errors"`

### 阶段二执行
- [ ] 运行重命名脚本：`scripts/rename-phase2.ps1`
- [ ] 测试项目：`npm run dev`
- [ ] 检查所有页面功能
- [ ] 检查代码规范：`npm run lint`
- [ ] 手动检查遗漏的导入
- [ ] 提交更改：`git commit -m "refactor: unify component naming"`

### 执行后
- [ ] 全面测试所有功能
- [ ] 更新项目文档
- [ ] 代码审查
- [ ] 合并到主分支
- [ ] 通知团队成员更新本地代码

---

## 🎯 预期收益

### 1. 代码可读性提升
- 统一的命名风格
- 清晰的文件结构
- 更容易理解的导入路径

### 2. 开发效率提升
- 更快找到需要的文件
- 减少命名混淆
- 更好的 IDE 自动补全

### 3. 团队协作改善
- 统一的编码规范
- 减少代码审查时间
- 新成员更容易上手

### 4. 维护成本降低
- 更容易重构代码
- 减少命名相关的 bug
- 更好的代码组织

---

## ⚠️ 风险和注意事项

### 1. 破坏性更改
- 所有导入路径都会改变
- 需要全面测试
- 可能影响正在开发的功能

### 2. 团队协作
- 需要通知所有团队成员
- 建议在非工作时间执行
- 需要更新所有开发分支

### 3. 第三方依赖
- 检查是否有硬编码的路径
- 检查配置文件中的路径引用
- 检查构建脚本

### 4. 回滚计划
- 保留原始分支
- 记录所有更改
- 准备回滚脚本

---

## 📞 支持和帮助

### 遇到问题？

1. 查看 `scripts/README.md` 的故障排除部分
2. 查看 `FILE_NAMING_STANDARDS.md` 的详细说明
3. 检查 Git 历史：`git log --follow <file>`
4. 使用 IDE 的重构功能

### 常见问题

**Q: 脚本执行失败怎么办？**
A: 检查 PowerShell 执行策略，使用 `-ExecutionPolicy Bypass` 参数

**Q: 导入路径没有自动更新？**
A: 使用 VS Code 的全局搜索替换功能手动更新

**Q: 项目无法启动？**
A: 清理缓存（`rm -rf node_modules/.vite`）并重新安装依赖

**Q: 如何回滚更改？**
A: `git reset --hard HEAD~1` 或切换回原始分支

---

## 📚 相关文档

- [FILE_NAMING_STANDARDS.md](./FILE_NAMING_STANDARDS.md) - 完整的命名规范
- [scripts/README.md](./scripts/README.md) - 脚本使用指南
- [PROJECT_OPTIMIZATION_ANALYSIS.md](./PROJECT_OPTIMIZATION_ANALYSIS.md) - 项目优化分析
- [QUICK_FIXES.md](./QUICK_FIXES.md) - 快速修复建议

---

## 🎉 总结

通过执行这个重命名计划，你的项目将：

✅ 拥有统一的文件命名规范
✅ 更清晰的目录结构
✅ 更好的代码可读性
✅ 更高的开发效率
✅ 更容易维护和扩展

**建议执行时间**：周末或非工作时间
**预计总时间**：4-6小时
**影响范围**：约 100+ 个文件

---

**创建时间**: 2026-02-28
**最后更新**: 2026-02-28
**维护者**: Kiro AI Assistant
