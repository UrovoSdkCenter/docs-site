# Quick Start

```java
UPrinterManager printer = UPrinterManager.getInstance(context);
try {
    printer.connect();
    printer.pageSetup(384, 240);
    printer.drawText(16, 16, "K388", 2, 0, 0, false, false);
    printer.drawBarCode(16, 64, "123456789012", 1, 0, 2, 72);
    byte[] data = printer.printByte(0, 1);
    boolean ok = printer.printByData(data);
} catch (PrinterException e) {
    e.printStackTrace();
} finally {
    printer.disconnect();
}
```

Flow: `getInstance` → `connect` → `pageSetup` / `draw*` → `printByte` → `printByData` → `disconnect`.

Success: `printByData` returns `true` and paper feeds. `pageSetup` / `drawText` alone **do not** print.

Next: [API Reference](/en/label-printer/k388pro/api/)
