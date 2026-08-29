# 注意事项与 FAQ

## 注意事项

1. **串口独占** — SDK 使用单 worker 线程与单 UART。同一时刻仅一项操作。OTA 期间勿并行调用其他 `IDockTool` 方法。
2. **OTA 与帧协议** — OTA 会暂时离开帧模式；SDK 内部处理进入/退出。
3. **`.bin` 大小** — 有效范围 **1..0xD000** 字节。调用前在应用内校验。
4. **闪存过程中不可取消** — `upgradeFirmware` 开始后无官方取消路径。
5. **勿用 SerialPortLibrary 做 IAP** — 仅使用 `IDockTool.upgradeFirmware`。
6. **读字符串可能为空** — 版本 / 型号 / 序列号在等待窗口内可能返回 `""`。

## FAQ

**问：可以在主线程调用阻塞 API 吗？**  
答：若 UI 需保持响应则不建议；请使用后台 `Executor`。OTA 最长可能阻塞约 180 秒。

**问：固件升级中途能否取消？**  
答：`upgradeFirmware` 开始后无官方取消路径。

**问：为何 `getFirmwareVersion()` 返回空字符串？**  
答：底座可能在 SDK 等待窗口内未发送文本；请在 UI 中处理空串。
