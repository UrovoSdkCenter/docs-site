# Notes & FAQ

## Notes

1. `draw*` only builds the page—you must call `printByData` / `printByText` to print.
2. Text is encoded as GBK.
3. Keep page width within the printable width (typically about 384–400 dots).
4. Do not block the UI thread for firmware upgrade, RFID, or printing.
5. During upgrade, do not connect / print / change settings.
6. This SDK targets the on-device print service—not TCP port 9100, and not a ZPL page builder.

Exception class: `com.urovo.printer.exception.PrinterException`

## FAQ

**Q: I called `drawText`, but nothing printed.**  
A: Also call `printByte` (or `print`), then `printByData`.

**Q: Is ZPL supported?**  
A: Page APIs are CPCL. Raw ZPL may be sent with `printByText` / `printByData` only if firmware accepts it. The SDK does not wrap ZPL.

**Q: What if `printByData` is called while disconnected?**  
A: It returns `false` and does not throw.

**Q: Blank space on the right of an image?**  
A: Page width may exceed the printable width. Try about 384 dots and match label orientation to `pageSetup`.
