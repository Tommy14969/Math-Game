# 自动查找可用端口并启动前端
Write-Host "========================================"  -ForegroundColor Cyan
Write-Host "  数学大冒险 - 前端启动脚本" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 检查node_modules
if (-not (Test-Path "node_modules")) {
    Write-Host "[1/3] 首次运行，正在安装依赖..." -ForegroundColor Yellow
    npm install
} else {
    Write-Host "[1/3] 依赖已安装" -ForegroundColor Green
}

# 查找可用端口（从3001开始）
Write-Host ""
Write-Host "[2/3] 查找可用端口..." -ForegroundColor Yellow
$port = 3001
$maxPort = 3100

while ($port -lt $maxPort) {
    $connection = Test-NetConnection -ComputerName localhost -Port $port -InformationLevel Quiet -WarningAction SilentlyContinue
    if (-not $connection) {
        Write-Host "找到可用端口: $port" -ForegroundColor Green
        break
    }
    $port++
}

if ($port -eq $maxPort) {
    Write-Host "错误：无法找到可用端口" -ForegroundColor Red
    exit 1
}

# 启动服务器
Write-Host ""
Write-Host "[3/3] 启动开发服务器..." -ForegroundColor Yellow
Write-Host ""
Write-Host "前端地址: http://localhost:$port" -ForegroundColor Cyan
Write-Host "按 Ctrl+C 可以停止服务器" -ForegroundColor Gray
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

npm run dev -- -p $port
