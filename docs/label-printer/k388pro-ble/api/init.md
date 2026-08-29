# 初始化

| 方法 | 说明 |
|------|------|
| `getInstance(Context context)` | 获取单例。首次调用需传入 `Context`（建议 Application Context）。 |
| `getInstance()` | 获取已初始化的单例；未初始化时抛 `IllegalStateException`。 |
| `getSDKVersion()` | 返回 `Urovo K388 BLE Printer SDK v1.0.0`。 |
| `version()` | 返回组包版本 `V1.5`。 |
| `release()` | 断开连接并释放资源。 |

```java
BlePrinterManager printer = BlePrinterManager.getInstance(getApplicationContext());
String sdkVer = printer.getSDKVersion();
```
