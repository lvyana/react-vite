# 步骤 2：重命名 antdComponents 文件夹
# 影响范围：1 个文件夹，所有导入路径
# 预计时间：10-15 分钟
# 风险等级：中

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "步骤 2：重命名 antdComponents 文件夹" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "本步骤将：" -ForegroundColor Yellow
Write-Host "  1. 创建 src/components 目录" -ForegroundColor White
Write-Host "  2. 移动 antdComponents → components/antd" -ForegroundColor White
Write-Host "  3. 更新所有导入路径" -ForegroundColor White
Write-Host ""
Write-Host "影响范围：所有导入 antdComponents 的文件" -ForegroundColor Gray
Write-Host "预计时间：10-15 分钟" -ForegroundColor Gray
Write-Host "风险等级：中" -ForegroundColor Yellow
Write-Host ""

$confirmation = Read-Host "是否继续？(输入 y 继续)"
if ($confirmation -ne "y") {
    Write-Host "已取消操作。" -ForegroundColor Yellow
    exit 0
}

Write-Host ""

# 1. 创建 components 目录
Write-Host "[1/3] 创建 components 目录" -ForegroundColor Cyan
if (-not (Test-Path "src/components")) {
    New-Item -ItemType Directory -Path "src/components" -Force | Out-Null
    Write-Host "✓ 创建: src/components/" -ForegroundColor Green
} else {
    Write-Host "⊘ 已存在: src/components/" -ForegroundColor Gray
}

Write-Host ""

# 2. 移动文件夹
Write-Host "[2/3] 移动 antdComponents → components/antd" -ForegroundColor Cyan
if (Test-Path "src/antdComponents") {
    $isGitRepo = Test-Path ".git"
    if ($isGitRepo) {
        git mv "src/antdComponents" "src/components/antd" 2>$null
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✓ git mv: antdComponents → components/antd" -ForegroundColor Green
        } else {
            Move-Item -Path "src/antdComponents" -Destination "src/components/antd" -Force
            Write-Host "✓ move: antdComponents → components/antd" -ForegroundColor Green
        }
    } else {
        Move-Item -Path "src/antdComponents" -Destination "src/components/antd" -Force
        Write-Host "✓ move: antdComponents → components/antd" -ForegroundColor Green
    }
} else {
    Write-Host "⊘ 跳过（不存在）: src/antdComponents" -ForegroundColor Gray
}

Write-Host ""

# 3. 更新导入路径
Write-Host "[3/3] 更新导入路径" -ForegroundColor Cyan
$filesToUpdate = Get-ChildItem -Path "src" -Recurse -Include "*.tsx","*.ts" -File
$updateCount = 0

foreach ($file in $filesToUpdate) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    $originalContent = $content
    
    # 替换导入路径
    $content = $content -replace "@/antdComponents/", "@/components/antd/"
    $content = $content -replace "from 'antdComponents/", "from 'components/antd/"
    
    if ($content -ne $originalContent) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
        $updateCount++
    }
}

Write-Host "✓ 更新了 $updateCount 个文件的导入路径" -ForegroundColor Green

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "步骤 2 完成！" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "下一步：" -ForegroundColor Cyan
Write-Host "1. 运行 'npm run dev' 测试项目" -ForegroundColor White
Write-Host "2. 检查所有页面是否正常" -ForegroundColor White
Write-Host "3. 如果正常，运行步骤 3：" -ForegroundColor White
Write-Host "   powershell -ExecutionPolicy Bypass -File scripts/naming/step-by-step/step3-rename-plugin-folder.ps1" -ForegroundColor Yellow
Write-Host ""
