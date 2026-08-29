# Label printing

## PrinterProviderImpl.setPrinterMode

Switches normal receipt vs label mode.

### Signature

```java
boolean setPrinterMode(boolean labelMode)
```

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| labelMode | boolean | Yes | true label mode; false normal mode |

### Returns

`true` if setting succeeded; `false` otherwise.

## PrinterProviderImpl.setLabelFeed

Label positioning and continuous print control. Before each label job use `PRN_LABEL_LOCATION` or `PRN_LABEL_CONTINUE`; after printing use `PRN_LABEL_END`.

### Signature

```java
int setLabelFeed(byte state)
```

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| state | byte | Yes | See PrinterLabelState |

### Returns

`0` success; otherwise failure.

| Method | Description |
| --- | --- |
| boolean supportLabelPrint() | Whether the device supports label printing |

## PrintFormat

| Constant | Value | Meaning |
| --- | --- | --- |
| FONT_SMALL / FONT_NORMAL / FONT_LARGE | 0 / 1 / 2 | Font tier |
| ALIGN_LEFT / ALIGN_CENTER / ALIGN_RIGHT | 0 / 1 / 2 | Alignment |
| Y_ALIGN_TOP / Y_ALIGN_CENTER / Y_ALIGN_BOTTOM | 0 / 1 / 2 | Vertical text align in image+text |

`````````````````` Bundle keys include `FONT`, `ALIGN`, `FONTBOLD`, `FONTNAME`, `FONTSIZE`, `LINEHEIGHT`, `WIDTH`, `HEIGHT`, `OFFSET`, `BARCODE_TYPE`, etc.

## PrintStatus

| Constant | Value | Meaning |
| --- | --- | --- |
| ERROR_NONE | 0x00 | OK |
| ERROR_PAPERENDED | 0xF0 | Out of paper |
| ERROR_OVERHEAT | 0xF3 | Overheat |
| ERROR_LOWVOL | 0xE1 | Low voltage |
| ERROR_BUSY | 0xF7 | Busy |
| ERROR_MOTORERR | 0xFB | Motor error |
| ERROR_HARDERR | 0xF2 | Hardware error |

## PrinterLabelState

| Constant | Value | Meaning |
| --- | --- | --- |
| PRN_LABEL_STUDY | 0x00 | Learn label height (not available) |
| PRN_LABEL_LOCATION | 0x01 | Label positioning (single or batch) |
| PRN_LABEL_CONTINUE | 0x02 | Continuous label printing |
| PRN_LABEL_END | 0x03 | End-of-label settings |
