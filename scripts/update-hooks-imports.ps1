# 更新所有 hooks 导入路径的脚本

Write-Host "=== 更新 Hooks 导入路径 ===" -ForegroundColor Cyan
Write-Host ""

# 定义需要替换的路径映射
$replacements = @(
    # useHooks -> hooks 目录
    @{Pattern='@/useHooks/'; Replacement='@/hooks/'; Description='useHooks -> hooks'},
    @{Pattern='from ''@/useHooks'; Replacement='from ''@/hooks'; Description='useHooks -> hooks (单引号)'},
    @{Pattern='from "@/useHooks'; Replacement='from "@/hooks'; Description='useHooks -> hooks (双引号)'},
    
    # layout useHooks -> hooks
    @{Pattern='@/layout/useHooks'; Replacement='@/layout/hooks'; Description='layout/useHooks -> layout/hooks'},
    
    # views useHooks -> hooks
    @{Pattern='@/views/antd/antTable/useHooks'; Replacement='@/views/antd/antTable/hooks'; Description='antTable/useHooks -> antTable/hooks'},
    @{Pattern='@/views/antd/searchForm/useHooks'; Replacement='@/views/antd/searchForm/hooks'; Description='searchForm/useHooks -> searchForm/hooks'},
    @{Pattern='@/views/plugin/dnd/useHooks'; Replacement='@/views/plugin/dnd/hooks'; Description='dnd/useHooks -> dnd/hooks'},
    
    # useHooksApi -> useApi
    @{Pattern='useHooksApi'; Replacement='hooks/useApi'; Description='useHooksApi -> hooks/useApi'},
    
    # 组件 useHooks -> hooks
    @{Pattern='@/components/antd/AppForm/useHooks'; Replacement='@/components/antd/AppForm/hooks/useForm'; Description='AppForm/useHooks -> AppForm/hooks/useForm'},
    @{Pattern='@/components/antd/AppModal/useHooks'; Replacement='@/components/antd/AppModal/hooks/useModal'; Description='AppModal/useHooks -> AppModal/hooks/useModal'},
    @{Pattern='@/components/antd/AppTable/useHooks'; Replacement='@/components/antd/AppTable/hooks/useTable'; Description='AppTable/useHooks -> AppTable/hooks/useTable'}
)

# 获取所有需要更新的文件
$files = Get-ChildItem -Path "src" -Include "*.ts","*.tsx","*.js","*.jsx" -Recurse -File

$totalFiles = $files.Count
$updatedFiles = 0
$totalReplacements = 0

Write-Host "找到 $totalFiles 个文件需要检查" -ForegroundColor Gray
Write-Host ""

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    $originalContent = $content
    $fileUpdated = $false
    $fileReplacements = 0
    
    foreach ($replacement in $replacements) {
        if ($content -match [regex]::Escape($replacement.Pattern)) {
            $content = $content -replace [regex]::Escape($replacement.Pattern), $replacement.Replacement
            $fileReplacements++
            $fileUpdated = $true
        }
    }
    
    if ($fileUpdated) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
        $updatedFiles++
        $totalReplacements += $fileReplacements
        $relativePath = $file.FullName.Replace((Get-Location).Path + "\src\", "")
        Write-Host "✓ $relativePath ($fileReplacements 处替换)" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "=== 更新完成 ===" -ForegroundColor Cyan
Write-Host "更新文件数: $updatedFiles / $totalFiles" -ForegroundColor Green
Write-Host "总替换次数: $totalReplacements" -ForegroundColor Green
Write-Host ""
Write-Host "建议: 运行 'npm run type-check' 检查是否有类型错误" -ForegroundColor Yellow
