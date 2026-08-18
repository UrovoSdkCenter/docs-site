# 示例

## 文本 + 条码标签

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

## 图片打印

```java
printer.connect(mac);
printer.pageSetup(bitmap.getWidth(), bitmap.getHeight());
printer.drawGraphic(0, 0, bitmap);

byte[] data = printer.printByte(0, 1);
printer.printByGzipData(data);
```

## 二维码

```java
printer.pageSetup(384, 384);
printer.drawQrCode(40, 40, "https://www.urovo.com", 0, 6, 0);

byte[] data = printer.printByte(0, 1);
printer.printByData(data);
```

## 打印前检查状态

```java
PrinterStatus status = printer.getPrinterStatus();
if (!status.isReady()) {
    showMessage(status.getSuggestedAction());
    return;
}

byte[] data = printer.printByte(0, 1);
printer.printByGzipData(data);
```

## 打印参数设置

```java
printer.connect(mac);
printer.setPrintDarkness(10);
printer.setPrintMode(0);
printer.setMultiPrintDelay(100);
printer.setRewindPrint(false);
```

## 自定义 CPCL

```java
String cpcl =
        "! 0 200 200 240 1\r\n" +
        "PAGE-WIDTH 384\r\n" +
        "TEXT 24 0 20 20 Hello\r\n" +
        "PRINT\r\n";
printer.printByText(cpcl);
```
