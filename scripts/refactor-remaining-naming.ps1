# 重构剩余的命名不规范文件
# 执行时间: 2026-02-28

Write-Host "开始重构剩余的命名不规范文件..." -ForegroundColor Green

# 1. 重命名 useContext 相关文件
Write-Host "`n1. 重命名 useContext 相关文件" -ForegroundColor Yellow
if (Test-Path "src/views/react/hooks/useContext/Icontext.tsx") {
    git mv "src/views/react/hooks/useContext/Icontext.tsx" "src/views/react/hooks/useContext/context.tsx"
    Write-Host "  ✓ Icontext.tsx → context.tsx" -ForegroundColor Green
}

if (Test-Path "src/views/react/hooks/useContext/IuseReducer.tsx") {
    git mv "src/views/react/hooks/useContext/IuseReducer.tsx" "src/views/react/hooks/useContext/useReducer.tsx"
    Write-Host "  ✓ IuseReducer.tsx → useReducer.tsx" -ForegroundColor Green
}

# 2. 创建 router/hooks 目录并移动文件
Write-Host "`n2. 重构 router useHooks" -ForegroundColor Yellow
if (-not (Test-Path "src/router/hooks")) {
    New-Item -ItemType Directory -Path "src/router/hooks" -Force | Out-Null
    Write-Host "  ✓ 创建 src/router/hooks 目录" -ForegroundColor Green
}

if (Test-Path "src/router/useHooks.tsx") {
    git mv "src/router/useHooks.tsx" "src/router/hooks/useRouter.tsx"
    Write-Host "  ✓ useHooks.tsx → hooks/useRouter.tsx" -ForegroundColor Green
}

# 3. 创建 editPersonnel/hooks 目录并移动文件
Write-Host "`n3. 重构 editPersonnel useApiHooks" -ForegroundColor Yellow
if (-not (Test-Path "src/views/toDay/components/editPersonnel/hooks")) {
    New-Item -ItemType Directory -Path "src/views/toDay/components/editPersonnel/hooks" -Force | Out-Null
    Write-Host "  ✓ 创建 editPersonnel/hooks 目录" -ForegroundColor Green
}

if (Test-Path "src/views/toDay/components/editPersonnel/useApiHooks.tsx") {
    git mv "src/views/toDay/components/editPersonnel/useApiHooks.tsx" "src/views/toDay/components/editPersonnel/hooks/useEditPersonnel.tsx"
    Write-Host "  ✓ useApiHooks.tsx → hooks/useEditPersonnel.tsx" -ForegroundColor Green
}

Write-Host "`n文件重命名完成！" -ForegroundColor Green
Write-Host "接下来需要更新导入路径..." -ForegroundColor Yellow
