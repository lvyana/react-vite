# 文件重命名脚本 - 阶段二：统一组件命名
# 使用方法：在项目根目录运行 powershell -ExecutionPolicy Bypass -File scripts/rename-phase2.ps1

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "文件重命名脚本 - 阶段二：统一组件命名" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "警告：此脚本将进行大量重命名操作！" -ForegroundColor Red
Write-Host "建议先完成阶段一并测试无误后再执行此脚本。" -ForegroundColor Yellow
Write-Host ""

# 检查是否在项目根目录
if (-not (Test-Path "package.json")) {
    Write-Host "错误：请在项目根目录运行此脚本！" -ForegroundColor Red
    exit 1
}

# 确认执行
$confirmation = Read-Host "是否继续？(输入 YES 继续)"
if ($confirmation -ne "YES") {
    Write-Host "已取消操作。" -ForegroundColor Yellow
    exit 0
}

Write-Host ""
Write-Host "开始重命名..." -ForegroundColor Green
Write-Host ""

$renameCount = 0

# 函数：安全重命名
function Safe-Rename {
    param(
        [string]$oldPath,
        [string]$newPath
    )
    
    if (Test-Path $oldPath) {
        $isGitRepo = Test-Path ".git"
        
        if ($isGitRepo) {
            Write-Host "   git mv: $oldPath -> $newPath" -ForegroundColor Green
            
            # 确保目标目录存在
            $targetDir = Split-Path $newPath -Parent
            if (-not (Test-Path $targetDir)) {
                New-Item -ItemType Directory -Path $targetDir -Force | Out-Null
            }
            
            git mv $oldPath $newPath 2>$null
            if ($LASTEXITCODE -eq 0) {
                $script:renameCount++
                return $true
            } else {
                Write-Host "   警告：git mv 失败，使用普通重命名" -ForegroundColor Yellow
            }
        }
        
        # 普通重命名
        $targetDir = Split-Path $newPath -Parent
        if (-not (Test-Path $targetDir)) {
            New-Item -ItemType Directory -Path $targetDir -Force | Out-Null
        }
        
        Write-Host "   rename: $oldPath -> $newPath" -ForegroundColor Green
        Move-Item -Path $oldPath -Destination $newPath -Force
        $script:renameCount++
        return $true
    } else {
        Write-Host "   跳过（路径不存在）: $oldPath" -ForegroundColor Gray
        return $false
    }
}

# ============================================
# 1. 重命名 antdComponents → components/antd
# ============================================
Write-Host "1. 重命名 antdComponents → components/antd" -ForegroundColor Cyan
Write-Host "----------------------------------------" -ForegroundColor Gray

# 创建 components 目录
if (-not (Test-Path "src/components")) {
    New-Item -ItemType Directory -Path "src/components" -Force | Out-Null
}

# 移动整个目录
Safe-Rename "src/antdComponents" "src/components/antd"

Write-Host ""

# ============================================
# 2. 移除 i 前缀（antd 组件）
# ============================================
Write-Host "2. 移除 antd 组件的 i 前缀" -ForegroundColor Cyan
Write-Host "----------------------------------------" -ForegroundColor Gray

$antdComponents = @(
    @{old="iButton"; new="Button"},
    @{old="iCard"; new="Card"},
    @{old="iCascader"; new="Cascader"},
    @{old="iCheckbox"; new="Checkbox"},
    @{old="iCollapse"; new="Collapse"},
    @{old="iDrawer"; new="Drawer"},
    @{old="iDropdown"; new="Dropdown"},
    @{old="iEditHeader"; new="EditHeader"},
    @{old="iForm"; new="Form"},
    @{old="iInput"; new="Input"},
    @{old="iLoading"; new="Loading"},
    @{old="iModal"; new="Modal"},
    @{old="iPagination"; new="Pagination"},
    @{old="iPicker"; new="Picker"},
    @{old="iRadio"; new="Radio"},
    @{old="iRate"; new="Rate"},
    @{old="iSearchForm"; new="SearchForm"},
    @{old="iSearchTag"; new="SearchTag"},
    @{old="iSelect"; new="Select"},
    @{old="iSlider"; new="Slider"},
    @{old="iSwitch"; new="Switch"},
    @{old="iTable"; new="Table"},
    @{old="iTooltip"; new="Tooltip"},
    @{old="iTour"; new="Tour"},
    @{old="iTree"; new="Tree"},
    @{old="iTreeSelect"; new="TreeSelect"},
    @{old="iUpload"; new="Upload"}
)

