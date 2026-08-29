# 标签打印

## PrinterProviderImpl.setPrinterMode

切换普通小票 / 标签模式。

### 签名

```java
boolean setPrinterMode(boolean labelMode)
```

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| labelMode | boolean | 是 | true 标签模式；false 普通模式 |

### 返回值

`true` 设置成功；`false` 失败。

## PrinterProviderImpl.setLabelFeed

标签纸定位与连续打印控制。每次标签打印前需 `PRN_LABEL_LOCATION` 或 `PRN_LABEL_CONTINUE`，结束后需 `PRN_LABEL_END`。

### 签名

```java
int setLabelFeed(byte state)
```

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| state | byte | 是 | 见 PrinterLabelState |

### 返回值

`0` 成功；其他失败。

| Method | Description |
| --- | --- |
| boolean supportLabelPrint() | 当前设备是否支持标签打印 |

## PrintFormat

| 常量 | 值 | 说明 |
| --- | --- | --- |
| FONT_SMALL / FONT_NORMAL / FONT_LARGE | 0 / 1 / 2 | 字号档位 |
| ALIGN_LEFT / ALIGN_CENTER / ALIGN_RIGHT | 0 / 1 / 2 | 对齐 |
| Y_ALIGN_TOP / Y_ALIGN_CENTER / Y_ALIGN_BOTTOM | 0 / 1 / 2 | 图文混排文本垂直对齐 |

`````````````````` Bundle 键：`FONT`、`ALIGN`、`FONTBOLD`、`FONTNAME`、`FONTSIZE`、`LINEHEIGHT`、`WIDTH`、`HEIGHT`、`OFFSET`、`BARCODE_TYPE` 等。

## PrintStatus

| 常量 | 值 | 说明 |
| --- | --- | --- |
| ERROR_NONE | 0x00 | 正常 |
| ERROR_PAPERENDED | 0xF0 | 缺纸 |
| ERROR_OVERHEAT | 0xF3 | 过热 |
| ERROR_LOWVOL | 0xE1 | 低压 |
| ERROR_BUSY | 0xF7 | 忙 |
| ERROR_MOTORERR | 0xFB | 机芯故障 |
| ERROR_HARDERR | 0xF2 | 硬件错误 |

## PrinterLabelState

| 常量 | 值 | 说明 |
| --- | --- | --- |
| PRN_LABEL_STUDY | 0x00 | 学习标签高度（不可用） |
| PRN_LABEL_LOCATION | 0x01 | 标签定位（单次/多次均可） |
| PRN_LABEL_CONTINUE | 0x02 | 连续标签打印 |
| PRN_LABEL_END | 0x03 | 标签打印结束设置 |
