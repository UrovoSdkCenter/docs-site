# 示例

## 解锁

```java
dock.setUnlockTimeSeconds(10);
dock.setLedEnabled(true);
dock.unlockCradle(new UnlockCallback() {
    @Override public void onAck() { }
    @Override public void onSuccess() { }
    @Override public void onFailure(DockError error) { }
});
```

## 读取版本

```java
String model = dock.getCradleModel();
String hw = dock.getHardwareRevision();
String fw = dock.getFirmwareVersion();
String serial = dock.getSerialNumber();
int err = dock.getLastErrorCode();
```

## 固件升级

```java
byte[] bin = ...; // 从存储加载 .bin，1..53248 字节
FirmwareUpgradeListener progress = (stage, current, total) -> {
    // 在主线程更新 UI
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

在应用内用系统文件选择器选取 `.bin`，仅将字节传给 `upgradeFirmware`。协议内 YMODEM 文件名固定为 `firmware.bin`。
