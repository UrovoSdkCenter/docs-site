# 回调与错误

## UnlockCallback

```java
void onAck();
void onSuccess();
void onFailure(DockError error);
```

## FirmwareUpgradeListener

```java
void onProgress(FirmwareUpgradeStage stage, int current, int total);
```

## DockLinkListener

```java
void onLinkStateChanged(LinkState state);
```

## DockException / DockError

受检异常：`DockError getError()`、`getMessage()`。

| DockError | Typical cause |
|-----------|---------------|
| `PORT_NOT_OPEN` | 链路非 `ONLINE` |
| `LINK_LOST` | 事务期间连接断开 |
| `CHECKSUM` | 帧 XOR 校验失败 |
| `TIMEOUT` | 响应超时 |
| `FRAME_FORMAT` | 帧无法解析 |
| `INVALID_ARGUMENT` | 参数越界（含 OTA 大小） |
| `UNLOCK_DENIED` | 底座拒绝解锁 |
| `COMMAND_DENIED` | 底座拒绝写入 |
| `OTA_BOOT_TIMEOUT` | 重启后 2 s 内无 `@BOOT@` |
| `OTA_SETUP_FAILED` | `filesize` / `verify` 失败 |
| `OTA_ERASE_FAILED` | 擦除失败或超时 |
| `OTA_TRANSFER_FAILED` | 无 `'C'` 或 YMODEM ACK 失败 |
| `OTA_VERSION_READ` | 传输成功但版本不可读 |

## MLog

| 方法 | 说明 |
|------|------|
| `setLogEnabled(boolean on)` | 总开关 |
| `setMinLevel(int level)` | Android 日志级别下限 |
| `d` / `i` / `w` / `e` | 日志行（自动 `>>` 前缀） |
| `toHex(byte[] data)` | 大写十六进制 |
