# 接入

从 [下载页](/zh/label-printer/download) 获取 SDK 后，按下面步骤接入工程。

## 获取 SDK

推荐 fat jar（含组包类）：

```gradle
dependencies {
    implementation files('libs/UK388PrintBleLibrary_fat_v1.0.0.jar')
}
```

如果使用拆分 JAR，需要同时引入 BLE 库和指令构建库。

## 工程配置

在应用 `AndroidManifest.xml` 声明并动态申请：

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

| 系统 | 运行时权限 |
|------|------------|
| Android 12+ | `BLUETOOTH_CONNECT`、`BLUETOOTH_SCAN` |
| Android 11 及以下 | 扫描时需定位权限 |

## BLE 特征

以下 UUID 已内置在 SDK 中，应用无需自行配置：

| 方向 | UUID |
|------|------|
| 打印机 → App（Notify） | `0000fff1-0000-1000-8000-00805f9b34fb` |
| App → 打印机（Write） | `0000fff2-0000-1000-8000-00805f9b34fb` |

无 API Key。混淆请 keep：`com.urovo.printer.ble.**` 与 `com.urovo.printer.**`。

## 初始化

```java
BlePrinterManager printer = BlePrinterManager.getInstance(context);
```

首次必须传入 `Context`（建议 `Application` Context）。无鉴权配置项。

下一步：[快速开始](/zh/label-printer/k388pro-ble/quick-start)
