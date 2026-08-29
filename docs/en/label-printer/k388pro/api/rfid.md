# RFID

`offset` and `len` must be even-byte aligned. `getReadPower` / `getWritePower` / `getCurLabelPower` return `32767` while upgrading.

## rfidWriteWithResp

Writes RFID and returns a result code string.

```java
String rfidWriteWithResp(int bank, int password, int offset, byte[] data, int len)
```

| Param | Description |
|-------|-------------|
| `bank` | Memory bank |
| `password` | Access password |
| `offset` | Start offset (bytes, even) |
| `data` | Data to write |
| `len` | Length (bytes, even) |

Return codes:

| code | Meaning |
|------|---------|
| `"0"` | Success |
| `>0` | Device error code (`rsp[5]`) |
| `"-1"` | No response / write failed / timeout |
| `"-2"` | Invalid response header |
| `"-3"` | Invalid parameters |
| `"-4"` | Firmware upgrading |

```java
String code = printer.rfidWriteWithResp(1, 0x00000000, 4, data, data.length);
```

## Other APIs

| Method | Description |
|--------|-------------|
| `rfidWrite(...)` | Write; returns success/failure only |
| `rfidRead(...)` | Read into `data` buffer |
| `setReadPower(int power)` | Read power 0–28 |
| `setWritePower(int power)` | Write power 0–28 |
| `getReadPower()` | Read power |
| `getWritePower()` | Write power |
| `getCurLabelPower()` | Current label power related value |
| `getRfidCardState()` | Whether a tag is present |
