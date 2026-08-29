# 固件

| 方法 | 说明 |
|------|------|
| `getFirmWareVersion()` | 读取固件版本。失败或升级中返回 `null`。 |
| `upgradeFirmware(String path)` | 升级固件（阻塞）。 |
| `upgradeFirmware(String path, FirmwareUpgradeListener listener)` | 升级固件并回调进度。 |

升级为阻塞调用，请在工作线程中执行。完成后断开连接并等待约 25 秒重启，打印前需重新 `connect`。

```java
printer.upgradeFirmware("/sdcard/firmware.upd",
        new UPrinterManager.FirmwareUpgradeListener() {
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

## FirmwareUpgradeListener

| 方法 | 说明 |
|------|------|
| `onProgress(int sentBytes, int totalBytes)` | 发送进度 |
| `onCompleted()` | 发送结束且重启等待完成 |

## PrinterException

| 方法 | 说明 |
|------|------|
| `getErrorCode()` | 错误码（若构造时传入） |
