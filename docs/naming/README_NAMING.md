# 文件命名规范化 - 完整指南

## 📚 文档导航

本项目包含完整的文件命名规范化方案，包括以下文档：

### 核心文档
1. **[NAMING_CONFLICT_SOLUTION.md](./NAMING_CONFLICT_SOLUTION.md)** ⭐ 必读
   - 命名冲突问题分析
   - 为什么使用 App 前缀
   - 多种方案对比
   - 最终推荐方案

2. **[FILE_NAMING_STANDARDS.md](./FILE_NAMING_STANDARDS.md)**
   - 完整的文件命名规范
   - React 组件、Hooks、工具函数等命名规则
   - 正确和错误示例
   - 实施建议

3. **[NAMING_COMPARISON.md](./NAMING_COMPARISON.md)**
   - 新旧命名对比
   - 完整的重命名对照表
   - 实际使用示例
   - 迁移步骤

4. **[NAMING_REFACTOR_SUMMARY.md](./NAMING_REFACTOR_SUMMARY.md)**
   - 项目现状分析
   - 分阶段重命名计划
   - 执行检查清单
   - 预期收益

### 脚本文档
5. **[scripts/README.md](./scripts/README.md)**
   - 脚本使用指南
   - 详细的执行步骤
   - 故障排除
   - 时间估算

---

## 🎯 快速开始

### 1. 了解问题（5分钟）

阅读 [NAMING_CONFLICT_SOLUTION.md](./NAMING_CONFLICT_SOLUTION.md) 了解：
- 为什么不能直接移除 `i` 前缀
- 为什么选择 `App` 前缀
- 如何避免与 Ant Design 冲突

### 2. 检查当前问题（2分钟）

```powershell
# 运行检查脚本
powershell -ExecutionPolicy Bypass -File scripts/check-naming.ps1
```

### 3. 执行重命名（1-2小时）

#### 阶段一：修复拼写错误（30分钟）
```powershell
powershell -ExecutionPolicy Bypass -File scripts/rename-phase1.ps1
```

修复内容：
- ✅ Seach → Search
- ✅ compoment → components
- ✅ 删除临时文件

#### 阶段二：统一组件命名（1-2小时）
```powershell
powershell -ExecutionPolicy Bypass -File scripts/rename-phase2-safe.ps1
```

修复内容：
- ✅ antdComponents → components/antd
- ✅ iButton → AppButton（使用 App 前缀）
- ✅ pluginComponents → components/plugin
- ✅ 自动更新所有导入路径

### 4. 测试验证（30分钟）

```bash
# 启动项目
npm run dev

# 检查代码规范
npm run lint

# 手动测试关键功能
```

---

## 🔑 核心要点

### 为什么使用 App 前缀？

```typescript
// ❌ 问题：直接移除 i 前缀会冲突
import Button from '@/components/antd/Button';
import { Button } from 'antd';  // 命名冲突！

// ✅ 解决：使用 App 前缀
import AppButton from '@/components/antd/AppButton';
import { Button } from 'antd';  // 无冲突！

// 可以同时使用
<AppButton permission="user:add">新增</AppButton>  // 自定义封装
<Button>取消</Button>                              // 原生组件
```

### 命名规范总结

| 类型 | 规则 | 示例 |
|------|------|------|
| **Ant Design 封装** | App + PascalCase | `AppButton`, `AppCard`, `AppTable` |
| **Plugin 组件** | PascalCase | `CodeEditor`, `Markdown`, `GridLayout` |
| **业务组件** | 语义化 PascalCase | `UserCard`, `DataTable`, `SearchBar` |
| **Hooks** | use + camelCase | `useAuth`, `useTableData`, `usePermission` |
| **工具函数** | camelCase | `request`, `errorCode`, `formatDate` |
| **样式文件** | 组件名.module.scss | `AppButton.module.scss` |

---

## 📊 重命名对照表（精简版）

### Ant Design 组件（28个）

| 原名称 | 新名称 | 原名称 | 新名称 |
|--------|--------|--------|--------|
| `iButton` | `AppButton` | `iModal` | `AppModal` |
| `iCard` | `AppCard` | `iInput` | `AppInput` |
| `iTable` | `AppTable` | `iSelect` | `AppSelect` |
| `iForm` | `AppForm` | `iPagination` | `AppPagination` |

