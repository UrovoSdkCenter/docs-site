# 注意事项与 FAQ

## 注意事项

1. `draw*` 只组页，必须 `printByData` / `printByText` 才会打印。
2. 文本按 GBK 编码。
3. 页面宽度不要超过打印头可打宽度（常见约 384~400 点）。
4. 固件升级、RFID、打印请避免阻塞 UI 线程。
5. 升级过程中禁止 connect / 打印 / 改设置。
6. 本 SDK 面向本机打印服务，不是网络 9100 端口，也不是 ZPL 组包库。

异常类：`com.urovo.printer.exception.PrinterException`

## 常见问题

**问：调用了 `drawText`，为什么没出纸？**  
答：还需 `printByte`（或 `print`）再 `printByData`。

**问：是否支持 ZPL？**  
答：组页 API 为 CPCL。若固件接受 ZPL，仅可用 `printByText` / `printByData` 发送原文，SDK 不封装 ZPL。

**问：`printByData` 未连接会怎样？**  
答：返回 `false`，不会抛异常。

**问：图片右侧出现空白？**  
答：页宽可能大于可打宽度，尝试将宽度降到约 384 点，并确认标签方向与 `pageSetup` 一致。
