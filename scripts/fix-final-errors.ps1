# 修复最后的错误

$ErrorActionPreference = "Stop"
$encoding = [System.Text.UTF8Encoding]::new($false)

Write-Host "开始修复最后的错误..." -ForegroundColor Green

# 1. 修复 useContext 重复导入
Write-Host "`n修复 useContext 重复导入..." -ForegroundColor Yellow
$file = "src\views\react\hooks\useContext\index.tsx"
if (Test-Path $file) {
    $content = [System.IO.File]::ReadAllText($file, $encoding)
    # 移除重复的 CodeEditor 导入行
    $lines = $content -split "`n"
    $seenImports = @{}
    $newLines = @()
    foreach ($line in $lines) {
        if ($line -match "^import.*CodeEditor") {
            if (-not $seenImports.ContainsKey("CodeEditor")) {
                $newLines += $line
                $seenImports["CodeEditor"] = $true
            }
        } else {
            $newLines += $line
        }
    }
    $content = $newLines -join "`n"
    [System.IO.File]::WriteAllText($file, $content, $encoding)
    Write-Host "  ✓ $file" -ForegroundColor Cyan
}

# 2. 修复 useEffect 重复导入
Write-Host "`n修复 useEffect 重复导入..." -ForegroundColor Yellow
$file = "src\views\react\hooks\useEffect\index.tsx"
if (Test-Path $file) {
    $content = [System.IO.File]::ReadAllText($file, $encoding)
    # 移除重复的 CodeEditor 导入行
    $lines = $content -split "`n"
    $seenImports = @{}
    $newLines = @()
    foreach ($line in $lines) {
        if ($line -match "^import.*CodeEditor") {
            if (-not $seenImports.ContainsKey("CodeEditor")) {
                $newLines += $line
                $seenImports["CodeEditor"] = $true
            }
        } else {
            $newLines += $line
        }
    }
    $content = $newLines -join "`n"
    [System.IO.File]::WriteAllText($file, $content, $encoding)
    Write-Host "  ✓ $file" -ForegroundColor Cyan
}

# 3. 修复 useDeferredValue 缺少导入
Write-Host "`n修复 useDeferredValue 缺少导入..." -ForegroundColor Yellow
$file = "src\views\react\hooks\useDeferredValue\index.tsx"
if (Test-Path $file) {
    $content = [System.IO.File]::ReadAllText($file, $encoding)
    # 添加 FC 和 useMemo
    $content = $content -replace "import React, { Suspense, useDeferredValue, useState, memo } from 'react';", "import React, { Suspense, useDeferredValue, useState, memo, FC, useMemo } from 'react';"
    [System.IO.File]::WriteAllText($file, $content, $encoding)
    Write-Host "  ✓ $file" -ForegroundColor Cyan
}

# 4. 修复 useReducer reducer 函数位置
Write-Host "`n修复 useReducer..." -ForegroundColor Yellow
$file = "src\views\react\hooks\useReducer\index.tsx"
if (Test-Path $file) {
    $content = [System.IO.File]::ReadAllText($file, $encoding)
    # 确保 reducer 函数在使用之前定义
    if ($content -match "const IuseReducer.*useReducer\(reducer") {
        # reducer 函数应该在组件之前
        $content = $content -replace "(// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------)", "`$1`n`n// Reducer 函数`nfunction reducer(state: number, action: { type: string }): number {`n`tswitch (action.type) {`n`t`tcase 'increment':`n`t`t`treturn state + 1;`n`t`tcase 'decrement':`n`t`t`treturn state - 1;`n`t`tcase 'reset':`n`t`t`treturn 0;`n`t`tdefault:`n`t`t`treturn state;`n`t}`n}`n"
    }
    [System.IO.File]::WriteAllText($file, $content, $encoding)
    Write-Host "  ✓ $file" -ForegroundColor Cyan
}

# 5. 修复 PreviewCode 和 PreviewView 接口名
Write-Host "`n修复 Preview 组件接口名..." -ForegroundColor Yellow
$previewCodeFile = "src\views\plugin\richTextEdit\components\PreviewCode.tsx"
if (Test-Path $previewCodeFile) {
    $content = [System.IO.File]::ReadAllText($previewCodeFile, $encoding)
    $content = $content -replace '\bPreviewProps\b', 'PreviewCodeProps'
    [System.IO.File]::WriteAllText($previewCodeFile, $content, $encoding)
    Write-Host "  ✓ $previewCodeFile" -ForegroundColor Cyan
}

$previewViewFile = "src\views\plugin\richTextEdit\components\PreviewView.tsx"
if (Test-Path $previewViewFile) {
    $content = [System.IO.File]::ReadAllText($previewViewFile, $encoding)
    $content = $content -replace '\bPreviewProps\b', 'PreviewViewProps'
    [System.IO.File]::WriteAllText($previewViewFile, $content, $encoding)
    Write-Host "  ✓ $previewViewFile" -ForegroundColor Cyan
}

# 6. 修复 EditPersonnelTable 缺少 AppTable 导入
Write-Host "`n修复 EditPersonnelTable..." -ForegroundColor Yellow
$file = "src\views\toDay\components\editPersonnel\EditPersonnelTable.tsx"
if (Test-Path $file) {
    $content = [System.IO.File]::ReadAllText($file, $encoding)
    # 添加 AppTable 导入
    if ($content -notmatch 'import.*AppTable') {
        $content = $content -replace "(import.*from 'antd';)", "`$1`nimport AppTable from '@/components/antd/AppTable';"
    }
    [System.IO.File]::WriteAllText($file, $content, $encoding)
    Write-Host "  ✓ $file" -ForegroundColor Cyan
}

# 7. 修复 PDF Loading 组件
Write-Host "`n修复 PDF Loading..." -ForegroundColor Yellow
$file = "src\views\plugin\pdf\index.tsx"
if (Test-Path $file) {
    $content = [System.IO.File]::ReadAllText($file, $encoding)
    # 确保 Loading 组件被正确导入和使用
    if ($content -match 'Loading') {
        # 添加 Loading 组件定义或使用 AppLoading
        $content = $content -replace 'Loading', 'AppLoading'
        if ($content -notmatch 'import.*AppLoading') {
            $content = $content -replace "(import React.*from 'react';)", "`$1`nimport AppLoading from '@/components/plugin/Loading';"
        }
    }
    [System.IO.File]::WriteAllText($file, $content, $encoding)
    Write-Host "  ✓ $file" -ForegroundColor Cyan
}

Write-Host "`n修复完成！" -ForegroundColor Green
Write-Host "建议运行: npm run type-check 检查剩余错误" -ForegroundColor Yellow
