# 步骤 4：重命名 Ant Design 组件（i前缀 → App前缀）
# 影响范围：28 个组件文件夹
# 预计时间：30-45 分钟
# 风险等级：高

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "步骤 4：重命名 Ant Design 组件" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "本步骤将：" -ForegroundColor Yellow
Write-Host "  1. 重命名所有 Ant Design 组件（i前缀 → App前缀）" -ForegroundColor White
Write-Host "  2. 更新所有导入路径和组件使用" -ForegroundColor White
Write-Host ""
Write-Host "示例：" -ForegroundColor Gray
Write-Host "  iButton → AppButton" -ForegroundColor Gray
Write-Host "  iCard → AppCard" -ForegroundColor Gray
Write-Host "  iTable → AppTable" -ForegroundColor Gray
Write-Host ""
Write-Host "影响范围：28 个组件，所有使用这些组件的文件" -ForegroundColor Gray
Write-Host "预计时间：30-45 分钟" -ForegroundColor Gray
Write-Host "风险等级：高" -ForegroundColor Red
Write-Host ""
Write-Host "⚠️  警告：此步骤影响范围大，建议先备份！" -ForegroundColor Red
Write-Host ""

$confirmation = Read-Host "是否继续？(输入 YES 继续)"
if ($confirmation -ne "YES") {
    Write-Host "已取消操作。" -ForegroundColor Yellow
    exit 0
}

Write-Host ""

$components = @(
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
    @{old="iUpload"; new="AppUpload"},
    @{old="notFound"; new="NotFound"}
)

$renameCount = 0
$total = $components.Count

Write-Host "开始重命名 $total 个组件..." -ForegroundColor Yellow
Write-Host ""

# 1. 重命名文件夹
Write-Host "[1/2] 重命名组件文件夹" -ForegroundColor Cyan
$current = 0
foreach ($component in $components) {
    $current++
    $oldPath = "src/components/antd/$($component.old)"
    $newPath = "src/components/antd/$($component.new)"
    
    if (Test-Path $oldPath) {
        $isGitRepo = Test-Path ".git"
        if ($isGitRepo) {
            git mv $oldPath $newPath 2>$null
            if ($LASTEXITCODE -eq 0) {
                Write-Host "[$current/$total] ✓ $($component.old) → $($component.new)" -ForegroundColor Green
                $renameCount++
            } else {
                Rename-Item -Path $oldPath -NewName $component.new -Force
                Write-Host "[$current/$total] ✓ $($component.old) → $($component.new)" -ForegroundColor Green
                $renameCount++
            }
        } else {
            Rename-Item -Path $oldPath -NewName $component.new -Force
            Write-Host "[$current/$total] ✓ $($component.old) → $($component.new)" -ForegroundColor Green
            $renameCount++
        }
    } else {
        Write-Host "[$current/$total] ⊘ 跳过: $($component.old)" -ForegroundColor Gray
    }
}

Write-Host ""

# 2. 更新导入路径和组件使用
Write-Host "[2/2] 更新导入路径和组件使用" -ForegroundColor Cyan
$filesToUpdate = Get-ChildItem -Path "src" -Recurse -Include "*.tsx","*.ts" -File
$updateCount = 0

foreach ($file in $filesToUpdate) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    $originalContent = $content
    
    # 替换导入路径
    foreach ($component in $components) {
        $content = $content -replace "from '@/components/antd/$($component.old)'", "from '@/components/antd/$($component.new)'"
        $content = $content -replace "from '@/components/antd/$($component.old)/", "from '@/components/antd/$($component.new)/"
    }
    
    # 替换组件使用（特殊处理常用组件）
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
    $content = $content -replace "<Iinput", "<AppInput"
    $content = $content -replace "</Iinput>", "</AppInput>"
    $content = $content -replace "<Iselect", "<AppSelect"
    $content = $content -replace "</Iselect>", "</AppSelect>"
    
    if ($content -ne $originalContent) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
        $updateCount++
    }
}

Write-Host "✓ 更新了 $updateCount 个文件" -ForegroundColor Green

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "步骤 4 完成！" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "重命名组件数: $renameCount" -ForegroundColor Yellow
Write-Host "更新文件数: $updateCount" -ForegroundColor Yellow
Write-Host ""
Write-Host "⚠️  重要：" -ForegroundColor Red
Write-Host "1. 立即运行 'npm run dev' 测试项目" -ForegroundColor White
Write-Host "2. 仔细检查所有页面和功能" -ForegroundColor White
Write-Host "3. 检查控制台是否有错误" -ForegroundColor White
Write-Host "4. 如果有问题，使用 git 回滚" -ForegroundColor White
Write-Host "5. 如果正常，运行步骤 5：" -ForegroundColor White
Write-Host "   powershell -ExecutionPolicy Bypass -File scripts/naming/step-by-step/step5-rename-plugin-components.ps1" -ForegroundColor Yellow
Write-Host ""
