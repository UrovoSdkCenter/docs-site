# Samples

## Unlock

```java
dock.setUnlockTimeSeconds(10);
dock.setLedEnabled(true);
dock.unlockCradle(new UnlockCallback() {
    @Override public void onAck() { }
    @Override public void onSuccess() { }
    @Override public void onFailure(DockError error) { }
});
```

## Read versions

```java
String model = dock.getCradleModel();
String hw = dock.getHardwareRevision();
String fw = dock.getFirmwareVersion();
String serial = dock.getSerialNumber();
int err = dock.getLastErrorCode();
```

## Firmware upgrade

```java
byte[] bin = ...; // load .bin, 1..53248 bytes
FirmwareUpgradeListener progress = (stage, current, total) -> {
    // update UI on main thread
};
try {
    String newFw = dock.upgradeFirmware(bin, progress);
} catch (DockException e) {
    switch (e.getError()) {
        case OTA_BOOT_TIMEOUT:
        case OTA_SETUP_FAILED:
        case OTA_ERASE_FAILED:
        case OTA_TRANSFER_FAILED:
        case OTA_VERSION_READ:
        case INVALID_ARGUMENT:
            break;
        default:
            break;
    }
}
```

Pick a `.bin` with the system file picker and pass bytes only to `upgradeFirmware`. The YMODEM file name inside the protocol is fixed as `firmware.bin`.
