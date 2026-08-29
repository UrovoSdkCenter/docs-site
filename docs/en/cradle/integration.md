# Integration

## Dependency

Add the release AAR (or `:DockLib` module). **minSdk 24**.

## Lifecycle

Call **`open()`** when needed (e.g. `Activity.onStart()`). Call **`close()`** when done (e.g. `onStop()`).

| Method | Behavior |
|--------|----------|
| `open()` | Starts serial worker and opens UART; auto-reconnect on by default |
| `close()` | Stops reconnect and releases the port (`LinkState.CLOSED`) |
| `isOpen()` | `true` only when `getLinkState() == ONLINE` |
| `setAutoReconnect(boolean)` | When `true`, link loss moves to `LOST` and retries |

Most APIs require **`LinkState.ONLINE`**. While `OPENING` or `LOST`, sync methods throw **`DockException`** (`PORT_NOT_OPEN`). Use **`DockLinkListener`** or poll **`getLinkState()`** first.

## Threading

| API style | Caller | Callback |
|-----------|--------|----------|
| Sync (`setWallId`, `getFirmwareVersion`, `upgradeFirmware`, …) | Blocks until worker finishes (~1.5 s; OTA up to ~180 s) | N/A |
| `unlockCradle(UnlockCallback)` | Returns immediately | Main thread |
| `upgradeFirmware(..., listener)` | Blocks until OTA ends | `onProgress` on main thread |

Do not call blocking APIs on the main thread if the UI must stay responsive. Serialize access: only one serial transaction at a time; do not call other `IDockTool` methods during `upgradeFirmware`.

## Logging

```java
MLog.setLogEnabled(true);
MLog.setMinLevel(Log.DEBUG);
dock.setSerialTraceEnabled(true);
```

Logcat filter: tag **`DockLib`**, message prefix **`>>`**.

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

Next: [Quick Start](/en/cradle/quick-start)
