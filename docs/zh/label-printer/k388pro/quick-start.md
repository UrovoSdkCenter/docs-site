# 快速开始

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

步骤：`getInstance` → `connect` → `pageSetup` / `draw*` 组页 → `printByte` 取数据 → `printByData` 发送 → `disconnect`。

成功标志：`printByData` 返回 `true`，打印机出纸。`pageSetup` / `drawText` **不会**单独出纸。

下一步：[API 参考](/zh/label-printer/k388pro/api/)
