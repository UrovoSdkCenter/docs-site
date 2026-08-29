# Initialization

| Method | Description |
|--------|-------------|
| `getInstance(Context context)` | Returns the singleton. Pass a `Context` on first use (prefer Application Context). |
| `getInstance()` | Returns the initialized singleton; throws `IllegalStateException` if not initialized. |
| `getSDKVersion()` | Returns `Urovo K388 BLE Printer SDK v1.0.0`. |
| `version()` | Returns page-builder version `V1.5`. |
| `release()` | Disconnects and releases resources. |

```java
BlePrinterManager printer = BlePrinterManager.getInstance(getApplicationContext());
String sdkVer = printer.getSDKVersion();
```
