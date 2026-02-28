# 📚 项目文档和脚本说明

## 🎯 快速导航

### 想要重命名文件？
👉 查看 [scripts/naming/step-by-step/README.md](./scripts/naming/step-by-step/README.md)

### 想要了解命名规范？
👉 查看 [docs/naming/README_NAMING.md](./docs/naming/README_NAMING.md)

### 想要优化项目？
👉 查看 [docs/optimization/PROJECT_OPTIMIZATION_ANALYSIS.md](./docs/optimization/PROJECT_OPTIMIZATION_ANALYSIS.md)

---

## 📂 目录结构

```
项目根目录/
├── docs/                              # 📚 文档目录
│   ├── README.md                      # 文档总览
│   ├── naming/                        # 命名规范文档
│   │   ├── README_NAMING.md          # 从这里开始 ⭐
│   │   ├── NAMING_CONFLICT_SOLUTION.md  # 为什么用 App 前缀
│   │   ├── FILE_NAMING_STANDARDS.md  # 完整规范
│   │   ├── NAMING_COMPARISON.md      # 新旧对比
│   │   └── NAMING_REFACTOR_SUMMARY.md # 重构总结
│   └── optimization/                  # 优化文档
│       ├── PROJECT_OPTIMIZATION_ANALYSIS.md  # 优化分析
│       ├── QUICK_FIXES.md            # 快速修复
│       └── NEW_COMPONENTS_EXAMPLES.md # 新组件示例
│
└── scripts/                           # 🛠️ 脚本目录
    └── naming/                        # 命名相关脚本
        ├── step-by-step/              # 渐进式重命名 ⭐ 推荐
        │   ├── README.md              # 步骤说明
        │   ├── step1-fix-spelling.ps1
        │   ├── step2-rename-antd-folder.ps1
        │   ├── step3-rename-plugin-folder.ps1
        │   ├── step4-rename-antd-components.ps1
        │   └── step5-rename-plugin-components.ps1
        ├── check-naming.ps1           # 检查命名问题
        ├── rename-phase1.ps1          # 一键重命名（阶段1）
        └── rename-phase2-safe.ps1     # 一键重命名（阶段2）
```

---

## 🚀 开始使用

### 方案 A：渐进式重命名（推荐）⭐

**适合**：希望稳妥执行，每步测试的团队

```powershell
# 1. 阅读说明
cat scripts/naming/step-by-step/README.md

# 2. 执行步骤 1
powershell -ExecutionPolicy Bypass -File scripts/naming/step-by-step/step1-fix-spelling.ps1

# 3. 测试
npm run dev

# 4. 继续下一步...
```

**优点**：
- ✅ 风险可控
- ✅ 每步可测试
- ✅ 容易回滚
- ✅ 适合团队协作

---

### 方案 B：一键重命名（高级用户）

**适合**：熟悉项目，希望快速完成的开发者

```powershell
# 1. 检查问题
powershell -ExecutionPolicy Bypass -File scripts/naming/check-naming.ps1

# 2. 执行阶段 1
powershell -ExecutionPolicy Bypass -File scripts/naming/rename-phase1.ps1

# 3. 测试
npm run dev

# 4. 执行阶段 2
powershell -ExecutionPolicy Bypass -File scripts/naming/rename-phase2-safe.ps1

# 5. 全面测试
npm run dev
npm run lint
```

**优点**：
- ✅ 快速完成
- ✅ 自动化程度高

**缺点**：
- ⚠️ 一次性修改多个文件
- ⚠️ 需要更多测试时间

---

## 📖 文档说明

### 命名规范文档 (`docs/naming/`)

| 文档 | 说明 | 适合 |
|------|------|------|
| **README_NAMING.md** | 总览文档 | 所有人 ⭐ |
| **NAMING_CONFLICT_SOLUTION.md** | 为什么用 App 前缀 | 决策者 |
| **FILE_NAMING_STANDARDS.md** | 完整命名规范 | 开发者 |
| **NAMING_COMPARISON.md** | 新旧命名对比 | 开发者 |
| **NAMING_REFACTOR_SUMMARY.md** | 重构总结 | 项目经理 |

### 优化文档 (`docs/optimization/`)

