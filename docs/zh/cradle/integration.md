# 接入

## 获取 SDK

将 release AAR（或 `:DockLib` 模块）加入工程。**minSdk 24**。

## 生命周期

在需要底座时调用 **`open()`**（如 `Activity.onStart()`）；结束时 **`close()`**（如 `onStop()`）。

| Method | Behavior |
|--------|----------|
| `open()` | 启动串口 worker 并打开 UART；默认开启自动重连 |
| `close()` | 停止重连并释放端口（`LinkState.CLOSED`） |
| `isOpen()` | 仅当 `getLinkState() == ONLINE` 时为 `true` |
| `setAutoReconnect(boolean)` | 为 `true` 时链路丢失进入 `LOST` 并重试 |

多数 API 要求 **`LinkState.ONLINE`**。端口仍为 `OPENING` 或 `LOST` 时，同步方法抛出 **`DockException`**（**`PORT_NOT_OPEN`**）。业务调用前请用 **`DockLinkListener`** 或轮询 **`getLinkState()`**。

## 线程模型

| API 类型 | 调用线程 | 回调线程 |
|----------|----------|----------|
| 同步（`setWallId`、`getFirmwareVersion`、`upgradeFirmware` 等） | 阻塞至 worker 完成（简单调用约 1.5 s；OTA 最长约 180 s） | 无 |
| `unlockCradle(UnlockCallback)` | 立即返回 | `onAck` / `onSuccess` / `onFailure` 在**主线程** |
| `upgradeFirmware(..., listener)` | 阻塞至 OTA 结束 | `onProgress` 在**主线程**（listener 可为 `null`） |

若 UI 需保持响应，**不要**在主线程调用阻塞 API——使用后台 **`Executor`**。

**串行访问：** 同一时刻仅一条串口事务。执行 **`upgradeFirmware`** 期间，勿并行调用其他 `IDockTool` 方法。

## 日志

```java
import com.urovo.docklib.MLog;

MLog.setLogEnabled(true);
MLog.setMinLevel(Log.DEBUG);
dock.setSerialTraceEnabled(true); // 十六进制 TX/RX，建议仅 debug
```

Logcat 过滤：tag **`DockLib`**，消息前缀 **`>>`**。

## ProGuard / R8

```
-keep class com.urovo.docklib.** { *; }
-keep interface com.urovo.docklib.** { *; }
-keep enum com.urovo.docklib.** { *; }

-keep class com.urovo.serial.** { *; }
-keep class com.urovo.hwserial.** { *; }
-keep class com.android.hw.SerialPort { *; }
-keepclasseswithmembernames class com.android.hw.SerialPort {
    native <methods>;
}
```

下一步：[快速开始](/zh/cradle/quick-start)
