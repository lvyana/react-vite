# 文件重命名脚本使用指南

## 📋 脚本说明

本目录包含三个 PowerShell 脚本，用于统一项目文件命名规范：

1. **check-naming.ps1** - 检查文件命名问题
2. **rename-phase1.ps1** - 阶段一：修复拼写错误
3. **rename-phase2.ps1** - 阶段二：统一组件命名

## 🚀 使用步骤

### 步骤 1：检查当前问题

```powershell
# 在项目根目录运行
powershell -ExecutionPolicy Bypass -File scripts/check-naming.ps1
```

这个脚本会检查：
- ✓ 拼写错误（Seach、compoment 等）
- ✓ i 前缀组件
- ✓ 临时文件
- ✓ 组件命名规范
- ✓ Hooks 命名规范
- ✓ 重复文件夹

### 步骤 2：执行阶段一重命名（修复拼写错误）

```powershell
# 在项目根目录运行
powershell -ExecutionPolicy Bypass -File scripts/rename-phase1.ps1
```

这个脚本会：
- ✅ 修复 Seach → Search
- ✅ 修复 compoment → components
- ✅ 删除临时文件（index copy.tsx）
- ✅ 自动更新所有导入路径

**执行后请务必：**
```bash
# 1. 测试项目是否正常运行
npm run dev

# 2. 检查代码规范
npm run lint

# 3. 提交更改
git add .
git commit -m "refactor: fix spelling errors in file names"
```

### 步骤 3：执行阶段二重命名（统一组件命名）

⚠️ **警告：此步骤会进行大量重命名，建议先完成阶段一并测试无误后再执行！**

```powershell
# 在项目根目录运行
powershell -ExecutionPolicy Bypass -File scripts/rename-phase2.ps1
```

这个脚本会：
- ✅ 重命名 antdComponents → components/antd
- ✅ 移除所有组件的 i 前缀
- ✅ 重命名 pluginComponents → components/plugin
- ✅ 自动更新所有导入路径

**执行后请务必：**
```bash
# 1. 测试项目是否正常运行
npm run dev

# 2. 检查代码规范
npm run lint

# 3. 手动检查并修复任何遗漏的导入

# 4. 提交更改
git add .
git commit -m "refactor: unify component naming conventions"
```

## 📝 重命名对照表

### 阶段一：拼写错误修复

| 原名称 | 新名称 |
|--------|--------|
| `headSeach` | `headSearch` |
| `SeachForm.tsx` | `SearchForm.tsx` |
| `SeachStyle.tsx` | `SearchStyle.tsx` |
| `seachForm/` | `searchForm/` |
| `compoment/` | `components/` |
| `index copy.tsx` | 删除 |

### 阶段二：组件命名统一

#### 文件夹重命名
| 原名称 | 新名称 |
|--------|--------|
| `src/antdComponents/` | `src/components/antd/` |
| `src/pluginComponents/` | `src/components/plugin/` |

#### Antd 组件重命名
| 原名称 | 新名称 |
|--------|--------|
| `iButton/` | `Button/` |
| `iCard/` | `Card/` |
| `iTable/` | `Table/` |
| `iForm/` | `Form/` |
| `iModal/` | `Modal/` |
| `iInput/` | `Input/` |
| `iSelect/` | `Select/` |
| `iPagination/` | `Pagination/` |
| `iUpload/` | `Upload/` |
| `notFound/` | `NotFound/` |
| ... | ... |

#### Plugin 组件重命名
| 原名称 | 新名称 |
|--------|--------|
| `iCodeEditor/` | `CodeEditor/` |
| `iMarkdown/` | `Markdown/` |
| `iGridLayout/` | `GridLayout/` |
| `iFullscreen/` | `Fullscreen/` |
| `iLoading/` | `Loading/` |
| ... | ... |

## 🔍 导入路径变化

### 阶段一后
```typescript
// ❌ 旧的导入
import SearchForm from '@/antdComponents/iTable/components/headSeach/SeachForm';

// ✅ 新的导入
import SearchForm from '@/antdComponents/iTable/components/headSearch/SearchForm';
```

### 阶段二后
```typescript
// ❌ 旧的导入
import Ibutton from '@/antdComponents/iButton';
import Icard from '@/antdComponents/iCard';
import IcodeEditor from '@/pluginComponents/iCodeEditor';

// ✅ 新的导入
import Button from '@/components/antd/Button';
import Card from '@/components/antd/Card';
import CodeEditor from '@/components/plugin/CodeEditor';
```

## ⚠️ 注意事项

### 1. 备份
脚本会自动使用 `git mv` 保留文件历史，但建议在执行前：
```bash
# 创建新分支
git checkout -b refactor/file-naming

# 或者手动备份
cp -r src src_backup
```

### 2. Git 状态
确保在执行脚本前：
```bash
# 提交或暂存所有更改
git status

# 如果有未提交的更改
git add .
git commit -m "save: work in progress"
```

### 3. 分步执行
建议分阶段执行，每个阶段完成后：
1. 运行 `npm run dev` 测试
2. 运行 `npm run lint` 检查
3. 手动检查关键页面
4. 提交更改

### 4. 手动检查
脚本可能无法处理所有情况，执行后请手动检查：
- 动态导入路径
- 字符串中的路径引用
- 注释中的路径
- 配置文件中的路径

## 🛠️ 故障排除

### 问题 1：PowerShell 执行策略错误
```powershell
# 临时允许脚本执行
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass

# 然后运行脚本
.\scripts\check-naming.ps1
```

### 问题 2：Git 命令失败
如果 `git mv` 失败，脚本会自动回退到普通重命名。
手动修复：
```bash
# 查看 git 状态
git status

# 手动添加更改
git add -A
```

### 问题 3：导入路径未更新
手动搜索并替换：
```bash
# 使用 VS Code 全局搜索替换
# 搜索：@/antdComponents/
# 替换：@/components/antd/
```

### 问题 4：项目无法启动
```bash
# 1. 清理缓存
rm -rf node_modules/.vite
rm -rf dist

# 2. 重新安装依赖
npm install

# 3. 重新启动
npm run dev
```

## 📚 相关文档

- [FILE_NAMING_STANDARDS.md](../FILE_NAMING_STANDARDS.md) - 完整的命名规范文档
- [PROJECT_OPTIMIZATION_ANALYSIS.md](../PROJECT_OPTIMIZATION_ANALYSIS.md) - 项目优化分析
- [QUICK_FIXES.md](../QUICK_FIXES.md) - 快速修复建议

## 🎯 执行建议

### 推荐执行顺序

1. **第一天**：
   - 运行 `check-naming.ps1` 了解问题
   - 阅读 `FILE_NAMING_STANDARDS.md`
   - 创建新分支

2. **第二天**：
   - 运行 `rename-phase1.ps1`
   - 测试项目
   - 提交更改

3. **第三天**：
   - 运行 `rename-phase2.ps1`
   - 全面测试
   - 修复遗漏的导入
   - 提交更改

4. **第四天**：
   - 代码审查
   - 合并到主分支

### 时间估算
- 阶段一：30分钟 - 1小时
- 阶段二：2-3小时
- 测试和修复：1-2小时
- 总计：4-6小时

## 💡 提示

1. 在非工作时间执行，避免影响团队开发
2. 通知团队成员即将进行的重命名
3. 更新文档和 README
4. 考虑在 CI/CD 中添加命名检查

---

**最后更新**: 2026-02-28
**维护者**: Kiro AI Assistant
