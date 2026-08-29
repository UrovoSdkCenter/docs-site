# Firmware upgrade (MCU OTA)

Upgrades the cradle **MCU** firmware (not an Android APK).

```java
String upgradeFirmware(byte[] firmware, FirmwareUpgradeListener listener)
    throws DockException
```

| Param | Description |
|-------|-------------|
| `firmware` | Raw `.bin` bytes, **1..0xD000** |
| `listener` | Optional; `onProgress` on main thread |

Returns the firmware version string read back after a successful upgrade.

**FirmwareUpgradeStage:** `REBOOT`, `WAIT_BOOT`, `FILESIZE`, `VERIFY`, `ERASE`, `TRANSFER`, `READ_VERSION`, `DONE`.

`current` / `total` matter during `ERASE` (pages) and `TRANSFER` (packets). Overall OTA budget about **180 seconds**.
