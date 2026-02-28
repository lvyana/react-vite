# 修复文件编码问题

$ErrorActionPreference = "Stop"
$utf8NoBom = [System.Text.UTF8Encoding]::new($false)

Write-Host "修复文件编码..." -ForegroundColor Green

$file = "src\components\antd\AppForm\index.tsx"
if (Test-Path $file) {
    # 读取文件内容（自动检测编码）
    $content = Get-Content $file -Raw -Encoding UTF8
    
    # 修复乱码的注释
    $content = $content -replace '// #----------- �\? ts类型定义 ----------- 分割�\?----------- �\? JS代码 -----------', '// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------'
    $content = $content -replace '// 响应式配置常�\?', '// 响应式配置常量'
    
    # 使用 UTF-8 无 BOM 保存
    [System.IO.File]::WriteAllText((Resolve-Path $file).Path, $content, $utf8NoBom)
    Write-Host "  ✓ $file" -ForegroundColor Cyan
}

Write-Host "`n修复完成！" -ForegroundColor Green
