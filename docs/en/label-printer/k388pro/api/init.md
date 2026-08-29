# Entry and lifecycle

| Method | Description |
|--------|-------------|
| `getInstance(Context context)` | Returns the singleton. Pass a `Context` on first use (prefer Application Context). |
| `getInstance()` | Returns the initialized singleton; throws `IllegalStateException` if not initialized. |
| `initialize(Context context)` | Explicit initialization. |
| `getSDKVersion()` | Returns `Urovo K388 Printer SDK v1.0.0`. |
| `version()` | Returns page-builder version `V1.5`. |
| `release()` | Disconnects and releases internal objects. |
| `isFirmwareUpgrading()` | Whether firmware upgrade is in progress. |

```java
UPrinterManager printer = UPrinterManager.getInstance(getApplicationContext());
String sdkVer = printer.getSDKVersion();
```
