# 步骤 5：重命名 Plugin 组件（移除 i 前缀）
# 影响范围：12 个组件文件夹
# 预计时间：15-20 分钟
# 风险等级：中

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "步骤 5：重命名 Plugin 组件" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "本步骤将：" -ForegroundColor Yellow
Write-Host "  1. 移除所有 Plugin 组件的 i 前缀" -ForegroundColor White
Write-Host "  2. 更新所有导入路径" -ForegroundColor White
Write-Host ""
Write-Host "示例：" -ForegroundColor Gray
Write-Host "  iCodeEditor → CodeEditor" -ForegroundColor Gray
Write-Host "  iMarkdown → Markdown" -ForegroundColor Gray
Write-Host "  iGridLayout → GridLayout" -ForegroundColor Gray
Write-Host ""
Write-Host "影响范围：12 个组件" -ForegroundColor Gray
Write-Host "预计时间：15-20 分钟" -ForegroundColor Gray
Write-Host "风险等级：中" -ForegroundColor Yellow
Write-Host ""

$confirmation = Read-Host "是否继续？(输入 y 继续)"
if ($confirmation -ne "y") {
    Write-Host "已取消操作。" -ForegroundColor Yellow
    exit 0
}

Write-Host ""

$components = @(
    @{old="iAnimateComponent"; new="AnimateComponent"},
    @{old="iCodeEditor"; new="CodeEditor"},
    @{old="iCopy"; new="Copy"},
    @{old="iEasyTyper"; new="EasyTyper"},
    @{old="iFullscreen"; new="Fullscreen"},
    @{old="iGridLayout"; new="GridLayout"},
    @{old="iInfiniteScroll"; new="InfiniteScroll"},
    @{old="iInnerHTML"; new="InnerHTML"},
    @{old="iLoading"; new="Loading"},
    @{old="iMarkdown"; new="Markdown"},
    @{old="iResponsive"; new="Responsive"},
    @{old="iTransition"; new="Transition"}
)

$renameCount = 0
$total = $components.Count

Write-Host "开始重命名 $total 个组件..." -ForegroundColor Yellow
Write-Host ""

# 1. 重命名文件夹
Write-Host "[1/2] 重命名组件文件夹" -ForegroundColor Cyan
$current = 0
foreach ($component in $components) {
    $current++
    $oldPath = "src/components/plugin/$($component.old)"
    $newPath = "src/components/plugin/$($component.new)"
    
    if (Test-Path $oldPath) {
        $isGitRepo = Test-Path ".git"
        if ($isGitRepo) {
            git mv $oldPath $newPath 2>$null
            if ($LASTEXITCODE -eq 0) {
                Write-Host "[$current/$total] ✓ $($component.old) → $($component.new)" -ForegroundColor Green
                $renameCount++
            } else {
                Rename-Item -Path $oldPath -NewName $component.new -Force
                Write-Host "[$current/$total] ✓ $($component.old) → $($component.new)" -ForegroundColor Green
                $renameCount++
            }
        } else {
            Rename-Item -Path $oldPath -NewName $component.new -Force
            Write-Host "[$current/$total] ✓ $($component.old) → $($component.new)" -ForegroundColor Green
            $renameCount++
        }
    } else {
        Write-Host "[$current/$total] ⊘ 跳过: $($component.old)" -ForegroundColor Gray
    }
}

Write-Host ""

# 2. 更新导入路径
Write-Host "[2/2] 更新导入路径" -ForegroundColor Cyan
$filesToUpdate = Get-ChildItem -Path "src" -Recurse -Include "*.tsx","*.ts" -File
$updateCount = 0

foreach ($file in $filesToUpdate) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    $originalContent = $content
    
    # 替换导入路径
    foreach ($component in $components) {
        $content = $content -replace "from '@/components/plugin/$($component.old)'", "from '@/components/plugin/$($component.new)'"
        $content = $content -replace "from '@/components/plugin/$($component.old)/", "from '@/components/plugin/$($component.new)/"
    }
    
    if ($content -ne $originalContent) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
        $updateCount++
    }
}

Write-Host "✓ 更新了 $updateCount 个文件" -ForegroundColor Green

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "步骤 5 完成！" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "重命名组件数: $renameCount" -ForegroundColor Yellow
Write-Host "更新文件数: $updateCount" -ForegroundColor Yellow
Write-Host ""
Write-Host "🎉 所有重命名步骤已完成！" -ForegroundColor Green
Write-Host ""
Write-Host "最后步骤：" -ForegroundColor Cyan
Write-Host "1. 运行 'npm run dev' 全面测试" -ForegroundColor White
Write-Host "2. 运行 'npm run lint' 检查代码规范" -ForegroundColor White
Write-Host "3. 测试所有页面和功能" -ForegroundColor White
Write-Host "4. 提交更改：" -ForegroundColor White
Write-Host "   git add ." -ForegroundColor Yellow
Write-Host "   git commit -m 'refactor: standardize file naming conventions'" -ForegroundColor Yellow
Write-Host ""