| 文档 | 说明 | 适合 |
|------|------|------|
| **PROJECT_OPTIMIZATION_ANALYSIS.md** | 项目优化分析 | 所有人 |
| **QUICK_FIXES.md** | 快速修复建议 | 开发者 |
| **NEW_COMPONENTS_EXAMPLES.md** | 新组件示例 | 开发者 |

---

## 🛠️ 脚本说明

### 渐进式脚本 (`scripts/naming/step-by-step/`)

| 脚本 | 功能 | 风险 | 时间 |
|------|------|------|------|
| **step1-fix-spelling.ps1** | 修复拼写错误 | 🟢 低 | 5-10分钟 |
| **step2-rename-antd-folder.ps1** | 重命名 antd 文件夹 | 🟡 中 | 10-15分钟 |
| **step3-rename-plugin-folder.ps1** | 重命名 plugin 文件夹 | 🟡 中 | 10-15分钟 |
| **step4-rename-antd-components.ps1** | 重命名 antd 组件 | 🔴 高 | 30-45分钟 |
| **step5-rename-plugin-components.ps1** | 重命名 plugin 组件 | 🟡 中 | 15-20分钟 |

### 一键脚本 (`scripts/naming/`)

| 脚本 | 功能 | 说明 |
|------|------|------|
| **check-naming.ps1** | 检查命名问题 | 不修改文件，只检查 |
| **rename-phase1.ps1** | 阶段 1 重命名 | 修复拼写错误 |
| **rename-phase2-safe.ps1** | 阶段 2 重命名 | 统一组件命名（App前缀） |

---

## ⏱️ 时间估算

### 渐进式执行
- **步骤 1**：10-15 分钟（执行 + 测试）
- **步骤 2**：20-25 分钟（执行 + 测试）
- **步骤 3**：20-25 分钟（执行 + 测试）
- **步骤 4**：50-65 分钟（执行 + 测试）
- **步骤 5**：30-35 分钟（执行 + 测试）
- **总计**：2-3 小时

### 一键执行
- **阶段 1**：30-45 分钟（执行 + 测试）
- **阶段 2**：1-1.5 小时（执行 + 测试）
- **总计**：1.5-2 小时

---

## ✅ 执行建议

### 推荐方案（稳妥）
```
第 1 天：步骤 1 + 步骤 2
第 2 天：步骤 3
第 3 天：步骤 4
第 4 天：步骤 5
```

### 快速方案（适合小团队）
```
第 1 天：步骤 1 + 步骤 2 + 步骤 3
第 2 天：步骤 4 + 步骤 5
```

---

## 🚨 注意事项

### 执行前
- ✅ 创建新分支
- ✅ 确保所有更改已提交
- ✅ 通知团队成员
- ✅ 选择非工作时间

### 执行中
- ✅ 每步执行后立即测试
- ✅ 检查控制台错误
- ✅ 测试关键功能
- ✅ 及时提交更改

### 执行后
- ✅ 全面功能测试
- ✅ 代码审查
- ✅ 更新文档
- ✅ 通知团队

---

## 📞 获取帮助

### 遇到问题？
1. 查看 [scripts/naming/step-by-step/README.md](./scripts/naming/step-by-step/README.md) 的故障排除
2. 查看 [docs/naming/NAMING_CONFLICT_SOLUTION.md](./docs/naming/NAMING_CONFLICT_SOLUTION.md) 的详细说明
3. 使用 `git log --follow <file>` 查看文件历史

### 常见问题
- **Q**: 为什么要用 App 前缀？
- **A**: 避免与 Ant Design 原生组件冲突，详见 [NAMING_CONFLICT_SOLUTION.md](./docs/naming/NAMING_CONFLICT_SOLUTION.md)

- **Q**: 可以跳过某个步骤吗？
- **A**: 不建议，步骤之间有依赖关系

- **Q**: 如何回滚？
- **A**: `git reset --hard HEAD~1` 或切换回原始分支

---

## 🎉 完成后

恭喜！你的项目现在拥有：
- ✅ 统一的文件命名规范
- ✅ 清晰的目录结构
- ✅ 无冲突的组件命名
- ✅ 更好的代码可读性

---

**开始执行**:
```powershell
powershell -ExecutionPolicy Bypass -File scripts/naming/step-by-step/step1-fix-spelling.ps1
```

**创建时间**: 2026-02-28
