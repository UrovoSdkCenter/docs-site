# 页面设置

| 方法 | 说明 |
|------|------|
| `pageSetup(int pageWidth, int pageHeight)` | 设置页面宽高，单位为点。 |
| `pageSetup(int pageWidth, int pageHeight, int r, int gap)` | 设置页面尺寸、旋转和间隙检测。 |
| `setPrintTime(int time)` | 打印份数，默认 1。 |
| `printByte(int horizontal, int skip)` | 生成完整打印数据。**图片页必须使用此接口。** |
| `print()` / `print(int horizontal, int skip)` | 生成 CPCL 字符串（适合纯文本页）。 |
| `noPrint()` / `noPrint(int horizontal, int skip)` | 组页结束（FORM/PRINT），不经过 Manager 发送。 |
| `getPrintPrintStr()` | 返回最近一次构建的指令字符串。 |

## 旋转与间隙

| 参数 | 取值 | 含义 |
|------|------|------|
| `r` | 0 / 1 / 2 / 3 | 不旋转 / 90° / 180° / 270° |
| `gap` | 0 / 1 / 2 / 3 | 无 / 间隙 / 左黑标 / 右黑标 |

## printByte 的 skip

| skip | 含义 |
|------|------|
| 0 | 立即打印 |
| 1 | 先检测间隙再打印（标签常用） |
| 2 | 左黑标 |
| 3 | 右黑标 |

`horizontal` 为预留参数，传入 `0`。

```java
printer.pageSetup(384, 240, 0, 1);
byte[] data = printer.printByte(0, 1);
printer.printByData(data);
```
