# 初始化

| 方法 | 说明 |
|------|------|
| `getInstance(Context context)` | 获取单例。首次调用需传入 `Context`。 |
| `getInstance()` | 获取已初始化的单例。 |
| `getSDKVersion()` | 返回 SDK 版本字符串。 |
| `version()` | 返回指令构建库版本。 |
| `release()` | 断开连接并释放资源。 |

```java
BlePrinterManager printer = BlePrinterManager.getInstance(getApplicationContext());
String sdkVer = printer.getSDKVersion();
```
