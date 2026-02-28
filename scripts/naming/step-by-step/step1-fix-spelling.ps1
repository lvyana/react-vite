# 步骤 1：修复拼写错误
# 影响范围：约 10 个文件
# 预计时间：5-10 分钟
# 风险等级：低

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "步骤 1：修复拼写错误" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "本步骤将修复：" -ForegroundColor Yellow
Write-Host "  1. Seach → Search" -ForegroundColor White
Write-Host "  2. compoment → components" -ForegroundColor White
Write-Host "  3. 删除临时文件" -ForegroundColor White
Write-Host ""
Write-Host "影响范围：约 10 个文件" -ForegroundColor Gray
Write-Host "预计时间：5-10 分钟" -ForegroundColor Gray
Write-Host "风险等级：低" -ForegroundColor Green
Write-Host ""

$confirmation = Read-Host "是否继续？(输入 y 继续)"
if ($confirmation -ne "y") {
    Write-Host "已取消操作。" -ForegroundColor Yellow
    exit 0
}

Write-Host ""
$renameCount = 0

function Safe-Rename {
    param([string]$oldPath, [string]$newPath)
    if (Test-Path $oldPath) {
        $isGitRepo = Test-Path ".git"
        if ($isGitRepo) {
            git mv $oldPath $newPath 2>$null
            if ($LASTEXITCODE -eq 0) {
                Write-Host "✓ $oldPath → $newPath" -ForegroundColor Green
                $script:renameCount++
                return $true
            }
        }
        Rename-Item -Path $oldPath -NewName (Split-Path $newPath -Leaf) -Force
        Write-Host "✓ $oldPath → $newPath" -ForegroundColor Green
        $script:renameCount++
        return $true
    }
    Write-Host "⊘ 跳过（不存在）: $oldPath" -ForegroundColor Gray
    return $false
}

Write-Host "开始重命名..." -ForegroundColor Yellow
Write-Host ""

# 1. 修复 Seach → Search
Write-Host "[1/3] 修复 Seach → Search" -ForegroundColor Cyan
Safe-Rename "src/antdComponents/iTable/components/headSeach" "src/antdComponents/iTable/components/headSearch"
Safe-Rename "src/antdComponents/iTable/components/headSearch/SeachStyle.tsx" "src/antdComponents/iTable/components/headSearch/SearchStyle.tsx"
Safe-Rename "src/views/antd/seachForm" "src/views/antd/searchForm"
Safe-Rename "src/views/antd/antTable/components/SeachForm.tsx" "src/views/antd/antTable/components/SearchForm.tsx"
Safe-Rename "src/views/antd/searchForm/components/SeachForm.tsx" "src/views/antd/searchForm/components/SearchForm.tsx"

Write-Host ""

# 2. 修复 compoment → components
Write-Host "[2/3] 修复 compoment → components" -ForegroundColor Cyan
Safe-Rename "src/layout/header/messageCenter/compoment" "src/layout/header/messageCenter/components"

Write-Host ""

# 3. 删除临时文件
Write-Host "[3/3] 删除临时文件" -ForegroundColor Cyan
if (Test-Path "src/layout/header/fullscreen/index copy.tsx") {
    Remove-Item "src/layout/header/fullscreen/index copy.tsx" -Force
    Write-Host "✓ 删除: index copy.tsx" -ForegroundColor Green
    $renameCount++
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "步骤 1 完成！" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "修改文件数: $renameCount" -ForegroundColor Yellow
Write-Host ""
Write-Host "下一步：" -ForegroundColor Cyan
Write-Host "1. 运行 'npm run dev' 测试项目" -ForegroundColor White
Write-Host "2. 检查页面是否正常显示" -ForegroundColor White
Write-Host "3. 如果正常，运行步骤 2：" -ForegroundColor White
Write-Host "   powershell -ExecutionPolicy Bypass -File scripts/naming/step-by-step/step2-rename-antd-folder.ps1" -ForegroundColor Yellow
Write-Host ""
