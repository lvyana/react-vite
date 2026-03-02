# 清理缓存并重启开发服务器
# 执行时间: 2026-02-28

Write-Host "=== 清理项目缓存 ===" -ForegroundColor Green

# 1. 删除 Vite 缓存
if (Test-Path "node_modules/.vite") {
    Write-Host "`n删除 Vite 缓存..." -ForegroundColor Yellow
    Remove-Item -Recurse -Force "node_modules/.vite"
    Write-Host "  ✓ node_modules/.vite 已删除" -ForegroundColor Green
}

# 2. 删除 dist 目录
if (Test-Path "dist") {
    Write-Host "`n删除构建目录..." -ForegroundColor Yellow
    Remove-Item -Recurse -Force "dist"
    Write-Host "  ✓ dist 已删除" -ForegroundColor Green
}

# 3. 删除 TypeScript 缓存
if (Test-Path "tsconfig.tsbuildinfo") {
    Remove-Item -Force "tsconfig.tsbuildinfo"
    Write-Host "  ✓ TypeScript 缓存已删除" -ForegroundColor Green
}

Write-Host "`n=== 缓存清理完成 ===" -ForegroundColor Green
Write-Host "`n提示: 请运行以下命令重启开发服务器:" -ForegroundColor Cyan
Write-Host "  npm run dev" -ForegroundColor White
