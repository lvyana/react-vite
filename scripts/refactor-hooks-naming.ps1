# Hooks 命名统一重构脚本
# 执行前请确保已提交所有更改

Write-Host "=== Hooks 命名统一重构 ===" -ForegroundColor Cyan
Write-Host ""

Write-Host "步骤 1: 合并 src/useHooks/ 到 src/hooks/" -ForegroundColor Green

# 移动 useHooks 目录下的所有文件到 hooks 目录
if (Test-Path "src/useHooks") {
    Get-ChildItem "src/useHooks" -File | ForEach-Object {
        $destPath = "src/hooks/$($_.Name)"
        Write-Host "  移动: $($_.Name) -> hooks/$($_.Name)"
        git mv $_.FullName $destPath
    }
    
    # 删除空的 useHooks 目录
    if ((Get-ChildItem "src/useHooks" -File).Count -eq 0) {
        Remove-Item "src/useHooks" -Force
        Write-Host "  删除空目录: src/useHooks" -ForegroundColor Gray
    }
}

Write-Host ""
Write-Host "步骤 2: 重命名 useHooks 目录为 hooks" -ForegroundColor Green

# 重命名各个 useHooks 目录
$dirsToRename = @(
    "src/layout/useHooks",
    "src/views/antd/antTable/useHooks",
    "src/views/antd/searchForm/useHooks",
    "src/views/plugin/dnd/useHooks"
)

foreach ($dir in $dirsToRename) {
    if (Test-Path $dir) {
        $newDir = $dir -replace "useHooks", "hooks"
        Write-Host "  重命名: $dir -> $newDir"
        git mv $dir $newDir
    }
}

Write-Host ""
Write-Host "步骤 3: 重命名 useHooksApi.tsx 为 useApi.tsx" -ForegroundColor Green

$filesToRename = @(
    @{Old="src/views/antd/searchForm/useHooksApi.tsx"; New="src/views/antd/searchForm/hooks/useApi.tsx"}
)

foreach ($file in $filesToRename) {
    if (Test-Path $file.Old) {
        # 确保目标目录存在
        $targetDir = Split-Path $file.New -Parent
        if (-not (Test-Path $targetDir)) {
            New-Item -ItemType Directory -Path $targetDir -Force | Out-Null
        }
        Write-Host "  重命名: $($file.Old) -> $($file.New)"
        git mv $file.Old $file.New
    }
}

Write-Host ""
Write-Host "步骤 4: 创建组件 hooks 目录结构" -ForegroundColor Green

# 为组件创建 hooks 目录并移动文件
$componentHooks = @(
    @{File="src/components/antd/AppForm/useHooks.tsx"; NewDir="src/components/antd/AppForm/hooks"; NewName="useForm.tsx"},
    @{File="src/components/antd/AppModal/useHooks.tsx"; NewDir="src/components/antd/AppModal/hooks"; NewName="useModal.tsx"},
    @{File="src/components/antd/AppTable/useHooks.tsx"; NewDir="src/components/antd/AppTable/hooks"; NewName="useTable.tsx"}
)

foreach ($hook in $componentHooks) {
    if (Test-Path $hook.File) {
        # 创建 hooks 目录
        if (-not (Test-Path $hook.NewDir)) {
            New-Item -ItemType Directory -Path $hook.NewDir -Force | Out-Null
        }
        $newPath = Join-Path $hook.NewDir $hook.NewName
        Write-Host "  移动: $($hook.File) -> $newPath"
        git mv $hook.File $newPath
    }
}

Write-Host ""
Write-Host "✅ 文件和目录重命名完成!" -ForegroundColor Green
Write-Host ""
Write-Host "下一步: 运行 update-hooks-imports.ps1 更新所有导入路径" -ForegroundColor Yellow
