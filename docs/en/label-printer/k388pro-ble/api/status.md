# Status and firmware

| Method | Description |
|--------|-------------|
| `getPrinterStatus()` | Queries printer status. |
| `getPrinterStatusDescription()` | Returns the status description. |
| `getFirmwareVersion()` | Reads firmware version. Returns `null` on failure. |
| `upgradeFirmware(String path)` | Upgrades firmware (blocking). |
| `upgradeFirmware(String path, FirmwareUpgradeListener listener)` | Upgrades firmware with progress. |

## PrinterStatus

| Status | Meaning |
|--------|---------|
| `OK` | Ready to print |
| `COVER_OPEN` | Cover open |
| `NO_PAPER` | Out of paper |
| `PAPER_ERROR` | Paper error |
| `DISCONNECTED` | Not connected |
| `COMMUNICATION_ERROR` | Communication failed |
| `UNKNOWN_ERROR` | Unknown error |

```java
PrinterStatus status = printer.getPrinterStatus();
if (!status.isReady()) {
    // status.getSuggestedAction()
}
```

## Firmware upgrade

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

Upgrade is blocking. Run it on a worker thread. The SDK disconnects after upgrade; reconnect before printing.
