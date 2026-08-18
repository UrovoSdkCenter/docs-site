# API Reference

Unless noted otherwise, all APIs are on `BlePrinterManager`.

| Topic | Description |
|-------|-------------|
| [Initialization](/en/label-printer/k388pro-ble/api/init) | Singleton, version, release |
| [Connection](/en/label-printer/k388pro-ble/api/connection) | Connect, disconnect, callbacks, packet interval |
| [Send print data](/en/label-printer/k388pro-ble/api/print) | `printByData` / Gzip / text |
| [Status and firmware](/en/label-printer/k388pro-ble/api/status) | Status query, firmware upgrade |
| [Page setup](/en/label-printer/k388pro-ble/api/page) | Size, rotation, gap, build data |
| [Drawing](/en/label-printer/k388pro-ble/api/drawing) | Text, shapes, barcodes, images |
| [Print settings](/en/label-printer/k388pro-ble/api/settings) | Contrast, speed, darkness, and more |

Exception class: `com.urovo.printer.exception.PrinterException`
