# 状态与固件

| 方法 | 说明 |
|------|------|
| `getPrinterStatus()` | 查询打印机状态。 |
| `getPrinterStatusDescription()` | 返回状态描述。 |
| `getFirmwareVersion()` | 读取固件版本。失败返回 `null`。 |
| `upgradeFirmware(String path)` | 升级固件（阻塞）。 |
| `upgradeFirmware(String path, FirmwareUpgradeListener listener)` | 升级固件并回调进度。 |

## PrinterStatus

| 状态 | 含义 |
|------|------|
| `OK` | 可打印 |
| `COVER_OPEN` | 开盖 |
| `NO_PAPER` | 缺纸 |
| `PAPER_ERROR` | 纸张异常 |
| `DISCONNECTED` | 未连接 |
| `COMMUNICATION_ERROR` | 通信失败 |
| `UNKNOWN_ERROR` | 未知错误 |

```java
PrinterStatus status = printer.getPrinterStatus();
if (!status.isReady()) {
    // status.getSuggestedAction()
}
```

## 固件升级

```java
printer.upgradeFirmware("/sdcard/firmware.upd",
        new BlePrinterManager.FirmwareUpgradeListener() {
            @Override
            public void onProgress(int sentBytes, int totalBytes) {
                // Progress
            }

            @Override
            public void onCompleted() {
                // Finished. Call connect() again.
            }
        });
```

升级为阻塞调用，请在工作线程中执行。升级完成后 SDK 会断开连接，打印前需重新 `connect`。
