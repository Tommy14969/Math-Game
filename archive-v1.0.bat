@echo off
REM Math Game v1.0 版本归档脚本 (Windows)
REM 用途：将当前项目标记为v1.0版本并创建归档

setlocal enabledelayedexpansion

echo =========================================
echo   Math Game v1.0 版本归档脚本
echo =========================================
echo.

REM 检查是否在git仓库中
if not exist ".git" (
    echo [警告] 当前目录不是git仓库
    echo 建议先初始化git仓库：
    echo   git init
    echo   git add .
    echo   git commit -m "Initial commit: Math Game v1.0"
    echo.
    set /p continue="是否继续归档（不使用git）？(y/n) "
    if /i not "!continue!"=="y" exit /b 1
)

REM 1. 创建版本目录
echo [1/6] 创建版本归档目录...
set VERSION_DIR=archive\v1.0
if not exist "%VERSION_DIR%" mkdir "%VERSION_DIR%"
echo [完成] 创建目录: %VERSION_DIR%
echo.

REM 2. 生成版本快照
echo [2/6] 生成版本快照...
set SNAPSHOT_FILE=%VERSION_DIR%\v1.0-snapshot.txt

echo Math Game v1.0 版本快照 > "%SNAPSHOT_FILE%"
echo ===================================== >> "%SNAPSHOT_FILE%"
echo. >> "%SNAPSHOT_FILE%"
echo 生成时间: %date% %time% >> "%SNAPSHOT_FILE%"
echo 版本号: 1.0.0 >> "%SNAPSHOT_FILE%"
echo 状态: Production Ready >> "%SNAPSHOT_FILE%"
echo. >> "%SNAPSHOT_FILE%"
echo 项目文件统计 >> "%SNAPSHOT_FILE%"
echo ------------------------------------- >> "%SNAPSHOT_FILE%"

REM 统计文件（简化版）
for /f %%a in ('dir /s /b /a-d ^| find /v /c ""') do set TOTAL=%%a
echo 总文件数: !TOTAL! >> "%SNAPSHOT_FILE%"
echo. >> "%SNAPSHOT_FILE%"
echo 依赖包信息: >> "%SNAPSHOT_FILE%"
type package.json ^| findstr /C:"dependencies" >> "%SNAPSHOT_FILE%"

echo [完成] 快照已保存: %SNAPSHOT_FILE%
echo.

REM 3. 复制关键文档到归档目录
echo [3/6] 复制文档到归档目录...
copy /Y "CHANGELOG.md" "%VERSION_DIR%\" >nul 2>&1
copy /Y "README_v1.0.md" "%VERSION_DIR%\" >nul 2>&1
copy /Y "PROJECT_STATUS.md" "%VERSION_DIR%\" >nul 2>&1
copy /Y "VERSION_1.0_RELEASE_NOTES.md" "%VERSION_DIR%\" >nul 2>&1
copy /Y "package.json" "%VERSION_DIR%\" >nul 2>&1
echo [完成] 文档已复制
echo.

REM 4. 生成文件清单
echo [4/6] 生成文件清单...
set FILE_LIST=%VERSION_DIR%\file-list.txt
dir /s /b /a-d > "%FILE_LIST%"
echo [完成] 文件清单已生成: %FILE_LIST%
echo.

REM 5. 创建版本标记
echo [5/6] 创建版本标记...
(
echo # Math Game v1.0 版本信息
echo.
echo ## 版本详情
echo - **版本号**: 1.0.0
echo - **发布日期**: 2026-02-21
echo - **状态**: Production Ready
echo.
echo ## 归档内容
echo - CHANGELOG.md
echo - README_v1.0.md
echo - PROJECT_STATUS.md
echo - VERSION_1.0_RELEASE_NOTES.md
echo - v1.0-snapshot.txt
echo - file-list.txt
) > "%VERSION_DIR%\VERSION_INFO.md"
echo [完成] 版本标记已创建
echo.

REM 6. Git标记
if exist ".git" (
    echo [6/6] 创建Git标签...
    git tag -a v1.0.0 -m "Release v1.0.0: Initial stable release" 2>nul
    if errorlevel 1 (
        echo [提示] 标签 v1.0.0 可能已存在
    ) else (
        echo [完成] Git标签 v1.0.0 已创建
        echo 提示：推送标签到远程仓库
        echo   git push origin v1.0.0
    )
) else (
    echo [6/6] Git仓库检测
    echo [跳过] 非git仓库
)

echo.
echo =========================================
echo   v1.0 归档完成！
echo =========================================
echo.
echo 归档位置: %VERSION_DIR%\
echo.
echo 下一步：
echo   1. 查看归档内容: cd %VERSION_DIR%
echo   2. 阅读发布说明: type VERSION_1.0_RELEASE_NOTES.md
echo   3. 开始2.0开发
echo.
pause
