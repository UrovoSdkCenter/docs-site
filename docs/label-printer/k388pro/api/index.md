# API 参考

如无特别说明，以下接口均位于 `UPrinterManager`。

按功能查看：

| 分类 | 说明 |
|------|------|
| [入口与生命周期](/label-printer/k388pro/api/init) | 单例、版本、释放资源 |
| [连接与状态](/label-printer/k388pro/api/connection) | 连接、断开、状态监听 |
| [发送打印数据](/label-printer/k388pro/api/print) | `printByData` / `printByText` |
| [页面设置](/label-printer/k388pro/api/page) | 页宽高、旋转、间隙、组数据 |
| [绘制](/label-printer/k388pro/api/drawing) | 文本、图形、条码、图片 |
| [打印设置](/label-printer/k388pro/api/settings) | 对比度、速度、浓度等 |
| [RFID](/label-printer/k388pro/api/rfid) | 读写与功率 |
| [固件](/label-printer/k388pro/api/firmware) | 版本查询与升级 |

异常类：`com.urovo.printer.exception.PrinterException`
