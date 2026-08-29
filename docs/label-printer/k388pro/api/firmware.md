# Firmware

| Method | Description |
|--------|-------------|
| `getFirmWareVersion()` | Reads firmware version. Returns `null` on failure or while upgrading. |
| `upgradeFirmware(String path)` | Upgrades firmware (blocking). |
| `upgradeFirmware(String path, FirmwareUpgradeListener listener)` | Upgrades with progress callback. |

Upgrade is blocking—run on a worker thread. After completion the SDK disconnects and waits about 25 seconds for reboot; call `connect` again before printing.

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

| Method | Description |
|--------|-------------|
| `onProgress(int sentBytes, int totalBytes)` | Send progress |
| `onCompleted()` | Send finished and reboot wait done |

## PrinterException

| Method | Description |
|--------|-------------|
| `getErrorCode()` | Error code if provided at construction |
