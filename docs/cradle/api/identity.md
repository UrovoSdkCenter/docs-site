# Charge and identity

| Method | Description |
|--------|-------------|
| `setHostCharge(boolean fast)` / `getHostCharge()` | Host fast-charge flag |
| `getSerialNumber()` | Serial text; may be empty |
| `getCradleModel()` | Model text |
| `getLastErrorCode()` | Cradle error byte |
| `getFirmwareVersion()` | MCU firmware string (cmd 0xA0) |
| `getHardwareRevision()` | Hardware revision (cmd 0xA2) |

## getLastErrorCode() values

| Code | Meaning |
|------|---------|
| `0x00` | No Error |
| `0x55` | Lock close error |
| `0x56` | Unlock error |
| `0x57` | System error |
| `0x58` | Serial error |

Map display text in your app.