foreach ($component in $antdComponents) {
    $oldPath = "src/components/antd/$($component.old)"
    $newPath = "src/components/antd/$($component.new)"
    Safe-Rename $oldPath $newPath
}

# NotFound 组件
Safe-Rename "src/components/antd/notFound" "src/components/antd/NotFound"

Write-Host ""

# ============================================
# 3. 重命名 pluginComponents → components/plugin
# ============================================
Write-Host "3. 重命名 pluginComponents → components/plugin" -ForegroundColor Cyan
Write-Host "----------------------------------------" -ForegroundColor Gray

Safe-Rename "src/pluginComponents" "src/components/plugin"

Write-Host ""

# ============================================
# 4. 移除 i 前缀（plugin 组件）
# ============================================
Write-Host "4. 移除 plugin 组件的 i 前缀" -ForegroundColor Cyan
Write-Host "----------------------------------------" -ForegroundColor Gray

$pluginComponents = @(
    @{old="iAnimateComponent"; new="AnimateComponent"},
    @{old="iCodeEditor"; new="CodeEditor"},
    @{old="iCopy"; new="Copy"},
    @{old="iEasyTyper"; new="EasyTyper"},
    @{old="iFullscreen"; new="Fullscreen"},
    @{old="iGridLayout"; new="GridLayout"},
    @{old="iInfiniteScroll"; new="InfiniteScroll"},
    @{old="iInnerHTML"; new="InnerHTML"},
    @{old="iLoading"; new="Loading"},
    @{old="iMarkdown"; new="Markdown"},
    @{old="iResponsive"; new="Responsive"},
    @{old="iTransition"; new="Transition"}
)

foreach ($component in $pluginComponents) {
    $oldPath = "src/components/plugin/$($component.old)"
    $newPath = "src/components/plugin/$($component.new)"
    Safe-Rename $oldPath $newPath
}

Write-Host ""

# ============================================
# 5. 更新所有导入路径
# ============================================
Write-Host "5. 更新导入路径..." -ForegroundColor Cyan
Write-Host "----------------------------------------" -ForegroundColor Gray

$filesToUpdate = Get-ChildItem -Path "src" -Recurse -Include "*.tsx","*.ts" -File
$importUpdateCount = 0

foreach ($file in $filesToUpdate) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    $originalContent = $content
    
    # 替换 antdComponents → components/antd
    $content = $content -replace "@/antdComponents/", "@/components/antd/"
    $content = $content -replace "from 'antdComponents/", "from 'components/antd/"
    
    # 替换 pluginComponents → components/plugin
    $content = $content -replace "@/pluginComponents/", "@/components/plugin/"
    $content = $content -replace "from 'pluginComponents/", "from 'components/plugin/"
    
    # 替换组件名（移除 i 前缀）
    $content = $content -replace "from '@/components/antd/i([A-Z])", "from '@/components/antd/`$1"
    $content = $content -replace "from '@/components/plugin/i([A-Z])", "from '@/components/plugin/`$1"
    
    # 替换 notFound → NotFound
    $content = $content -replace "components/antd/notFound", "components/antd/NotFound"
    
    if ($content -ne $originalContent) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
        Write-Host "   更新: $($file.FullName)" -ForegroundColor Green
        $importUpdateCount++
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "重命名完成！" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "重命名文件数: $renameCount" -ForegroundColor Yellow
Write-Host "更新导入数: $importUpdateCount" -ForegroundColor Yellow
Write-Host ""
Write-Host "下一步操作：" -ForegroundColor Cyan
Write-Host "1. 运行 'npm run dev' 检查是否有错误" -ForegroundColor White
Write-Host "2. 运行 'npm run lint' 检查代码规范" -ForegroundColor White
Write-Host "3. 手动检查并修复任何遗漏的导入" -ForegroundColor White
Write-Host "4. 提交更改: git add . && git commit -m 'refactor: unify component naming conventions'" -ForegroundColor White
Write-Host ""
