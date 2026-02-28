# 修复剩余的组件命名问题

$ErrorActionPreference = "Stop"
$encoding = [System.Text.UTF8Encoding]::new($false)

Write-Host "开始修复剩余的组件命名问题..." -ForegroundColor Green

# 1. 修复 AppTooltip 组件内部函数名
$tooltipFile = "src\components\antd\AppTooltip\index.tsx"
if (Test-Path $tooltipFile) {
    $content = [System.IO.File]::ReadAllText($tooltipFile, $encoding)
    $content = $content -replace 'const Itooltip:', 'const AppTooltip:'
    $content = $content -replace 'export default Itooltip;', 'export default AppTooltip;'
    [System.IO.File]::WriteAllText($tooltipFile, $content, $encoding)
    Write-Host "✓ 修复 AppTooltip 组件" -ForegroundColor Cyan
}

# 2. 修复 useTable 文件中的 Itooltip 使用
$useTableFiles = @(
    "src\views\antd\antTable\useHooks\useTable.tsx",
    "src\views\antd\searchForm\useHooks\useTable.tsx",
    "src\views\messageCenter\components\useTable.tsx"
)

foreach ($file in $useTableFiles) {
    if (Test-Path $file) {
        $content = [System.IO.File]::ReadAllText($file, $encoding)
        $content = $content -replace '<Itooltip\s', '<AppTooltip '
        $content = $content -replace '</Itooltip>', '</AppTooltip>'
        
        # 添加导入如果不存在
        if ($content -notmatch 'import.*AppTooltip') {
            $content = $content -replace "(import.*from 'antd';)", "`$1`nimport AppTooltip from '@/components/antd/AppTooltip';"
        }
        
        [System.IO.File]::WriteAllText($file, $content, $encoding)
        Write-Host "✓ 修复 $file" -ForegroundColor Cyan
    }
}

# 3. 修复 Ipaginations 使用
$paginationFiles = @(
    "src\views\antd\antTable\index.tsx",
    "src\views\antd\searchForm\index.tsx"
)

foreach ($file in $paginationFiles) {
    if (Test-Path $file) {
        $content = [System.IO.File]::ReadAllText($file, $encoding)
        $content = $content -replace '\bIpaginations\b', 'AppPagination'
        [System.IO.File]::WriteAllText($file, $content, $encoding)
        Write-Host "✓ 修复 $file 中的 Ipaginations" -ForegroundColor Cyan
    }
}

# 4. 修复 IsearchForm 使用
$searchFormFiles = @(
    "src\views\antd\antTable\components\SearchForm.tsx",
    "src\views\antd\searchForm\components\SearchForm.tsx"
)

foreach ($file in $searchFormFiles) {
    if (Test-Path $file) {
        $content = [System.IO.File]::ReadAllText($file, $encoding)
        $content = $content -replace '\bIsearchForm\b', 'AppSearchForm'
        [System.IO.File]::WriteAllText($file, $content, $encoding)
        Write-Host "✓ 修复 $file 中的 IsearchForm" -ForegroundColor Cyan
    }
}

# 5. 修复 IheaderConfig 使用
$headerFiles = @(
    "src\components\antd\AppEditHeader\index.tsx",
    "src\components\antd\AppEditHeader\Modal.tsx"
)

foreach ($file in $headerFiles) {
    if (Test-Path $file) {
        $content = [System.IO.File]::ReadAllText($file, $encoding)
        $content = $content -replace '\bIheaderConfig\b', 'AppEditHeader'
        $content = $content -replace '\bIheaderConfigProps\b', 'AppEditHeaderProps'
        [System.IO.File]::WriteAllText($file, $content, $encoding)
        Write-Host "✓ 修复 $file 中的 IheaderConfig" -ForegroundColor Cyan
    }
}

# 6. 修复 Itree 使用
$treeFile = "src\components\antd\AppEditHeader\TreeMenu.tsx"
if (Test-Path $treeFile) {
    $content = [System.IO.File]::ReadAllText($treeFile, $encoding)
    $content = $content -replace '<Itree\s', '<AppTree '
    $content = $content -replace '\bItree\b', 'AppTree'
    [System.IO.File]::WriteAllText($treeFile, $content, $encoding)
    Write-Host "✓ 修复 $treeFile 中的 Itree" -ForegroundColor Cyan
}

# 7. 修复 Itour 使用
$tourFile = "src\layout\tour\index.tsx"
if (Test-Path $tourFile) {
    $content = [System.IO.File]::ReadAllText($tourFile, $encoding)
    $content = $content -replace '\bItour\b', 'AppTour'
    [System.IO.File]::WriteAllText($tourFile, $content, $encoding)
    Write-Host "✓ 修复 $tourFile 中的 Itour" -ForegroundColor Cyan
}

# 8. 修复 pdf 文件中的 Iloading
$pdfFile = "src\views\plugin\pdf\index.tsx"
if (Test-Path $pdfFile) {
    $content = [System.IO.File]::ReadAllText($pdfFile, $encoding)
    $content = $content -replace '\bIloading\b', 'Loading'
    [System.IO.File]::WriteAllText($pdfFile, $content, $encoding)
    Write-Host "✓ 修复 $pdfFile 中的 Iloading" -ForegroundColor Cyan
}

Write-Host "`n修复完成！" -ForegroundColor Green
Write-Host "建议运行: npm run type-check 检查类型错误" -ForegroundColor Yellow
