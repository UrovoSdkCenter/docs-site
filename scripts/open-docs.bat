@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo K388Pro Print SDK v2.4.0
echo 正在启动本地文档服务...
echo 浏览器将打开: http://127.0.0.1:8080/label-printer/k388pro/
echo 关闭本窗口即停止文档服务。
echo.

powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0open-docs.ps1"
pause
