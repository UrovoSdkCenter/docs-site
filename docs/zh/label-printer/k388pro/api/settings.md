# 打印设置

页内设置随本次组包下发；寄存器设置立即写入设备，需已连接。

## 本次任务设置（随当前页发送）

| 方法 | 范围 | 说明 |
|------|------|------|
| `setContrast(int level)` | 0–3 | 对比度，数值越大越深；越界抛 `IllegalArgumentException` |
| `setSpeed(int level)` | 0–5 | 速度，0 最慢 |
| `setBold(int level)` | 0 或 >0 | 加粗 |
| `setPrintWait(int time)` | ≥0 | 延时，单位为 1/8 秒 |
| `contRast(int level)` | — | 同对比度指令（组包） |
| `speed(int level)` | — | 同速度指令（组包） |
| `printWait(int time)` | — | 同延时指令（组包） |

## 打印机持久设置（立即写入，需已连接）

| 方法 | 说明 |
|------|------|
| `setPrintDarkness(int darkness)` | 打印浓度，失败抛 `PrinterException` |
| `setPrintMode(int mode)` | 0 正常 / 1 高速 / 2 低速 |
| `setMultiPrintDelay(int delayMs)` | 多份打印间隔，单位毫秒，须 ≥0 |
| `setRewindPrint(boolean enable)` | 是否启用回卷打印 |
