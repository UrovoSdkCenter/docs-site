# Quick Start

Print a centered bold line and feed three lines:

```java
import android.os.Bundle;
import com.urovo.sdk.print.PrintFormat;
import com.urovo.sdk.print.PrinterProviderImpl;

PrinterProviderImpl printer = PrinterProviderImpl.getInstance(context);
printer.initPrint();

if (printer.getStatus() != 0) {
   printer.close();
   return; // printer not ready — see PrintStatus
}

Bundle format = new Bundle();
format.putInt(PrintFormat.FONT, PrintFormat.FONT_NORMAL);
format.putInt(PrintFormat.ALIGN, PrintFormat.ALIGN_CENTER);
format.putBoolean(PrintFormat.FONTBOLD, true);
printer.addText(format, "APPROVED");

printer.feedLine(3);
int status = printer.startPrint(); // 0 = success
printer.close();
```

**Success indicator:** `startPrint()` and `getStatus()` return `0x00` (`PrintStatus.ERROR_NONE`).
