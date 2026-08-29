# 入口与生命周期

| 方法 | 说明 |
|------|------|
| `getInstance(Context context)` | 获取单例。首次调用需传入 `Context`（建议 Application Context）。 |
| `getInstance()` | 获取已初始化的单例；未初始化时抛 `IllegalStateException`。 |
| `initialize(Context context)` | 显式初始化。 |
| `getSDKVersion()` | 返回 `Urovo K388 Printer SDK v1.0.0`。 |
| `version()` | 返回组包版本 `V1.5`。 |
| `release()` | 断开连接并释放内部对象。 |
| `isFirmwareUpgrading()` | 是否正在升级固件。 |

```java
UPrinterManager printer = UPrinterManager.getInstance(getApplicationContext());
String sdkVer = printer.getSDKVersion();
```
