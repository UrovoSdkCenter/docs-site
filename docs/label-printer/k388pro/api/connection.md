# 连接与状态

## 连接

| 方法 | 说明 |
|------|------|
| `connect()` | 打开本机打印通道。已连接或正在升级固件时抛 `PrinterException`。 |
| `disconnect()` | 断开打印通道。 |
| `isConnected()` | 是否已连接。 |
| `flushBuffer()` | 清空接收缓冲。 |
| `setPrinterStatusListener(PrinterStatusListener listener)` | 设置连接/断开等监听。 |

```java
printer.connect();
```

## 状态查询

| 方法 | 说明 |
|------|------|
| `getPrinterStatus()` | 查询打印机状态。未连接返回 `DISCONNECTED`；升级中返回 `UNKNOWN_ERROR`。 |
| `getPrinterStatusDescription()` | 状态描述文本。 |

```java
if (!printer.getPrinterStatus().isReady()) {
    String tip = printer.getPrinterStatus().getSuggestedAction();
}
```

## PrinterStatus

| 状态 | 含义 |
|------|------|
| `OK` | 正常可打印 |
| `COVER_OPEN` | 开盖 |
| `NO_PAPER` | 缺纸 |
| `PAPER_ERROR` | 纸张错误 |
| `UNKNOWN_ERROR` | 未知错误 |
| `DISCONNECTED` | 未连接 |
| `COMMUNICATION_ERROR` | 通信错误 |
| `BUSY` | 忙（预留） |
| `OVERHEATED` | 过热（预留） |

辅助方法：`isReady()`、`hasError()`、`getDescription()`、`getSuggestedAction()`。

## PrinterStatusListener

| 方法 | 说明 |
|------|------|
| `onConnected()` | 连接成功 |
| `onDisconnected()` | 断开 |
| `onStatusChanged(PrinterStatus status)` | 状态变化 |
| `onError(int errorCode, String errorMessage)` | 错误回调 |
