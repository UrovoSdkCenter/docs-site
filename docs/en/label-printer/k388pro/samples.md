# Samples

## Text and barcode label

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

Label stock commonly uses `skip=1` (gap detect).

## Image print

```java
printer.connect();
printer.pageSetup(bitmap.getWidth(), bitmap.getHeight());
printer.drawGraphic(0, 0, bitmap);
byte[] data = printer.printByte(0, 1);
byte[] gzip = GZIPFrame.codec(data);
printer.printByData(gzip);
printer.disconnect();
```

Image pages must use `printByte`; large payloads can be GZIP-compressed first.

## RFID write

```java
boolean ok = printer.rfidWrite(1, 0x00000000, 4, epc, epc.length);
String code = printer.rfidWriteWithResp(1, 0x00000000, 4, epc, epc.length);
byte[] buf = new byte[epc.length];
printer.rfidRead(1, 0x00000000, 4, buf, buf.length);
```

Writing the EPC bank from offset 4 does not auto-update the PC length field; update PC yourself when length changes.
