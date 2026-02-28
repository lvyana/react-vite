# 项目文档目录

## 📚 文档分类

### 1. 命名规范文档 (`naming/`)
关于文件和组件命名规范化的完整文档。

- **[README_NAMING.md](./naming/README_NAMING.md)** - 命名规范总览（从这里开始）
- **[NAMING_CONFLICT_SOLUTION.md](./naming/NAMING_CONFLICT_SOLUTION.md)** ⭐ - 命名冲突解决方案
- **[FILE_NAMING_STANDARDS.md](./naming/FILE_NAMING_STANDARDS.md)** - 完整的命名规范
- **[NAMING_COMPARISON.md](./naming/NAMING_COMPARISON.md)** - 新旧命名对比
- **[NAMING_REFACTOR_SUMMARY.md](./naming/NAMING_REFACTOR_SUMMARY.md)** - 重构总结

### 2. 项目优化文档 (`optimization/`)
关于项目整体优化的建议和方案。

- **[PROJECT_OPTIMIZATION_ANALYSIS.md](./optimization/PROJECT_OPTIMIZATION_ANALYSIS.md)** - 项目优化分析
- **[QUICK_FIXES.md](./optimization/QUICK_FIXES.md)** - 快速修复建议
- **[NEW_COMPONENTS_EXAMPLES.md](./optimization/NEW_COMPONENTS_EXAMPLES.md)** - 新组件示例

---

## 🚀 快速开始

### 如果你想了解命名规范
1. 阅读 [naming/README_NAMING.md](./naming/README_NAMING.md)
2. 了解 [naming/NAMING_CONFLICT_SOLUTION.md](./naming/NAMING_CONFLICT_SOLUTION.md)
3. 执行渐进式重命名脚本

### 如果你想优化项目
1. 阅读 [optimization/PROJECT_OPTIMIZATION_ANALYSIS.md](./optimization/PROJECT_OPTIMIZATION_ANALYSIS.md)
2. 查看 [optimization/QUICK_FIXES.md](./optimization/QUICK_FIXES.md)
3. 参考 [optimization/NEW_COMPONENTS_EXAMPLES.md](./optimization/NEW_COMPONENTS_EXAMPLES.md)

---

## 📂 目录结构

```
docs/
├── README.md                          # 本文档
├── naming/                            # 命名规范文档
│   ├── README_NAMING.md              # 命名规范总览
│   ├── NAMING_CONFLICT_SOLUTION.md   # 冲突解决方案 ⭐
│   ├── FILE_NAMING_STANDARDS.md      # 完整命名规范
│   ├── NAMING_COMPARISON.md          # 新旧对比
│   └── NAMING_REFACTOR_SUMMARY.md    # 重构总结
└── optimization/                      # 优化文档
    ├── PROJECT_OPTIMIZATION_ANALYSIS.md  # 优化分析
    ├── QUICK_FIXES.md                    # 快速修复
    └── NEW_COMPONENTS_EXAMPLES.md        # 新组件示例

scripts/
└── naming/                            # 命名相关脚本
    ├── step-by-step/                 # 渐进式重命名脚本 ⭐
    │   ├── README.md                 # 步骤说明
    │   ├── step1-fix-spelling.ps1    # 步骤 1
    │   ├── step2-rename-antd-folder.ps1     # 步骤 2
    │   ├── step3-rename-plugin-folder.ps1   # 步骤 3
    │   ├── step4-rename-antd-components.ps1 # 步骤 4
    │   └── step5-rename-plugin-components.ps1 # 步骤 5
    ├── check-naming.ps1              # 检查脚本
    ├── rename-phase1.ps1             # 一键重命名（阶段1）
    └── rename-phase2-safe.ps1        # 一键重命名（阶段2）
```

---

## 🎯 推荐阅读顺序

### 新手入门
1. [docs/naming/README_NAMING.md](./naming/README_NAMING.md) - 了解整体方案
2. [docs/naming/NAMING_CONFLICT_SOLUTION.md](./naming/NAMING_CONFLICT_SOLUTION.md) - 理解为什么这样做
3. [scripts/naming/step-by-step/README.md](../scripts/naming/step-by-step/README.md) - 开始执行

### 深入了解
1. [docs/naming/FILE_NAMING_STANDARDS.md](./naming/FILE_NAMING_STANDARDS.md) - 详细规范
2. [docs/naming/NAMING_COMPARISON.md](./naming/NAMING_COMPARISON.md) - 对比分析
3. [docs/optimization/PROJECT_OPTIMIZATION_ANALYSIS.md](./optimization/PROJECT_OPTIMIZATION_ANALYSIS.md) - 优化建议

---

## ⚡ 快速执行

### 渐进式重命名（推荐）
```powershell
# 步骤 1：修复拼写错误
powershell -ExecutionPolicy Bypass -File scripts/naming/step-by-step/step1-fix-spelling.ps1

# 测试后继续...
```

### 一键重命名（高级用户）
```powershell
# 检查问题
powershell -ExecutionPolicy Bypass -File scripts/naming/check-naming.ps1

# 执行重命名
powershell -ExecutionPolicy Bypass -File scripts/naming/rename-phase1.ps1
powershell -ExecutionPolicy Bypass -File scripts/naming/rename-phase2-safe.ps1
```

---

## 📊 文档状态

| 文档 | 状态 | 最后更新 |
|------|------|----------|
| 命名规范文档 | ✅ 完成 | 2026-02-28 |
| 优化分析文档 | ✅ 完成 | 2026-02-28 |
| 渐进式脚本 | ✅ 完成 | 2026-02-28 |

---

**创建时间**: 2026-02-28
**维护者**: Kiro AI Assistant
