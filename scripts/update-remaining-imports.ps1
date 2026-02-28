# 更新剩余文件的导入路径
# 执行时间: 2026-02-28

Write-Host "开始更新导入路径..." -ForegroundColor Green

# 1. 更新 useContext 相关导入
Write-Host "`n1. 更新 useContext 相关导入" -ForegroundColor Yellow

# context.tsx 内部导入
$contextFile = "src/views/react/hooks/useContext/context.tsx"
if (Test-Path $contextFile) {
    $content = Get-Content $contextFile -Raw -Encoding UTF8
    $content = $content -replace "from './IuseReducer'", "from './useReducer'"
    [System.IO.File]::WriteAllText((Resolve-Path $contextFile).Path, $content, [System.Text.UTF8Encoding]::new($false))
    Write-Host "  ✓ 更新 context.tsx" -ForegroundColor Green
}

# useReducer.tsx 内部导入
$useReducerFile = "src/views/react/hooks/useContext/useReducer.tsx"
if (Test-Path $useReducerFile) {
    $content = Get-Content $useReducerFile -Raw -Encoding UTF8
    $content = $content -replace "from './Icontext'", "from './context'"
    [System.IO.File]::WriteAllText((Resolve-Path $useReducerFile).Path, $content, [System.Text.UTF8Encoding]::new($false))
    Write-Host "  ✓ 更新 useReducer.tsx" -ForegroundColor Green
}

# index.tsx 导入
$indexFile = "src/views/react/hooks/useContext/index.tsx"
if (Test-Path $indexFile) {
    $content = Get-Content $indexFile -Raw -Encoding UTF8
    $content = $content -replace "from './Icontext'", "from './context'"
    [System.IO.File]::WriteAllText((Resolve-Path $indexFile).Path, $content, [System.Text.UTF8Encoding]::new($false))
    Write-Host "  ✓ 更新 index.tsx" -ForegroundColor Green
}

# 2. 更新 router useHooks 导入
Write-Host "`n2. 更新 router hooks 导入" -ForegroundColor Yellow

# 查找所有引用 router/useHooks 的文件
$files = Get-ChildItem -Path src -Recurse -Include *.tsx,*.ts | Where-Object { 
    $content = Get-Content $_.FullName -Raw -Encoding UTF8
    $content -match "from '@/router/useHooks'" -or $content -match "from '\.\./router/useHooks'"
}

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    $updated = $false
    
    if ($content -match "from '@/router/useHooks'") {
        $content = $content -replace "from '@/router/useHooks'", "from '@/router/hooks/useRouter'"
        $updated = $true
    }
    
    if ($updated) {
        [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.UTF8Encoding]::new($false))
        Write-Host "  ✓ 更新 $($file.Name)" -ForegroundColor Green
    }
}

# 3. 更新 editPersonnel useApiHooks 导入
Write-Host "`n3. 更新 editPersonnel hooks 导入" -ForegroundColor Yellow

$editPersonnelIndex = "src/views/toDay/components/editPersonnel/index.tsx"
if (Test-Path $editPersonnelIndex) {
    $content = Get-Content $editPersonnelIndex -Raw -Encoding UTF8
    $content = $content -replace "from './useApiHooks'", "from './hooks/useEditPersonnel'"
    [System.IO.File]::WriteAllText((Resolve-Path $editPersonnelIndex).Path, $content, [System.Text.UTF8Encoding]::new($false))
    Write-Host "  ✓ 更新 editPersonnel/index.tsx" -ForegroundColor Green
}

Write-Host "`nImport paths updated!" -ForegroundColor Green
