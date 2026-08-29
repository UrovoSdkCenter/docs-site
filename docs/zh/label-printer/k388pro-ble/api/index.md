# API 参考

如无特别说明，以下接口均位于 `BlePrinterManager`。

按功能查看：

| 分类 | 说明 |
|------|------|
| [初始化](/zh/label-printer/k388pro-ble/api/init) | 单例、版本、释放资源 |
| [连接](/zh/label-printer/k388pro-ble/api/connection) | 连接、断开、回调、发包间隔 |
| [发送打印数据](/zh/label-printer/k388pro-ble/api/print) | `printByData` / Gzip / 文本 |
| [状态与固件](/zh/label-printer/k388pro-ble/api/status) | 状态查询、固件升级 |
| [页面设置](/zh/label-printer/k388pro-ble/api/page) | 页宽高、旋转、间隙、组数据 |
| [绘制](/zh/label-printer/k388pro-ble/api/drawing) | 文本、图形、条码、图片 |
| [打印设置](/zh/label-printer/k388pro-ble/api/settings) | 对比度、速度、浓度等 |

异常类：`com.urovo.printer.exception.PrinterException`
