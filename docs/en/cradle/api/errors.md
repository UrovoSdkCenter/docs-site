# Callbacks and errors

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

Checked exception: `DockError getError()`, `getMessage()`.

| DockError | Typical cause |
|-----------|---------------|
| `PORT_NOT_OPEN` | Link not `ONLINE` |
| `LINK_LOST` | Link dropped mid-transaction |
| `CHECKSUM` | Frame XOR failed |
| `TIMEOUT` | Response timeout |
| `FRAME_FORMAT` | Unparseable frame |
| `INVALID_ARGUMENT` | Out-of-range args (incl. OTA size) |
| `UNLOCK_DENIED` | Cradle rejected unlock |
| `COMMAND_DENIED` | Cradle rejected write |
| `OTA_BOOT_TIMEOUT` | No `@BOOT@` within 2 s after reboot |
| `OTA_SETUP_FAILED` | `filesize` / `verify` failed |
| `OTA_ERASE_FAILED` | Erase failed or timed out |
| `OTA_TRANSFER_FAILED` | No `'C'` or YMODEM ACK failed |
| `OTA_VERSION_READ` | Transfer OK but version unreadable |

## MLog

| Method | Description |
|--------|-------------|
| `setLogEnabled(boolean on)` | Master switch |
| `setMinLevel(int level)` | Android log level floor |
| `d` / `i` / `w` / `e` | Log lines (auto `>>` prefix) |
| `toHex(byte[] data)` | Uppercase hex |
