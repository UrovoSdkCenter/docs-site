# 底座控制

## unlockCradle

异步解锁底座，回调在主线程。

```java
void unlockCradle(UnlockCallback callback)
```

| 参数 | 说明 |
|------|------|
| `callback` | `onAck` / `onSuccess` / `onFailure` 在主线程 |

## 其他接口

| 方法 | 说明 |
|------|------|
| `setUnlockTimeSeconds(int seconds)` | 解锁时长 **1..30** |
| `getUnlockTimeSeconds()` | 读取解锁时长 |
| `setLedEnabled(boolean enable)` | LED 开关 |
| `getLedEnabled()` | 读取 LED 状态 |
| `rebootCradle()` | 重启底座（cmd 0xB8）；**不会**单独执行 OTA |
