# 测试所有路由的脚本
$baseUrl = "http://localhost:3004"
$routes = @(
    "/antd/searchForm",
    "/antd/antdTable",
    "/antd/dynamicform",
    "/react/hooks/useState",
    "/react/hooks/useEffect",
    "/react/hooks/useLayoutEffect",
    "/react/hooks/useInsertionEffect",
    "/react/hooks/useReducer",
    "/react/hooks/useContext",
    "/react/hooks/useMemo",
    "/react/hooks/useCallback",
    "/react/hooks/useRef",
    "/react/hooks/forwardRef",
    "/react/hooks/useImperativeHandle",
    "/react/hooks/useTransition",
    "/react/hooks/useDeferredValue",
    "/react/hooks/useSyncExternalStore",
    "/react/reactDom/createPortal",
    "/react/reactDom/flushSync",
    "/react/reactDom/suspense",
    "/react/reduxtoolkit",
    "/plugin/player",
    "/plugin/gridLayout",
    "/plugin/richtextedit",
    "/plugin/pdf",
    "/plugin/responsive",
    "/plugin/i18n",
    "/plugin/dnd",
    "/plugin/burst",
    "/plugin/easyTyper",
    "/plugin/logicFlow",
    "/plugin/openLayers",
    "/plugin/canvas",
    "/plugin/dashboard"
)

$results = @()

foreach ($route in $routes) {
    $url = "$baseUrl$route"
    Write-Host "Testing: $url" -ForegroundColor Cyan
    
    try {
        $response = Invoke-WebRequest -Uri $url -TimeoutSec 5 -UseBasicParsing
        $status = $response.StatusCode
        $success = $status -eq 200
        
        $results += [PSCustomObject]@{
            Route = $route
            Status = $status
            Success = $success
            Error = ""
        }
        
        if ($success) {
            Write-Host "  ✓ OK" -ForegroundColor Green
        } else {
            Write-Host "  ✗ Status: $status" -ForegroundColor Yellow
        }
    }
    catch {
        $results += [PSCustomObject]@{
            Route = $route
            Status = "Error"
            Success = $false
            Error = $_.Exception.Message
        }
        Write-Host "  ✗ Error: $($_.Exception.Message)" -ForegroundColor Red
    }
    
    Start-Sleep -Milliseconds 200
}

# 输出总结
Write-Host "`n========== Test Summary ==========" -ForegroundColor Cyan
$successCount = ($results | Where-Object { $_.Success }).Count
$failCount = ($results | Where-Object { -not $_.Success }).Count

Write-Host "Total: $($results.Count)" -ForegroundColor White
Write-Host "Success: $successCount" -ForegroundColor Green
Write-Host "Failed: $failCount" -ForegroundColor Red

if ($failCount -gt 0) {
    Write-Host "`nFailed Routes:" -ForegroundColor Red
    $results | Where-Object { -not $_.Success } | ForEach-Object {
        Write-Host "  - $($_.Route): $($_.Error)" -ForegroundColor Red
    }
}

# 保存结果到文件
$results | Export-Csv -Path "route-test-results.csv" -NoTypeInformation -Encoding UTF8
Write-Host "`nResults saved to route-test-results.csv" -ForegroundColor Cyan
