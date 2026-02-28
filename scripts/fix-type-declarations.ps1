# 修复第三方库类型声明问题

$ErrorActionPreference = "Stop"
$encoding = [System.Text.UTF8Encoding]::new($false)

Write-Host "修复第三方库类型声明问题..." -ForegroundColor Green

# 1. 修复 rc-field-form 导入
Write-Host "`n修复 rc-field-form 类型导入..." -ForegroundColor Yellow

$rcFieldFormFiles = @(
    "src\utils\rules.ts",
    "src\views\login\account.tsx",
    "src\views\login\phone.tsx",
    "src\views\myCenter\components\ResetPassword.tsx"
)

foreach ($file in $rcFieldFormFiles) {
    if (Test-Path $file) {
        $content = [System.IO.File]::ReadAllText($file, $encoding)
        
        # 替换 rc-field-form 导入为 antd 的类型
        $content = $content -replace "import { Rule } from 'rc-field-form/lib/interface';", "import type { Rule } from 'antd/es/form';"
        $content = $content -replace "import { ValidateErrorEntity } from 'rc-field-form/lib/interface';", "import type { ValidateErrorEntity } from 'antd/es/form/Form';"
        $content = $content -replace "import { Rule, ValidateErrorEntity } from 'rc-field-form/lib/interface';", "import type { Rule } from 'antd/es/form';`nimport type { ValidateErrorEntity } from 'antd/es/form/Form';"
        
        [System.IO.File]::WriteAllText($file, $content, $encoding)
        Write-Host "  ✓ $file" -ForegroundColor Cyan
    }
}

# 2. 修复 rc-cascader 导入
Write-Host "`n修复 rc-cascader 类型导入..." -ForegroundColor Yellow
$cascaderFile = "src\components\antd\AppCascader\index.tsx"
if (Test-Path $cascaderFile) {
    $content = [System.IO.File]::ReadAllText($cascaderFile, $encoding)
    
    # 注释掉或移除 rc-cascader 导入，使用 any 类型
    $content = $content -replace "import { SingleValueType } from 'rc-cascader/lib/Cascader';", "// import { SingleValueType } from 'rc-cascader/lib/Cascader';`ntype SingleValueType = any;"
    
    [System.IO.File]::WriteAllText($cascaderFile, $content, $encoding)
    Write-Host "  ✓ $cascaderFile" -ForegroundColor Cyan
}

Write-Host "`n修复完成！" -ForegroundColor Green
Write-Host "建议运行: npm run type-check 验证修复" -ForegroundColor Yellow
