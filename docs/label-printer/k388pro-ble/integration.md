# 接入

从 [下载页](/label-printer/download) 获取 SDK 后，按下面步骤接入工程。

## 添加 SDK

将 `UK388PrintBleLibrary_fat_v1.0.0.jar` 复制到模块的 `libs` 目录，并添加：

```gradle
dependencies {
    implementation files('libs/UK388PrintBleLibrary_fat_v1.0.0.jar')
}
```

如果使用拆分 JAR，需要同时引入 BLE 库和指令构建库。

## 权限

在 `AndroidManifest.xml` 中声明：

```xml
<uses-permission android:name="android.permission.BLUETOOTH"
    android:maxSdkVersion="30" />
<uses-permission android:name="android.permission.BLUETOOTH_ADMIN"
    android:maxSdkVersion="30" />
<uses-permission android:name="android.permission.BLUETOOTH_CONNECT" />
<uses-permission android:name="android.permission.BLUETOOTH_SCAN" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
```

运行时权限：

| Android 版本 | 所需权限 |
|--------------|----------|
| Android 12 及以上 | `BLUETOOTH_CONNECT`、`BLUETOOTH_SCAN` |
| Android 11 及以下 | 定位权限（用于扫描设备） |

## BLE 特征

以下 UUID 已内置在 SDK 中，应用无需自行配置：

| 方向 | UUID |
|------|------|
| 打印机 → 应用（Notify） | `0000fff1-0000-1000-8000-00805f9b34fb` |
| 应用 → 打印机（Write） | `0000fff2-0000-1000-8000-00805f9b34fb` |

下一步：[快速开始](/label-printer/k388pro-ble/quick-start)
