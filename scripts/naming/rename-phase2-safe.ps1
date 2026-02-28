# 文件重命名脚本 - 阶段二（安全版本）：使用 App 前缀避免冲突
# 使用方法：在项目根目录运行 powershell -ExecutionPolicy Bypass -File scripts/rename-phase2-safe.ps1

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "文件重命名脚本 - 阶段二（安全版本）" -ForegroundColor Cyan
Write-Host "使用 App 前缀避免与 Ant Design 冲突" -ForegroundColor Cyan
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
# 2. 重命名 Ant Design 组件（使用 App 前缀）
# ============================================
Write-Host "2. 重命名 Ant Design 组件（使用 App 前缀避免冲突）" -ForegroundColor Cyan
Write-Host "----------------------------------------" -ForegroundColor Gray

$antdComponents = @(
    @{old="iButton"; new="AppButton"},
    @{old="iCard"; new="AppCard"},
    @{old="iCascader"; new="AppCascader"},
    @{old="iCheckbox"; new="AppCheckbox"},
    @{old="iCollapse"; new="AppCollapse"},
    @{old="iDrawer"; new="AppDrawer"},
    @{old="iDropdown"; new="AppDropdown"},
    @{old="iEditHeader"; new="AppEditHeader"},
    @{old="iForm"; new="AppForm"},
    @{old="iInput"; new="AppInput"},
    @{old="iLoading"; new="AppLoading"},
    @{old="iModal"; new="AppModal"},
    @{old="iPagination"; new="AppPagination"},
    @{old="iPicker"; new="AppPicker"},
    @{old="iRadio"; new="AppRadio"},
    @{old="iRate"; new="AppRate"},
    @{old="iSearchForm"; new="AppSearchForm"},
    @{old="iSearchTag"; new="AppSearchTag"},
    @{old="iSelect"; new="AppSelect"},
    @{old="iSlider"; new="AppSlider"},
    @{old="iSwitch"; new="AppSwitch"},
    @{old="iTable"; new="AppTable"},
    @{old="iTooltip"; new="AppTooltip"},
    @{old="iTour"; new="AppTour"},
    @{old="iTree"; new="AppTree"},
    @{old="iTreeSelect"; new="AppTreeSelect"},
    @{old="iUpload"; new="AppUpload"}
)

foreach ($component in $antdComponents) {
    $oldPath = "src/components/antd/$($component.old)"
    $newPath = "src/components/antd/$($component.new)"
    Safe-Rename $oldPath $newPath
}

# NotFound 组件（特殊页面组件，不需要 App 前缀）
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
# 4. 移除 plugin 组件的 i 前缀（不会冲突）
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
    
    # 替换 Ant Design 组件名（i前缀 → App前缀）
    $content = $content -replace "from '@/components/antd/iButton'", "from '@/components/antd/AppButton'"
    $content = $content -replace "from '@/components/antd/iCard'", "from '@/components/antd/AppCard'"
    $content = $content -replace "from '@/components/antd/iTable'", "from '@/components/antd/AppTable'"
    $content = $content -replace "from '@/components/antd/iForm'", "from '@/components/antd/AppForm'"
    $content = $content -replace "from '@/components/antd/iModal'", "from '@/components/antd/AppModal'"
    $content = $content -replace "from '@/components/antd/iInput'", "from '@/components/antd/AppInput'"
    $content = $content -replace "from '@/components/antd/iSelect'", "from '@/components/antd/AppSelect'"
    $content = $content -replace "from '@/components/antd/iPagination'", "from '@/components/antd/AppPagination'"
    $content = $content -replace "from '@/components/antd/iUpload'", "from '@/components/antd/AppUpload'"
    $content = $content -replace "from '@/components/antd/iDrawer'", "from '@/components/antd/AppDrawer'"
    $content = $content -replace "from '@/components/antd/iDropdown'", "from '@/components/antd/AppDropdown'"
    $content = $content -replace "from '@/components/antd/iCascader'", "from '@/components/antd/AppCascader'"
    $content = $content -replace "from '@/components/antd/iCheckbox'", "from '@/components/antd/AppCheckbox'"
    $content = $content -replace "from '@/components/antd/iCollapse'", "from '@/components/antd/AppCollapse'"
    $content = $content -replace "from '@/components/antd/iEditHeader'", "from '@/components/antd/AppEditHeader'"
    $content = $content -replace "from '@/components/antd/iLoading'", "from '@/components/antd/AppLoading'"
    $content = $content -replace "from '@/components/antd/iPicker'", "from '@/components/antd/AppPicker'"
    $content = $content -replace "from '@/components/antd/iRadio'", "from '@/components/antd/AppRadio'"
    $content = $content -replace "from '@/components/antd/iRate'", "from '@/components/antd/AppRate'"
    $content = $content -replace "from '@/components/antd/iSearchForm'", "from '@/components/antd/AppSearchForm'"
    $content = $content -replace "from '@/components/antd/iSearchTag'", "from '@/components/antd/AppSearchTag'"
    $content = $content -replace "from '@/components/antd/iSlider'", "from '@/components/antd/AppSlider'"
    $content = $content -replace "from '@/components/antd/iSwitch'", "from '@/components/antd/AppSwitch'"
    $content = $content -replace "from '@/components/antd/iTooltip'", "from '@/components/antd/AppTooltip'"
    $content = $content -replace "from '@/components/antd/iTour'", "from '@/components/antd/AppTour'"
    $content = $content -replace "from '@/components/antd/iTree'", "from '@/components/antd/AppTree'"
    $content = $content -replace "from '@/components/antd/iTreeSelect'", "from '@/components/antd/AppTreeSelect'"
    
    # 替换组件使用（JSX 中）
    $content = $content -replace "<Ibutton", "<AppButton"
    $content = $content -replace "</Ibutton>", "</AppButton>"
    $content = $content -replace "<Icard", "<AppCard"
    $content = $content -replace "</Icard>", "</AppCard>"
    $content = $content -replace "<Itable", "<AppTable"
    $content = $content -replace "</Itable>", "</AppTable>"
    $content = $content -replace "<Iform", "<AppForm"
    $content = $content -replace "</Iform>", "</AppForm>"
    $content = $content -replace "<Imodal", "<AppModal"
    $content = $content -replace "</Imodal>", "</AppModal>"
    
    # 替换 plugin 组件（移除 i 前缀）
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

