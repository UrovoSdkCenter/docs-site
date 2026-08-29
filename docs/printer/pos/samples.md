# Examples

## Example 1: Receipt with text and QR code

```java
printer.initPrint();
Bundle title = new Bundle();
title.putInt(PrintFormat.ALIGN, PrintFormat.ALIGN_CENTER);
title.putBoolean(PrintFormat.FONTBOLD, true);
printer.addText(title, "UROVO STORE");

Bundle row = new Bundle();
printer.addTextLeft_Right(row, "TOTAL", "$128.00");

Bundle qrFmt = new Bundle();
qrFmt.putInt(PrintFormat.ALIGN, PrintFormat.ALIGN_CENTER);
printer.addQrCode(qrFmt, "https://pay.example/123");

printer.feedLine(3);
int status = printer.startPrint();
printer.close();
```

## Example 2: HTML receipt

The Demo `startPrint_Html` loads HTML from assets, calls `addHtml`, then `startPrint()`. Set `WIDTH` in format (≤380).

## Example 3: Label paper

```java
if (printer.supportLabelPrint()) {
   printer.setPrinterMode(true);
   printer.setLabelFeed(PrinterLabelState.PRN_LABEL_LOCATION);
   // … addText / addBarCode …
   printer.startPrint();
   printer.setLabelFeed(PrinterLabelState.PRN_LABEL_END);
   printer.setPrinterMode(false);
}
```
