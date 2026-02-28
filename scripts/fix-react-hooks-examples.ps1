# 修复 React Hooks 示例文件中的缺失组件

$ErrorActionPreference = "Stop"
$encoding = [System.Text.UTF8Encoding]::new($false)

Write-Host "开始修复 React Hooks 示例文件..." -ForegroundColor Green

# 1. 修复 useCallback - 移除 Son 和 Markdown
Write-Host "`n修复 useCallback..." -ForegroundColor Yellow
$file = "src\views\react\hooks\useCallback\index.tsx"
if (Test-Path $file) {
    $content = [System.IO.File]::ReadAllText($file, $encoding)
    # 移除 Son 和 Markdown 的使用
    $content = $content -replace '\s*<Son.*?</Son>', ''
    $content = $content -replace '\s*<Markdown.*?></Markdown>', ''
    [System.IO.File]::WriteAllText($file, $content, $encoding)
    Write-Host "  ✓ $file" -ForegroundColor Cyan
}

# 2. 修复 useContext - 添加 Markdown 导入并移除 Son
Write-Host "`n修复 useContext..." -ForegroundColor Yellow
$file = "src\views\react\hooks\useContext\index.tsx"
if (Test-Path $file) {
    $content = [System.IO.File]::ReadAllText($file, $encoding)
    # 添加 Markdown 和 CodeEditor 导入
    if ($content -notmatch 'import.*Markdown') {
        $content = $content -replace "(import.*from '@/components/antd/AppCard';)", "`$1`nimport Markdown from '@/components/plugin/Markdown';`nimport CodeEditor from '@/components/plugin/CodeEditor';"
    }
    # 移除 Son 的使用
    $content = $content -replace '\s*<Son.*?</Son>', ''
    [System.IO.File]::WriteAllText($file, $content, $encoding)
    Write-Host "  ✓ $file" -ForegroundColor Cyan
}

# 3. 修复 useDeferredValue - 添加 Suspense 和 Markdown
Write-Host "`n修复 useDeferredValue..." -ForegroundColor Yellow
$file = "src\views\react\hooks\useDeferredValue\index.tsx"
if (Test-Path $file) {
    $content = [System.IO.File]::ReadAllText($file, $encoding)
    # 添加 Suspense 到 React 导入
    $content = $content -replace "(import React.*from 'react';)", "import React, { Suspense, useDeferredValue, useState, memo } from 'react';"
    # 添加 Markdown 导入
    if ($content -notmatch 'import.*Markdown') {
        $content = $content -replace "(import.*from '@/components/antd/AppCard';)", "`$1`nimport Markdown from '@/components/plugin/Markdown';"
    }
    # 注释掉 SearchResults（如果不存在）
    $content = $content -replace '<SearchResults', '{ /* <SearchResults'
    $content = $content -replace '</SearchResults>', '</SearchResults> */ }'
    [System.IO.File]::WriteAllText($file, $content, $encoding)
    Write-Host "  ✓ $file" -ForegroundColor Cyan
}

# 4. 修复 useEffect - 添加 Markdown 和 CodeEditor
Write-Host "`n修复 useEffect..." -ForegroundColor Yellow
$file = "src\views\react\hooks\useEffect\index.tsx"
if (Test-Path $file) {
    $content = [System.IO.File]::ReadAllText($file, $encoding)
    # 添加 Markdown 和 CodeEditor 导入
    if ($content -notmatch 'import.*Markdown') {
        $content = $content -replace "(import.*from '@/components/antd/AppCard';)", "`$1`nimport Markdown from '@/components/plugin/Markdown';`nimport CodeEditor from '@/components/plugin/CodeEditor';"
    }
    [System.IO.File]::WriteAllText($file, $content, $encoding)
    Write-Host "  ✓ $file" -ForegroundColor Cyan
}

# 5. 修复 useState - 添加 CodeEditor
Write-Host "`n修复 useState..." -ForegroundColor Yellow
$file = "src\views\react\hooks\useState\index.tsx"
if (Test-Path $file) {
    $content = [System.IO.File]::ReadAllText($file, $encoding)
    # 添加 CodeEditor 导入
    if ($content -notmatch 'import.*CodeEditor') {
        $content = $content -replace "(import.*from '@/components/antd/AppCard';)", "`$1`nimport CodeEditor from '@/components/plugin/CodeEditor';"
    }
    [System.IO.File]::WriteAllText($file, $content, $encoding)
    Write-Host "  ✓ $file" -ForegroundColor Cyan
}

# 6. 修复其他 hooks 文件 - 添加 Markdown
Write-Host "`n修复其他 hooks 文件..." -ForegroundColor Yellow
$markdownFiles = @(
    "src\views\react\hooks\useImperativeHandle\index.tsx",
    "src\views\react\hooks\useInsertionEffect\index.tsx",
    "src\views\react\hooks\useLayoutEffect\index.tsx",
    "src\views\react\hooks\useMemo\index.tsx",
    "src\views\react\hooks\useReducer\index.tsx",
    "src\views\react\hooks\useRef\index.tsx",
    "src\views\react\hooks\useTransition\index.tsx"
)

foreach ($file in $markdownFiles) {
    if (Test-Path $file) {
        $content = [System.IO.File]::ReadAllText($file, $encoding)
        # 添加 Markdown 导入
        if ($content -notmatch 'import.*Markdown') {
            $content = $content -replace "(import.*from '@/components/antd/AppCard';)", "`$1`nimport Markdown from '@/components/plugin/Markdown';"
        }
        [System.IO.File]::WriteAllText($file, $content, $encoding)
        Write-Host "  ✓ $file" -ForegroundColor Cyan
    }
}

# 7. 修复 useReducer - 添加 reducer 函数
Write-Host "`n修复 useReducer reducer 函数..." -ForegroundColor Yellow
$file = "src\views\react\hooks\useReducer\index.tsx"
if (Test-Path $file) {
    $content = [System.IO.File]::ReadAllText($file, $encoding)
    # 检查是否已有 reducer 函数定义
    if ($content -notmatch 'function reducer') {
        # 在类型定义后添加 reducer 函数
        $reducerFunc = @"

// Reducer 函数
function reducer(state: number, action: { type: string }): number {
	switch (action.type) {
		case 'increment':
			return state + 1;
		case 'decrement':
			return state - 1;
		case 'reset':
			return 0;
		default:
			return state;
	}
}
"@
        $content = $content -replace "(// #----------- 上: ts类型定义)", "$reducerFunc`n`n`$1"
    }
    [System.IO.File]::WriteAllText($file, $content, $encoding)
    Write-Host "  ✓ $file (添加 reducer 函数)" -ForegroundColor Cyan
}

# 8. 修复 Suspense 组件
Write-Host "`n修复 Suspense 组件..." -ForegroundColor Yellow
$file = "src\views\react\reactDom\suspense\index.tsx"
if (Test-Path $file) {
    $content = [System.IO.File]::ReadAllText($file, $encoding)
    # 重命名本地 Suspense 组件
    $content = $content -replace 'const Suspense =', 'const SuspenseDemo ='
    $content = $content -replace 'export default Suspense;', 'export default SuspenseDemo;'
    [System.IO.File]::WriteAllText($file, $content, $encoding)
    Write-Host "  ✓ $file" -ForegroundColor Cyan
}

Write-Host "`n修复完成！" -ForegroundColor Green
Write-Host "建议运行: npm run type-check 检查剩余错误" -ForegroundColor Yellow
