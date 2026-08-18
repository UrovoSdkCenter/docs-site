# Overview

The K388Pro BLE SDK connects to the printer over Bluetooth Low Energy and provides label/receipt printing, status query, print settings, and firmware upgrade.

| Item | Description |
|------|-------------|
| Document version | V1.0 |
| SDK version | v1.0.0 |
| Supported models | K388 / K388Pro |
| Language | Java / Kotlin (Android) |
| Minimum OS | Android 7.0 (API 24) |
| Entry class | `com.urovo.printer.ble.BlePrinterManager` |

**Download:** [SDK JAR / Demo / Offline docs](/en/label-printer/download)

## Coordinates

Print jobs use CPCL. Coordinates are in **dots**. At 203 dpi:

```
8 dots = 1 mm
dots ≈ millimeters × 8
```

Example: a 48 mm × 40 mm label can use a page size of `384 × 320` dots.

## Print flow

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

## Feature list

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

## Docs

- [Integration](/en/label-printer/k388pro-ble/integration)
- [Quick Start](/en/label-printer/k388pro-ble/quick-start)
- [API Reference](/en/label-printer/k388pro-ble/api/)
- [Samples](/en/label-printer/k388pro-ble/samples)
- [Notes & FAQ](/en/label-printer/k388pro-ble/faq)
