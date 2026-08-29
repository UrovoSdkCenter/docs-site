# Text printing

## PrinterProviderImpl.addText

Adds one line of text with the given format.

### Signature

```java
void addText(Bundle format, String text)
```

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| format | Bundle | Yes | Font and layout keys — see PrintFormat |
| text | String | Yes | Text to print |

`` **Common format keys**

| Key | Type | Description |
| --- | --- | --- |
| PrintFormat.FONT | int | 0 small / 1 normal / 2 large, default 1 |
| PrintFormat.FONTBOLD | boolean | Bold, default false |
| PrintFormat.ALIGN | int | 0 left / 1 center / 2 right |
| PrintFormat.FONTNAME | String | Custom TTF path, e.g. /sdcard/xxx.ttf |
| PrintFormat.FONTSIZE | int | When set, ignores FONT tier |
| PrintFormat.LINEHEIGHT | int | Line spacing |

### Example

```java
Bundle fmt = new Bundle();
fmt.putInt(PrintFormat.FONT, PrintFormat.FONT_NORMAL);
fmt.putInt(PrintFormat.ALIGN, PrintFormat.ALIGN_LEFT);
printer.addText(fmt, "Item A    $9.99");
```

## PrinterProviderImpl.addTextLeft_Right

Left/right two-column line (recommended: Bundle overload).

### Signature

```java
void addTextLeft_Right(Bundle format, String textLeft, String textRight)
```

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| format | Bundle | Yes | Same as addText |
| textLeft | String | Yes | Left column |
| textRight | String | Yes | Right column |

## PrinterProviderImpl.addTextLeft_Center_Right

Left/center/right three-column line (recommended: Bundle overload).

### Signature

```java
void addTextLeft_Center_Right(Bundle format, String textLeft, String textCenter, String textRight)
```

| Method | Description |
| --- | --- |
| void addTextLeft_Right(String textLeft, String textRight, int font, boolean fontBold) | Deprecated — use Bundle overload |
| void addTextLeft_Center_Right(String textLeft, String textCenter, String textRight, int font, boolean fontBold) | Deprecated — use Bundle overload |

``****``**** **Pending confirmation:** The spec names this API `addTextLeft_Right_Center`; the Java SDK uses `addTextLeft_Center_Right`.
