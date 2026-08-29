# 打印设置

## 本次任务设置（随当前页发送）

| 方法 | 范围 | 说明 |
|------|------|------|
| `setContrast(int level)` | 0–3 | 对比度，数值越大越深 |
| `setSpeed(int level)` | 0–5 | 速度，0 最慢 |
| `setBold(int level)` | 0 或 >0 | 加粗 |
| `setPrintWait(int time)` | ≥0 | 延时，单位为 1/8 秒 |

## 打印机持久设置（立即写入，需已连接）

| 方法 | 说明 |
|------|------|
| `setPrintDarkness(int darkness)` | 打印浓度 |
| `setPrintMode(int mode)` | 0 正常 / 1 快速 / 2 慢速 |
| `setMultiPrintDelay(int delayMs)` | 多份打印间隔，单位毫秒 |
| `setRewindPrint(boolean enable)` | 是否启用回卷打印 |

失败时这些方法会抛出 `PrinterException`。
