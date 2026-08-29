# 固件升级（MCU OTA）

升级底座 **MCU** 固件（非 Android APK）。

```java
String upgradeFirmware(byte[] firmware, FirmwareUpgradeListener listener)
    throws DockException
```

| 参数 | 说明 |
|------|------|
| `firmware` | 原始 `.bin` 字节，**1..0xD000** |
| `listener` | 可选；`onProgress` 在主线程 |

返回值：升级成功后读回的固件版本字符串。

**FirmwareUpgradeStage：** `REBOOT`、`WAIT_BOOT`、`FILESIZE`、`VERIFY`、`ERASE`、`TRANSFER`、`READ_VERSION`、`DONE`。

`current` / `total` 在 `ERASE`（页）与 `TRANSFER`（包）阶段有意义。整体 OTA 预算约 **180 秒**。
