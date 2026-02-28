# 修复组件导入名称脚本
# 将旧的 I 前缀导入名称改为新的 App 前缀

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "修复组件导入名称" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 检查是否在项目根目录
if (-not (Test-Path "package.json")) {
    Write-Host "错误：请在项目根目录运行此脚本！" -ForegroundColor Red
    exit 1
}

$updateCount = 0

# 定义需要替换的映射
$replacements = @{
    # Antd 组件
    "Ibutton" = "AppButton"
    "Icard" = "AppCard"
    "Icascader" = "AppCascader"
    "Icheckbox" = "AppCheckbox"
    "Icollapse" = "AppCollapse"
    "Idrawer" = "AppDrawer"
    "Idropdown" = "AppDropdown"
    "IeditHeader" = "AppEditHeader"
    "Iform" = "AppForm"
    "Iinput" = "AppInput"
    "Iloading" = "AppLoading"
    "Imodal" = "AppModal"
    "Ipagination" = "AppPagination"
    "Ipicker" = "AppPicker"
    "Iradio" = "AppRadio"
    "Irate" = "AppRate"
    "IsearchForm" = "AppSearchForm"
    "IsearchTag" = "AppSearchTag"
    "Iselect" = "AppSelect"
    "Islider" = "AppSlider"
    "Iswitch" = "AppSwitch"
    "Itable" = "AppTable"
    "Itooltip" = "AppTooltip"
    "Itour" = "AppTour"
    "Itree" = "AppTree"
    "ItreeSelect" = "AppTreeSelect"
    "Iupload" = "AppUpload"
    
    # Plugin 组件
    "IanimateComponent" = "AnimateComponent"
    "IcodeEditor" = "CodeEditor"
    "Icopy" = "Copy"
    "IeasyTyper" = "EasyTyper"
    "Ifullscreen" = "Fullscreen"
    "IgridLayout" = "GridLayout"
    "IinfiniteScroll" = "InfiniteScroll"
    "IinnerHTML" = "InnerHTML"
    "Imarkdown" = "Markdown"
    "Iresponsive" = "Responsive"
    "IresponsiveMax" = "IresponsiveMax"  # 保持不变
    "IresponsiveMin" = "IresponsiveMin"  # 保持不变
    "Itransition" = "Transition"
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
        
        # 跳过不需要替换的
        if ($old -eq $new) {
            continue
        }
        
        # 替换导入语句中的名称
        # 例如: import Icard from '@/components/antd/AppCard'
        if ($content -match "import\s+$old\s+") {
            $content = $content -replace "import\s+$old\s+", "import $new "
            $fileUpdated = $true
        }
        
        # 替换导入语句中的解构
        # 例如: import { Icard } from '@/components/antd/AppCard'
        if ($content -match "\{\s*$old\s*[,\}]") {
            $content = $content -replace "\{\s*$old\s*,", "{ $new,"
            $content = $content -replace "\{\s*$old\s*\}", "{ $new }"
            $fileUpdated = $true
        }
        
        # 替换类型导入
        # 例如: import type { Icard } from '@/components/antd/AppCard'
        if ($content -match "import\s+type\s+\{\s*$old") {
            $content = $content -replace "import\s+type\s+\{\s*$old", "import type { $new"
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
Write-Host "2. 检查导入是否正确" -ForegroundColor White
Write-Host ""
