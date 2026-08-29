# RFID

`offset`、`len` 按偶数字节对齐。`getReadPower` / `getWritePower` / `getCurLabelPower` 在升级中返回 `32767`。

## rfidWriteWithResp

写入 RFID，返回结果码字符串。

```java
String rfidWriteWithResp(int bank, int password, int offset, byte[] data, int len)
```

| 参数 | 说明 |
|------|------|
| `bank` | 存储区编号 |
| `password` | 访问密码 |
| `offset` | 起始偏移（字节，偶对齐） |
| `data` | 写入数据 |
| `len` | 写入长度（字节，偶对齐） |

返回值：

| code | 含义 |
|------|------|
| `"0"` | 成功 |
| `>0` | 设备错误码（响应 `rsp[5]`） |
| `"-1"` | 无响应 / 写失败 / 超时 |
| `"-2"` | 响应头非法 |
| `"-3"` | 参数非法 |
| `"-4"` | 固件升级中 |

```java
String code = printer.rfidWriteWithResp(1, 0x00000000, 4, data, data.length);
```

## 其他接口

| 方法 | 说明 |
|------|------|
| `rfidWrite(...)` | 写入，仅返回成功/失败 |
| `rfidRead(...)` | 读入 `data` 缓冲区 |
| `setReadPower(int power)` | 读功率 0–28 |
| `setWritePower(int power)` | 写功率 0–28 |
| `getReadPower()` | 读功率 |
| `getWritePower()` | 写功率 |
| `getCurLabelPower()` | 当前标签功率相关值 |
| `getRfidCardState()` | 标签是否在位 |
