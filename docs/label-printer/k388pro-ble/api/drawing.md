# Drawing

## Text

```java
drawText(int x, int y, String text, int fontSize,
         int rotate, int bold, boolean reverse, boolean underline);

drawText(int x, int y, String text, int fontType, int fontSize,
         int rotate, int bold, boolean reverse, boolean underline);

drawText(int x, int y, String text, String fontType, int fontSize,
         int rotate, int bold, boolean reverse, boolean underline);
```

| Parameter | Description |
|-----------|-------------|
| `x` / `y` | Start position in dots |
| `fontSize` | Font size. First overload supports 1–12. |
| `rotate` | 0 / 90 / 180 / 270 |
| `bold` | 0 = off, greater than 0 = on |
| `reverse` | Inverse text |
| `underline` | Underline |

## Shapes

```java
drawBox(int lineWidth, int topLeftX, int topLeftY, int bottomRightX, int bottomRightY);
drawLine(int lineWidth, int startX, int startY, int endX, int endY, boolean fullLine);
drawINVERSE(int x0, int y0, int x1, int y1, int width);
```

`fullLine` is kept for compatibility and does not affect output.

## Barcode / QR code

```java
drawBarCode(int x, int y, String text, int type, int rotate, int lineWidth, int height);
drawQrCode(int x, int y, String text, int rotate, int ver, int lel);
```

1D barcode `type`:

| type | Symbology |
|------|-----------|
| 0 | CODE39 |
| 1 | CODE128 |
| 2 | CODE93 |
| 3 | CODABAR |
| 4 | EAN8 |
| 5 | EAN13 |
| 6 | UPCA |
| 7 | UPCE |
| 8 | I2OF5 |

- 1D `rotate`: `0` horizontal, `1` vertical
- QR `ver`: magnification 1–32, typically 6
- QR `lel`: version 1–40, `0` = auto

## Images

```java
drawGraphic(int x, int y, Bitmap bitmap);
drawImageFormFile(int x, int y, String filePath);
```

Images are converted to black-and-white dots. For image pages, build data with `printByte` and send with `printByGzipData`.

## Feed and alignment

```java
prefeed(int len);    // Feed before print. 8 dots = 1 mm
postfeed(int len);   // Feed after print
alignLeft();
alignRight();
alignCenter();
```
