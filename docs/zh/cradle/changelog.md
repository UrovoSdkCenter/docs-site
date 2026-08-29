# DockLib ChangeLogs
## 1.0.2 — 2026-08-19

Relative to **1.0.1**.

### Added

| Symbol | Notes |
|--------|--------|
| `String upgradeFirmware(byte[] firmware, FirmwareUpgradeListener listener)` | CradleOTA; returns post-update firmware version string. |
| `FirmwareUpgradeListener` | Optional OTA progress callback on the main thread. |
| `FirmwareUpgradeStage` | `REBOOT`, `WAIT_BOOT`, `FILESIZE`, `VERIFY`, `ERASE`, `TRANSFER`, `READ_VERSION`, `DONE`. |
| `DockError` OTA codes | `OTA_BOOT_TIMEOUT`, `OTA_SETUP_FAILED`, `OTA_ERASE_FAILED`, `OTA_TRANSFER_FAILED`, `OTA_VERSION_READ`. |

### Changed

| Item | 1.0.1 | 1.0.2 |
|------|-------|-------|
| `INVALID_ARGUMENT` | Unlock seconds, layout ids, LED times / count | Also OTA firmware size (**1..0xD000** bytes) |

## 1.0.1 — 2026-08-17

Relative to **1.0.0**.

### Added

| Method | Notes |
|--------|--------|
| `int getUnlockTimeSeconds()` | Read unlock duration (1..30). |
| `boolean getLedEnabled()` | Read LED enable flag. |
| `void setLedTestOnTimeMs(int ms)` | LED test ON time, 0..5000. |
| `void setLedTestOffTimeMs(int ms)` | LED test OFF time, 0..5000. |
| `void setLedTestCount(int count)` | LED test count, 1..100. |
| `void setLedTestAlternate(boolean enable)` | Red-green alternate (cmd 0xB1). |
| `void turnOffLedTest()` | Stop LED test (cmd 0xB9). |
| `void rebootCradle()` | Reboot cradle (cmd 0xB8). |
| `void setHostCharge(boolean fast)` | Write host fast-charge flag. |
| `boolean getHostCharge()` | Read host fast-charge flag. |
| `String getSerialNumber()` | Read serial; may be empty if no payload in time. |
| `String getCradleModel()` | Read model string. |
| `int getLastErrorCode()` | Last error: `0x00` No Error, `0x55` Lock close, `0x56` Unlock, `0x57` System, `0x58` Serial. |

### Changed

| Method | 1.0.0 | 1.0.1 |
|--------|-------|-------|
| `setWallId` / `setRowId` / `setColId` | Implementation accepted 0..255 | **0..32**; out of range → `INVALID_ARGUMENT` before TX |
| `INVALID_ARGUMENT` | Unlock seconds, ids | Also LED times, count, serial length / non-printable |


## 1.0.0 — 2026-08-07

First public `IDockTool`: link lifecycle, unlock, layout ids, LED enable, LED test run, firmware / hardware strings.
