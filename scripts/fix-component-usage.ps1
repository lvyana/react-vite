# 修复组件使用名称脚本
# 将 JSX 中使用的旧组件名改为新组件名

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "修复组件使用名称" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 检查是否在项目根目录
if (-not (Test-Path "package.json")) {
    Write-Host "错误：请在项目根目录运行此脚本！" -ForegroundColor Red
    exit 1
}

$updateCount = 0

# 定义需要替换的映射（JSX 标签）
$replacements = @{
    # Antd 组件
    "<Ibutton" = "<AppButton"
    "</Ibutton>" = "</AppButton>"
    "<Icard" = "<AppCard"
    "</Icard>" = "</AppCard>"
    "<Icollapse" = "<AppCollapse"
    "</Icollapse>" = "</AppCollapse>"
    "<Idrawer" = "<AppDrawer"
    "</Idrawer>" = "</AppDrawer>"
    "<Idropdown" = "<AppDropdown"
    "</Idropdown>" = "</AppDropdown>"
    "<Iform" = "<AppForm"
    "</Iform>" = "</AppForm>"
    "<Imodal" = "<AppModal"
    "</Imodal>" = "</AppModal>"
    "<Itable" = "<AppTable"
    "</Itable>" = "</AppTable>"
    
    # Plugin 组件
    "<Imarkdown" = "<Markdown"
    "</Imarkdown>" = "</Markdown>"
}

Write-Host "开始扫描文件..." -ForegroundColor Yellow
Write-Host ""

# 获取所有需要更新的文件
$files = Get-ChildItem -Path "src" -Recurse -Include "*.tsx","*.ts" -File

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    $originalContent = $content
    $fileUpdated = $false
    
    # 应用所有替换
    foreach ($old in $replacements.Keys) {
        $new = $replacements[$old]
        
        if ($content -match [regex]::Escape($old)) {
            $content = $content -replace [regex]::Escape($old), $new
            $fileUpdated = $true
        }
    }
    
    # 如果内容有变化，保存文件
    if ($fileUpdated -and $content -ne $originalContent) {
        # 使用 UTF-8 无 BOM 编码
        $utf8NoBom = New-Object System.Text.UTF8Encoding $false
        [System.IO.File]::WriteAllText($file.FullName, $content, $utf8NoBom)
        
        Write-Host "   更新: $($file.FullName)" -ForegroundColor Green
        $updateCount++
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "修复完成！" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "更新文件数: $updateCount" -ForegroundColor Yellow
Write-Host ""
Write-Host "下一步操作：" -ForegroundColor Cyan
Write-Host "1. 运行 'npm run dev' 检查是否有错误" -ForegroundColor White
Write-Host "2. 检查组件使用是否正确" -ForegroundColor White
Write-Host ""
