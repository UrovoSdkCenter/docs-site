# K388Pro 蓝牙 SDK 开发指南

| 项目 | 说明 |
|------|------|
| 文档版本 | V1.0 |
| SDK 版本 | v1.0.0 |
| 支持机型 | K388 / K388Pro |
| 开发语言 | Java / Kotlin (Android) |
| 最低系统 | Android 7.0 (API 24) |
| 入口类 | `com.urovo.printer.ble.BlePrinterManager` |

**下载：** [SDK JAR / Demo / 离线文档](/label-printer/download)

---

## 目录

1. [简介](#1-简介)
2. [接入说明](#2-接入说明)
3. [快速开始](#3-快速开始)
4. [API 参考](#4-api-参考)
5. [示例](#5-示例)
6. [注意事项](#6-注意事项)
7. [附录](#7-附录)

---

## 1. 简介

K388Pro BLE SDK 通过低功耗蓝牙连接打印机，提供标签/小票打印、状态查询、打印参数设置以及固件升级。

打印任务使用 CPCL。坐标单位为 **点（dots）**。在 203 dpi 下：

```
8 dots = 1 mm
dots ≈ millimeters × 8
```

示例：48 mm × 40 mm 的标签，页面尺寸可设为 `384 × 320` 点。

### 1.1 打印流程

```
初始化 SDK
    → 连接（MAC 地址）
    → 设置页面尺寸（pageSetup）
    → 绘制内容（text / barcode / image）
    → 生成打印数据（printByte）
    → 发送到打印机（printByData 或 printByGzipData）
    → 断开连接
```

`pageSetup`、`drawText`、`drawGraphic` 只负责组页，**不会立即出纸**。必须再调用发送接口才会打印。

### 1.2 功能列表

| 功能 | 是否支持 |
|------|----------|
| BLE 连接 / 断开 | 是 |
| 文本、线条、方框 | 是 |
| 一维码 / 二维码 | 是 |
| 图片打印 | 是 |
| 打印机状态 | 是 |
| 打印参数设置 | 是 |
| 固件版本 / 升级 | 是 |
| RFID | 否 |

---

## 2. 接入说明

### 2.1 添加 SDK

从 [下载页](/label-printer/download) 获取 `UK388PrintBleLibrary_fat_v1.0.0.jar`，复制到模块的 `libs` 目录，并添加：

```gradle
dependencies {
    implementation files('libs/UK388PrintBleLibrary_fat_v1.0.0.jar')
}
```

如果使用拆分 JAR，需要同时引入 BLE 库和指令构建库。

### 2.2 权限

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

### 2.3 BLE 特征

以下 UUID 已内置在 SDK 中，应用无需自行配置：

| 方向 | UUID |
|------|------|
| 打印机 → 应用（Notify） | `0000fff1-0000-1000-8000-00805f9b34fb` |
| 应用 → 打印机（Write） | `0000fff2-0000-1000-8000-00805f9b34fb` |

---

## 3. 快速开始

```java
BlePrinterManager printer = BlePrinterManager.getInstance(context);

try {
    printer.connect("AA:BB:CC:DD:EE:FF");

    printer.pageSetup(384, 240);
    printer.drawText(16, 16, "K388Pro", 2, 0, 0, false, false);
    printer.drawBarCode(16, 64, "123456789012", 1, 0, 2, 72);

    byte[] data = printer.printByte(0, 1);
    printer.printByGzipData(data);
} catch (PrinterException e) {
    e.printStackTrace();
} finally {
    printer.disconnect();
}
```

---

## 4. API 参考

如无特别说明，以下接口均位于 `BlePrinterManager`。

### 4.1 初始化

| 方法 | 说明 |
|------|------|
| `getInstance(Context context)` | 获取单例。首次调用需传入 `Context`。 |
| `getInstance()` | 获取已初始化的单例。 |
| `getSDKVersion()` | 返回 SDK 版本字符串。 |
| `version()` | 返回指令构建库版本。 |
| `release()` | 断开连接并释放资源。 |

```java
BlePrinterManager printer = BlePrinterManager.getInstance(getApplicationContext());
String sdkVer = printer.getSDKVersion();
```

### 4.2 连接

| 方法 | 说明 |
|------|------|
| `connect(String macAddress)` | 连接打印机，例如 `"AA:BB:CC:DD:EE:FF"`。 |
| `disconnect()` | 断开连接。 |
| `isConnected()` | 返回是否已连接。 |
| `getConnectedAddress()` | 返回已连接设备的 MAC 地址。 |
| `setConnectionListener(BleConnectionListener listener)` | 设置连接回调。 |
| `setPacketGapMs(int packetGapMs)` | 设置 BLE 发包间隔（毫秒）。默认 100。 |
| `flushBuffer()` | 清空接收缓冲区。 |

连接失败或已处于连接状态时，`connect()` 会抛出 `PrinterException`。超时约 15 秒。

```java
printer.setConnectionListener(new BleConnectionListener() {
    @Override
    public void onConnected(String deviceAddress) {
        // Connected
    }

    @Override
    public void onDisconnected(String deviceAddress) {
        // Disconnected
    }

    @Override
    public void onConnectFailed(String deviceAddress, String message) {
        // Failed
    }
});
printer.connect("AA:BB:CC:DD:EE:FF");
```

若大图打印出现丢包，可加大间隔，例如 `printer.setPacketGapMs(150)`。

### 4.3 发送打印数据

| 方法 | 说明 |
|------|------|
| `printByData(byte[] data)` | 发送原始打印数据。 |
| `printByGzipData(byte[] data)` | 先压缩再发送。图片打印建议使用此接口。 |
| `printByText(String text)` | 将文本按 GBK 编码后发送 CPCL 或原始文本。 |

成功返回 `true`。未连接、`data` 为 null，或正在升级固件时返回 `false`。

### 4.4 状态与固件

| 方法 | 说明 |
|------|------|
| `getPrinterStatus()` | 查询打印机状态。 |
| `getPrinterStatusDescription()` | 返回状态描述。 |
| `getFirmwareVersion()` | 读取固件版本。失败返回 `null`。 |
| `upgradeFirmware(String path)` | 升级固件（阻塞）。 |
| `upgradeFirmware(String path, FirmwareUpgradeListener listener)` | 升级固件并回调进度。 |

`PrinterStatus` 取值：

| 状态 | 含义 |
|------|------|
| `OK` | 可打印 |
| `COVER_OPEN` | 开盖 |
| `NO_PAPER` | 缺纸 |
| `PAPER_ERROR` | 纸张异常 |
| `DISCONNECTED` | 未连接 |
| `COMMUNICATION_ERROR` | 通信失败 |
| `UNKNOWN_ERROR` | 未知错误 |

```java
PrinterStatus status = printer.getPrinterStatus();
if (!status.isReady()) {
    // status.getSuggestedAction()
}
```

固件升级：

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

升级为阻塞调用，请在工作线程中执行。升级完成后 SDK 会断开连接，打印前需重新 `connect`。

### 4.5 页面设置

| 方法 | 说明 |
|------|------|
| `pageSetup(int pageWidth, int pageHeight)` | 设置页面宽高，单位为点。 |
| `pageSetup(int pageWidth, int pageHeight, int r, int gap)` | 设置页面尺寸、旋转和间隙检测。 |
| `setPrintTime(int time)` | 打印份数，默认 1。 |
| `printByte(int horizontal, int skip)` | 生成完整打印数据。**图片页必须使用此接口。** |
| `print()` / `print(int horizontal, int skip)` | 生成 CPCL 字符串（仅文本任务）。 |
| `getPrintPrintStr()` | 返回最近一次构建的指令字符串。 |

旋转与间隙：

| 参数 | 取值 | 含义 |
|------|------|------|
| `r` | 0 / 1 / 2 / 3 | 不旋转 / 90° / 180° / 270° |
| `gap` | 0 / 1 / 2 / 3 | 无 / 间隙 / 左黑标 / 右黑标 |

`printByte` 的 `skip` 取值：

| skip | 含义 |
|------|------|
| 0 | 立即打印 |
| 1 | 先检测间隙再打印（标签常用） |
| 2 | 左黑标 |
| 3 | 右黑标 |

`horizontal` 为预留参数，传入 `0`。

### 4.6 绘制

#### 文本

```java
drawText(int x, int y, String text, int fontSize,
         int rotate, int bold, boolean reverse, boolean underline);

drawText(int x, int y, String text, int fontType, int fontSize,
         int rotate, int bold, boolean reverse, boolean underline);

drawText(int x, int y, String text, String fontType, int fontSize,
         int rotate, int bold, boolean reverse, boolean underline);
```

| 参数 | 说明 |
|------|------|
| `x` / `y` | 起始位置，单位为点 |
| `fontSize` | 字号。第一个重载支持 1–12 |
| `rotate` | 0 / 90 / 180 / 270 |
| `bold` | 0 = 关闭，大于 0 = 开启 |
| `reverse` | 反白文字 |
| `underline` | 下划线 |

#### 图形

```java
drawBox(int lineWidth, int topLeftX, int topLeftY, int bottomRightX, int bottomRightY);
drawLine(int lineWidth, int startX, int startY, int endX, int endY, boolean fullLine);
drawINVERSE(int x0, int y0, int x1, int y1, int width);
```

`fullLine` 仅为兼容保留，不影响输出。

#### 条码 / 二维码

```java
drawBarCode(int x, int y, String text, int type, int rotate, int lineWidth, int height);
drawQrCode(int x, int y, String text, int rotate, int ver, int lel);
```

一维码 `type`：

| type | 码制 |
|------|------|
| 0 | CODE39 |
| 1 | CODE128 |
| 2 | CODE93 |
| 3 | CODABAR |
| 4 | EAN8 |
| 5 | EAN13 |
| 6 | UPCA |
| 7 | UPCE |
| 8 | I2OF5 |

- 一维码 `rotate`：`0` 横向，`1` 纵向
- 二维码 `ver`：放大倍数 1–32，常用 6
- 二维码 `lel`：版本 1–40，`0` = 自动

#### 图片

```java
drawGraphic(int x, int y, Bitmap bitmap);
drawImageFormFile(int x, int y, String filePath);
```

图片会转换为黑白点阵。图片页请用 `printByte` 组数据，再用 `printByGzipData` 发送。

#### 走纸与对齐

```java
prefeed(int len);    // Feed before print. 8 dots = 1 mm
postfeed(int len);   // Feed after print
alignLeft();
alignRight();
alignCenter();
```

### 4.7 打印设置

#### 本次任务设置（随当前页发送）

| 方法 | 范围 | 说明 |
|------|------|------|
| `setContrast(int level)` | 0–3 | 对比度，数值越大越深 |
| `setSpeed(int level)` | 0–5 | 速度，0 最慢 |
| `setBold(int level)` | 0 或 >0 | 加粗 |
| `setPrintWait(int time)` | ≥0 | 延时，单位为 1/8 秒 |

#### 打印机持久设置（立即写入，需已连接）

| 方法 | 说明 |
|------|------|
| `setPrintDarkness(int darkness)` | 打印浓度 |
| `setPrintMode(int mode)` | 0 正常 / 1 快速 / 2 慢速 |
| `setMultiPrintDelay(int delayMs)` | 多份打印间隔，单位毫秒 |
| `setRewindPrint(boolean enable)` | 是否启用回卷打印 |

失败时这些方法会抛出 `PrinterException`。

---

## 5. 示例

### 5.1 文本 + 条码标签

```java
BlePrinterManager printer = BlePrinterManager.getInstance(context);
printer.connect(mac);

printer.pageSetup(384, 240, 0, 1);
printer.setContrast(2);
printer.drawText(16, 16, "Item Code", 2, 0, 1, false, false);
printer.drawBarCode(16, 56, "ABC123456789", 1, 0, 2, 72);
printer.drawText(16, 140, "ABC123456789", 1, 0, 0, false, false);

byte[] data = printer.printByte(0, 1);
printer.printByData(data);
printer.disconnect();
```

### 5.2 图片打印

```java
printer.connect(mac);
printer.pageSetup(bitmap.getWidth(), bitmap.getHeight());
printer.drawGraphic(0, 0, bitmap);

byte[] data = printer.printByte(0, 1);
printer.printByGzipData(data);
```

### 5.3 二维码

```java
printer.pageSetup(384, 384);
printer.drawQrCode(40, 40, "https://www.urovo.com", 0, 6, 0);

byte[] data = printer.printByte(0, 1);
printer.printByData(data);
```

### 5.4 打印前检查状态

```java
PrinterStatus status = printer.getPrinterStatus();
if (!status.isReady()) {
    showMessage(status.getSuggestedAction());
    return;
}

byte[] data = printer.printByte(0, 1);
printer.printByGzipData(data);
```

### 5.5 打印参数设置

```java
printer.connect(mac);
printer.setPrintDarkness(10);
printer.setPrintMode(0);
printer.setMultiPrintDelay(100);
printer.setRewindPrint(false);
```

### 5.6 自定义 CPCL

```java
String cpcl =
        "! 0 200 200 240 1\r\n" +
        "PAGE-WIDTH 384\r\n" +
        "TEXT 24 0 20 20 Hello\r\n" +
        "PRINT\r\n";
printer.printByText(cpcl);
```

---

## 6. 注意事项

1. BLE 收发和固件升级请在后台线程执行。
2. 图片打印请使用 `printByGzipData`。
3. 页面宽度请控制在可打印宽度内，通常为 384–400 点。
4. 文本按 GBK 编码。
5. 固件升级完成后需再次调用 `connect`。
6. 当前版本不提供 RFID 接口。

异常类：`com.urovo.printer.exception.PrinterException`  
日志过滤关键字：`>>`

---

## 7. 附录

### 7.1 回调接口

```java
public interface BleConnectionListener {
    void onConnected(String deviceAddress);
    void onDisconnected(String deviceAddress);
    void onConnectFailed(String deviceAddress, String message);
}

public interface FirmwareUpgradeListener {
    void onProgress(int sentBytes, int totalBytes);
    void onCompleted();
}
```

### 7.2 常见问题

**问：调用了 `drawText`，但没有出纸。**  
答：绘制接口只负责组页。需要先调用 `printByte`，再调用 `printByData` 或 `printByGzipData`。

**问：连接成功，但打印没有反应。**  
答：确认蓝牙权限和 MAC 地址，再用 `getPrinterStatus()` 检查是否缺纸或开盖。

**问：图片上方或右侧有空白。**  
答：将页面宽度缩小到可打印区域（例如 384 点），并确认标签方向与 `pageSetup` 的宽高一致。
