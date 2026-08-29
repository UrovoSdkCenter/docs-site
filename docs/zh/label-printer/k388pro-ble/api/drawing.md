# 绘制

## 文本

```java
drawText(int x, int y, String text, int fontSize,
         int rotate, int bold, boolean reverse, boolean underline);

drawText(int x, int y, String text, int fontType, int fontSize,
         int rotate, int bold, boolean reverse, boolean underline);

drawText(int x, int y, String text, String fontType, int fontSize,
         int rotate, int bold, boolean reverse, boolean underline);
```

| 参数 | 说明 |
|------|------|
| `x` / `y` | 起始位置，单位为点 |
| `fontSize` | 字号。第一个重载支持 1–12 |
| `rotate` | 0 / 90 / 180 / 270 |
| `bold` | 0 = 关闭，大于 0 = 开启 |
| `reverse` | 反白文字 |
| `underline` | 下划线 |

## 图形

```java
drawBox(int lineWidth, int topLeftX, int topLeftY, int bottomRightX, int bottomRightY);
drawLine(int lineWidth, int startX, int startY, int endX, int endY, boolean fullLine);
drawINVERSE(int x0, int y0, int x1, int y1, int width);
```

`fullLine` 仅为兼容保留，不影响输出。

## 条码 / 二维码

```java
drawBarCode(int x, int y, String text, int type, int rotate, int lineWidth, int height);
drawQrCode(int x, int y, String text, int rotate, int ver, int lel);
```

一维码 `type`：

| type | 码制 |
|------|------|
| 0 | CODE39 |
| 1 | CODE128 |
| 2 | CODE93 |
| 3 | CODABAR |
| 4 | EAN8 |
| 5 | EAN13 |
| 6 | UPCA |
| 7 | UPCE |
| 8 | I2OF5 |

- 一维码 `rotate`：`0` 横向，`1` 纵向
- 二维码 `ver`：放大倍数 1–32，常用 6
- 二维码 `lel`：版本 1–40，`0` = 自动

## 图片

```java
drawGraphic(int x, int y, Bitmap bitmap);
drawImageFormFile(int x, int y, String filePath);
```

图片会转换为黑白点阵。图片页请用 `printByte` 组数据，再用 `printByGzipData` 发送。

## 走纸与对齐

```java
prefeed(int len);    // Feed before print. 8 dots = 1 mm
postfeed(int len);   // Feed after print
alignLeft();
alignRight();
alignCenter();
```
