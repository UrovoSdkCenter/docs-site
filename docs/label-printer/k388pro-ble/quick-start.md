# 快速开始

接入完成后，可用下面代码完成一次连接、组页并打印。

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

更多场景见 [示例](/label-printer/k388pro-ble/samples)，接口说明见 [API 参考](/label-printer/k388pro-ble/api/)。
