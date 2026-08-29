# Send print data

| Method | Description |
|--------|-------------|
| `printByData(byte[] data)` | Writes bytes to the print service. After building a page, call this (or `printByText`) to print. |
| `printByText(String text)` | Sends text or a CPCL string encoded as GBK. |

Returns `true` on success; `false` if not connected or upgrading.

```java
byte[] data = printer.printByte(0, 1);
boolean ok = printer.printByData(data);
```

You may also compress with `GZIPFrame.codec(byte[])` from the same library, then call `printByData` (utility, not a Manager API).
