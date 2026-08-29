# Connection and status

## Connection

| Method | Description |
|--------|-------------|
| `connect()` | Opens the on-device print channel. Throws `PrinterException` if already connected or upgrading. |
| `disconnect()` | Closes the print channel. |
| `isConnected()` | Whether connected. |
| `flushBuffer()` | Clears the receive buffer. |
| `setPrinterStatusListener(PrinterStatusListener listener)` | Connection / disconnect listener. |

```java
printer.connect();
```

## Status

| Method | Description |
|--------|-------------|
| `getPrinterStatus()` | Queries printer status. Returns `DISCONNECTED` if not connected; `UNKNOWN_ERROR` while upgrading. |
| `getPrinterStatusDescription()` | Status description text. |

```java
if (!printer.getPrinterStatus().isReady()) {
    String tip = printer.getPrinterStatus().getSuggestedAction();
}
```

## PrinterStatus

| Status | Meaning |
|--------|---------|
| `OK` | Ready to print |
| `COVER_OPEN` | Cover open |
| `NO_PAPER` | Out of paper |
| `PAPER_ERROR` | Paper error |
| `UNKNOWN_ERROR` | Unknown error |
| `DISCONNECTED` | Not connected |
| `COMMUNICATION_ERROR` | Communication failed |
| `BUSY` | Busy (reserved) |
| `OVERHEATED` | Overheated (reserved) |

Helpers: `isReady()`, `hasError()`, `getDescription()`, `getSuggestedAction()`.

## PrinterStatusListener

| Method | Description |
|--------|-------------|
| `onConnected()` | Connected |
| `onDisconnected()` | Disconnected |
| `onStatusChanged(PrinterStatus status)` | Status changed |
| `onError(int errorCode, String errorMessage)` | Error callback |
