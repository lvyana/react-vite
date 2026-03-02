# Clean cache and restart dev server
# Date: 2026-02-28

Write-Host "=== Cleaning project cache ===" -ForegroundColor Green

# 1. Delete Vite cache
if (Test-Path "node_modules/.vite") {
    Write-Host "`nDeleting Vite cache..." -ForegroundColor Yellow
    Remove-Item -Recurse -Force "node_modules/.vite"
    Write-Host "  OK node_modules/.vite deleted" -ForegroundColor Green
}

# 2. Delete dist directory
if (Test-Path "dist") {
    Write-Host "`nDeleting build directory..." -ForegroundColor Yellow
    Remove-Item -Recurse -Force "dist"
    Write-Host "  OK dist deleted" -ForegroundColor Green
}

# 3. Delete TypeScript cache
if (Test-Path "tsconfig.tsbuildinfo") {
    Remove-Item -Force "tsconfig.tsbuildinfo"
    Write-Host "  OK TypeScript cache deleted" -ForegroundColor Green
}

Write-Host "`n=== Cache cleanup complete ===" -ForegroundColor Green
Write-Host "`nTip: Run npm run dev to restart dev server" -ForegroundColor Cyan
