# Quick Start

After integration, this sample connects, builds a page, and prints.

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

More samples: [Samples](/label-printer/k388pro-ble/samples). APIs: [API Reference](/label-printer/k388pro-ble/api/).
