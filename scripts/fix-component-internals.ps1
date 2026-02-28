# 修复组件内部的接口和函数命名问题

$ErrorActionPreference = "Stop"
$encoding = [System.Text.UTF8Encoding]::new($false)

Write-Host "开始修复组件内部命名问题..." -ForegroundColor Green

# 1. 修复 CodeEditor 组件使用
Write-Host "`n修复 CodeEditor 组件..." -ForegroundColor Yellow
$codeEditorFiles = @(
    "src\views\react\hooks\useContext\index.tsx",
    "src\views\react\hooks\useEffect\index.tsx",
    "src\views\react\hooks\useState\index.tsx"
)

foreach ($file in $codeEditorFiles) {
    if (Test-Path $file) {
        $content = [System.IO.File]::ReadAllText($file, $encoding)
        $content = $content -replace '\bIcodeEditor\b', 'CodeEditor'
        [System.IO.File]::WriteAllText($file, $content, $encoding)
        Write-Host "  ✓ $file" -ForegroundColor Cyan
    }
}

# 2. 修复 PreviewView 和 PreviewCode 的 Iprops
Write-Host "`n修复 Preview 组件接口..." -ForegroundColor Yellow
$previewFiles = @(
    "src\views\plugin\richTextEdit\components\PreviewView.tsx",
    "src\views\plugin\richTextEdit\components\PreviewCode.tsx"
)

foreach ($file in $previewFiles) {
    if (Test-Path $file) {
        $content = [System.IO.File]::ReadAllText($file, $encoding)
        $content = $content -replace '\bIprops\b', 'PreviewProps'
        [System.IO.File]::WriteAllText($file, $content, $encoding)
        Write-Host "  ✓ $file" -ForegroundColor Cyan
    }
}

# 3. 修复 RichTextEdit 的接口
Write-Host "`n修复 RichTextEdit 接口..." -ForegroundColor Yellow
$richTextFile = "src\views\plugin\richTextEdit\index.tsx"
if (Test-Path $richTextFile) {
    $content = [System.IO.File]::ReadAllText($richTextFile, $encoding)
    $content = $content -replace '\bIMenuConfig\b', 'MenuConfig'
    $content = $content -replace '\bISingleMenuConfig\b', 'SingleMenuConfig'
    [System.IO.File]::WriteAllText($richTextFile, $content, $encoding)
    Write-Host "  ✓ $richTextFile" -ForegroundColor Cyan
}

# 4. 修复 LogicFlow 的 IApproveUser
Write-Host "`n修复 LogicFlow 类型..." -ForegroundColor Yellow
$logicFlowFile = "src\views\plugin\logicFlow\approve.tsx"
if (Test-Path $logicFlowFile) {
    $content = [System.IO.File]::ReadAllText($logicFlowFile, $encoding)
    $content = $content -replace '\bIApproveUser\b', 'ApproveUser'
    [System.IO.File]::WriteAllText($logicFlowFile, $content, $encoding)
    Write-Host "  ✓ $logicFlowFile" -ForegroundColor Cyan
}

# 5. 修复 GridLayout 的接口
Write-Host "`n修复 GridLayout 接口..." -ForegroundColor Yellow
$gridLayoutFile = "src\components\plugin\GridLayout\index.tsx"
if (Test-Path $gridLayoutFile) {
    $content = [System.IO.File]::ReadAllText($gridLayoutFile, $encoding)
    $content = $content -replace '\bIgridLayoutProps\b', 'GridLayoutProps'
    [System.IO.File]::WriteAllText($gridLayoutFile, $content, $encoding)
    Write-Host "  ✓ $gridLayoutFile" -ForegroundColor Cyan
}

# 6. 修复 InfiniteScroll 的接口
Write-Host "`n修复 InfiniteScroll 接口..." -ForegroundColor Yellow
$infiniteScrollFile = "src\components\plugin\InfiniteScroll\index.tsx"
if (Test-Path $infiniteScrollFile) {
    $content = [System.IO.File]::ReadAllText($infiniteScrollFile, $encoding)
    $content = $content -replace '\bIinfiniteScrollProps\b', 'InfiniteScrollProps'
    [System.IO.File]::WriteAllText($infiniteScrollFile, $content, $encoding)
    Write-Host "  ✓ $infiniteScrollFile" -ForegroundColor Cyan
}

# 7. 修复 Transition 的接口
Write-Host "`n修复 Transition 接口..." -ForegroundColor Yellow
$transitionFile = "src\components\plugin\Transition\index.tsx"
if (Test-Path $transitionFile) {
    $content = [System.IO.File]::ReadAllText($transitionFile, $encoding)
    $content = $content -replace '\bItransitionProps\b', 'TransitionProps'
    [System.IO.File]::WriteAllText($transitionFile, $content, $encoding)
    Write-Host "  ✓ $transitionFile" -ForegroundColor Cyan
}

