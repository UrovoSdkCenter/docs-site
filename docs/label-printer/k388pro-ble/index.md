# 概述

K388Pro BLE SDK 通过低功耗蓝牙连接打印机，提供标签/小票打印、状态查询、打印参数设置以及固件升级。

| 项目 | 说明 |
|------|------|
| 文档版本 | V1.0 |
| SDK 版本 | v1.0.0 |
| 支持机型 | K388 / K388Pro |
| 开发语言 | Java / Kotlin (Android) |
| 最低系统 | Android 7.0 (API 24) |
| 入口类 | `com.urovo.printer.ble.BlePrinterManager` |

**下载：** [SDK JAR / Demo / 离线文档](/label-printer/download)

## 坐标与单位

打印任务使用 CPCL。坐标单位为 **点（dots）**。在 203 dpi 下：

```
8 dots = 1 mm
dots ≈ millimeters × 8
```

示例：48 mm × 40 mm 的标签，页面尺寸可设为 `384 × 320` 点。

## 打印流程

```
初始化 SDK
    → 连接（MAC 地址）
    → 设置页面尺寸（pageSetup）
    → 绘制内容（text / barcode / image）
    → 生成打印数据（printByte）
    → 发送到打印机（printByData 或 printByGzipData）
    → 断开连接
```

`pageSetup`、`drawText`、`drawGraphic` 只负责组页，**不会立即出纸**。必须再调用发送接口才会打印。

## 功能列表

| 功能 | 是否支持 |
|------|----------|
| BLE 连接 / 断开 | 是 |
| 文本、线条、方框 | 是 |
| 一维码 / 二维码 | 是 |
| 图片打印 | 是 |
| 打印机状态 | 是 |
| 打印参数设置 | 是 |
| 固件版本 / 升级 | 是 |
| RFID | 否 |

## 文档导航

- [接入](/label-printer/k388pro-ble/integration)
- [快速开始](/label-printer/k388pro-ble/quick-start)
- [API 参考](/label-printer/k388pro-ble/api/)
- [示例](/label-printer/k388pro-ble/samples)
- [注意事项与 FAQ](/label-printer/k388pro-ble/faq)
