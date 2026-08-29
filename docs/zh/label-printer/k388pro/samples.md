# 示例

## 文本与条码标签

```java
UPrinterManager printer = UPrinterManager.getInstance(context);
printer.connect();
printer.pageSetup(384, 240, 0, 1);
printer.setContrast(2);
printer.drawText(16, 16, "物料编码", 2, 0, 1, false, false);
printer.drawBarCode(16, 56, "ABC123456789", 1, 0, 2, 72);
printer.drawText(16, 140, "ABC123456789", 1, 0, 0, false, false);
byte[] data = printer.printByte(0, 1);
printer.printByData(data);
printer.disconnect();
```

标签纸常用 `skip=1`（缝隙检测）。

## 图片打印

```java
printer.connect();
printer.pageSetup(bitmap.getWidth(), bitmap.getHeight());
printer.drawGraphic(0, 0, bitmap);
byte[] data = printer.printByte(0, 1);
byte[] gzip = GZIPFrame.codec(data);
printer.printByData(gzip);
printer.disconnect();
```

图片页必须用 `printByte`；大数据可先 GZIP。

## RFID 写入

```java
boolean ok = printer.rfidWrite(1, 0x00000000, 4, epc, epc.length);
String code = printer.rfidWriteWithResp(1, 0x00000000, 4, epc, epc.length);
byte[] buf = new byte[epc.length];
printer.rfidRead(1, 0x00000000, 4, buf, buf.length);
```

从 offset=4 写 EPC 区时不会自动更新 PC 长度字段；长度变化需自行更新 PC。