# 8. 修复 AppForm 的接口
Write-Host "`n修复 AppForm 接口..." -ForegroundColor Yellow
$formFiles = @(
    "src\components\antd\AppForm\index.tsx",
    "src\components\antd\AppForm\type.ts"
)

foreach ($file in $formFiles) {
    if (Test-Path $file) {
        $content = [System.IO.File]::ReadAllText($file, $encoding)
        $content = $content -replace '\bIFormProps\b', 'AppFormProps'
        $content = $content -replace '\bIbuttonListProps\b', 'ButtonListProps'
        $content = $content -replace 'AppButtonListProps', 'ButtonListProps'
        [System.IO.File]::WriteAllText($file, $content, $encoding)
        Write-Host "  ✓ $file" -ForegroundColor Cyan
    }
}

# 9. 修复 AppEditHeader 的接口
Write-Host "`n修复 AppEditHeader 接口..." -ForegroundColor Yellow
$editHeaderFile = "src\components\antd\AppEditHeader\index.tsx"
if (Test-Path $editHeaderFile) {
    $content = [System.IO.File]::ReadAllText($editHeaderFile, $encoding)
    $content = $content -replace '\bAppEditHeaderProps\b', 'EditHeaderProps'
    [System.IO.File]::WriteAllText($editHeaderFile, $content, $encoding)
    Write-Host "  ✓ $editHeaderFile" -ForegroundColor Cyan
}

# 10. 修复 PDF 文件中的 Loading
Write-Host "`n修复 PDF Loading..." -ForegroundColor Yellow
$pdfFile = "src\views\plugin\pdf\index.tsx"
if (Test-Path $pdfFile) {
    $content = [System.IO.File]::ReadAllText($pdfFile, $encoding)
    # 添加 Loading 导入
    if ($content -notmatch 'import.*Loading.*from') {
        $content = $content -replace "(import React.*from 'react';)", "`$1`nimport Loading from '@/components/plugin/Loading';"
    }
    [System.IO.File]::WriteAllText($pdfFile, $content, $encoding)
    Write-Host "  ✓ $pdfFile" -ForegroundColor Cyan
}

# 11. 修复 OperationBtns 中的 AppButton
Write-Host "`n修复 OperationBtns AppButton..." -ForegroundColor Yellow
$operationBtnsFile = "src\views\plugin\dnd\components\OperationBtns.tsx"
if (Test-Path $operationBtnsFile) {
    $content = [System.IO.File]::ReadAllText($operationBtnsFile, $encoding)
    # 添加 AppButton 导入
    if ($content -notmatch 'import.*AppButton') {
        $content = $content -replace "(import.*from 'antd';)", "`$1`nimport AppButton from '@/components/antd/AppButton';"
    }
    [System.IO.File]::WriteAllText($operationBtnsFile, $content, $encoding)
    Write-Host "  ✓ $operationBtnsFile" -ForegroundColor Cyan
}

# 12. 修复 SearchForm 中的 AppSearchForm
Write-Host "`n修复 SearchForm 类型..." -ForegroundColor Yellow
$searchFormFiles = @(
    "src\views\antd\antTable\components\SearchForm.tsx",
    "src\views\antd\searchForm\components\SearchForm.tsx"
)

foreach ($file in $searchFormFiles) {
    if (Test-Path $file) {
        $content = [System.IO.File]::ReadAllText($file, $encoding)
        # 添加 AppSearchForm 导入
        if ($content -notmatch 'import.*AppSearchForm') {
            $content = $content -replace "(import.*from '@/components/antd/AppForm';)", "`$1`nimport AppSearchForm from '@/components/antd/AppSearchForm';"
        }
        [System.IO.File]::WriteAllText($file, $content, $encoding)
        Write-Host "  ✓ $file" -ForegroundColor Cyan
    }
}

# 13. 修复 EditPersonnelTable 中的 AppDropdown
Write-Host "`n修复 EditPersonnelTable AppDropdown..." -ForegroundColor Yellow
$editPersonnelFile = "src\views\toDay\components\editPersonnel\EditPersonnelTable.tsx"
if (Test-Path $editPersonnelFile) {
    $content = [System.IO.File]::ReadAllText($editPersonnelFile, $encoding)
    $content = $content -replace '\bIdropdown\b', 'AppDropdown'
    [System.IO.File]::WriteAllText($editPersonnelFile, $content, $encoding)
    Write-Host "  ✓ $editPersonnelFile" -ForegroundColor Cyan
}

Write-Host "`n修复完成！" -ForegroundColor Green
Write-Host "建议运行: npm run type-check 检查剩余错误" -ForegroundColor Yellow