# ============================================
# 6. 创建统一导出文件
# ============================================
Write-Host "6. 创建统一导出文件..." -ForegroundColor Cyan
Write-Host "----------------------------------------" -ForegroundColor Gray

$antdIndexContent = @"
/**
 * @file Ant Design 封装组件统一导出
 * @description 所有组件使用 App 前缀以避免与 Ant Design 原生组件冲突
 */

// 基础组件
export { default as AppButton } from './AppButton';
export { default as AppCard } from './AppCard';
export { default as AppInput } from './AppInput';
export { default as AppSelect } from './AppSelect';
export { default as AppCheckbox } from './AppCheckbox';
export { default as AppRadio } from './AppRadio';
export { default as AppSwitch } from './AppSwitch';
export { default as AppSlider } from './AppSlider';
export { default as AppRate } from './AppRate';

// 表单组件
export { default as AppForm } from './AppForm';
export { default as AppSearchForm } from './AppSearchForm';
export { default as AppSearchTag } from './AppSearchTag';

// 数据展示
export { default as AppTable } from './AppTable';
export { default as AppCollapse } from './AppCollapse';
export { default as AppTree } from './AppTree';
export { default as AppTreeSelect } from './AppTreeSelect';
export { default as AppTooltip } from './AppTooltip';

// 反馈组件
export { default as AppModal } from './AppModal';
export { default as AppDrawer } from './AppDrawer';
export { default as AppLoading } from './AppLoading';

// 其他组件
export { default as AppUpload } from './AppUpload';
export { default as AppPagination } from './AppPagination';
export { default as AppDropdown } from './AppDropdown';
export { default as AppCascader } from './AppCascader';
export { default as AppPicker } from './AppPicker';
export { default as AppTour } from './AppTour';
export { default as AppEditHeader } from './AppEditHeader';

// 特殊组件
export { default as NotFound } from './NotFound';
"@

if (Test-Path "src/components/antd") {
    Set-Content -Path "src/components/antd/index.ts" -Value $antdIndexContent -Encoding UTF8
    Write-Host "   创建: src/components/antd/index.ts" -ForegroundColor Green
}

$pluginIndexContent = @"
/**
 * @file Plugin 组件统一导出
 */

export { default as AnimateComponent } from './AnimateComponent';
export { default as CodeEditor } from './CodeEditor';
export { default as Copy } from './Copy';
export { default as EasyTyper } from './EasyTyper';
export { default as Fullscreen } from './Fullscreen';
export { default as GridLayout } from './GridLayout';
export { default as InfiniteScroll } from './InfiniteScroll';
export { default as InnerHTML } from './InnerHTML';
export { default as Loading } from './Loading';
export { default as Markdown } from './Markdown';
export { default as Responsive } from './Responsive';
export { default as Transition } from './Transition';
"@

if (Test-Path "src/components/plugin") {
    Set-Content -Path "src/components/plugin/index.ts" -Value $pluginIndexContent -Encoding UTF8
    Write-Host "   创建: src/components/plugin/index.ts" -ForegroundColor Green
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "重命名完成！" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "重命名文件数: $renameCount" -ForegroundColor Yellow
Write-Host "更新导入数: $importUpdateCount" -ForegroundColor Yellow
Write-Host ""
Write-Host "重要提示：" -ForegroundColor Cyan
Write-Host "1. 所有 Ant Design 封装组件现在使用 'App' 前缀" -ForegroundColor White
Write-Host "2. 这样可以避免与 Ant Design 原生组件冲突" -ForegroundColor White
Write-Host "3. 例如：import AppButton from '@/components/antd/AppButton'" -ForegroundColor White
Write-Host ""
Write-Host "下一步操作：" -ForegroundColor Cyan
Write-Host "1. 运行 'npm run dev' 检查是否有错误" -ForegroundColor White
Write-Host "2. 运行 'npm run lint' 检查代码规范" -ForegroundColor White
Write-Host "3. 手动检查并修复任何遗漏的导入" -ForegroundColor White
Write-Host "4. 测试所有页面功能是否正常" -ForegroundColor White
Write-Host "5. 提交更改: git add . && git commit -m 'refactor: use App prefix to avoid naming conflicts'" -ForegroundColor White
Write-Host ""
