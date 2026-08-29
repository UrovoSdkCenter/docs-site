# 示例

## 示例 1：交易凭条（文本 + 二维码）

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

## 示例 2：HTML 小票

Demo 中 `startPrint_Html` 从 assets 读取 HTML，调用 `addHtml` 后 `startPrint()`。format 需设置合适 `WIDTH`（≤380）。

## 示例 3：标签纸

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
