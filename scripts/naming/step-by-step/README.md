# 渐进式文件重命名指南

## 📋 概述

本目录包含 5 个渐进式重命名脚本，每个步骤独立执行，执行后立即测试，确保项目稳定性。

## 🎯 执行流程

```
步骤 1 → 测试 → 步骤 2 → 测试 → 步骤 3 → 测试 → 步骤 4 → 测试 → 步骤 5 → 完成
```

---

## 📝 步骤详情

### 步骤 1：修复拼写错误
**文件**: `step1-fix-spelling.ps1`
**影响**: 约 10 个文件
**时间**: 5-10 分钟
**风险**: 🟢 低

**修复内容**:
- ✅ Seach → Search
- ✅ compoment → components
- ✅ 删除临时文件

**执行**:
```powershell
powershell -ExecutionPolicy Bypass -File scripts/naming/step-by-step/step1-fix-spelling.ps1
```

**测试**:
```bash
npm run dev
# 检查页面是否正常显示
```

---

### 步骤 2：重命名 antdComponents 文件夹
**文件**: `step2-rename-antd-folder.ps1`
**影响**: 1 个文件夹，所有导入路径
**时间**: 10-15 分钟
**风险**: 🟡 中

**修改内容**:
- ✅ antdComponents → components/antd
- ✅ 更新所有导入路径

**执行**:
```powershell
powershell -ExecutionPolicy Bypass -File scripts/naming/step-by-step/step2-rename-antd-folder.ps1
```

**测试**:
```bash
npm run dev
# 检查所有使用 antd 组件的页面
```

---

### 步骤 3：重命名 pluginComponents 文件夹
**文件**: `step3-rename-plugin-folder.ps1`
**影响**: 1 个文件夹，所有导入路径
**时间**: 10-15 分钟
**风险**: 🟡 中

**修改内容**:
- ✅ pluginComponents → components/plugin
- ✅ 更新所有导入路径

**执行**:
```powershell
powershell -ExecutionPolicy Bypass -File scripts/naming/step-by-step/step3-rename-plugin-folder.ps1
```

**测试**:
```bash
npm run dev
# 检查所有使用 plugin 组件的页面
```

---

### 步骤 4：重命名 Ant Design 组件
**文件**: `step4-rename-antd-components.ps1`
**影响**: 28 个组件文件夹
**时间**: 30-45 分钟
**风险**: 🔴 高

**修改内容**:
- ✅ iButton → AppButton
- ✅ iCard → AppCard
- ✅ iTable → AppTable
- ✅ ... (共 28 个组件)

**执行**:
```powershell
powershell -ExecutionPolicy Bypass -File scripts/naming/step-by-step/step4-rename-antd-components.ps1
```

**测试**:
```bash
npm run dev
npm run lint
# 全面测试所有页面和功能
# 检查控制台是否有错误
```

---

### 步骤 5：重命名 Plugin 组件
**文件**: `step5-rename-plugin-components.ps1`
**影响**: 12 个组件文件夹
**时间**: 15-20 分钟
**风险**: 🟡 中

**修改内容**:
- ✅ iCodeEditor → CodeEditor
- ✅ iMarkdown → Markdown
- ✅ iGridLayout → GridLayout
- ✅ ... (共 12 个组件)

**执行**:
```powershell
powershell -ExecutionPolicy Bypass -File scripts/naming/step-by-step/step5-rename-plugin-components.ps1
```

**测试**:
```bash
npm run dev
npm run lint
# 全面测试所有功能
```

---

## ⏱️ 时间估算

| 步骤 | 执行时间 | 测试时间 | 总计 |
|------|----------|----------|------|
| 步骤 1 | 5-10 分钟 | 5 分钟 | 10-15 分钟 |
| 步骤 2 | 10-15 分钟 | 10 分钟 | 20-25 分钟 |
| 步骤 3 | 10-15 分钟 | 10 分钟 | 20-25 分钟 |
| 步骤 4 | 30-45 分钟 | 20 分钟 | 50-65 分钟 |
| 步骤 5 | 15-20 分钟 | 15 分钟 | 30-35 分钟 |
| **总计** | **70-105 分钟** | **60 分钟** | **130-165 分钟** |

建议分多天执行，每天 1-2 个步骤。

---

## ✅ 执行检查清单

### 执行前
- [ ] 阅读所有文档
- [ ] 创建新分支：`git checkout -b refactor/file-naming`
- [ ] 确保所有更改已提交：`git status`
- [ ] 通知团队成员

### 每个步骤后
- [ ] 运行 `npm run dev`
- [ ] 检查页面是否正常
- [ ] 检查控制台是否有错误
- [ ] 测试相关功能
- [ ] 提交更改：`git add . && git commit -m "refactor: step X completed"`

### 全部完成后
- [ ] 运行 `npm run lint`
- [ ] 全面测试所有功能
- [ ] 代码审查
- [ ] 合并到主分支

---

## 🚨 回滚方案

如果某个步骤出现问题：

```bash
# 方案 1：回滚到上一次提交
git reset --hard HEAD~1

# 方案 2：切换回原始分支
git checkout main

# 方案 3：查看历史并回滚到特定提交
git log
git reset --hard <commit-hash>
```

---

## 📊 风险等级说明

- 🟢 **低风险**：影响范围小，容易回滚
- 🟡 **中风险**：影响范围中等，需要仔细测试
- 🔴 **高风险**：影响范围大，建议备份后执行

---

## 💡 建议执行计划

### 方案 A：快速执行（适合小团队）
- **第 1 天**：步骤 1 + 步骤 2 + 步骤 3
- **第 2 天**：步骤 4 + 步骤 5

### 方案 B：稳妥执行（推荐）
- **第 1 天**：步骤 1
- **第 2 天**：步骤 2
- **第 3 天**：步骤 3
- **第 4 天**：步骤 4
- **第 5 天**：步骤 5

### 方案 C：超稳妥执行（适合大团队）
- **第 1 周**：步骤 1 + 步骤 2
- **第 2 周**：步骤 3
- **第 3 周**：步骤 4
- **第 4 周**：步骤 5

---

## 🔍 测试重点

### 步骤 1 后
- ✅ 搜索功能正常
- ✅ 表单提交正常

### 步骤 2 后
- ✅ 所有使用 antd 组件的页面正常
- ✅ 表格、表单、按钮等组件正常

### 步骤 3 后
- ✅ 所有使用 plugin 组件的页面正常
- ✅ 代码编辑器、Markdown 等组件正常

### 步骤 4 后
- ✅ 所有页面正常显示
- ✅ 所有功能正常工作
- ✅ 没有控制台错误
- ✅ 类型检查通过

### 步骤 5 后
- ✅ 全面功能测试
- ✅ 性能测试
- ✅ 兼容性测试

---

## 📞 获取帮助

遇到问题？查看：
- [../../../docs/naming/NAMING_CONFLICT_SOLUTION.md](../../../docs/naming/NAMING_CONFLICT_SOLUTION.md)
- [../../../docs/naming/FILE_NAMING_STANDARDS.md](../../../docs/naming/FILE_NAMING_STANDARDS.md)

---

**开始执行**: 
```powershell
powershell -ExecutionPolicy Bypass -File scripts/naming/step-by-step/step1-fix-spelling.ps1
```
