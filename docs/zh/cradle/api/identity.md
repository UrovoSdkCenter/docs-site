# 充电与身份

| 方法 | 说明 |
|------|------|
| `setHostCharge(boolean fast)` / `getHostCharge()` | 主机快充标志 |
| `getSerialNumber()` | 序列号文本，可能为空 |
| `getCradleModel()` | 型号文本 |
| `getLastErrorCode()` | 底座错误字节 |
| `getFirmwareVersion()` | MCU 固件字符串（cmd 0xA0） |
| `getHardwareRevision()` | 硬件 revision（cmd 0xA2） |

## getLastErrorCode() 取值

| Code | Meaning |
|------|---------|
| `0x00` | No Error |
| `0x55` | Lock close error |
| `0x56` | Unlock error |
| `0x57` | System error |
| `0x58` | Serial error |

展示文案由集成方自行映射。
