# Page setup

| Method | Description |
|--------|-------------|
| `pageSetup(int pageWidth, int pageHeight)` | Sets page width and height in dots. |
| `pageSetup(int pageWidth, int pageHeight, int r, int gap)` | Sets size, rotation, and gap detection. |
| `setPrintTime(int time)` | Print copies, default 1. |
| `printByte(int horizontal, int skip)` | Builds full print data. **Required for image pages.** |
| `print()` / `print(int horizontal, int skip)` | Builds a CPCL string (text-only jobs). |
| `noPrint()` / `noPrint(int horizontal, int skip)` | Ends the page (FORM/PRINT) without sending via Manager. |
| `getPrintPrintStr()` | Last built command string. |

## Rotation and gap

| Param | Values | Meaning |
|-------|--------|---------|
| `r` | 0 / 1 / 2 / 3 | None / 90° / 180° / 270° |
| `gap` | 0 / 1 / 2 / 3 | None / gap / left black mark / right black mark |

## printByte skip

| skip | Meaning |
|------|---------|
| 0 | Print immediately |
| 1 | Detect gap then print (common for labels) |
| 2 | Left black mark |
| 3 | Right black mark |

`horizontal` is reserved; pass `0`.

```java
printer.pageSetup(384, 240, 0, 1);
byte[] data = printer.printByte(0, 1);
printer.printByData(data);
```
