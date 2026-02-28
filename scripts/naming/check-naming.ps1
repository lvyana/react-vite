# 文件命名检查脚本
# 使用方法：在项目根目录运行 powershell -ExecutionPolicy Bypass -File scripts/check-naming.ps1

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "文件命名规范检查" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$issues = @()

# ============================================
# 1. 检查拼写错误
# ============================================
Write-Host "1. 检查拼写错误..." -ForegroundColor Yellow

$spellingErrors = Get-ChildItem -Path "src" -Recurse -File | Where-Object {
    $_.Name -match "Seach|compoment"
}

if ($spellingErrors.Count -gt 0) {
    Write-Host "   发现 $($spellingErrors.Count) 个拼写错误：" -ForegroundColor Red
    foreach ($file in $spellingErrors) {
        Write-Host "   - $($file.FullName)" -ForegroundColor Red
        $issues += "拼写错误: $($file.FullName)"
    }
} else {
    Write-Host "   ✓ 未发现拼写错误" -ForegroundColor Green
}

Write-Host ""

# ============================================
# 2. 检查组件命名（i 前缀）
# ============================================
Write-Host "2. 检查组件命名（i 前缀）..." -ForegroundColor Yellow

$iPrefixComponents = Get-ChildItem -Path "src" -Recurse -Directory | Where-Object {
    $_.Name -match "^i[A-Z]"
}

if ($iPrefixComponents.Count -gt 0) {
    Write-Host "   发现 $($iPrefixComponents.Count) 个使用 i 前缀的组件：" -ForegroundColor Red
    foreach ($dir in $iPrefixComponents) {
        Write-Host "   - $($dir.FullName)" -ForegroundColor Red
        $issues += "i 前缀: $($dir.FullName)"
    }
} else {
    Write-Host "   ✓ 未发现 i 前缀组件" -ForegroundColor Green
}

Write-Host ""

# ============================================
# 3. 检查临时文件
# ============================================
Write-Host "3. 检查临时文件..." -ForegroundColor Yellow

$tempFiles = Get-ChildItem -Path "src" -Recurse -File | Where-Object {
    $_.Name -match "copy|temp|tmp|backup|old"
}

if ($tempFiles.Count -gt 0) {
    Write-Host "   发现 $($tempFiles.Count) 个临时文件：" -ForegroundColor Red
    foreach ($file in $tempFiles) {
        Write-Host "   - $($file.FullName)" -ForegroundColor Red
        $issues += "临时文件: $($file.FullName)"
    }
} else {
    Write-Host "   ✓ 未发现临时文件" -ForegroundColor Green
}

Write-Host ""

# ============================================
# 4. 检查 React 组件命名
# ============================================
Write-Host "4. 检查 React 组件命名（应使用 PascalCase）..." -ForegroundColor Yellow

$componentFiles = Get-ChildItem -Path "src/components","src/views" -Recurse -Include "*.tsx" -File -ErrorAction SilentlyContinue | Where-Object {
    $_.Name -ne "index.tsx" -and $_.Name -notmatch "^[A-Z][a-zA-Z0-9]*\.tsx$"
}

if ($componentFiles.Count -gt 0) {
    Write-Host "   发现 $($componentFiles.Count) 个命名不规范的组件：" -ForegroundColor Red
    foreach ($file in $componentFiles) {
        Write-Host "   - $($file.FullName)" -ForegroundColor Red
        $issues += "组件命名: $($file.FullName)"
    }
} else {
    Write-Host "   ✓ 组件命名规范" -ForegroundColor Green
}

Write-Host ""

# ============================================
# 5. 检查 Hooks 命名
# ============================================
Write-Host "5. 检查 Hooks 命名（应以 use 开头）..." -ForegroundColor Yellow

$hooksFiles = Get-ChildItem -Path "src/hooks","src/useHooks" -Recurse -Include "*.ts","*.tsx" -File -ErrorAction SilentlyContinue | Where-Object {
    $_.Name -ne "index.ts" -and $_.Name -ne "index.tsx" -and $_.Name -notmatch "^use[A-Z]"
}

if ($hooksFiles.Count -gt 0) {
    Write-Host "   发现 $($hooksFiles.Count) 个命名不规范的 Hooks：" -ForegroundColor Red
    foreach ($file in $hooksFiles) {
        Write-Host "   - $($file.FullName)" -ForegroundColor Red
        $issues += "Hooks 命名: $($file.FullName)"
    }
} else {
    Write-Host "   ✓ Hooks 命名规范" -ForegroundColor Green
}

Write-Host ""

# ============================================
# 6. 检查重复的文件夹
# ============================================
Write-Host "6. 检查重复的文件夹..." -ForegroundColor Yellow

$duplicateDirs = @()

if ((Test-Path "src/hooks") -and (Test-Path "src/useHooks")) {
    Write-Host "   发现重复：hooks 和 useHooks" -ForegroundColor Red
    $duplicateDirs += "hooks 和 useHooks"
    $issues += "重复文件夹: hooks 和 useHooks"
}

if ((Test-Path "src/antdComponents") -and (Test-Path "src/components/antd")) {
    Write-Host "   发现重复：antdComponents 和 components/antd" -ForegroundColor Red
    $duplicateDirs += "antdComponents 和 components/antd"
    $issues += "重复文件夹: antdComponents 和 components/antd"
}

if ((Test-Path "src/pluginComponents") -and (Test-Path "src/components/plugin")) {
    Write-Host "   发现重复：pluginComponents 和 components/plugin" -ForegroundColor Red
    $duplicateDirs += "pluginComponents 和 components/plugin"
    $issues += "重复文件夹: pluginComponents 和 components/plugin"
}

if ($duplicateDirs.Count -eq 0) {
    Write-Host "   ✓ 未发现重复文件夹" -ForegroundColor Green
}

Write-Host ""

# ============================================
# 总结
# ============================================
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "检查完成" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

if ($issues.Count -eq 0) {
    Write-Host "✓ 所有文件命名规范！" -ForegroundColor Green
} else {
    Write-Host "发现 $($issues.Count) 个问题" -ForegroundColor Red
    Write-Host ""
    Write-Host "建议操作：" -ForegroundColor Yellow
    Write-Host "1. 运行 'powershell -ExecutionPolicy Bypass -File scripts/rename-phase1.ps1' 修复拼写错误" -ForegroundColor White
    Write-Host "2. 运行 'powershell -ExecutionPolicy Bypass -File scripts/rename-phase2.ps1' 统一组件命名" -ForegroundColor White
}

Write-Host ""

# 返回错误代码
if ($issues.Count -gt 0) {
    exit 1
} else {
    exit 0
}
