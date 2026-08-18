# K388Pro BLE SDK Development Guide

| Item | Description |
|------|-------------|
| Document version | V1.0 |
| SDK version | v1.0.0 |
| Supported models | K388 / K388Pro |
| Language | Java / Kotlin (Android) |
| Minimum OS | Android 7.0 (API 24) |
| Entry class | `com.urovo.printer.ble.BlePrinterManager` |

**Download:** [SDK JAR / Demo / Offline docs](/en/label-printer/download)

---

## Contents

1. [Introduction](#1-introduction)
2. [Integration](#2-integration)
3. [Quick Start](#3-quick-start)
4. [API Reference](#4-api-reference)
5. [Samples](#5-samples)
6. [Notes](#6-notes)
7. [Appendix](#7-appendix)

---

## 1. Introduction

The K388Pro BLE SDK connects to the printer over Bluetooth Low Energy and provides label/receipt printing, status query, print settings, and firmware upgrade.

Print jobs use CPCL. Coordinates are in **dots**. At 203 dpi:

```
8 dots = 1 mm
dots ≈ millimeters × 8
```

Example: a 48 mm × 40 mm label can use a page size of `384 × 320` dots.

### 1.1 Print flow

```
Initialize the SDK
    → Connect (MAC address)
    → Set page size (pageSetup)
    → Draw content (text / barcode / image)
    → Build print data (printByte)
    → Send to printer (printByData or printByGzipData)
    → Disconnect
```

`pageSetup`, `drawText`, and `drawGraphic` only build the page. They **do not print immediately**. You must call a send API to output paper.

### 1.2 Feature list

| Feature | Supported |
|---------|-----------|
| BLE connect / disconnect | Yes |
| Text, lines, boxes | Yes |
| 1D / 2D barcodes | Yes |
| Image printing | Yes |
| Printer status | Yes |
| Print settings | Yes |
| Firmware version / upgrade | Yes |
| RFID | No |

---

## 2. Integration

### 2.1 Add the SDK

Download `UK388PrintBleLibrary_fat_v1.0.0.jar` from the [download page](/en/label-printer/download), copy it into your module `libs` folder and add:

```gradle
dependencies {
    implementation files('libs/UK388PrintBleLibrary_fat_v1.0.0.jar')
}
```

If you use split JARs, include both the BLE library and the command-builder library.

### 2.2 Permissions

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

### 2.3 BLE characteristics

These UUIDs are built into the SDK. Applications do not need to configure them:

| Direction | UUID |
|-----------|------|
| Printer → App (Notify) | `0000fff1-0000-1000-8000-00805f9b34fb` |
| App → Printer (Write) | `0000fff2-0000-1000-8000-00805f9b34fb` |

---

## 3. Quick Start

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

## 4. API Reference

Unless noted otherwise, all APIs are on `BlePrinterManager`.

### 4.1 Initialization

| Method | Description |
|--------|-------------|
| `getInstance(Context context)` | Returns the singleton. Pass a `Context` on first use. |
| `getInstance()` | Returns the initialized singleton. |
| `getSDKVersion()` | Returns the SDK version string. |
| `version()` | Returns the command-builder version. |
| `release()` | Disconnects and releases resources. |

```java
BlePrinterManager printer = BlePrinterManager.getInstance(getApplicationContext());
String sdkVer = printer.getSDKVersion();
```

### 4.2 Connection

| Method | Description |
|--------|-------------|
| `connect(String macAddress)` | Connects to the printer, e.g. `"AA:BB:CC:DD:EE:FF"`. |
| `disconnect()` | Disconnects. |
| `isConnected()` | Returns whether the printer is connected. |
| `getConnectedAddress()` | Returns the connected MAC address. |
| `setConnectionListener(BleConnectionListener listener)` | Sets connection callbacks. |
| `setPacketGapMs(int packetGapMs)` | Sets BLE packet interval in ms. Default: 100. |
| `flushBuffer()` | Clears the receive buffer. |

`connect()` throws `PrinterException` on failure or if already connected. Timeout is about 15 seconds.

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

If large images drop packets, increase the interval, for example `printer.setPacketGapMs(150)`.

### 4.3 Send print data

| Method | Description |
|--------|-------------|
| `printByData(byte[] data)` | Sends raw print bytes. |
| `printByGzipData(byte[] data)` | Compresses, then sends. Recommended for image jobs. |
| `printByText(String text)` | Encodes text as GBK and sends CPCL or raw text. |

Returns `true` on success. Returns `false` if disconnected, `data` is null, or a firmware upgrade is running.

### 4.4 Status and firmware

| Method | Description |
|--------|-------------|
| `getPrinterStatus()` | Queries printer status. |
| `getPrinterStatusDescription()` | Returns the status description. |
| `getFirmwareVersion()` | Reads firmware version. Returns `null` on failure. |
| `upgradeFirmware(String path)` | Upgrades firmware (blocking). |
| `upgradeFirmware(String path, FirmwareUpgradeListener listener)` | Upgrades firmware with progress. |

`PrinterStatus` values:

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

Firmware upgrade:

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

### 4.5 Page setup

| Method | Description |
|--------|-------------|
| `pageSetup(int pageWidth, int pageHeight)` | Sets page width and height in dots. |
| `pageSetup(int pageWidth, int pageHeight, int r, int gap)` | Sets page size, rotation, and gap sensing. |
| `setPrintTime(int time)` | Number of copies. Default is 1. |
| `printByte(int horizontal, int skip)` | Builds full print bytes. **Required for image pages.** |
| `print()` / `print(int horizontal, int skip)` | Builds a CPCL string (text-only jobs). |
| `getPrintPrintStr()` | Returns the last built command string. |

Rotation and gap:

| Parameter | Values | Meaning |
|-----------|--------|---------|
| `r` | 0 / 1 / 2 / 3 | None / 90° / 180° / 270° |
| `gap` | 0 / 1 / 2 / 3 | None / gap / left bar / right bar |

`printByte` `skip` values:

| skip | Meaning |
|------|---------|
| 0 | Print immediately |
| 1 | Gap sense, then print (typical for labels) |
| 2 | Left black mark |
| 3 | Right black mark |

`horizontal` is reserved. Pass `0`.

### 4.6 Drawing

#### Text

```java
drawText(int x, int y, String text, int fontSize,
         int rotate, int bold, boolean reverse, boolean underline);

drawText(int x, int y, String text, int fontType, int fontSize,
         int rotate, int bold, boolean reverse, boolean underline);

drawText(int x, int y, String text, String fontType, int fontSize,
         int rotate, int bold, boolean reverse, boolean underline);
```

| Parameter | Description |
|-----------|-------------|
| `x` / `y` | Start position in dots |
| `fontSize` | Font size. First overload supports 1–12. |
| `rotate` | 0 / 90 / 180 / 270 |
| `bold` | 0 = off, greater than 0 = on |
| `reverse` | Inverse text |
| `underline` | Underline |

#### Shapes

```java
drawBox(int lineWidth, int topLeftX, int topLeftY, int bottomRightX, int bottomRightY);
drawLine(int lineWidth, int startX, int startY, int endX, int endY, boolean fullLine);
drawINVERSE(int x0, int y0, int x1, int y1, int width);
```

`fullLine` is kept for compatibility and does not affect output.

#### Barcode / QR code

```java
drawBarCode(int x, int y, String text, int type, int rotate, int lineWidth, int height);
drawQrCode(int x, int y, String text, int rotate, int ver, int lel);
```

1D barcode `type`:

| type | Symbology |
|------|-----------|
| 0 | CODE39 |
| 1 | CODE128 |
| 2 | CODE93 |
| 3 | CODABAR |
| 4 | EAN8 |
| 5 | EAN13 |
| 6 | UPCA |
| 7 | UPCE |
| 8 | I2OF5 |

- 1D `rotate`: `0` horizontal, `1` vertical
- QR `ver`: magnification 1–32, typically 6
- QR `lel`: version 1–40, `0` = auto

#### Images

```java
drawGraphic(int x, int y, Bitmap bitmap);
drawImageFormFile(int x, int y, String filePath);
```

Images are converted to black-and-white dots. For image pages, build data with `printByte` and send with `printByGzipData`.

#### Feed and alignment

```java
prefeed(int len);    // Feed before print. 8 dots = 1 mm
postfeed(int len);   // Feed after print
alignLeft();
alignRight();
alignCenter();
```

### 4.7 Print settings

#### Job settings (sent with the current page)

| Method | Range | Description |
|--------|-------|-------------|
| `setContrast(int level)` | 0–3 | Contrast. Higher is darker. |
| `setSpeed(int level)` | 0–5 | Speed. 0 is slowest. |
| `setBold(int level)` | 0 or >0 | Bold |
| `setPrintWait(int time)` | ≥0 | Delay in 1/8 second units |

#### Persistent printer settings (written immediately; connection required)

| Method | Description |
|--------|-------------|
| `setPrintDarkness(int darkness)` | Print darkness |
| `setPrintMode(int mode)` | 0 normal / 1 fast / 2 slow |
| `setMultiPrintDelay(int delayMs)` | Delay between copies, in milliseconds |
| `setRewindPrint(boolean enable)` | Enable rewind printing |

These methods throw `PrinterException` on failure.

---

## 5. Samples

### 5.1 Text + barcode label

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

### 5.2 Image print

```java
printer.connect(mac);
printer.pageSetup(bitmap.getWidth(), bitmap.getHeight());
printer.drawGraphic(0, 0, bitmap);

byte[] data = printer.printByte(0, 1);
printer.printByGzipData(data);
```

### 5.3 QR code

```java
printer.pageSetup(384, 384);
printer.drawQrCode(40, 40, "https://www.urovo.com", 0, 6, 0);

byte[] data = printer.printByte(0, 1);
printer.printByData(data);
```

### 5.4 Check status before printing

```java
PrinterStatus status = printer.getPrinterStatus();
if (!status.isReady()) {
    showMessage(status.getSuggestedAction());
    return;
}

byte[] data = printer.printByte(0, 1);
printer.printByGzipData(data);
```

### 5.5 Print settings

```java
printer.connect(mac);
printer.setPrintDarkness(10);
printer.setPrintMode(0);
printer.setMultiPrintDelay(100);
printer.setRewindPrint(false);
```

### 5.6 Custom CPCL

```java
String cpcl =
        "! 0 200 200 240 1\r\n" +
        "PAGE-WIDTH 384\r\n" +
        "TEXT 24 0 20 20 Hello\r\n" +
        "PRINT\r\n";
printer.printByText(cpcl);
```

---

## 6. Notes

1. Run BLE I/O and firmware upgrade on a background thread.
2. Use `printByGzipData` for image jobs.
3. Keep page width within the printable width, typically 384–400 dots.
4. Text is encoded as GBK.
5. After firmware upgrade, call `connect` again.
6. This version does not provide RFID APIs.

Exception class: `com.urovo.printer.exception.PrinterException`  
Log filter: `>>`

---

## 7. Appendix

### 7.1 Callbacks

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

### 7.2 FAQ

**Q: I called `drawText`, but nothing printed.**  
A: Drawing APIs only build the page. Call `printByte`, then `printByData` or `printByGzipData`.

**Q: Connection succeeds, but printing does nothing.**  
A: Confirm Bluetooth permissions and the MAC address, then check `getPrinterStatus()` for paper or cover errors.

**Q: The image has blank space on the top or right.**  
A: Reduce page width to the printable area (for example 384 dots) and make sure label orientation matches `pageSetup` width and height.
