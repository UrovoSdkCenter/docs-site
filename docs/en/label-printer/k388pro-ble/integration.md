# Integration

Download the SDK from the [download page](/en/label-printer/download), then follow the steps below.

## Add the SDK

Copy `UK388PrintBleLibrary_fat_v1.0.0.jar` into your module `libs` folder and add:

```gradle
dependencies {
    implementation files('libs/UK388PrintBleLibrary_fat_v1.0.0.jar')
}
```

If you use split JARs, include both the BLE library and the command-builder library.

## Permissions

Declare in `AndroidManifest.xml`:

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
| Android 12 and later | `BLUETOOTH_CONNECT`, `BLUETOOTH_SCAN` |
| Android 11 and earlier | Location permission (for device scan) |

## BLE characteristics

These UUIDs are built into the SDK. Applications do not need to configure them:

| Direction | UUID |
|-----------|------|
| Printer → App (Notify) | `0000fff1-0000-1000-8000-00805f9b34fb` |
| App → Printer (Write) | `0000fff2-0000-1000-8000-00805f9b34fb` |

Next: [Quick Start](/en/label-printer/k388pro-ble/quick-start)
