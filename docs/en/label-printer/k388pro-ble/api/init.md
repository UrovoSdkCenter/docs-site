# Initialization

| Method | Description |
|--------|-------------|
| `getInstance(Context context)` | Returns the singleton. Pass a `Context` on first use. |
| `getInstance()` | Returns the initialized singleton. |
| `getSDKVersion()` | Returns the SDK version string. |
| `version()` | Returns the command-builder version. |
| `release()` | Disconnects and releases resources. |

```java
BlePrinterManager printer = BlePrinterManager.getInstance(getApplicationContext());
String sdkVer = printer.getSDKVersion();
```
