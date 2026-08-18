# 发送打印数据

| 方法 | 说明 |
|------|------|
| `printByData(byte[] data)` | 发送原始打印数据。 |
| `printByGzipData(byte[] data)` | 先压缩再发送。图片打印建议使用此接口。 |
| `printByText(String text)` | 将文本按 GBK 编码后发送 CPCL 或原始文本。 |

成功返回 `true`。未连接、`data` 为 null，或正在升级固件时返回 `false`。
