# Send print data

| Method | Description |
|--------|-------------|
| `printByData(byte[] data)` | Sends raw print bytes. |
| `printByGzipData(byte[] data)` | Compresses, then sends. Recommended for image jobs. |
| `printByText(String text)` | Encodes text as GBK and sends CPCL or raw text. |

Returns `true` on success. Returns `false` if disconnected, `data` is null, or a firmware upgrade is running.