[查看完整对照表](./NAMING_COMPARISON.md#完整重命名对照表)

### Plugin 组件（12个）

| 原名称 | 新名称 | 原名称 | 新名称 |
|--------|--------|--------|--------|
| `iCodeEditor` | `CodeEditor` | `iMarkdown` | `Markdown` |
| `iGridLayout` | `GridLayout` | `iFullscreen` | `Fullscreen` |

[查看完整对照表](./NAMING_COMPARISON.md#完整重命名对照表)

---

## 🗂️ 目录结构变化

### 变化前
```
src/
├── antdComponents/          ❌ 不规范
│   ├── iButton/            ❌ i 前缀
│   └── iCard/
└── pluginComponents/        ❌ 不规范
    ├── iCodeEditor/        ❌ i 前缀
    └── iMarkdown/
```

### 变化后
```
src/
└── components/              ✅ 统一目录
    ├── antd/               ✅ Ant Design 封装
    │   ├── AppButton/      ✅ App 前缀
    │   ├── AppCard/
    │   └── index.ts        ✅ 统一导出
    └── plugin/             ✅ 插件组件
        ├── CodeEditor/     ✅ 无前缀
        ├── Markdown/
        └── index.ts
```

---

## 💻 使用示例

### 基本使用

```typescript
// 导入自定义封装组件
import AppButton from '@/components/antd/AppButton';
import AppCard from '@/components/antd/AppCard';
import AppTable from '@/components/antd/AppTable';

// 导入原生 Ant Design 组件
import { Button, Card, Form } from 'antd';

// 使用
<AppButton type="primary">提交</AppButton>  // 自定义封装
<Button>取消</Button>                        // 原生组件
```

### 统一导入

```typescript
// 使用统一导出
import { 
  AppButton, 
  AppCard, 
  AppTable 
} from '@/components/antd';
```

### 混合使用

```typescript
import AppButton from '@/components/antd/AppButton';
import { Button, Space } from 'antd';

<Space>
  {/* 带权限控制的自定义按钮 */}
  <AppButton permission="user:add">新增</AppButton>
  {/* 普通原生按钮 */}
  <Button>刷新</Button>
</Space>
```

---

## ⚠️ 注意事项

### 1. 执行前准备
- ✅ 创建新分支：`git checkout -b refactor/file-naming`
- ✅ 确保所有更改已提交：`git status`
- ✅ 通知团队成员
- ✅ 选择非工作时间执行

### 2. 执行顺序
1. 先执行阶段一（修复拼写错误）
2. 测试无误后再执行阶段二
3. 每个阶段完成后都要测试

### 3. 测试重点
- ✅ 所有页面能正常访问
- ✅ 表单提交功能正常
- ✅ 表格数据展示正常
- ✅ 权限控制功能正常
- ✅ 没有控制台错误

### 4. 常见问题
- 如果遇到导入错误，检查路径是否正确
- 如果组件不显示，检查组件名是否更新
- 如果类型错误，重启 TypeScript 服务

---

## 📈 预期收益

### 代码质量提升
- ✅ 统一的命名规范
- ✅ 清晰的文件结构
- ✅ 更好的代码可读性
- ✅ 避免命名冲突

### 开发效率提升
- ✅ 更快找到需要的文件
- ✅ 更好的 IDE 自动补全
- ✅ 减少命名混淆
- ✅ 新成员更容易上手

### 维护成本降低
- ✅ 更容易重构代码
- ✅ 减少命名相关的 bug
- ✅ 更好的代码组织
- ✅ 更容易扩展功能

---

## 🛠️ 可用脚本

| 脚本 | 功能 | 执行时间 |
|------|------|----------|
| `check-naming.ps1` | 检查命名问题 | 1分钟 |
| `rename-phase1.ps1` | 修复拼写错误 | 30分钟 |
| `rename-phase2-safe.ps1` | 统一组件命名（App前缀） | 1-2小时 |

---

## 📞 获取帮助

### 遇到问题？

1. 查看 [scripts/README.md](./scripts/README.md) 的故障排除部分
2. 查看 [NAMING_CONFLICT_SOLUTION.md](./NAMING_CONFLICT_SOLUTION.md) 的详细说明
3. 检查 Git 历史：`git log --follow <file>`

### 常见问题

**Q: 为什么要使用 App 前缀？**
A: 避免与 Ant Design 原生组件命名冲突，详见 [NAMING_CONFLICT_SOLUTION.md](./NAMING_CONFLICT_SOLUTION.md)

**Q: 可以使用其他前缀吗？**
A: 可以，但推荐使用 App。其他选项：Custom、Biz、项目名等

**Q: Plugin 组件为什么不需要前缀？**
A: Plugin 组件不会与第三方库冲突，使用语义化命名即可

**Q: 如何回滚更改？**
A: `git reset --hard HEAD~1` 或切换回原始分支

---

## 🎉 总结

通过执行这个重命名计划，你的项目将：

✅ 拥有统一的文件命名规范
✅ 避免与第三方库的命名冲突
✅ 更清晰的目录结构
✅ 更好的代码可读性
✅ 更高的开发效率

**建议执行时间**：周末或非工作时间
**预计总时间**：2-4小时
**影响范围**：约 100+ 个文件

---

## 📚 完整文档列表

1. [README_NAMING.md](./README_NAMING.md) - 本文档（总览）
2. [NAMING_CONFLICT_SOLUTION.md](./NAMING_CONFLICT_SOLUTION.md) - 冲突解决方案 ⭐
3. [FILE_NAMING_STANDARDS.md](./FILE_NAMING_STANDARDS.md) - 命名规范
4. [NAMING_COMPARISON.md](./NAMING_COMPARISON.md) - 新旧对比
5. [NAMING_REFACTOR_SUMMARY.md](./NAMING_REFACTOR_SUMMARY.md) - 重构总结
6. [scripts/README.md](./scripts/README.md) - 脚本指南
7. [PROJECT_OPTIMIZATION_ANALYSIS.md](./PROJECT_OPTIMIZATION_ANALYSIS.md) - 项目优化分析
8. [QUICK_FIXES.md](./QUICK_FIXES.md) - 快速修复建议

---

**创建时间**: 2026-02-28
**最后更新**: 2026-02-28
**维护者**: Kiro AI Assistant

**开始重命名**: `powershell -ExecutionPolicy Bypass -File scripts/check-naming.ps1`
