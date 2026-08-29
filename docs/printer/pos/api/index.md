# API 参考

如无特别说明，以下接口均位于 `PrinterProviderImpl`。

| 分类 | 说明 |
|------|------|
| [入口与生命周期](/printer/pos/api/lifecycle) | getInstance / initPrint / close / startPrint |
| [状态与参数](/printer/pos/api/status) | getStatus / setGray / setSpeed |
| [文本打印](/printer/pos/api/text) | addText / 左右栏 / 三栏 |
| [条码与二维码](/printer/pos/api/barcode) | addBarCode / addQrCode |
| [图片与 HTML](/printer/pos/api/image-html) | addImage / addImageWithText / addHtml |
| [走纸与布局](/printer/pos/api/feed) | feedLine / addBlankLine / addBlackLine |
| [标签打印](/printer/pos/api/label) | setPrinterMode / setLabelFeed / 常量 |
