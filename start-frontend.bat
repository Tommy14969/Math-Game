@echo off
echo ========================================
echo   数学大冒险 - 前端启动脚本
echo ========================================
echo.

cd /d "%~dp0"

echo [1/2] 检查依赖...
if not exist "node_modules" (
    echo 首次运行，正在安装依赖...
    call npm install
) else (
    echo 依赖已安装 ✓
)

echo.
echo [2/2] 启动开发服务器...
echo.
echo 前端地址: http://localhost:3010
echo 按 Ctrl+C 可以停止服务器
echo.
echo ========================================
echo.

call npm run dev

pause
