@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo SDK v1.0.0  K388Pro BLE
echo 正在启动本地文档服务...
echo 浏览器将打开: http://127.0.0.1:8080/label-printer/k388pro-ble/
echo 关闭本窗口即停止文档服务。
echo.

powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0open-docs.ps1"
pause
