# Integration

Download the SDK from the [download page](/label-printer/download), then follow the steps below.

## Obtain the SDK

Recommended fat JAR (includes page-builder classes):

```gradle
dependencies {
    implementation files('libs/UK388PrintBleLibrary_fat_v1.0.0.jar')
}
```

If you use split JARs, include both the BLE library and the command-builder library.

## Project setup

Declare in `AndroidManifest.xml` and request at runtime:

```xml
<uses-permission android:name="android.permission.BLUETOOTH"
    android:maxSdkVersion="30" />
<uses-permission android:name="android.permission.BLUETOOTH_ADMIN"
    android:maxSdkVersion="30" />
<uses-permission android:name="android.permission.BLUETOOTH_CONNECT" />
<uses-permission android:name="android.permission.BLUETOOTH_SCAN" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
```

Runtime permissions:

| Android version | Required permissions |
|-----------------|----------------------|
| Android 12+ | `BLUETOOTH_CONNECT`, `BLUETOOTH_SCAN` |
| Android 11 and earlier | Location permission (for device scan) |

## BLE characteristics

These UUIDs are built into the SDK. Applications do not need to configure them:

| Direction | UUID |
|-----------|------|
| Printer → App (Notify) | `0000fff1-0000-1000-8000-00805f9b34fb` |
| App → Printer (Write) | `0000fff2-0000-1000-8000-00805f9b34fb` |

No API key. ProGuard keep: `com.urovo.printer.ble.**` and `com.urovo.printer.**`.

## Initialization

```java
BlePrinterManager printer = BlePrinterManager.getInstance(context);
```

Pass a `Context` on first use (prefer Application Context). There is no auth configuration.

Next: [Quick Start](/label-printer/k388pro-ble/quick-start)
