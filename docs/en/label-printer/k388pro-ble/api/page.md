# Page setup

| Method | Description |
|--------|-------------|
| `pageSetup(int pageWidth, int pageHeight)` | Sets page width and height in dots. |
| `pageSetup(int pageWidth, int pageHeight, int r, int gap)` | Sets page size, rotation, and gap sensing. |
| `setPrintTime(int time)` | Number of copies. Default is 1. |
| `printByte(int horizontal, int skip)` | Builds full print bytes. **Required for image pages.** |
| `print()` / `print(int horizontal, int skip)` | Builds a CPCL string (text-only jobs). |
| `getPrintPrintStr()` | Returns the last built command string. |

## Rotation and gap

| Parameter | Values | Meaning |
|-----------|--------|---------|
| `r` | 0 / 1 / 2 / 3 | None / 90° / 180° / 270° |
| `gap` | 0 / 1 / 2 / 3 | None / gap / left bar / right bar |

## printByte skip values

| skip | Meaning |
|------|---------|
| 0 | Print immediately |
| 1 | Gap sense, then print (typical for labels) |
| 2 | Left black mark |
| 3 | Right black mark |

`horizontal` is reserved. Pass `0`.
