# 发送打印数据

| 方法 | 说明 |
|------|------|
| `printByData(byte[] data)` | 将字节写入打印服务。组页完成后必须调用本方法（或 `printByText`）才会打印。 |
| `printByText(String text)` | 按 GBK 编码发送文本或 CPCL 字符串。 |

成功返回 `true`；未连接或升级中返回 `false`。

```java
byte[] data = printer.printByte(0, 1);
boolean ok = printer.printByData(data);
```

应用侧也可用同库 `GZIPFrame.codec(byte[])` 压缩后再 `printByData`（工具方法，非 Manager 接口）。
