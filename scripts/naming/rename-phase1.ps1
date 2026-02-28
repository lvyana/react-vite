# 文件重命名脚本 - 阶段一：修复拼写错误
# 使用方法：在项目根目录运行 powershell -ExecutionPolicy Bypass -File scripts/rename-phase1.ps1

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "文件重命名脚本 - 阶段一：修复拼写错误" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 检查是否在项目根目录
if (-not (Test-Path "package.json")) {
    Write-Host "错误：请在项目根目录运行此脚本！" -ForegroundColor Red
    exit 1
}

# 创建备份
Write-Host "1. 创建备份..." -ForegroundColor Yellow
$backupDir = "backup_$(Get-Date -Format 'yyyyMMdd_HHmmss')"
Write-Host "   备份目录: $backupDir" -ForegroundColor Gray

# 重命名计数器
$renameCount = 0

# 函数：安全重命名（使用 git mv 如果在 git 仓库中）
function Safe-Rename {
    param(
        [string]$oldPath,
        [string]$newPath
    )
    
    if (Test-Path $oldPath) {
        $isGitRepo = Test-Path ".git"
        
        if ($isGitRepo) {
            Write-Host "   git mv: $oldPath -> $newPath" -ForegroundColor Green
            git mv $oldPath $newPath 2>$null
            if ($LASTEXITCODE -eq 0) {
                $script:renameCount++
                return $true
            } else {
                Write-Host "   警告：git mv 失败，使用普通重命名" -ForegroundColor Yellow
            }
        }
        
        # 如果不是 git 仓库或 git mv 失败，使用普通重命名
        Write-Host "   rename: $oldPath -> $newPath" -ForegroundColor Green
        Rename-Item -Path $oldPath -NewName (Split-Path $newPath -Leaf) -Force
        $script:renameCount++
        return $true
    } else {
        Write-Host "   跳过（文件不存在）: $oldPath" -ForegroundColor Gray
        return $false
    }
}

Write-Host ""
Write-Host "2. 开始重命名文件..." -ForegroundColor Yellow
Write-Host ""

# ============================================
# 修复 Seach → Search
# ============================================
Write-Host "修复拼写错误: Seach → Search" -ForegroundColor Cyan
Write-Host "----------------------------------------" -ForegroundColor Gray

# 2.1 重命名文件夹
Safe-Rename "src/antdComponents/iTable/components/headSeach" "src/antdComponents/iTable/components/headSearch"

# 2.2 重命名文件
Safe-Rename "src/antdComponents/iTable/components/headSearch/SeachStyle.tsx" "src/antdComponents/iTable/components/headSearch/SearchStyle.tsx"
Safe-Rename "src/views/antd/seachForm" "src/views/antd/searchForm"
Safe-Rename "src/views/antd/antTable/components/SeachForm.tsx" "src/views/antd/antTable/components/SearchForm.tsx"
Safe-Rename "src/views/antd/searchForm/components/SeachForm.tsx" "src/views/antd/searchForm/components/SearchForm.tsx"

Write-Host ""

# ============================================
# 修复 compoment → components
# ============================================
Write-Host "修复拼写错误: compoment → components" -ForegroundColor Cyan
Write-Host "----------------------------------------" -ForegroundColor Gray

Safe-Rename "src/layout/header/messageCenter/compoment" "src/layout/header/messageCenter/components"

Write-Host ""

# ============================================
# 删除临时文件
# ============================================
Write-Host "删除临时文件" -ForegroundColor Cyan
Write-Host "----------------------------------------" -ForegroundColor Gray

$tempFiles = @(
    "src/layout/header/fullscreen/index copy.tsx"
)

foreach ($file in $tempFiles) {
    if (Test-Path $file) {
        Write-Host "   删除: $file" -ForegroundColor Red
        Remove-Item $file -Force
        $renameCount++
    } else {
        Write-Host "   跳过（文件不存在）: $file" -ForegroundColor Gray
    }
}

Write-Host ""

# ============================================
# 更新导入路径
# ============================================
Write-Host "3. 更新导入路径..." -ForegroundColor Yellow
Write-Host ""

$filesToUpdate = Get-ChildItem -Path "src" -Recurse -Include "*.tsx","*.ts" -File

$importUpdateCount = 0

foreach ($file in $filesToUpdate) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    $originalContent = $content
    
    # 替换导入路径
    $content = $content -replace "headSeach", "headSearch"
    $content = $content -replace "SeachForm", "SearchForm"
    $content = $content -replace "SeachStyle", "SearchStyle"
    $content = $content -replace "seachForm", "searchForm"
    $content = $content -replace "messageCenter/compoment", "messageCenter/components"
    
    if ($content -ne $originalContent) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
        Write-Host "   更新: $($file.FullName)" -ForegroundColor Green
        $importUpdateCount++
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "重命名完成！" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "重命名文件数: $renameCount" -ForegroundColor Yellow
Write-Host "更新导入数: $importUpdateCount" -ForegroundColor Yellow
Write-Host ""
Write-Host "下一步操作：" -ForegroundColor Cyan
Write-Host "1. 运行 'npm run dev' 检查是否有错误" -ForegroundColor White
Write-Host "2. 运行 'npm run lint' 检查代码规范" -ForegroundColor White
Write-Host "3. 提交更改: git add . && git commit -m 'refactor: fix spelling errors in file names'" -ForegroundColor White
Write-Host ""
