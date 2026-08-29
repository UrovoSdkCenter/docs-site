# 文本打印

## PrinterProviderImpl.addText

按指定格式添加一行文本。

### 签名

```java
void addText(Bundle format, String text)
```

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| format | Bundle | 是 | 字体与排版，键见 PrintFormat |
| text | String | 是 | 打印文本 |

`` **format 常用键**

| 键 | 类型 | 说明 |
| --- | --- | --- |
| PrintFormat.FONT | int | 0 小 / 1 正常 / 2 大，默认 1 |
| PrintFormat.FONTBOLD | boolean | 加粗，默认 false |
| PrintFormat.ALIGN | int | 0 左 / 1 中 / 2 右 |
| PrintFormat.FONTNAME | String | 自定义 TTF 路径，如 /sdcard/xxx.ttf |
| PrintFormat.FONTSIZE | int | 指定字号时忽略 FONT |
| PrintFormat.LINEHEIGHT | int | 行距 |

### 示例

```java
Bundle fmt = new Bundle();
fmt.putInt(PrintFormat.FONT, PrintFormat.FONT_NORMAL);
fmt.putInt(PrintFormat.ALIGN, PrintFormat.ALIGN_LEFT);
printer.addText(fmt, "Item A    $9.99");
```

## PrinterProviderImpl.addTextLeft_Right

一行左右两栏文本（推荐：Bundle 重载）。

### 签名

```java
void addTextLeft_Right(Bundle format, String textLeft, String textRight)
```

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| format | Bundle | 是 | 同 addText |
| textLeft | String | 是 | 左栏内容 |
| textRight | String | 是 | 右栏内容 |

## PrinterProviderImpl.addTextLeft_Center_Right

一行左/中/右三栏文本（推荐：Bundle 重载）。

### 签名

```java
void addTextLeft_Center_Right(Bundle format, String textLeft, String textCenter, String textRight)
```

| Method | Description |
| --- | --- |
| void addTextLeft_Right(String textLeft, String textRight, int font, boolean fontBold) | 已废弃，请用 Bundle 版 |
| void addTextLeft_Center_Right(String textLeft, String textCenter, String textRight, int font, boolean fontBold) | 已废弃，请用 Bundle 版 |

``****``**** **待确认：** 规范文档写作 `addTextLeft_Right_Center`，实际 Java 方法名为 `addTextLeft_Center_Right`。
