# 快速开始

下列示例打印一行居中文本并走纸 3 行：

```java
import android.os.Bundle;
import com.urovo.sdk.print.PrintFormat;
import com.urovo.sdk.print.PrinterProviderImpl;

PrinterProviderImpl printer = PrinterProviderImpl.getInstance(context);
printer.initPrint();

if (printer.getStatus() != 0) {
   printer.close();
   return; // 打印机不可用，见 PrintStatus
}

Bundle format = new Bundle();
format.putInt(PrintFormat.FONT, PrintFormat.FONT_NORMAL);
format.putInt(PrintFormat.ALIGN, PrintFormat.ALIGN_CENTER);
format.putBoolean(PrintFormat.FONTBOLD, true);
printer.addText(format, "APPROVED");

printer.feedLine(3);
int status = printer.startPrint(); // 0 表示成功
printer.close();
```

**成功标志：** `startPrint()` 与 `getStatus()` 返回 `0x00`（`PrintStatus.ERROR_NONE`）。
